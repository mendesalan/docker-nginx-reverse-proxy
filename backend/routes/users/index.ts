import { FastifyPluginAsync } from "fastify";

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const users = await fastify.prisma.user.findMany();
    console.log("====================>  ", users);
    return [users];
  });
};

export default users;
