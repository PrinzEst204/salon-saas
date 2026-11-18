import { Router } from "express";
import { createSalon } from "../controllers/salons.controller";

const router = Router();

router.post("/", createSalon);

export default router;