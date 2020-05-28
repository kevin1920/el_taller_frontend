
let asignarNombre = () => {
    let nombre = localStorage.getItem("nombre")
    let mensaje = document.getElementById("tituloAdmin")
    let data = `<h1>Hola ${nombre}</h1>`
    mensaje.innerHTML= data;
}

let dirigirUsuariosAdmin = () => {
    location.href="../pages/usuarios.html"
}

let dirigirMotosAdmin = () => {
    location.href="../pages/motos.html"
}

let dirigirMantenimientoAdmin = () => {
    location.href="../pages/mantenimientoAdmin.html"
}

let dirigirConsolidado = () => {
    location.href="../pages/consolidados.html"
}

asignarNombre();