import { Request, Response } from "express";
import { Appointment } from "../models/appointments.model";
import { Customer } from "../models/customers.model";
import { Service } from "../models/services.model";
import { Salon } from "../models/salons.model";

export const createAppointment = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      salonId,
      customerId,
      serviceId,
      appointmentDate,
    } = req.body;

    if (
      !salonId ||
      !customerId ||
      !serviceId ||
      !appointmentDate
    ) {
      return res.status(400).json({
        message:
          "salonId, customerId, serviceId and appointmentDate are required",
      });
    }

    //preventing invalid booking(Knowing if the appointment is within the salon's working hours)
    const salon = await Salon.findById(salonId);

    if (!salon) {
      return res.status(404).json({
        message: "Salon not found",
      });
    }

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    if (customer.salonId.toString() !== salonId) {
      return res.status(400).json({
        message: "Customer does not belong to this salon",
      });
    }

    if (service.salonId.toString() !== salonId) {
      return res.status(400).json({
        message: "Service does not belong to this salon",
      });
    }

    const startTime = new Date(appointmentDate);

    const endTime = new Date(
      startTime.getTime() + service.duration * 60 * 1000
    );

    //calculates the end time of the appointment
    const [openingHour, openingMinute] = salon.openingTime
.split(":").map(Number);

    const [closingHour, closingMinute] = salon.closingTime
.split(":").map(Number);

//Creating the opening and closing date objects
const salonOpening = new Date(startTime);

salonOpening.setUTCHours(
  openingHour - 1,
  openingMinute, 0, 0
);

const salonClosing = new Date(startTime);

salonClosing.setUTCHours(
  closingHour - 1,
  closingMinute, 0, 0
);

//Business hours check
if (startTime < salonOpening || endTime > salonClosing) {
  return res.status(400).json({message: "Appointment is outside salon working"})
}


    const existingAppointments = await Appointment.find({
      salonId,
      status: "booked",
      appointmentDate: {
        $lt: endTime,
      },
    });

    for (const existingAppointment of existingAppointments) {
      if (!existingAppointment.serviceId) {
        continue;
      }

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

      if (
        startTime < existingEnd &&
        endTime > existingStart
      ) {
        return res.status(409).json({
          message: "This time slot is already booked",
        });
      }
    }

    const appointment = await Appointment.create({
      salonId,
      customerId,
      serviceId,
      appointmentDate,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create appointment",
      error,
    });
  }
};

export const getAppointmentsBySalon = async (
  req: Request,
  res: Response
) => {
  try {
    const { salonId } = req.params;

    const appointments = await Appointment.find({
      salonId,
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments",
      error,
    });
  }
};

export const getAvailableSlots = async (
  req: Request,
  res: Response
) => {
  try {
    const { salonId, serviceId, date } = req.query;

    if (!salonId || !serviceId || !date) {
      return res.status(400).json({
        message: "salonId, serviceId and date are required",
      });
    }

    const salon = await Salon.findById(salonId);

    if (!salon) {
      return res.status(404).json({
        message: "Salon not found",
      });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found",});
    }

    if (service.salonId.toString() !== salonId ) {
      return res.status(400).json({ message: "Service does not belong tp this salon",});
    };


    const requestedDate = new Date(date as string);

    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date",});
    }


  //day start algorithm
    const [openingHour, openingMinute] = salon.openingTime.split(":").map(Number);

    const dayStart = new Date(requestedDate);

    //Explict construct to nigerian time zone (UTC+1) to avoid 
    // time zone issues when comparing with appointment times in the database
    dayStart.setUTCHours(openingHour - 1, openingMinute, 0, 0)

  //day end algorithm

    const [closingHour, closingMinute] = salon.closingTime.split(":").map(Number);

    const dayEnd = new Date(requestedDate);

        //Explict construct to nigerian time zone (UTC+1) to avoid 
    // time zone issues when comparing with appointment times in the database
    dayEnd.setUTCHours(closingHour - 1, closingMinute, 0, 0);

    //existing appointments

     //Service duration in minutes
    const serviceDuration = service.duration;

    //Service duration in milliseconds
    const serviceDurationMs = serviceDuration * 60 * 1000;


    //Knowing which times are already booked/occupied
    const existingAppointments = await Appointment.find({
      salonId,
      status: "booked",
      appointmentDate: {
        $gte: dayStart,//Get appointments at or after 09:00
        $lt: dayEnd,//Get appointments before 18:00
      },
    });

    //candidate slot(generating possible booking times)
    let currentSlot = new Date(dayStart);//We use let because the value needs to change


    //generate time slots(creating an empty array that will eventually contain all the times customers can book)
    const availableSlots: Date[] = [];

    //slots loop
    while (
      currentSlot.getTime() + serviceDurationMs <= dayEnd.getTime()
    ) {
      let isBooked = false;

      //Calculating when every appointment starts and end
      for (const appointment of existingAppointments) {

        const appointmentStart = new Date(
          appointment.appointmentDate
        );
        const appointmentEnd = new Date(
          appointmentStart.getTime() + serviceDurationMs
        );

        //Checking whether current slot overlaps with existing appointments
        if (
          currentSlot < appointmentEnd && currentSlot.getTime() + 
          serviceDurationMs > appointmentStart.getTime()
        ) {
          isBooked = true;
          break;
        }  
      }

      if (!isBooked) {
        availableSlots.push(new Date(currentSlot));
      }
      currentSlot = new Date(currentSlot.getTime() + 
       serviceDurationMs);
    }

    res.status(200).json({
     date, serviceDuration, availableSlots,
    });
  }  catch (error) {
       console.error("AVAILABLE SLOTS ERROR:", error);
       
    res.status(500).json({
      message: "Failed to get available slots",
      error,
    });
  }
};