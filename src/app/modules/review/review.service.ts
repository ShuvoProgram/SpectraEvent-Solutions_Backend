import { Review } from "@prisma/client";
import prisma from "../../../utils/prisma";

const createReview = async (data: Review): Promise<Review> => {
  const result = await prisma.review.create({
    data: data
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
