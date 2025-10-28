const express = require('express');
const cors = require('cors');
const path = require('path')
const db = require('./db');
const { pool } = require('./db');
const app = express();
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
app.use(express.static(path.join(__dirname, '../client')));




// Obteniendo los productos en POSTGRES

app.get('/empleados', async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM productos')
        res.json(result.rows)
    }catch(err){
        console.log(err)
        res.status(500).json({error : 'Error al obtner los productos de la base de datos'})
    }
});



app.listen(8081, ()=> {
    console.log("Servidor corriendo en el puerto 8081")
})