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

          const startTime = new Date(appointmentDate);

        const endTime = new Date(startTime.getTime() + service.duration * 60 * 1000);

        const existingAppointments = await Appointment.find({salonId, status:"booked", appointmentDate:
            {$lt: endTime,},
        })

        for (const existingAppointment of existingAppointments) {
            const existingService = await Service.findById(
                existingAppointment.serviceId
            );

            if (!existingService) {
                continue;
            }

            const existingStart = new Date(
                existingAppointment.appointmentDate
            );

            const existingEnd = new Date(
                existingStart.getTime() + 
                existingService.duration * 60 * 1000
            );

            if (startTime < existingEnd && endTime > existingStart ) {
                return res.status(409).json({message: "This time slot is already booked",});
            }
        }


        const appointment = await Appointment.create( { salonId, customerId, serviceId, appointmentDate} );

        res.status(201).json(appointment);
    }catch(error) {
        res.status(500).json( { message: "Failed to create appointment", error});
    }
};

// GET ALL APPOINTMENTS
export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await Appointment.find().populate("customerId").populate("serviceId");
        res.status(200).json({ appointments});
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch appointments", error });
    }
};

// GET APPOINTMENT BY ID
export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const appointmentId = req.params.id;

        const appointment = await Appointment.findById(appointmentId)
            .populate("customerId")
            .populate("serviceId");

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ appointment });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch appointment", error });
    }
};