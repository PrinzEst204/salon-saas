import { Router } from "express";
import { 
    createCustomer, 
    getCustomersBySalon, 
    getCustomerById,
    updateCustomer  } from "../controllers/customers.controller"

const router = Router()

router.post("/", createCustomer);

router.get("/salon/:salonId", getCustomersBySalon)

router.get("/:customerId", getCustomerById );

router.patch("/:customerId", updateCustomer);

export default router;