import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../utils/prisma";
import { IEventFilterRequest } from "../event/event.interface";
import { IPaginationOptions } from "../../../types/paginationType";
import { Booking, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { bookingFieldSearchableFields, bookingRelationFields, bookingRelationalFieldsMapper } from "./booking.constant";

const createBooking = async (userId: string, eventId: string, scheduleDate: string): Promise<any> => {

  // Check if the event exists
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This Event is not available!");
  }

  if(event.isBooked === true) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This Event is already booked!");
  }

  // Use a transaction to ensure data consistency
  const eventBooking = await prisma.$transaction(async (transactionClient) => {

    // Create a booking
    const booking = await transactionClient.booking.create({
      data: {
        scheduleDate,
        userId: userId,
        eventId,
        status: 'pending',
      },
      include: {
        user: true,
        Event: true,
      }
    });

    // // Check if the booking is confirmed
    // const isBooked = booking.status === "pending";

    // Update the event's 'isBooked' status
    await transactionClient.event.update({
      where: {
        id: eventId,
      },
      data: {
        isBooked: false,
      },
    });

    return {
      booking: booking,
    };
  });

  return eventBooking;
};


const getAllBooking = async (
  filters: IEventFilterRequest,
  options: IPaginationOptions
): Promise<Booking[] | any> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookingFieldSearchableFields.map(field => ({
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
        if (bookingRelationFields.includes(key)) {
          return {
            [bookingRelationalFieldsMapper[key]]: {
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

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
    include: {
      user: true,
      Event: true,
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
  const total = await prisma.booking.count({
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

const getSingleBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      Event: true,
    },
  });
  return result;
};

const updateBooking = async (
  id: string,
  booking: Booking
): Promise<Booking> => {
  const result = await prisma.booking.update({
    where: {
      id: id,
    },
    data: booking,
  });
  return result;
};

const deleteBooking = async (id: string): Promise<Booking> => {
  const result = await prisma.booking.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const cancelBooking = async (bookingId: string): Promise<any> => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId
    },
  });

   // Check if the event exists
   const event = await prisma.event.findUnique({
    where: {
      id: booking?.eventId,
    },
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.status === 'cancelled') {
    throw new Error('Booking has already been cancelled');
  }

  if (booking.status === 'confirmed') {
    throw new Error('Booking has already been confirmed');
  }

  const cancelledBooking = await prisma.$transaction(
    async transactionClient => {
      const bookingToCancel = await transactionClient.booking.update({
        where: {
          id: bookingId
        },
        data: {
          status: 'cancelled',
        },
      });

      await transactionClient.event.update({
        where: {
          id: booking.eventId,
        },
        data: {
          isBooked: event?.isBooked === false
        },
      });

      return {
        booking: bookingToCancel
      };
    }
  );

  return cancelledBooking;
}

const confirmBooking = async (bookingId: string): Promise<any> => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not found');
  };

  if (booking.status === 'cancelled') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking has been cancelled');
  };

  if (booking.status === 'confirmed') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking has already been confirmed');
  };

  const confirmBooking = await prisma.$transaction(
    async transactionClient => {
      const bookingToConfirm = await transactionClient.booking.update({
        where: {
          id: bookingId
        },
        data: {
          status: 'confirmed'
        },
      });

      const updateEventBooked = await transactionClient.event.update({
        where: {
          id: booking.eventId
        },
        data: {
          isBooked: true
        }
      })

      return {
        booking: bookingToConfirm,
        event: updateEventBooked
      };
    }
  );

  return confirmBooking;
}

// const completedBooking = async (bookingId: string): Promise<any> => {
//   const booking = await prisma.booking.findUnique({
//     where: {
//       id: bookingId,
//     },
//   });

//   if (!booking) {
//     throw new Error('Booking does not exist');
//   }

//   if (booking.status === 'cancelled') {
//     throw new Error('Booking has cancelled');
//   }

//   if (booking.status === 'confirmed') {
//     throw new Error('Booking been confirmed');
//   }

//   if (booking.status === 'complete') {
//     throw new Error('Booking has already been completed');
//   }

//   const completedBooking = await prisma.$transaction(
//     async transactionClient => {
//       const bookingToConfirm = await transactionClient.booking.update({
//         where: {
//           id: bookingId,
//         },
//         data: {
//           status: 'complete',
//         },
//       });
//       await transactionClient.payment.update({
//         where: {
//           bookingId,
//         },
//         data: {
//           paymentStatus: 'complete',
//         },
//       });

//       return {
//         booking: bookingToConfirm,
//       };
//     }
//   );

//   return completedBooking;
// };

export const BookingService = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
  confirmBooking,
  // completedBooking
};