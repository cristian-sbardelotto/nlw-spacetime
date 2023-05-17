import fastify from 'fastify';

import { memoriesRoutes } from './routes/memories';

const app = fastify();
const port = 3333;

app.register(memoriesRoutes);

app
  .listen({ port })
  .then(() => console.log(`🚀 Server running on http://localhost:${port}`));
