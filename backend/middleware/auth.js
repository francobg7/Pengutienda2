export const verificarToken = (req, res, next) => {
  // Intentar obtener el token del header
  let token = req.headers.authorization?.split(' ')[1];
  
  // Si no está en el header, intentar obtenerlo de query params
  if (!token) {
      token = req.query.token;
  }

  if (!token) {
      return res.redirect('/login');
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = decoded;
      next();
  } catch (error) {
      return res.redirect('/login');
  }
};