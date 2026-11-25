import { Router } from "express";
import { createCustomer, getCustomersBySalon } from "../controllers/customers.controller"

const router = Router()

router.post("/", createCustomer);

router.get("/salon/:salonId", getCustomersBySalon)

export default router;