import express, {type Request, type Response} from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './config/database'
import dns from 'node:dns';
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import serviceRoutes from './routes/services.routes';
import salonRoutes from "./routes/salons.routes"
import customerRoutes from "./routes/customers.routes";
import appointmentRoutes from "./routes/appointments.routes";

dotenv.config();

const PORT:number = Number(process.env.PORT) || 3000;

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
})
);

app.use(express.json());

app.get("/",(req:Request, res:Response) => {
    res.json({ message: "Salon SaaS API is running"});
});

app.use("/api/salons", salonRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/appointments", appointmentRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
});