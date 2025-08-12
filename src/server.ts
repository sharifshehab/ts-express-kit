import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";

let server: Server;

async function startServer() {
  try {
    // Connect to MongoDB Atlas using Mongoose
    const uri = envVars.DB_URL;
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas Using Mongoose');

    server = app.listen(envVars.PORT, () => {
      console.log(`Server Running on port ${envVars.PORT}`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}
startServer();
/* ________________To create an initial admin for the server at startup (Uncomment this after "user-create" API)________________
  (async () => {
      await startServer()
      await seedSuperAdmin()
  })()
*/

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... Server shutting down..");
  if (server) {
    server.close(() => {
      process.exit(1)
    });
  }
  process.exit(1)
});
// If we manually turn-off the server
process.on("SIGINT", () => {
  console.log("SIGINT signal received... Server shutting down..");
  if (server) {
    server.close(() => {
      process.exit(1)
    });
  }
  process.exit(1)
})


// unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected... Server shutting down..", err);
  if (server) {
    server.close(() => {
      process.exit(1)
    });
  }
  process.exit(1)
});

// uncaught rejection
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down..", err);
  if (server) {
    server.close(() => {
      process.exit(1)
    });
  }
  process.exit(1)
});