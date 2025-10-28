// Solo para pruebas
const getProductsButton = document.getElementById("getProducts")
getProductsButton.addEventListener("click", async() => {
    try {
        const res = await fetch ('/empleados') // por defect get, no methods 
        const productos = await res.json()
        console.log(productos)
    }catch(err){
        console.log(err)
    }
})