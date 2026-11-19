import { Schema, model, Types } from "mongoose";

interface IAppointment {
    salonId: Types.ObjectId;
    customerId: Types.ObjectId;
    serviceId: Types.ObjectId;
    appointmentDate: Date;
    status: "booked" | "completed" | "canceled";
}

const appointmentSchema = new Schema<IAppointment>(
    {
        salonId: {
            type: Schema.Types.ObjectId,
            required: true,
        },

        customerId: {
            type: Schema.Types.ObjectId,
            required: true,
        },

        serviceId: {
            type: Schema.Types.ObjectId,
            required: true,
        },

        appointmentDate: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["booked", "completed", "cancelled"],
            default: "booked",
        },
    },
    {
        timestamps: true,
    }
);

export const Appointment = model<IAppointment>("Appointment",
    appointmentSchema
);