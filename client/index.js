
// Cargar productos al inicio
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
})

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
            console.log(nombreItem)
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
            loadProducts() // Reload board
        }    
    }
    catch(err){
        console.log(err)
    }
})
