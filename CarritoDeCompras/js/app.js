//variables
const carrito = document.querySelector("#carrito");
const contenidoCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCurso = document.querySelector("#lista-cursos");

let articulosCarrito = [];

function agregarEventListener() {
    listaCurso.addEventListener("click", agregarAlCarrito);
    carrito.addEventListener("click", eliminarcurso);
    vaciarCarrito.addEventListener("click", vaciarCurso);
}

function agregarAlCarrito(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const CardElementos = e.target.parentElement.parentElement;
        crearElementoCard(CardElementos);
    }
}

function eliminarcurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
        carritoHTML();
    }
}

function vaciarCurso() {
    articulosCarrito = [];
    carritoHTML();
}

function crearElementoCard(CardElementos) {
    const result = {
        img: CardElementos.querySelector(".imagen-curso").src,
        titulo: CardElementos.querySelector("h4").textContent,
        autor: CardElementos.querySelector("p").textContent,
        precio: CardElementos.querySelector(".precio span").textContent,
        id: CardElementos.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    const existe = articulosCarrito.some(
        (CardElementos) => CardElementos.id === result.id
    );

    if (existe) {
        console.log(articulosCarrito);
        const cursos = articulosCarrito.map((curso) => {

            if (curso.id === result.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        console.log(cursos);
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, result];
    }

    carritoHTML();
}

function carritoHTML() {
    contenidoCarrito.innerHTML = "";
    articulosCarrito.forEach((curso) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img src="${curso.img}" width="100"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td> 
        <td>${curso.cantidad}</td> 
        <td><a href="#" class="borrar-curso"  data-id="${curso.id}">X</td>       `;
        contenidoCarrito.appendChild(row);
    });
}

//#2 manera de limpiar items del carrito
function limpiar() {
    while (contenidoCarrito.firstChild) {
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    }
}

//llamamos a la funcion del eventListener
agregarEventListener();
