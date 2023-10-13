import { Event, Prisma } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { IEventFilterRequest } from "./event.interface";
import { IPaginationOptions } from "../../../types/paginationType";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { eventFieldSearchableFields, eventRelationalFields, eventRelationalFieldsMapper } from "./event.constant";

const createEvent = async (data: Event): Promise<Event> => {
  const result = await prisma.event.create({
    data,
    include: {
      Organization: true
    }
  });
  return result;
}

const getAllEvents = async(
  filter: IEventFilterRequest,
  options: IPaginationOptions
): Promise<Event[] | null> => {
  const {limit, page, skip} = paginationHelpers.calculatePagination(options);
  const {searchTerm, ...filterData} = filter;

  const andCondition = [];

  if(searchTerm) {
    andCondition.push({
      OR: eventFieldSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        },
      }))
    })
  }

  if(Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(key => {
        if(eventRelationalFields.includes(key)) {
          return {
            [eventRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key]
            }
          }
        }
      })
    })
  }

  const whereConditions: Prisma.EventWhereInput = 
  andCondition.length > 0 ? {AND: andCondition} : {};

  const result = await prisma.event.findMany({
    include: {
      AvailableEvent: true,
      Review: true
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : {
      createdAt: 'desc',
    }
  });

  const total = await prisma.event.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit
    },
    data: result
  }
}

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

const deleteEvent = async (id: string): Promise<Event> => {
  const result = await prisma.event.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const EventService = {
  createEvent,
  getAllEvents,
  getSingleService,
  updateEvent,
  deleteEvent
}