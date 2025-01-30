import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await User.findOne({ username });

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id, username: usuario.username, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

  // Si el usuario es admin, renderizar dashboard
    if (usuario.role === 'admin') {
      return res.render('dashboard', { 
        user: { username: usuario.username, role: usuario.role }, 
        token 
    });
  }
    res.status(403).json({ mensaje: 'Acceso no autorizado' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

export const verificarAdmin = (req, res, next) => {
  if (req.usuario.role !== 'admin') {
    return res.status(403).json({ mensaje: 'Requiere rol de administrador' });
  }
  next();
};