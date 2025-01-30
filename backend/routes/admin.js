import express from 'express';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';
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
router.get('/public/products', getAllProducts);

// Rutas protegidas de admin
router.get('/admin/dashboard', verificarToken, verificarAdmin, (req, res) => {
  res.render('dashboard', { user: req.usuario });
});

router.get('/products', verificarToken, verificarAdmin, getAllProducts);
router.get('/products/create', verificarToken, verificarAdmin, (req, res) => {
  res.render('crear');
});
router.post('/products/create', verificarToken, verificarAdmin, createProduct);
router.get('/products/descripcion', verificarToken, verificarAdmin, getAllProducts);
router.post('/products/edit/:id', verificarToken, verificarAdmin, editProduct);
router.post('/products/delete/:id', verificarToken, verificarAdmin, deleteProduct);

// Ruta de órdenes
router.post('/orders', verificarToken, createOrder);

export default router;