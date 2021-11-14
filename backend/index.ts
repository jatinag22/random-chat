import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = 4000;

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
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error occured: ${error.message}`);
  } else {
    console.log(error);
  }
}
