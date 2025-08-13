import dotenv from 'dotenv';
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { envVars } from "./app/config/env";
import { routes } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

dotenv.config();
const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: [envVars.FRONTEND_URL],
    credentials: true,
  })
);

// All routes 
app.use("/api/v1", routes);

// Main route
app.get("/", (req: Request, res: Response) => {
  res.send(`MongoServe Server Running on port ${envVars.PORT}`);
});

// global error handler middleware
app.use(globalErrorHandler);

// route not found middleware
app.use(notFound);

export default app;