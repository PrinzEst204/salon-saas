import { Router} from 'express';
import { createService, getServicesBySalon } from '../controllers/services.controller';

const router = Router();

router.post('/', createService);

router.get('/salon/:salonId', getServicesBySalon);

export default router;

