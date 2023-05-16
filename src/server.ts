import fastify from 'fastify';

const app = fastify();

const port = 3333;

app.get('/hello', () => {
  return 'hello world!';
});

app
  .listen({ port })
  .then(() => console.log(`🚀 Server running on http://localhost:${port}`));
