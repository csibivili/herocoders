import { Type } from '@sinclair/typebox';
import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import {
  ComponentsWithIssuesCountSchema,
  countIssuesWithoutComponentLead,
} from 'services/countIssuesWithoutComponentLead';

const routes: FastifyPluginAsync = async (server) => {
  server.get(
    '/componentsWithoutLead',
    {
      schema: {
        response: {
          200: Type.Object({
            data: Type.Object({
              components: ComponentsWithIssuesCountSchema,
            }),
          }),
        },
      },
    },
    async function (
      request: FastifyRequest<{
        Querystring: { project: string };
      }>,
    ) {
      try {
        const { project } = request.query;
        const result = await countIssuesWithoutComponentLead(project);
        return {
          data: {
            components: result,
          },
        };
      } catch (error) {
        return {
          statusCode: 500,
          error: 'Internal Server Error',
        }
      }
    },
  );
};

export default routes;
