import 'dotenv/config';

import fastify from 'fastify';

import cors from '@fastify/cors';

import { memoriesRoutes } from './routes/memories';
import { authRoutes } from './routes/auth';

const app = fastify();
const port = 3333;

app.register(cors, {
  origin: true,
});
app.register(memoriesRoutes);
app.register(authRoutes);

app
  .listen({ port })
  .then(() => console.log(`🚀 Server running on http://localhost:${port}`));
