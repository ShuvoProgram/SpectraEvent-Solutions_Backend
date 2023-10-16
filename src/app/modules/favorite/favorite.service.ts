import { Favorite } from "@prisma/client";
import { IFavorite } from "./favorite.interface";
import prisma from "../../../utils/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const addFavorite = async (payload: Favorite, userId: string): Promise<Favorite | null> => {
  const alreadyAdded = await prisma.favorite.findFirst({
    where: {
      eventId: payload.eventId,
      userId: userId
    }
  });
  if (alreadyAdded) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already has favorite list')
  };

  const result = await prisma.favorite.create({
    data: {
      userId: userId,
      eventId: payload.eventId
    },
    include: {
      user: true,
      event: true
    }
  })
  return result;
}

const updateFavorite = async (userId: string, payload: Partial<IFavorite>) => {
  return await prisma.favorite.update({
    where: { userId },
    data: payload,
    include: {
      user: true,
      event: true
    }
  });
};

const removeFavorite = async (id: string) => {
  return await prisma.favorite.delete({ where: { id } });
};

const listFavorite = async (userId: string) => {
  return await prisma.favorite.findMany({
    where: { userId },
    include: {
      user: true,
      event: true
    }
  });
};

const getFavorite = async (id: string) => {
  return await prisma.favorite.findUnique({
    where: { id },
    include: {
      user: true,
      event: true
    },
  });
};

export const FavoriteService = {
  addFavorite,
  updateFavorite,
  removeFavorite,
  listFavorite,
  getFavorite
};