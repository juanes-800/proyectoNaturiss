/* Nombre: Juan Esteban Alzate Trujillo
edad: 32 años
pais: colombia
estudios: Estudiante de desarrollo full stack, ingeniero en industria alimentaria
nombre del proyecto: Naturiss
version: 1.0
año:2022

*/    



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
        prod.cantidad++;
      }
    })
  } else{
    const item = arrayProductos.find((prod) => prod.id === prodId);
    carrito.push(item);
  }
  actualizarCarrito();
 
}

const contenedorCarrito = document.getElementById('carritoContenedor');

//eliminar prodducto del carrito 
const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice,1);
  actualizarCarrito();
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
  precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.cantidad * prod.precio, 0);
}

//vaciar todos los elementos en el carrito
const botonVaciar = document.getElementById('vaciarCarrito');
botonVaciar.addEventListener('click',() =>{
  carrito.length = 0;
  actualizarCarrito();

})

//comprar en el carrito
const comprar = document.getElementById("comprar");
comprar.addEventListener('click', () =>{
  precioTotal.innerHTML = "";
  carritoContenedor.innerHTML = "";
  contadorCarrito.innerHTML = "";
  gracias();
  
});

const contadorCarrito = document.getElementById('contadorCarrito');

const precioTotal = document.getElementById('precioTotal');

document.addEventListener('DOMContentLoaded',() =>{
  if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
  }
});

//implemento fetch
 const nuevos = document.getElementById("nuevos");

 const traerProducto = async () => {
   try {
    const response = await fetch("/data.json");
    const data = await response.json();
    data.forEach(nuevoProductos => {
      const div = document.createElement("div");
      div.className = ('productoNuevos');
      div.innerHTML = `
      <img src= ${nuevoProductos.img} alt = "">
      <h3>${nuevoProductos.nombre}</h3>`; 
      nuevos.append(div);
    });
    
  } catch (error) {
    console.log(error);
  }
 }
 traerProducto();

Swal.fire(
  
  'Envio gratis por compras superiores a',
  '$100.000'
)

function gracias(){
  swal.fire(
  
    'Gracias por tu compra'
  )
}


