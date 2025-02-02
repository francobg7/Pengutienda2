# Pengutienda2 🐧

Sistema de tienda online con panel de administración, desarrollado con Node.js y Go. El proyecto consta de dos partes principales:
- Panel de Administración (Backend - Node.js)
- Tienda Online (Frontend - Go)

## Características principales

### Panel de Administración (Backend)
- CRUD completo de productos
- Sistema de autenticación con JWT
- Visualización de pedidos
- Motor de plantillas EJS para el renderizado
- Puerto: 4000

### Tienda Online (Frontend)
- Catálogo de productos
- Sistema de pedidos
- Implementado en Go
- Puerto: 8080

## Tecnologías utilizadas

### Backend (Panel de Administración)
- Node.js
- Express
- EJS (Motor de plantillas)
- MongoDB
- JWT para autenticación
- JavaScript

### Frontend (Tienda Online)
- Go
- MongoDB
- HTML5
- Templates Go

## Requisitos previos
- Node.js
- Go
- MongoDB
- Variables de entorno configuradas

## Configuración

1. Clonar el repositorio:
```bash
git clone https://github.com/francobg7/Pengutienda2.git
cd Pengutienda2
```

2. Configurar variables de entorno:
Crear un archivo `.env` en la carpeta backend con:
```
MONGO_URI=tu_url_de_mongodb
JWT_SECRET=tu_secreto_jwt
PORT=4000
CREATE_SUPERUSER=true
```

3. Instalar dependencias del backend:
```bash
cd backend
npm install
```

4. Instalar dependencias del frontend (Go):
```bash
cd ../tienda
go mod download
```

## Ejecución del proyecto

### Backend (Panel de Administración):
```bash
cd backend
npm start
```
El panel de administración estará disponible en: `http://localhost:4000`

### Frontend (Tienda Online):
```bash
cd tienda
go run main.go
```
La tienda online estará disponible en: `http://localhost:8080`

## Estructura del proyecto

### Backend
```
backend/
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── orderController.js
│   └── productController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── public/
├── routes/
│   ├── admin.js
│   ├── order.js
│   └── product.js
└── views/
    ├── dashboard.ejs
    ├── login.ejs
    └── products.ejs
```

### Frontend (Tienda)
```
tienda/
├── controllers/
│   ├── orderController.go
│   └── productController.go
├── models/
│   ├── order.go
│   └── product.go
├── routes/
│   └── routes.go
└── views/
    └── index.html
```

## Características de seguridad
- Autenticación mediante JWT
- Variables de entorno para información sensible
- Middleware de autenticación para rutas protegidas

## Contribución
Las contribuciones son bienvenidas. Para cambios importantes, por favor abre un issue primero para discutir qué te gustaría cambiar.

## Licencia
[MIT](https://choosealicense.com/licenses/mit/)
