import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';

const router = Router();

// HTTP endpoints for products, connected to controller methods.
router.post('/', ProductController.create);
router.get('/', ProductController.list);
router.get('/:id', ProductController.get);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
