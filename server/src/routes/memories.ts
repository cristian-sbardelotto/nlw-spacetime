import { FastifyInstance } from 'fastify';

import { z } from 'zod';

import { unlink } from 'node:fs';

import { prisma } from '../lib/prisma';

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async request => await request.jwtVerify());

  // Listagem de TODAS memories
  app.get('/memories', async request => {
    const memories = prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return (await memories).map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 120).concat('...'),
        createdAt: memory.createdAt,
      };
    });
  });

  // Listagem de UMA memory
  app.get('/memories/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return response.status(401).send();
    }

    return memory;
  });

  // Criacao de uma memory
  app.post('/memories', async request => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    const memory = prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub,
      },
    });

    return memory;
  });

  // Update de uma memory
  app.put('/memories/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (memory.userId !== request.user.sub) {
      return response.status(401).send();
    }

    memory = await prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    });

    return memory;
  });

  // Deletar uma memory
  app.delete('/memories/:id', async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (memory.userId !== request.user.sub) {
      return response.status(401).send();
    }

    await prisma.memory.delete({
      where: { id },
    });

    const fileNameRegex = /\/([^/?#]+)$/;
    const matchCoverUrlRegex = memory.coverUrl.match(fileNameRegex);

    if (matchCoverUrlRegex) {
      const fileName = matchCoverUrlRegex[1];

      unlink(`uploads/${fileName}`, error => console.error(error));
    }
  });
}
