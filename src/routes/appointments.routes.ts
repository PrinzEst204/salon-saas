import { Router } from "express";
import { createAppointment,  getAppointmentsBySalon, getAvailableSlots } from "../controllers/appointments.controller";


const router = Router();

router.post("/", createAppointment);

router.get("/salon/:salonId", getAppointmentsBySalon);

router.get("/available-slots", getAvailableSlots);

export default router;