import { Request, Response } from "express";
import { Appointment } from "../models/appointments.model";
import { Service } from "../models/services.model";
import { Customer } from "../models/customers.model";

export const createAppointment = async ( req: Request, res: Response ) => {
    try{

        const { salonId, customerId, serviceId, appointmentDate } = req.body;

        if ( !salonId || !customerId || !serviceId || !appointmentDate ) {
            return res.status(400).json({ message: "salonId, customerId, serviceId and appointmentDate are required"});
        }

        const customer = await Customer.findById(customerId);

        const service = await Service.findById(serviceId);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found"});
        }

        if (!service) {
            return res.status(404).json({ message: "Service not found"});
        }

        if (customer.salonId.toString() !== salonId ) {
            return res.status(400).json({message: " Customer does not belong to this salon"});
        }

        if (service.salonId.toString() !== salonId ) {
            return res.status(400).json({message: "Service does not belong to this salon",});
        }

        const appointment = await Appointment.create( { salonId, customerId, serviceId, appointmentDate} );

        res.status(201).json(appointment);
    }catch(error) {
        res.status(500).json( { message: "Failed to create appointment", error});
    }
};

export const getAppointmentBySalon = async ( req: Request, res: Response ) => {
    try {
        const { salonId } = req.params;

        const appointments = await Appointment.find( { salonId });

        res.status(200).json(appointments);
    }catch(error) {
        res.status(500).json({ message: "Failed to fetch appointments", error});
    }
};