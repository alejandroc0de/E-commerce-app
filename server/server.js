const express = require('express');
const cors = require('cors');
const db = require('./db')
const app = express();
app.use(cors())
app.use(express.json())














app.listen(8081, ()=> {
    console.log("Servidor corriendo en el puerto 8081")
})