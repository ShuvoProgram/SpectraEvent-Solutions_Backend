import { FAQ, Prisma } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { IFAQFilterRequest } from "./faq.interface";
import { IPaginationOptions } from "../../../types/paginationType";
import { IGenericResponse } from "../../../types/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { faqFieldSearchableFields } from "./faq.constant";

const createFaq = async (data: FAQ): Promise<FAQ> => {
  const result = await prisma.fAQ.create({
    data: data,
  });
  return result;
};

const getAllFaq = async (
  filters: IFAQFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<FAQ[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: faqFieldSearchableFields.map(field => ({
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

  const whereConditons: Prisma.FAQWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.fAQ.findMany({
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

  const total = await prisma.fAQ.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleFaq = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.findUnique({
    where: { id },
  });
  return result;
};

const updateFaq = async (
  id: string,
  payload: Partial<FAQ>
): Promise<FAQ | null> => {
  const result = await prisma.fAQ.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteFaq = async (id: string): Promise<FAQ | null> => {
  const result = await prisma.fAQ.delete({
    where: {
      id,
    },
  });
  return result;
};


export const FaqService = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};