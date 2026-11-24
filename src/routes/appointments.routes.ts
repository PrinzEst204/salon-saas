import { Router } from "express";
import { createAppointment,  getAppointmentsBySalon, getAvailableSlots, cancelAppointment } from "../controllers/appointments.controller";


const router = Router();

router.post("/", createAppointment);

router.get("/salon/:salonId", getAppointmentsBySalon);

router.get("/available-slots", getAvailableSlots);

router.patch("/:appointmentId/cancel", cancelAppointment)//Appointment cancellation route

export default router;