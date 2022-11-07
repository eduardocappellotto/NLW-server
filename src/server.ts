import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

import jwt from "@fastify/jwt";

import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: "nlwcopa",
  });

  fastify.register(gameRoutes);
  fastify.register(guessRoutes);
  fastify.register(poolRoutes);
  fastify.register(userRoutes);
  fastify.register(authRoutes);

  await fastify.listen({ port: 3333 /*host: "0.0.0.0"*/ });
}
bootstrap();
