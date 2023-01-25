import { FastifyPluginAsync } from "fastify";
require("dotenv").config();

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const key = process.env.KEY;
    console.log(process.env.KEY);
    return `: this is an example, here is the key!: ${key}`;
  });
};

export default example;
