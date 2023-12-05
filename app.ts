import "dotenv/config";
import express, { Application } from 'express';
import routes from './routes';
import useMiddleware from './middleware';
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;

// Use middleware
useMiddleware(app);

// Use routes
app.use(routes);

// Use error handler middleware
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});