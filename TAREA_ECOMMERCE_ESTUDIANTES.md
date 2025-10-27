# 🛒 Tarea Práctica: Desarrollo de Ecommerce con Node.js, React y MySQL

## 📋 Información General

**Asignatura:** Arquitectura de Software  
**Tipo:** Proyecto Individual  
**Duración:** 2 semanas  
**Tecnologías:** Node.js, React.js, MySQL, Express.js  


---

## 🎯 Objetivos de Aprendizaje

Al finalizar esta tarea, los estudiantes serán capaces de:

- ✅ Implementar una arquitectura de 3 capas completa (igual que empleados)
- ✅ Desarrollar APIs RESTful con operaciones CRUD
- ✅ Gestionar estado en aplicaciones React
- ✅ Integrar frontend y backend mediante HTTP/JSON
- ✅ Aplicar los mismos patrones del proyecto de empleados
- ✅ Adaptar el CRUD a un dominio diferente (productos)

---

## 🛍️ Descripción del Proyecto

Desarrollar una **aplicación de gestión de productos** muy similar al proyecto de empleados, pero adaptada para gestionar productos de una tienda. La aplicación debe seguir **exactamente la misma arquitectura** que el proyecto de empleados.

### 🎨 Funcionalidades Requeridas

#### 🛍️ **Gestión de Productos (igual que empleados)**
- Crear, leer, actualizar y eliminar productos
- Cada producto debe tener: nombre, precio, stock, categoria, descripcion
- Validar que todos los campos estén presentes
- Mostrar lista de productos en tabla

#### 🛒 **Carrito de Compras (funcionalidad adicional simple)**
- Agregar productos al carrito (solo cantidad 1)
- Eliminar productos del carrito
- Calcular total del carrito
- Crear orden de compra simple

---

## 🗄️ Diseño de Base de Datos

### 📊 Esquema de Tablas (muy similar a empleados)

```sql
-- Tabla de Productos (igual estructura que empleados)
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla de Órdenes (tabla adicional simple)
CREATE TABLE ordenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10,2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla intermedia simple: Productos por Orden
CREATE TABLE orden_productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES ordenes(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);
```

---

## 🏗️ Estructura del Proyecto (igual que empleados)

### 📁 Backend (server/)
```
server/
├── index.js              # Servidor principal y rutas (igual que empleados)
├── db.js                 # Configuración de MySQL (igual que empleados)
└── package.json
```

### 📁 Frontend (client/)
```
client/
├── src/
│   ├── App.js           # Componente principal (igual estructura que empleados)
│   ├── App.css          # Estilos
│   └── index.js         # Punto de entrada
├── public/
└── package.json
```

---

## 🔌 API Endpoints Requeridos (igual que empleados)

### 🛍️ **Productos (igual que /empleados)**
```
GET    /productos           # Listar todos los productos
POST   /productos           # Crear nuevo producto
PUT    /productos/:id       # Actualizar producto
DELETE /productos/:id       # Eliminar producto
```

### 🛒 **Carrito (endpoints adicionales simples)**
```
POST   /carrito/agregar     # Agregar producto al carrito
DELETE /carrito/:id         # Eliminar del carrito
```

### 💰 **Órdenes (endpoints adicionales simples)**
```
GET    /ordenes             # Listar todas las órdenes
POST   /ordenes             # Crear nueva orden
```

---

## 🎨 Interfaz de Usuario Requerida (igual que empleados)

### 📱 **Página Principal (igual que empleados)**

#### **Gestión de Productos**
- Formulario con campos: nombre, precio, stock, categoria, descripcion
- Lista de productos en tabla con botones Editar/Eliminar
- Validación de campos requeridos (igual que empleados)

#### **Carrito de Compras (funcionalidad adicional)**
- Lista de productos agregados al carrito
- Botón para eliminar productos del carrito
- Cálculo y muestra del total
- Botón "Finalizar Compra" que crea una orden

---

## ✅ Criterios de Evaluación

### 🔧 **Funcionalidad (50 puntos)**
- [ ] CRUD completo de productos (30 pts) - igual que empleados
- [ ] Funcionalidad de carrito (10 pts)
- [ ] Sistema de órdenes básico (10 pts)

### 🏗️ **Arquitectura (30 puntos)**
- [ ] Separación correcta de capas (10 pts)
- [ ] APIs RESTful bien diseñadas (10 pts)
- [ ] Estructura de proyecto organizada (10 pts)

### 💻 **Frontend (20 puntos)**
- [ ] Componentes React bien estructurados (10 pts)
- [ ] Gestión de estado apropiada (10 pts)

---

## 📚 Recursos y Referencias

### 🎥 **Referencia Principal**
- **Proyecto de empleados** - Usar como base exacta
- Tutorial de arquitectura CRUD (ya proporcionado)

### 🛠️ **Herramientas Sugeridas**
- **Postman**: Para probar APIs
- **MySQL Workbench**: Para gestión de base de datos
- **VS Code**: Editor recomendado

---

## 📅 Cronograma Sugerido

### **Semana 1: Backend (igual que empleados)**
- [ ] Copiar estructura del proyecto de empleados
- [ ] Cambiar tabla "empleados" por "productos"
- [ ] Adaptar campos: nombre, precio, stock, categoria, descripcion
- [ ] Implementar endpoints de productos (igual que empleados)
- [ ] Probar endpoints con Postman

### **Semana 2: Frontend + Carrito**
- [ ] Copiar App.js del proyecto de empleados
- [ ] Adaptar campos del formulario
- [ ] Implementar funcionalidad de carrito
- [ ] Conectar frontend con backend
- [ ] Testing final

---

## 🚀 Extensiones Opcionales (Puntos Extra)

### 🔥 **Funcionalidades Adicionales (+5 pts)**
- [ ] Búsqueda de productos por nombre
- [ ] Filtro por categoría
- [ ] Mostrar historial de órdenes

---

## 📝 Entregables

### 📦 **Código Fuente**
- Repositorio Git con commits descriptivos
- README.md con instrucciones de instalación
- Base de datos con datos de prueba

### 🎥 **Demo**
- Video de 3-5 minutos mostrando las funcionalidades
- Explicación de cómo adaptaron el proyecto de empleados

---

## ❓ Preguntas Frecuentes

### **¿Puedo copiar el código del proyecto de empleados?**
Sí, es exactamente lo que se espera. Deben adaptarlo para productos.

### **¿Qué pasa si no termino todas las funcionalidades?**
Se evaluará lo que esté funcional. El CRUD de productos es lo más importante.

### **¿Puedo trabajar en equipo?**
Esta es una tarea individual.

---

## 🎯 Tips para el Éxito

1. **Empieza copiando**: Toma el proyecto de empleados como base
2. **Cambia gradualmente**: Modifica tabla, campos y validaciones
3. **Testa frecuentemente**: Usa Postman para probar tus APIs
4. **Mantén la estructura**: No cambies la arquitectura, solo el dominio

---

**¡Buena suerte con tu proyecto de productos! 🚀**

*Recuerda: La clave está en adaptar exactamente el proyecto de empleados, cambiando solo los campos y agregando funcionalidad de carrito simple.*
