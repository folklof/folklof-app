import "dotenv/config";
import express, { Application } from 'express';
import routes from './routes';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});