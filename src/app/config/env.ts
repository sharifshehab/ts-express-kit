import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string,
  DB_URL: string,
  NODE_ENV: "development" | "production"

  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };

  FRONTEND_URL: string
}

/*
  This function checks if all required environment variables are defined in the ".env" file before the application starts.
*/
const loadEnvVariables = (): EnvConfig => {

  // List of environment variable keys that must exist in the ".env" file
  const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET", "FRONTEND_URL"];

  // Check each required environment variable. If any of the environment variable is missing, throw an error.
  requiredEnvVariables.forEach(key => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`)
    }
  });

  // If all required variables are found, return them in a object-format
  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    },
    FRONTEND_URL: process.env.FRONTEND_URL as string,
  }
}

export const envVars = loadEnvVariables();