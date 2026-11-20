import { Router } from "express";
import { createAppointment } from "../controllers/appointments.controller";
import { getAppointments, getAppointmentById } from "../controllers/appointments.controller";

const router = Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);

export default router;

