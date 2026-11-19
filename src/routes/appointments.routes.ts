import { Router } from "express";
import { createAppointment,  getAppointmentBySalon } from "../controllers/appointments.controller";

const router = Router();

router.post("/", createAppointment);

router.get("/salon/:salonId", getAppointmentBySalon)

export default router;