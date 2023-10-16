import { User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import httpStatus from "http-status";
import validator from 'validator';
import config from "../../../config";
import bcrypt from 'bcrypt';
import ApiError from "../../../errors/ApiError";
import { IUploadFile } from "../../../types/file";

const createUser = async (data: User): Promise<User> => {
  const { role, email, password } = data;
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }

  const isUserExist = await prisma.user.findUnique({
    where: { email: email }
  })
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "user already exists")
  }
  const saltRound = Number(config.bcrypt_salt_rounds);
  if (isNaN(saltRound) || saltRound <= 0) {
    throw new Error(`BCRYPT_SALT_ROUNDS is not properly configured.`)
  }
  const hashedPassword = await bcrypt.hash(password, saltRound);

  const result = await prisma.user.create({
    data: {
      role,
      email,
      password: hashedPassword,
    },
    include: {
      booking: true,
      Review: true
    }
  });
  return result;
}

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
}

const updateUser = async (id: string, payload: Partial<User>): Promise<User | null> => {
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds))
  }
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
}

const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

const getMyProfile = async (userId: string, userRole: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
      role: userRole,
    },
  });
  return result;
};

const updateMyProfile = async (
  userId: string,
  userRole: string,
  payload: Partial<User>
): Promise<User | null> => {
  // const user = await prisma.user.findFirst({
  //   where: {
  //     id: userId,
  //     role: userRole
  //   }
  // })
  const { firstName, middleName, lastName, profileImage, contactNo, dateOfBirth, bio, gender, bloodGroup, address } = payload;

  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      firstName,
      middleName,
      lastName,
      profileImage,
      contactNo,
      dateOfBirth,
      bio,
      gender,
      bloodGroup,
      address
    }
  })
  return result;
}

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile
}