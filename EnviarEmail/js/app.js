//modulos

//variables
const btnEnviar = document.querySelector("#enviar");
const formulario = document.querySelector("#enviar-mail");

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const btnReset = document.querySelector("#resetBtn");

//expresion regular para email
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//funciones
function eventListener() {
    //al iniciar la app
    document.addEventListener("DOMContentLoaded", iniciarApp);

    //campos del formulario
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);

    //enviar email
    formulario.addEventListener("submit", enviarFormulario);
    btnReset.addEventListener('click', resetForm);
}

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
    //validar campos vacios
    if (e.target.value.length > 0) {
        validacionCampo(1, e);
    } else {
        validacionCampo(2, e);
        mostrarError("Todos los campos son obligatorios");
    }

    //validar email
    if (e.target.type === 'email') {
        //validacion basica de caracter @
        /* const resultado = e.target.value.indexOf("@");
        if (resultado < 0) MostrarError("el email no es valido");*/

        //validar email valido con expresion regular "er"
        if (er.test(e.target.value)) {
            validacionCampo(1, e)
        } else {
            validacionCampo(2, e)
            mostrarError("El email no es valido");
        }
    }

    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    }
}

function validacionCampo(opcion, e) {
    switch (opcion) {
        case 1:
            const error = document.querySelector("p.error");
            if (error) error.remove();
            e.target.classList.remove("border", "border-red-500");
            e.target.classList.add("border", "border-green-500");
            break;
        case 2:
            e.target.classList.remove("border", "border-green-500");
            e.target.classList.add("border", "border-red-500");
            break;
        default: console.log("verificar opcion ingresada");
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add(
        "border",
        "border-red-500",
        "background-red-100",
        "text-red-500",
        "p-3",
        "mt-5",
        "text-center",
        "error"
    );

    const errores = document.querySelectorAll(".error");
    if (errores.length === 0) {
        // formulario.appendChild(mensajeError);
        formulario.insertBefore(
            mensajeError,
            document.querySelector(".classemail")
        );
    }
}

function enviarFormulario(e) {
    e.preventDefault();
    
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";
        const parrafo = document.createElement('p');
        parrafo.textContent = "el mensaje se envio correctamente";
        parrafo.classList.add("text-center", "my-10", "p-2", "bg-green-500", "text-white", "font-bold", "uppercase");
        formulario.insertBefore(parrafo, spinner)
        setTimeout(() => {
            parrafo.remove();
            resetForm();
        }, 3000);
    }, 3000);
}

function resetForm() {
    formulario.reset();
    iniciarApp();
}

//ejecucion
eventListener();
