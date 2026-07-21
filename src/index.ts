import "dotenv/config";
import mongoose from "mongoose";

import app from "./app";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      PORT: string;
      SECRET_KEY: string;
    }
  }
}

const requiredEnvVars = ["MONGODB_URI", "SECRET_KEY"] as const;
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database ok"))
  .catch((error) => {
    console.log("Database error", error);
  });

app.listen(process.env.PORT || 5555, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server OK");
});
