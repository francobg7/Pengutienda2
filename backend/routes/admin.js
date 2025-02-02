import express from 'express';
import { verificarToken, verificarAdmin } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import {
  getAllProducts,
  createProduct,
  editProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

// Rutas públicas
router.get('/login', (req, res) => res.render('login'));
router.post('/login', login);
router.get('/admin/products', getAllProducts);

// Rutas protegidas de admin
router.get('/admin/dashboard', verificarToken, verificarAdmin, (req, res) => {
  res.render('dashboard', { user: req.usuario });
});

router.get('/products', getAllProducts);
router.get('/products/create', (req, res) => {
  res.render('crear');
});
router.post('/products/create', createProduct);
router.get('/products/descripcion', getAllProducts);
router.post('/products/edit/:id', editProduct);
router.post('/products/delete/:id', deleteProduct);

// Ruta de órdenes
router.post('/orders', createOrder);

export default router;