import { FastifyPluginAsync } from "fastify";
require("dotenv").config();

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const key = process.env.KEY;
    console.log(process.env.KEY);

    const moo: any = fastify.someSupport();
    return [`this is an example, here is the key!: ${key} and ${moo}`];
  });
};

export default example;
