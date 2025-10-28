document.addEventListener("DOMContentLoaded", async() => {
    try{
        const res = await fetch ('/empleados') // por defect get, no methods 
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
})


const container = document.getElementById("productos")
container.addEventListener("click", async(event) => {
    try{
        //Event Delegation al container
        if(event.target.classList.contains("addToCart")){
            const nombreItem = event.target.getAttribute("data-name")
            console.log(nombreItem)
        }
        if(event.target.classList.contains("editar")){

        }
        if(event.target.classList.contains("borrar")){
            const idProducto = event.target.getAttribute("data-id")
            const res = await fetch (`/borrarProducto/${idProducto}`,{
                method: "DELETE"
            });
            
        }
    }catch(err){

    }
})
