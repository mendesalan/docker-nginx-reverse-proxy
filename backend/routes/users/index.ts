import { FastifyPluginAsync } from "fastify";

const bodySchema = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 2 },
    lastName: { type: "string", minLength: 2 },
    age: { type: "string", minLength: 1 },
  },
  required: ["firstName", "lastName", "age"],
};

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const users = await fastify.prisma.user.findMany();

    return [users];
  });

  fastify.get("/:userId", async function (request, reply) {
    const { userId }: any = request.params;
    console.log("=============================> ", userId);

    const users = await fastify.prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    return [users];
  });

  fastify.post(
    "/",
    {
      schema: {
        body: bodySchema,
      },
    },
    async function handler(request, reply) {
      const { firstName, lastName, age }: any = request.body;
      const validateRequest = request.validateInput(request.body, bodySchema);
      if (validateRequest) {
        console.log("=============================> ", validateRequest);
        const result = await fastify.prisma.user.create({
          data: {
            firstName,
            lastName,
            age,
          },
        });

        return result;
      }
    }
  );
};

export default users;
