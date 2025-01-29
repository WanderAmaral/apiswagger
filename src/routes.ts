import z from "zod";
import { FastifytypedInstance } from "./types";
import { randomUUID } from "node:crypto";

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

export async function routes(app: FastifytypedInstance) {
  app.get(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "List users",
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
            })
          ),
        },
      },
    },
    () => {
      return users;
    }
  );

  app.get(
    "/user/:id", // Rota com parâmetro de ID
    {
      schema: {
        tags: ["user"],
        description: "Get user by id",
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params; 
  
      const user = users.find((user) => user.id === id);
  
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }
  
      return reply.status(200).send(user);
    }
  );

  app.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.null().describe("User created"),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;

      users.push({
        id: randomUUID(),
        name,
        email,
      });

      return reply.status(201).send();
    }
  );
  app.delete(
    "/user",
    {
      schema: {
        tags: ["users"],
        description: "delete user by id",
        body: z.object({
          id: z.string(),
        }),
        response: {
          201: z.null().describe("User deleted"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.body;

      const index = users.findIndex((user) => user.id === id);
      if (index === -1) {
        return reply.status(404).send();
      }

      users.splice(index, 1);
      return reply.status(200).send();
    }
  );
}
