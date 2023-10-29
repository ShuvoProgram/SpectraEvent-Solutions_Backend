import prisma from "../../../utils/prisma";
import { IPaginationOptions } from "../../../types/paginationType";
import { IGenericResponse } from "../../../types/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { Prisma, Vanue } from "@prisma/client";
import { IVanueFilterRequest } from "./vanue.interface";
import { vanueFieldSearchableFields } from "./vanue.constant";


const createVanue = async (data: Vanue, Id: string): Promise<Vanue> => {

  data.adminId = Id
  const result = await prisma.vanue.create({
    data: {
        title: data.title,
        adminId: data.adminId,
    },
  });
  return result;
};

const getAllVanue = async (
  filters: IVanueFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Vanue[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: vanueFieldSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.VanueWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.vanue.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
          [options.sortBy]: options.sortOrder,
        }
        : {
          createdAt: 'desc',
        },
  });

  const total = await prisma.vanue.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleVanue = async (id: string): Promise<Vanue | null> => {
  const result = await prisma.vanue.findUnique({
    where: { id },
  });
  return result;
};

const updateVanue = async (
  id: string,
  payload: Partial<Vanue>
): Promise<Vanue | null> => {
  const result = await prisma.vanue.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteVanue = async (id: string): Promise<Vanue | null> => {
  const result = await prisma.vanue.delete({
    where: {
      id,
    },
  });
  return result;
};


export const VanueService = {
    createVanue,
    getAllVanue,
    getSingleVanue,
    updateVanue,
    deleteVanue
};