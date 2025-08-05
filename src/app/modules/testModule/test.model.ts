import { TTest } from "./test.interface";

// This is a simple model for the test module
const Test = {
  test: "example",
  test2: 123,
  tests: ["test1", "test2"]
};

// Here you can define a schema if you're using Mongoose or similar ORM
// Uncomment the following lines if you want to use Mongoose for database operations

// const testSchema = new Schema<TTest>({
//   test: { type: String, required: true },
//   test2: { type: Number, required: true },
//   tests: { type: [String], required: true }
// });

// const Test = model<TTest>('Test', testSchema);

export default  Test;