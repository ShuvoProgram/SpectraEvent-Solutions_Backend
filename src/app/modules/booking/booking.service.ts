// import httpStatus from "http-status";
// import ApiError from "../../../errors/ApiError";
// import prisma from "../../../utils/prisma"

// const createBooking = async (
//   userId: string,
//   eventId: string,
//   eventDate: string
// ): Promise<any> => {
//   const event = await prisma.event.findUnique({
//     where: {
//       id: eventId,
//     },
//   });
//   if(!event) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "This Event is not available!")
//   }

//   if(event.availableSeats > 0) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Event is Fully Booked")
//   }
// }