import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";


// To create user:---------------------------------------------------------------------------------------------------------
const createUser = async (payload: Partial<IUser>) => {  // Partial = If not getting all the "IUser" data, just some of it
  const { email, password } = payload;
  // Checking is user already exist
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist");     // My custom "throw new Error"
  }
  // Encrypting password
  const hashedPassword = await bcrypt.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND));
  // Create user using: Static Method
  const user = await User.create({ ...payload, password: hashedPassword });

  return user
}


// To get all users:---------------------------------------------------------------------------------------------------------
const getAllUsers = async () => {
  const user = await User.find();
  return user;
};


// To get single user:---------------------------------------------------------------------------------------------------------
const singleUser = async (payload: string) => {

  // instead of "_id", use "slug" for finding a single data. It's more secure
  const { slug } = payload;
  const user = await User.findOne({ slug: slug });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return { user };
}


// To update user:---------------------------------------------------------------------------------------------------------
const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

  // User and Guide can modify their own data, but not others’ data
  if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
    if (userId !== decodedToken.userId) {
      throw new AppError(401, "You are not authorized")
    }
  }

  const ifUserExist = await User.findById(userId);
  if (!ifUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User Not Found")
  }

  // Admin cannot assign "SUPER_ADMIN" role to anyone
  if (decodedToken.role === Role.ADMIN && ifUserExist.role === Role.SUPER_ADMIN) {
    throw new AppError(401, "You are not authorized")
  }


  // If trying to change a user role
  if (payload.role) {
    // "User" or "GUIDE" cannot uppdate "user's" role
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
    }

    // Block admins from touching SUPER_ADMIN roles
    if (
      (payload.role === Role.SUPER_ADMIN || ifUserExist.role === Role.SUPER_ADMIN) && decodedToken.role !== Role.SUPER_ADMIN
    ) { throw new AppError(StatusCodes.FORBIDDEN, "Requires super-admin privileges"); }
  }

  // "User" or "GUIDE" cannot uppdate "user's" isActive, isDeleted, or isVerified status
  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
    }
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

  return newUpdatedUser
}


// To delete user:---------------------------------------------------------------------------------------------------------
const deleteUser = async (payload: string) => {
  const { userId } = payload;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return { user };
}

export const UserServices = {
  createUser,
  getAllUsers,
  singleUser,
  updateUser,
  deleteUser
}