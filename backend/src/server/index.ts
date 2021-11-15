import app from './app';

const { PORT } = process.env;

const server = app.listen(PORT, (): void => {
  console.log(`Connected successfully on port ${PORT}`);
});

export default server;
