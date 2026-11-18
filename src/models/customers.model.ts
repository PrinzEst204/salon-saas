import { Schema, model, Types } from "mongoose"

interface ICustomer {
    salonId: Types.ObjectId;
    name: string;
    phone: string;
    email?: string;
}

const customerSchema = new Schema<ICustomer>({
    salonId: {
        type: Schema.Types.ObjectId,
        required: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
    },
},
{
    timestamps: true,
},
);

export const Customer = model<ICustomer>("Customer", customerSchema);