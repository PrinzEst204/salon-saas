import { Request, Response } from "express";
import { Appointment } from "../models/appointments.model";

export const createAppointment = async ( req: Request, res: Response ) => {
    try{
        const appointmentData = req.body;

        const appointment = await Appointment.create(appointmentData);

        res.status(201).json(appointment);
    }catch(error) {
        res.status(500).json( { message: "Failed to create appointment", error});
    }
};