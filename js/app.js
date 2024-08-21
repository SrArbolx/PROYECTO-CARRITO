//Variables
const carrito = document.querySelector('#carrito');
const ListaCarrito = document.querySelector('#lista-carrito tbody');
const VaciarCarrito = document.querySelector('#vaciar-carrito');
const ListaCursos = document.querySelector('#lista-cursos');
let totalPagar = document.querySelector('#lista-carrito tfoot')
let articulosCarrito =[];

cargarlistener()
function cargarlistener () {
// Agregar un producto con el boton "Agregar al carrito"
ListaCursos.addEventListener('click', agregarCurso);

//Eliminar un curso
carrito,addEventListener('click', eliminarCurso);
}

//Vaciar el carrito
VaciarCarrito.addEventListener ('click', () => {
    articulosCarrito = [];
    LimpiarHTML()
});



//Funciones
function agregarCurso (e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const  cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
    
 }

 //Eliminar un curso del carrito
 function eliminarCurso (e) {
    //console.log(evnt.target.classList)
    if(e.target.classList.contains('borrar-curso')){
         const cursoId = e.target.getAttribute('data-id')
        


        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML() //quitar del html
    }

   
    
 }
 
 

     //Lee los datos del curso y extrae la informacion
     function leerDatosCurso (curso) {
 //console.log(curso) 

     //Crear un objeto con el curso seleccionado
      const infoCurso = {
         imagen: curso.querySelector('img').src,
         titulo: curso.querySelector('h4').textContent, 
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector("a").getAttribute('data-id'),
          cantidad: 1
        }

// Verificar si ya existe en el carrito
        const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
        if(existe){
            //Actualizamos la cantidad
            const cursos = articulosCarrito.map( curso =>{
                if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso;   // Retorna los objetos duplicados
                }else{
                    return curso;   // Retorna los objetos que no son los duplicados
                }
            });
            articulosCarrito = [...cursos];
            
        } else {
            //agrega elementos al carrito
           articulosCarrito = [...articulosCarrito, infoCurso];
        }

 
carritoHTML()
}





//Mostrar en el carrito

function carritoHTML (){


    //Limpiar el carrito
    LimpiarHTML()

//Recorre el carrito y genera html
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr')
        row.innerHTML =`
            <td>
                <img src="${imagen}" width="170">
            </td>

            <td>
            ${titulo}
            </td>

            <td>
            ${precio}
            </td>

            <td>
            ${cantidad}
            </td>

            <td>
              <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>

            
        `
        //Agregar del html al tbody
        ListaCarrito.appendChild(row)


    })
}


//Elimina los elementos de tbody
function LimpiarHTML (){
    ListaCarrito.innerHTML = '';    

    
}
