import { Organization, Prisma } from "@prisma/client"; // Import Prisma types
import prisma from "../../../utils/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createOrganization = async (data: Prisma.OrganizationCreateInput): Promise<Organization> => { // Use Prisma types
  const { name } = data;
  const isAlreadyExist = await prisma.organization.findFirst({
    where: { name: name }
  });

  if (isAlreadyExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Organization already exists");
  }

  const result = await prisma.organization.create({
    data: data,
  });
  return result;
}

const getAllOrganizations = async () => {
  return await prisma.organization.findMany();
}

const getSingleOrganization = async (id: string): Promise<Organization | null> => {
  const result = await prisma.organization.findUnique({
    where: { id },
  });
  return result;
};

const updateOrganization = async (
  id: string,
  payload: Partial<Organization>
): Promise<Organization | null> => {
  const result = await prisma.organization.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteOrganization = async (id: string): Promise<Organization | null> => {
  const result = await prisma.organization.delete({
    where: {
      id,
    },
  });
  return result;
};


export const OrganizationService = {
  createOrganization,
  getAllOrganizations,
  getSingleOrganization,
  updateOrganization,
  deleteOrganization
}