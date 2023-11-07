import { Blog, Prisma } from "@prisma/client";
import prisma from "../../../utils/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IBlogFilterRequest } from "./blog.interface";
import { IPaginationOptions } from "../../../types/paginationType";
import { IGenericResponse } from "../../../types/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { blogFieldSearchableFields } from "./blog.constant";

const createBlogs = async (data: Blog, userId: string): Promise<Blog> => {
  const alreadyExist = await prisma.blog.findFirst({
    where: {
      title: data.title,
      contentType: data.contentType,
      adminId: data.adminId
    }
  })

  if (alreadyExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog already exists')
  };
  let { title, content, contentType, adminId, image } = data;
  adminId = userId;
  const result = await prisma.blog.create({
    data: {
      title,
      content,
      image,
      contentType
    },
    include: {
      review: true
    },
  });
  return result;
};

const getAllBlog = async (
  filters: IBlogFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Blog[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: blogFieldSearchableFields.map(field => ({
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

  const whereConditons: Prisma.BlogWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.blog.findMany({
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

  const total = await prisma.blog.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleBlog = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      review: true,
      Admin: true
    },
  });
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<Blog>
): Promise<Blog | null> => {
  const result = await prisma.blog.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteBlog = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BlogService = {
  createBlogs,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog
};