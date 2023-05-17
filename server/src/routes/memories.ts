import { FastifyInstance } from 'fastify';

import { z } from 'zod';

import { prisma } from '../lib/prisma';
import { request } from 'http';

export async function memoriesRoutes(app: FastifyInstance) {
  // Listagem de TODAS memories
  app.get('/memories', async () => {
    const memories = prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return (await memories).map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 120).concat('...'),
      };
    });
  });

  // Listagem de UMA memory
  app.get('/memories/:id', async request => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id },
    });

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
        userId: 'd4a6a346-6d01-47b5-ab9e-2bd4af2550de',
      },
    });

    return memory;
  });

  // Update de uma memory
  app.put('/memories/:id', async request => {
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

    const memory = await prisma.memory.update({
      where: { id },
      data: {
        content,
        coverUrl,
        isPublic,
      } 
    })

    return memory;
  });

  // Deletar uma memory
  app.delete('/memories/:id', async request => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.memory.delete({
      where: { id },
    });
  });
}
