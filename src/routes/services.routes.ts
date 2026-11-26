import { Router} from 'express';
import { createService, getServicesBySalon, updateService, deleteService } from '../controllers/services.controller';

const router = Router();

router.post('/', createService);

router.get('/salon/:salonId', getServicesBySalon);

router.patch('/:serviceId', updateService);

router.delete('/:serviceId', deleteService);

export default router;

