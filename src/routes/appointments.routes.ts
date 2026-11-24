import { Router } from "express";
import { createAppointment,
      getAppointmentsBySalon,
       getAvailableSlots,
        cancelAppointment,
    rescheduleAppointment  } from "../controllers/appointments.controller";


const router = Router();

router.post("/", createAppointment);

router.get("/salon/:salonId", getAppointmentsBySalon);

router.get("/available-slots", getAvailableSlots);

router.patch("/:appointmentId/cancel", cancelAppointment)//Appointment cancellation route

router.patch("/:appointmentId/reschedule", rescheduleAppointment);//Appointment reschedule route

export default router;