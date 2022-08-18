
const contenedorProductos = document.getElementById('contenedorProductos');
//ingreso el html
arrayProductos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('productor');
    div.innerHTML= `
    <img src= ${producto.img} alt = "">
    <h3>${producto.nombre}</h3>
    <p class = "precioProducto"> Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="botonAgregar"> Agregar <i class="fas fa-shopping-cart"></i></button>`
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`)
     //agrego el carrito con el id
    boton.addEventListener('click',() => {
      agregarAlCarrito(producto.id);
    })
})

let carrito = [];
//agregar al carrito y aumentar  la cantidad que no se repite,comprobar si el elemento ya esxite en el carro para eso utilizo condicionales
const agregarAlCarrito =(prodId)=> {
  const existe = carrito.some(prod => prod.id === prodId);
  if(existe){
    const prod = carrito.map(prod =>{
      if(prod.id ===prodId){
        prod.cantidad++
      }
    })
  } else{
    const item = arrayProductos.find((prod) => prod.id === prodId);
    carrito.push(item);
  }
  actualizarCarrito();
  console.log(carrito);
 
}

const contenedorCarrito = document.getElementById('carritoContenedor');
//eliminar prodducto del carrito 
const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice,1);
  actualizarCarrito();
  console.log(carrito);
}
// actualizar carrito
const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((prod) => {
    const div = document.createElement('div');
    div.className = ('productoEnCarrito');
    div.innerHTML = `
    <p>${prod.nombre}</p>
    <p>${prod.precio}</p>
    <p> cantidad: <span id= "cantidad">${prod.cantidad}</span></p>
    <button onclick= "eliminarDelCarrito(${prod.id})" class="botonEliminar"><i class="fas fa-trash-alt"></button`;
    contenedorCarrito.appendChild(div);
    localStorage.setItem('carrito', JSON.stringify(carrito));

  })
  //sumar los precios de los productos a agregar en el carrito
  contadorCarrito.innerText = carrito.length;
  console.log(carrito);
  precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.cantidad * prod.precio, 0);
}
//vaciar todos los elementos en el carrito
const botonVaciar = document.getElementById('vaciarCarrito');
botonVaciar.addEventListener('click',() =>{
  carrito.length = 0;
  actualizarCarrito();

})

const contadorCarrito = document.getElementById('contadorCarrito');

const precioTotal = document.getElementById('precioTotal');

document.addEventListener('DOMContentLoaded',() =>{
  if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
  }
})

Swal.fire(
  
  'Envio gratis por compras superiores a',
  '$100.000'
)



