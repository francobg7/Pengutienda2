import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.redirect('/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.redirect('/login');
  }
};

export const verificarAdmin = (req, res, next) => {
  if (req.usuario.role !== 'admin') {
    return res.redirect('/login');
  }
  next();
};