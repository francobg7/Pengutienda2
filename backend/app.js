import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import adminRoutes from './routes/admin.js';
import orderRoutes from './routes/order.js';
import productRoutes from './routes/product.js';
import User from './models/User.js';


dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la aplicación
app.use('/', adminRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);  // ✅ Asegura que /products funcione correctamente

// Ruta raíz
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).render('error', { 
        message: 'Página no encontrada'
    });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        message: 'Error interno del servidor'
    });
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
        initializeSuperuser();
    })
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Crear superusuario
async function initializeSuperuser() {
    try {
        const existingUser = await User.findOne({ username: 'Paula' });
        
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash('123456789', 10);
            await User.create({
                username: 'Paula',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Superusuario Paula creado exitosamente');
        }
    } catch (err) {
        console.error('Error al inicializar superusuario:', err);
    }
}

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
    console.error('Error no manejado:', err);
});
