
let carrito = [];
// Cargar productos al inicio
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
})

// ACTION LISTENERS FOR SAVE AND EDIT 
const guardarCambiosBoton = document.getElementById("guardarCambios")
guardarCambiosBoton.addEventListener("click",guardarCambios)
const cerrarModalBoton = document.getElementById("cerrarModal")
cerrarModalBoton.addEventListener("click",cerrarModal)
const carritoSide = document.getElementById("carritoSidebar")
const abrirCarrito = document.getElementById("abrirCarrito")
const cerrarCarrito = document.getElementById("cerrarCarrito")
const finalizarCompra = document.getElementById("finalizarCompra")


abrirCarrito.addEventListener("click", () => {
    carritoSide.classList.remove("hidden")
    carritoSide.classList.add("mostrar")
})
cerrarCarrito.addEventListener("click", () => {
    carritoSide.classList.remove("mostrar")
    carritoSide.classList.add("hidden")
})

finalizarCompra.addEventListener("click", realizarCompra)

// RENDER CARRITO 

function renderCarrito(){
    const listaCarrito = document.getElementById("carritoLista")
    const totalTexto = document.getElementById("carritoTotal")
    listaCarrito.innerHTML = "";
    carrito.forEach(item => {
        const div = document.createElement("div")
        div.innerHTML = `
        ${item.nombre} - $${item.precio} x ${item.cantidad}
            <button class="sumar" data-id="${item.id}">+</button>
            <button class="restar" data-id="${item.id}">-</button>
        `;
        listaCarrito.appendChild(div);
    })
    const total  = carrito.reduce((acc, item) => acc +(item.precio * item.cantidad), 0)
    totalTexto.textContent = `Total: $${total}`;
}

// FUNCION PARA LOAD CADA UNO DE LOS LOS PRODUCTOS
async function loadProducts() {
    try{
        const res = await fetch ('/productos') // por defect get, no methods 
        const productos = await res.json()
        container.innerHTML = '' 
        productos.forEach(element => {
            const item = document.createElement('div')
            item.classList.add('producto')
            item.innerHTML = `
                <h3>${element.nombre}</h3>
                <p><strong>Categoría:</strong> ${element.categoria}</p>
                <p><strong>Precio:</strong> $${element.precio}</p>
                <p><strong>Stock:</strong> ${element.stock}</p>
                <button class="addToCart" data-name="${element.nombre}" data-id="${element.id}"> Añadir al carrito </button>
                <button class="editar" data-id="${element.id}"> Editar </button>
                <button class="borrar" data-id="${element.id}"> Borrar </button>
                `
            container.appendChild(item)
        })
    }catch(err){
        console.log(err)
    }
}

// Logic for each one of the cards on the DOM 
const container = document.getElementById("productos")
container.addEventListener("click", async(event) => {
    try{
        //Event Delegation al container
        if(event.target.classList.contains("addToCart")){
            const nombreItem = event.target.getAttribute("data-name")
            const id = event.target.getAttribute("data-id")

            // llamamos al db para tener la info actualizada
            const res = await fetch(`/getProduct/${id}`)
            const data = await res.json()
            console.log(data)
            const producto = {
                id : data.datos.id,
                nombre : data.datos.nombre,
                precio : data.datos.precio,
                cantidad : 1 
            };
            agregarAlCarrito(producto)
            
        }
        if(event.target.classList.contains("editar")){
            const idProducto = event.target.dataset.id // Se puede usar o dataset o getattribute}
            console.log(idProducto)
            //Antes de mostrar el modal, hacemos get de la db para obtener los current datos. 
            const res = await fetch (`/getProduct/${idProducto}`)
            const dataProducto = await res.json()
            document.getElementById("edit-nombre").value = dataProducto.datos.nombre
            document.getElementById("edit-categoria").value = dataProducto.datos.categoria
            document.getElementById("edit-precio").value = dataProducto.datos.precio
            document.getElementById("edit-stock").value = dataProducto.datos.stock
            guardarCambiosBoton.dataset.id = idProducto
            const modal = document.getElementById("modalEditar")
            modal.classList.remove("hidden")
        }
        if(event.target.classList.contains("borrar")){
            const idProducto = event.target.getAttribute("data-id")
            console.log(idProducto)
            await fetch (`/borrarProducto/${idProducto}`,{method: "DELETE"});
            loadProducts();
        }
    }catch(err){
        console.log(err)
    }
})

async function realizarCompra() {
    try {
        if(carrito.length === 0){
            alert("Carrito vacio, por favor agrega un producto")
        }
        const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        const res = await fetch("/crearOrden", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ carrito, total })
        });
        const data = await res.json();
        alert("Compra realizada con éxito. ID Orden: " + data.id_orden);

        carrito = [];
        renderCarrito();
        carritoSide.classList.remove("mostrar");
        carritoSide.classList.add("hidden");

        
    } catch (err) {
        
    }
}






//funciones para el modal
function cerrarModal(){
    const modal = document.getElementById("modalEditar")
    modal.classList.add("hidden")
}
async function guardarCambios(event) {
    try{
        const id = event.target.dataset.id // al boton le guardamos el product id en su dataset 
        const nombre = document.getElementById("edit-nombre").value
        const categoria = document.getElementById("edit-categoria").value
        const precio = document.getElementById("edit-precio").value
        const stock = document.getElementById("edit-stock").value
        // Guardamos lo que el cliente haya cambiado o no 
        await fetch (`/editProducto/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nombre,categoria,precio,stock})
        })
        loadProducts()
        cerrarModal()
    }catch(err){  
        console.log(err)
    }
}


// Logica para agregar nuevos productos
const botonAgregar = document.getElementById("botonAgregar")
botonAgregar.addEventListener("click", async() => {
    try{
        const nombre = document.getElementById("nombre").value
        const categoria = document.getElementById("categoria").value
        const precio = document.getElementById("precio").value
        const stock = document.getElementById("stock").value
        if(!nombre || !categoria || !precio || !stock){
            alert("Llenar todos los campos")
        }
        else{
            const data = {nombre,categoria,precio,stock}
            const res = await fetch ('/nuevoProducto', {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(data)
            });
            loadProducts()
             // Reload board
        }    
    }
    catch(err){
        console.log(err)
    }
})


// agregar al carrito function 
function agregarAlCarrito(producto){
    const existenteEnCarrito = carrito.find(item => item.id == producto.id );
    console.log(existenteEnCarrito)
    if (existenteEnCarrito){
        existenteEnCarrito.cantidad++;
    }else{
        carrito.push(producto)
    }
    renderCarrito()
    console.log(carrito)
}