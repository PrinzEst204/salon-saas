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