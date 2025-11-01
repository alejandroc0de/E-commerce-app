# E-Commerce App

Aplicación web de comercio electrónico que permite gestionar productos y realizar compras mediante un carrito dinámico. El sistema integra un frontend en HTML/CSS/JS, un servidor en Node.js y una base de datos PostgreSQL.

---

## Características

### Gestión de Productos
- Ver listado de productos disponibles.
- Agregar nuevos productos.
- Editar nombre, categoría, precio y stock mediante un formulario modal.
- Eliminar productos del inventario.

### Carrito de Compras
- Agregar productos al carrito desde la lista principal.
- Incrementar y reducir cantidades dentro del carrito.
- Cálculo automático del total de la compra.
- Carrito visual en barra lateral deslizante.

### Órdenes de Compra
- Se genera una orden guardada en la base de datos.
- Cada producto comprado se registra en la tabla `orden_productos` con su cantidad asociada.
- El carrito se vacía al finalizar la compra.

---

## Tecnologías Utilizadas

| Área | Tecnología |
|------|------------|
| Lenguaje Backend | Node.js |
| Framework | Express |
| Base de Datos | PostgreSQL |
| Frontend | HTML, CSS, JavaScript |
| Control de Versiones | Git / GitHub |

---


## DB

---

## Base de Datos

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE ordenes (
    id SERIAL PRIMARY KEY,
    total DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orden_productos (
    id SERIAL PRIMARY KEY,
    orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES ordenes(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

## Config. DB
const pool = new Pool({
  user: 'TU_USUARIO',
  password: 'TU_PASSWORD',
  host: 'localhost',
  port: 5432,
  database: 'TU_BASE'
});

