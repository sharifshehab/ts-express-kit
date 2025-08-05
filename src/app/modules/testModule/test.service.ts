import AppError from "../../errors/AppError";
import Test from "./test.model";
import httpStatus from "http-status";



const getTests = async () => {
  //   if you are using a database, you would typically query the database here
  // For example, if using Mongoose: return Test.find();
  const tests = await Test.tests;
  if (!tests) {
    throw new AppError(httpStatus.NOT_FOUND, "No tests found");
  }
  return tests;
};

const TestService = {
  getTests,
};

export default TestService;