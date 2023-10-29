import { Event, Favorite, Prisma } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { IEventFilterRequest } from "./event.interface";
import { IPaginationOptions } from "../../../types/paginationType";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { eventFieldSearchableFields, eventRelationalFields, eventRelationalFieldsMapper } from "./event.constant";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

const createEvent = async (data: Event, Id: string): Promise<Event> => {
  let { title, CategoryId, isBooked, description, facility, vanueId, price, people, eventImg, adminId } = data;

  adminId = Id;
  const result = await prisma.event.create({
    data: {
      title,
      CategoryId,
      isBooked: false,
      description,
      facility,
      vanueId,
      price,
      people,
      eventImg,
      adminId
    },
    include: {
      Category: true,
      Vanue: true   
    }
  });
  return result;
}

const getAllEvents = async (
  filters: IEventFilterRequest,
  options: IPaginationOptions
): Promise<Event[] | any> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: eventFieldSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (eventRelationalFields.includes(key)) {
          return {
            [eventRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.EventWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.event.findMany({
    include: {
      Review: true
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
          createdAt: 'desc',
        },
  });
  const total = await prisma.event.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};


const getSingleService = async (id: string): Promise<Event | null> => {
  const result = await prisma.event.findUnique({
    where: {
      id: id
    },
  });
  return result;
}

const updateEvent = async (
  id: string,
  event: Event
): Promise<Event> => {
  const result = await prisma.event.update({
    where: {
      id: id,
    },
    data: event,
  });
  return result;
};

const deleteEvent = async (id: string): Promise<{ event: Event; favorite: Favorite | null }> => {
  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
  });

  if (!event) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Event not found");
  }

  // Check if a favorite exists for this event
  const favorite = await prisma.favorite.findUnique({
    where: {
      eventId: id,
    },
  });

  const eventDeleteAction = await prisma.$transaction(async (transactionClient) => {
    if (favorite) {
      // Delete the favorite if it exists
      await transactionClient.favorite.delete({
        where: {
          eventId: id,
        },
      });
    }

    // Delete the event
    const eventDelete = await transactionClient.event.delete({
      where: {
        id: id,
      },
    });

    return {
      event: eventDelete,
      favorite: favorite, // You can return the favorite even if it was not found
    };
  });

  return eventDeleteAction;
};


export const EventService = {
  createEvent,
  getAllEvents,
  getSingleService,
  updateEvent,
  deleteEvent
}