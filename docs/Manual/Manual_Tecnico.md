# Manual Técnico

## Sistema de Gestión de Catálogo de Productos

Aplicación web para administrar un cátalogo de productos y sus categorías.

## Tecnologías Utilizadas

### Backend
- Node.js
- NestJS 
- TypeScript
- TypeORM 
- PostgreSQL
- NeonDB

### Frontend
- React
- TypeScript
- Vite
- SweetAlert2

## Requisitos

Para poder ejecutar el proyecto es necesario

- Node.js 20.19 o superior
- pnpm
- Base de datos PostgreSQL
- Credenciales de conexión a NeonDB

## Config Backend

Instalar dependencias

```
pnpm install
```

Crear archivo .env usando como referencia .env.example de la carpeta backend

```
DATABASE_URL="url_database"
CORS_ORIGIN = "url_frontend"
```
Iniciar el servidor 

```
pnpm run start:dev
```

API disponible en:
```
http://localhost:3000
```

## Config Frontend

Instalar dependencias
```
pnpm install
```

Iniciar Aplicación

```
pnpm run dev
```

Frontend disponible en:
```
http://localhost:5173
```

## Modelo de datos

Entidades del sistema

* Producto: información del producto
* Categoria: clasificación de los productos
* Producto_Categoria: relación entre producto y categorías
* Usuario: credenciales de acceso
* Rol: rol asigando a los usuarios

## Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/login` | Iniciar sesión |
| GET | `/categorias` | Listar categorías |
| POST | `/categorias` | Registrar categoría |
| PATCH | `/categorias/:id` | Modificar categoría de forma parcial |
| GET | `/productos` | Listar productos |
| GET | `/productos/:id` | Consultar producto |
| GET | `/productos/buscar?nombre=` | Buscar productos relacionados a un nombre |
| POST | `/productos` | Registrar producto |
| PUT | `/productos/:id` | Modificar producto |
| DELETE | `/productos/:id` | Eliminar producto |
| POST | `/usuarios` | Registrar usuario |

## Formato de registro de producto

```json
{
  "codigo": "FTZ-DS-002",
  "nombre": "Fertilizante 500ML",
  "descripcion": "Prueba producto con varias categorías",
  "precio": 120.00,
  "categoriasIds": [
    "77afc03d-0e6d-41e1-a406-f9c1e993b396",
    "3ab41956-4a97-4436-9f53-c03b286dd3b2"
  ]
}
```

## Validaciones y manejo de errores

La API utiliza DTO y class-validator para validar:

- Campos obligatorios.
- Correos electrónicos válidos.
- Precios numéricos y positivos.
- Identificadores UUID.
- Códigos de producto únicos.
- Nombres de categoría únicos.
- Existencia de productos, categorías y roles.
