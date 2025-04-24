import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db';
import router from './src/routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:19006', 'http://localhost:3000'], // include all dev frontends
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

connectDB(); // Connect to MongoDB

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/redeem', router); // Use the auth routes

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});