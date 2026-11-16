import { Request, Response } from 'express'
import { Service } from "../models/model"


export const createService = async (req: Request, res: Response) => {
    try {
        const serviceData = req.body;

        const service = await Service.create(serviceData);

        res.status(201).json(service);

    } catch (error) {
        res.status(500).json({ message: 'Failed to create service', error, });
    };
};
