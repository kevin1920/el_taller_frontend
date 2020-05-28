
let atraparDatos = () => {
    let documento = document.getElementById("txtDocumento").value
    let clave = document.getElementById("txtContraseña").value

    return {documento: documento, clave: clave}
}

let validarLogin = () => {
    let info = {}
    info = atraparDatos();
    let mensaje = document.getElementById("mensajeLogin")
    let data = ""
    axios.post("http://localhost:3000/api/v1/login",info).then(respuesta => {
        if(respuesta.data.ok === true){
            let token = respuesta.data.info;
            let nombre = respuesta.data.usuario.nombre
            let rol = respuesta.data.usuario.rol
            localStorage.setItem("token",token)
            localStorage.setItem("documento",info.documento)
            localStorage.setItem("nombre",nombre)
            limpiarCampos()
            data = ""
            mensaje.innerHTML = data
            if(rol === "Administrador"){
                location.href="../pages/administradorIndex.html"
            }else{
                location.href="../pages/mecanicoIndex.html"
            }
        }else{
            data = `<div class="alert alert-danger" role="alert">
            El documento y/o contraseña es incorrecta <a href="#" class="alert-link"></a>
            </div>`
            mensaje.innerHTML = data
        }
    }).catch(error => {
        console.log(error)
    })
}

let limpiarToken = () => {
    localStorage.setItem("token","ninguno")
}

let limpiarCampos = () => {
    let documento = document.getElementById("txtDocumento").value = ""
    let clave = document.getElementById("txtContraseña").value = ""
}

limpiarToken();