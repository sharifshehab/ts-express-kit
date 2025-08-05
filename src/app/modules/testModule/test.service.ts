import Test from "./test.model";



const getTests = async () => {
  //   if you are using a database, you would typically query the database here
  // For example, if using Mongoose: return Test.find();
  return Test.tests;
};

const TestService = {
  getTests,
};

export default TestService;