import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/asyncCatch";
import TestService from "./test.service";

const getTests: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TestService.getTests();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Tests fetched successfully!",
      data: result,
    });
  }
);


const TestController = {
  getTests,
};

export default TestController;