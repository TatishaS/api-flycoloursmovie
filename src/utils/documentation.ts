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
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
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
            _id: { type: "string" },
            fullname: { type: "string" },
            email: { type: "string" },
            group: { type: "string" },
            role: { type: "string", enum: ["all_users", "admin"] },
            bookings: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Booking",
              },
            },
            createdAt: { type: "string" },
            updatedAt: { type: "string" },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["fullname", "email", "password"],
          properties: {
            fullname: { type: "string", minLength: 2 },
            email: { type: "string", format: "email" },
            password: {
              type: "string",
              minLength: 8,
              maxLength: 20,
              description:
                "Must contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
            },
            group: { type: "string", minLength: 2, maxLength: 10 },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 8 },
          },
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            fullname: { type: "string" },
            email: { type: "string", format: "email" },
            group: { type: "string" },
          },
        },
        CreateActivityRequest: {
          type: "object",
          required: ["type", "title", "description", "imageUrl", "date", "time"],
          properties: {
            type: { type: "string" },
            title: { type: "string", minLength: 2 },
            description: { type: "string", minLength: 10, maxLength: 350 },
            imageUrl: { type: "string", format: "uri" },
            originalLanguage: { type: "string" },
            subtitlesLanguage: { type: "string" },
            date: { type: "string", format: "date" },
            time: { type: "string" },
            free: { type: "boolean" },
            price: { type: "number" },
            duration: { type: "number" },
          },
        },
        UpdateActivityRequest: {
          type: "object",
          properties: {
            type: { type: "string" },
            title: { type: "string", minLength: 2 },
            description: { type: "string", minLength: 10, maxLength: 350 },
            imageUrl: { type: "string", format: "uri" },
            originalLanguage: { type: "string" },
            subtitlesLanguage: { type: "string" },
            date: { type: "string", format: "date" },
            time: { type: "string" },
            free: { type: "boolean" },
            price: { type: "number" },
            duration: { type: "number" },
            occupiedSeats: { type: "array", items: { type: "string" } },
          },
        },
        CreateBookingRequest: {
          type: "object",
          required: ["seats", "activity", "activityDate"],
          properties: {
            seats: { type: "array", items: { type: "string" }, minItems: 1 },
            activity: { type: "string", description: "Activity id" },
            activityDate: { type: "string", format: "date" },
          },
        },
        UpdateBookingRequest: {
          type: "object",
          properties: {
            seats: { type: "array", items: { type: "string" } },
            activity: { type: "string", description: "Activity id" },
            activityDate: { type: "string", format: "date" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
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
