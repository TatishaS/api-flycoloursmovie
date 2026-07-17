import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Application } from "express";

/**
 * Setup Swagger documentation
 * @param app
 */

export function setupDocs(app: Application) {
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "api-cinemate",
      version: "1.0.0",
      description: "API for cinema booking service",
    },
    servers: [
      {
        url: "http://localhost:5555",
        description: "Local development server",
      },
      {
        url: "https://api-flycoloursmovie.onrender.com",
        description: "Remote development server",
      },
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "token",
        },
      },
      schemas: {
        Booking: {
          type: "object",
          properties: {
            user: { $ref: "#/components/schemas/User" },
            seats: {
              type: "array",
              items: {
                type: "string",
              },
            },
            activity: { $ref: "#/components/schemas/Activity" },
            activityDate: { type: "string" },
            reservationNumber: { type: "string" },
          },
        },
        Activity: {
          type: "object",
          properties: {
            user: { $ref: "#/components/schemas/User" },
            type: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            imageUrl: { type: "string" },
            originalLanguage: { type: "string" },
            subtitlesLanguage: { type: "string" },
            date: { type: "string" },
            time: { type: "string" },
            price: { type: "number" },
            duration: { type: "number" },
            occupiedSeats: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            fullname: { type: "string" },
            email: { type: "string" },
            passwordHash: { type: "string" },
            group: { type: "string" },
            role: { type: "string" },
            bookings: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Booking",
              },
            },
          },
        },
      },
    },
  };

  const options = {
    swaggerDefinition,
    apis: ["**/*.ts"],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
