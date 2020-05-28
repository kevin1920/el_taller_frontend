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

let cerrarSesionMecanico = () => {
    location.href="../index.html"
}

let validarTokenMecanico = () => {
    let token = localStorage.getItem("token")
    axios.get("http://localhost:3000/api/v1/autenticacion",{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta)
    }).catch(error => {
        console.log(error)
        location.href="../pages/autenticacion.html"
    })
}

validarTokenMecanico();

asignarNombreMecanico();