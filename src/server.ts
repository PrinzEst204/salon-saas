import express, {type Request, type Response} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database'
import dns from 'node:dns';
dns.setServers( ["8.8.8.8", "1.1.1.1"]);
import serviceRoutes from './routes/service.routes';
import salonRoutes from "./routes/salon.routes"

dotenv.config();

const PORT:number = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.json());

app.get("/",(req:Request, res:Response) => {
    res.json({ message: "Salon SaaS API is running"});
});

app.use("/api/services", serviceRoutes);

app.use("/api/salons", salonRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});