import { Router } from "express";
import { 
    createCustomer, 
    getCustomersBySalon, 
    getCustomerById,
    updateCustomer,
    deleteCustomer  } from "../controllers/customers.controller"

const router = Router()

router.post("/", createCustomer);

router.get("/salon/:salonId", getCustomersBySalon)

router.get("/:customerId", getCustomerById );

router.patch("/:customerId", updateCustomer);

router.delete("/:customerId", deleteCustomer)

export default router;