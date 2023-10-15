import { Admin, Admin_ROLES } from '@prisma/client';
/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import validator from 'validator';
import prisma from '../../../utils/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import config from '../../../config';

const createAdmin= async (data: Admin): Promise<Admin> => {
   const {role, email, password} = data;

  if (!validator.isEmail(email)) {
    throw new Error('Invalid email address');
  }

   const isUserExist = await prisma.admin.findUnique({
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
  const admin = await prisma.admin.create({
    data: {
      role,
      email,
      password: hashedPassword,
    }
  });

  return admin;
};

const getAllAdmins = async () => {
  return await prisma.admin.findMany();
};

const getSingleAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: { id },
  });
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin | null> => {
  if(payload.password) {
    payload.password = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds))
  }
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.delete({
    where: {
      id,
    },
  });
  return result;
};

const getMyProfile = async (
  userId: string,
  adminRole: Admin_ROLES
): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id: userId,
      role: adminRole,
    },
  });
  
  return result;
};

const updateMyProfile = async (
  userId: string,
  userRole: Admin_ROLES,
  payload: Partial<Admin>
): Promise<Admin | null> => {
  const admin = await prisma.admin.findFirst({
    where: {
      id: userId,
      role: userRole
    }
  })
  const {firstName, middleName, lastName, profileImage, contactNo, dateOfBirth, bio, gender, bloodGroup, address} = payload;

  const result = await prisma.admin.update({
    where: {
      id: admin?.id
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

export const AdminService = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  getMyProfile,
  updateMyProfile
};