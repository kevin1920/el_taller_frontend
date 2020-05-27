
let atraparDatos = () => {
    let documento = document.getElementById("txtDocumento").value
    let clave = document.getElementById("txtContraseña").value

    return {documento: documento, clave: clave}
}

let validarLogin = () => {
    let info = {}
    info = atraparDatos();
    axios.post("http://localhost:3000/api/v1/login",info).then(respuesta => {
        console.log(respuesta.data)
        let token = respuesta.data.info;
        localStorage.setItem("token",token)
        limpiarCampos()
    }).catch(error => {
        console.log(error)
    })
}

let limpiarCampos = () => {
    let documento = document.getElementById("txtDocumento").value = ""
    let clave = document.getElementById("txtContraseña").value = ""
}