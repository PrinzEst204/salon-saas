import { Request, Response } from "express";
import { Customer } from "../models/customers.model";

export const createCustomer = async ( req: Request, res: Response ) => {
    try {
        const customerData = req.body;

        const customer = await Customer.create(customerData);

        res.status(201).json(customer);
    }catch(error) {
        res.status(500).json({ message: "Failed to create customer", error});
    }
};

//Get customers by Salon(Get all customers belonging to a specific salon)
export const getCustomersBySalon = async (req: Request, res: Response) => {
    try {
        const { salonId } = req.params;//gives us the salonId
        const customers = await Customer.find({ salonId });//asks mongoDb, give me every customer belonging to this salon

        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch customers", error });
    }
};