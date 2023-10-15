import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../utils/prisma";

const createBooking = async (
  userId: string,
  eventId: string,
  date: string
): Promise<any> => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This Event is not available!");
  }

  if (event.availableSeats <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Event is Fully Booked");
  }

  const eventBooking = await prisma.$transaction(async (transactionClient) => {
    const booking = await transactionClient.booking.create({
      data: {
        date,
        userId,
        eventId,
        status: 'pending',
      },
      include: {
        user: true,
        Event: true,
      },
    });

    const updatedAvailableSeats = event.availableSeats - 1;
    const isBooked = updatedAvailableSeats === 0;

    await transactionClient.event.update({
      where: {
        id: eventId,
      },
      data: {
        availableSeats: updatedAvailableSeats,
        isBooked: isBooked,
      },
    });

    const payment = await transactionClient.payment.create({
      data: {
        amount: event.price,
        paymentStatus: 'pending',
        bookingId: booking.id,
      },
    });

    return {
      booking: booking,
      payment: payment,
    };
  });

  return eventBooking;
};


export const BookingService = {
  createBooking
}