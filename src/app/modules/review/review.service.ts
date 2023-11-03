import { Review } from "@prisma/client";
import prisma from "../../../utils/prisma";

const createReview = async (data: Review, userIds: string): Promise<Review> => {
  const {userId, eventId, comment, rating} = data;

  const result = await prisma.review.create({
    data: {
      userId: userIds,
      eventId,
      comment,
      rating
    }
  });
  return result;
}

const getAllReview = async () => {
  return await prisma.review.findMany({
    include: {
      user: true,
      event: true
    }
  });
}

const updateReview = async (id: string, payload: Partial<Review>): Promise<Review | null> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload
  });
  return result;
}

const deleteReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.delete({
    where: {
      id,
    },
  });
  return result;
}

export const ReviewService = {
  createReview,
  getAllReview,
  updateReview,
  deleteReview
}
