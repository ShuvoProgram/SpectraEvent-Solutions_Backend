/* eslint-disable no-unused-vars */
import { USER_ROLES, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import validator from 'validator';
import prisma from '../../../utils/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const createAdmin= async (data: User): Promise<User> => {
   const {firstName, middleName, lastName, role, gender, address, bloodGroup, contactNo , email, password, profileImage} = data;

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email address');
  }

   const isUserExist = await prisma.user.findUnique({
    where: {email: email}
  })
  if(isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "admin already exists")
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
  if (isNaN(saltRounds) || saltRounds <= 0) {
    throw new Error('BCRYPT_SALT_ROUNDS is not properly configured.');
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({
    data: {
      firstName,
      middleName,
      lastName,
      role,
      email,
      bloodGroup,
      contactNo,
      address,
      gender,
      password: hashedPassword,
      profileImage
    }
  });

  return user;
};

const getAllAdmins = async () => {
  return await prisma.user.findMany();
};

const getSingleAdmin = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

const getMyProfile = async (
  userId: string,
  userRole: USER_ROLES
): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
      role: userRole,
    },
  });
  return result;
};

export const AdminService = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  getMyProfile,
};