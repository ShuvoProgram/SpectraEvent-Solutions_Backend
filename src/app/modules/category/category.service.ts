import { Category, Prisma } from "@prisma/client"; // Import Prisma types
import prisma from "../../../utils/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createCategory = async (data: Category, Id: string): Promise<Category> => { // Use Prisma types
  let { name, image, adminId } = data;
  const isAlreadyExist = await prisma.category.findFirst({
    where: { name: name }
  });

  if (isAlreadyExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Category already exists");
  }
  adminId = Id
  const result = await prisma.category.create({
   data: {
    name,
    image,
    adminId
   }
  });
  return result;
}

const getAllCategorys = async () => {
  return await prisma.category.findMany();
}

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id },
  });
  return result;
};

const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};


export const CategoryService = {
  createCategory,
  getAllCategorys,
  getSingleCategory,
  updateCategory,
  deleteCategory
}