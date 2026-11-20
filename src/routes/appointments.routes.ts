import { Router } from "express";
import { createAppointment,  getAppointmentBySalon, getAvailableSlots } from "../controllers/appointments.controller";

const router = Router();

router.post("/", createAppointment);

router.get("/salon/:salonId", getAppointmentBySalon)

router.get("/available-slots", getAvailableSlots);

export default router;