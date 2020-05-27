
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
            localStorage.setItem("token",token)
            limpiarCampos()
            data = ""
            mensaje.innerHTML = data
            //location.href="../pages/motos.html"
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

let limpiarCampos = () => {
    let documento = document.getElementById("txtDocumento").value = ""
    let clave = document.getElementById("txtContraseña").value = ""
}