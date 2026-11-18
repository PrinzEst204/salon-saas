import { Request, Response } from "express";
import { Salon } from "../models/salons.model";

export const createSalon = async ( req: Request, res: Response) => {
    try {
        const salonData = req.body

        const salon = await Salon.create(salonData)

         res.status(201).json(salon);

    }catch (error) {
        res.status(500).json({ message: 'Failed to create salon', error, });
    };
};