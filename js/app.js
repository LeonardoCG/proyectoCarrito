// variables
const carrito = document.querySelector('#carrito');  //seleccionamos el carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); // contendra los cursos seleccionados
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); //elimina los cursos seleccionados
const listaCursos = document.querySelector('#lista-cursos'); //lista de cursos
let articuloCarrito = []; // mis articulos

//funcion que escucha
cargarEventListener();
function cargarEventListener(){
    // cuando agregar un curso botn agregarcariito
    listaCursos.addEventListener('click', agregarCurso);

    //Eliminar articulos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // vaciarCarrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articuloCarrito = [];
        limpiarHTML();
    });
}

// Function agregar
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSelect = e.target.parentElement.parentElement;
        datosCurso(cursoSelect);
    }
}

// //Eliminar articulos del carrito
function eliminarCurso(e) {

    if(e.target.classList.contains('borrar-curso')) {
        //obtener el ID del curso
        const cursoId = e.target.getAttribute('data-id');

        // elimina del arreglo por el data-id 
        articuloCarrito = articuloCarrito.filter( curso => curso.id !== cursoId );

        // volvemos a iterar sobre le carrito y mostrar el HTML 
        carritoHTML();
    }

}

//leer datos del curso
function datosCurso(curso){
    
    // crear un objeto con los datosCurso
    const infoCurso = {
        image: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Verificar si un articulo existe en el carrito con .some( itera en arreglos) 
    const existe = articuloCarrito.some( curso => curso.id === infoCurso.id )
    console.log(existe)
 
  
    if (existe ) {
        // actualizar cantidad
        const cursos = articuloCarrito.map( curso => {
            if(curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado en cantidad para agregar
            } else
                // retorna el objeto que no esta duplicado para agregar
                return curso; 
        });
    } else {
         // agregar elementos al carrito 
        articuloCarrito = [...articuloCarrito, infoCurso];

    }

    carritoHTML();
}


// mostrar el carrito en el html 
function carritoHTML() {
    // limpiar el html 
    limpiarHTML();

    //recorre el carrito y genera el html
    articuloCarrito.forEach( curso => {
        // destructuring
        const {image, title, precio, cantidad, id} = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${image}" width="100">
            </td>
            <td>${title}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;
        // agrega el html del carrito al tbody 
        contenedorCarrito.appendChild(row); // agrega en cada iteracion
    
    });
}

//Eliminar los cursos del tbody
function limpiarHTML() {
    // forma lenta 
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}

