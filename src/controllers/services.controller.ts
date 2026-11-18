import { Request, Response } from 'express'
import { Service } from "../models/services.model"


export const createService = async (req: Request, res: Response) => {
    try {
        const serviceData = req.body;

        const service = await Service.create(serviceData);

        res.status(201).json(service);

    } catch (error) {
        res.status(500).json({ message: 'Failed to create service', error, });
    };
};

export const getServicesBySalon = async ( req: Request, res: Response ) => {
    try {
        const { salonId } = req.params;

        const services = await Service.find({ salonId });

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch services", error,})
    }
}