let asignarNombreMecanico = () => {
    let nombre = localStorage.getItem("nombre")
    let mensaje = document.getElementById("tituloMecanico")
    let data = `<h1>Hola ${nombre}</h1>`
    mensaje.innerHTML= data;
}

let dirigirMotosMecanico = () => {
    location.href="../pages/motos.html"
}

let dirigirMantenimientoMecanico = () => {
    location.href="../pages/mantenimientoMecanico.html"
}

asignarNombreMecanico();