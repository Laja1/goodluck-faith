import express,{Express} from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan'
import {routes }from './routes/route'
import cors from 'cors'


dotenv.config()


const app:Express = express();

app.use(morgan('tiny'))

app.use(
  cors({
    origin: ["http://localhost:5173", "http://exp://192.168.0.170:8081"],
    methods: ["POST", "GET", "PUT", "DELETE"], // Change "method" to "methods"
    credentials: true,
   
  })
);

app.use(express.json())

app.use('/api',routes)

const PORT = process.env.DEVELOPMENT_PORT || 3000

app.get('/', (req, res) => {
  res.send('Welcome to the Food API Service!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
