const contenedorModal = document.getElementsByClassName('modoContenedor')[0]
const botonAbrir = document.getElementById('botonCarrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modoCarrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modoActive')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modoActive')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modoActive')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})