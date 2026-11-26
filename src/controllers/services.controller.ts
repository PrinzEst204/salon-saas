import { Request, Response } from 'express'
import { Service } from "../models/services.model"


//Create Service
export const createService = async (req: Request, res: Response) => {
    try {
        const serviceData = req.body;

        const service = await Service.create(serviceData);

        res.status(201).json(service);

    } catch (error) {
        res.status(500).json({ message: 'Failed to create service', error, });
    };
};

//Get Service By The Salon Id
export const getServicesBySalon = async ( req: Request, res: Response ) => {
    try {
        const { salonId } = req.params;

        const services = await Service.find({ salonId });

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch services", error,})
    }
}

//Update Service
export const updateService = async (req: Request, res: Response) => {
    try {
        const { serviceId } = req.params;

        if (
            req.body.name === "" ||
            req.body.price === "" ||
            req.body.duration === "" ||
            req.body.category === ""
        ) {
            return res.status(400).json({message: "Service fields cannot be empty",})
        }

        const service = await Service.findByIdAndUpdate(
            serviceId,
            req.body,
            {
                new: true,
                runValidators: true,//Makes mongoose enforce the rules we defined in the service schema
            }
        );
        if (!service) {
            return res.status(404).json({message: "Service not found"});
        }
        res.status(200).json(service)

    } catch(error) {
        res.status(500).json({message: "Failed to update service", error});
    }
};

//Delete Service
export const deleteService = async (req: Request, res: Response) => {
    try {
        const { serviceId } = req.params;

        const service = await Service.findByIdAndDelete(serviceId);

        if (!serviceId) {
            return res.status(404).json({message: "Service not found"});
        }
        res.status(200).json({message: "Service deleted successfully",});

    } catch(error) {
        res.status(500).json({message: "Failed to delete service", error});
    }
};