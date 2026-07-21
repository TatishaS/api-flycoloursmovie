import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { setupDocs } from "./utils/documentation";

import authRoutes from "./routes/authRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import activityRoutes from "./routes/activityRoutes";
import userRoutes from "./routes/userRoutes";
import uploadRoutes from "./routes/uploadRoutes";

const app = express();

// For Onrender , so express-rate-limit reads the real client IP from X-Forwarded-For instead of the proxy's IP.
app.set("trust proxy", 1);

app.use(express.json());
app.use(cors());
app.use(helmet());
setupDocs(app);

app.use("/uploads", express.static("uploads"));

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Basic route to check if the api is running
 *     responses:
 *       200:
 *         description: Server is up and running.
 */

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to FlyColoursMovie REST API!");
});

app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/activities", activityRoutes);
app.use("/users", userRoutes);
app.use("/upload", uploadRoutes);

export default app;
