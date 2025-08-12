import { Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import { StatusCodes } from 'http-status-codes';
import { UserServices } from "./user.service";

// post:-------------------------------------------------------------------------
const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User Created Successfully",
    data: user,
  })
}
);

// get:-------------------------------------------------------------------------
/* all user */
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All Users Retrieved Successfully",
    data: result.data,
    meta: result.meta
  })
})


/* single user */
const singleUser = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await UserServices.singleUser(slug);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User Retrieved Successfully",
    data: result.user,
  })
});


// put/patch:-------------------------------------------------------------------------
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const payload = req.body;
  const decodedToken = req.user; // Getting the logged-in user JWT_token
  const user = await UserServices.updateUser(userId, payload, decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User Updated Successfully",
    data: user,
  })
})


// delete---------------------------------
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await UserServices.deleteUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User Deleted Successfully",
    data: result.user,
  })
});


export const userController = {
  createUser,
  getAllUsers,
  singleUser,
  updateUser,
  deleteUser
};

