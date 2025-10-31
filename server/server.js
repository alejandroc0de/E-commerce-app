const express = require('express');
const cors = require('cors');
const path = require('path')
const db = require('./db');
const { pool } = require('./db');
const { error } = require('console');
const app = express();
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.use(express.static(path.join(__dirname, '../client')));




// Obteniendo los productos en POSTGRES

app.get('/productos', async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM productos')
        res.json(result.rows)
    }catch(err){
        console.log(err)
        res.status(500).json({error : 'Error al obtener los productos de la base de datos'})
    }
});

app.get('/getProduct/:id', async (req,res) => {
    try{
        const id = req.params.id; // Extrae id 
        const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        res.json({datos: result.rows[0]})
    }catch(err){
        res.status(500).json({error: "Error al traer los datos de la base de datos"})
        console.log(err)
    }
})

app.delete('/borrarProducto/:id', async (req,res) => {
    try{
        const id = req.params.id; // se extrae el id 
        await pool.query('DELETE FROM productos WHERE id = $1', [id]);
        res.json ({mensaje: 'Producto eliminado correctamente'})
    }catch(err){
        console.log(err)
        res.status(500).json({error: "Error al eliminar el producto"})
    }
})

app.post('/nuevoProducto', async (req,res) => {
    try{
        const {nombre,categoria,precio,stock} = req.body
        await pool.query('INSERT INTO productos (nombre, categoria, precio, stock) VALUES ($1, $2, $3, $4)',
            [nombre,categoria,precio,stock])
        res.json({mensaje: "Producto agregado"})    
    }catch(err){
        console.log(err)
    }
});

app.put('/editProducto/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const { nombre, categoria, precio, stock } = req.body;
        await pool.query('UPDATE productos SET nombre = $1, categoria = $2, precio = $3, stock = $4 WHERE id = $5',
        [nombre,categoria,precio,stock,id])
        res.json({mensaje: 'Producto actualizado correctamente'})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Error al editar el producto"})
    }
});

app.listen(8081, ()=> {
    console.log("Servidor corriendo en el puerto 8081")
});