import express, { Application, Request, Response } from 'express';

const app: Application = express();
const { PORT } = process.env;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  '/',
  async (req: Request, res: Response) => res.status(200).send({
    message: 'Hello World!',
  }),
);

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error occured: ${error.message}`);
  } else {
    console.log(error);
  }
}
