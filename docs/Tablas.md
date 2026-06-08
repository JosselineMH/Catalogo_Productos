# Desglose de Tablas

# Tablas

- Producto
- Categoria
- Producto_Categoria
- Rol
- Usuario

## Producto

| id_producto |
| --- |
| codigo |
| nombre |
| descripcion |
| precio |
| create_at |
| update_at |

## Categoria

| id_categoria |
| --- |
| nombre |
| descripcion |
| create_at |
| update_at |

## Producto_Categoria

| id_producto |
| --- |
| id_categoria |

# Rol

| id_rol |
| --- |
| nombre |
| create_at |
| update_at |

## Usuario

| id_usuario |
| --- |
| correo_electronico |
| contrasena |
| id_rol |
| create_at |
| update_at |


# Diagrama ER
![Modelo_ER.drawio](./Img/Diagrama_ER.drawio.png)