let listaUsuarios = []
let usuarioActualizar = ""

let atraparDatosUsuario = () => {
    let tipoDocumento = document.getElementById("cmbTipoDocumento").value
    let documento = document.getElementById("txtDocumento").value
    let nombre = document.getElementById("txtNombre").value
    let apellidos = document.getElementById("txtApellidos").value
    let celular = document.getElementById("txtCelular").value
    let correo = document.getElementById("txtCorreo").value
    let rol = document.getElementById("cmbRoles").value
    let clave = document.getElementById("txtContraseña").value

    return {tipoDocumento:tipoDocumento,documento:documento,nombre:nombre,apellidos:apellidos,celular:celular,correo:correo,rol:rol,clave:clave}
}

let guardarMoto = () => {
    let info = atraparDatosUsuario();
    let mensaje = document.getElementById("mensajeUsuarios")
    let data = ""
    let token = localStorage.getItem("token");
    axios.post("http://localhost:3000/api/v1/usuarios",info,{headers:{"token":token}}).then(respuesta => {
        if(respuesta.data.mensaje){
            data = `<div class="alert alert-success" role="alert">
            ${respuesta.data.mensaje} <a href="#" class="alert-link"></a>
            </div>`
            mensaje.innerHTML = data
            console.log(respuesta)
            limpiarCamposUsuarios()
            listarUsuarios()
        }else{
            console.log(respuesta)
            data = `<div class="alert alert-danger" role="alert">
            El usuario ya se encuentra ingresada <a href="#" class="alert-link"></a>
            </div>`
            mensaje.innerHTML = data
        }
    }).catch(error => {
        console.log(error)
        data = `<div class="alert alert-danger" role="alert">
            Usuario no autenticado <a href="#" class="alert-link"></a>
            </div>`
        mensaje.innerHTML = data
    })
}

let listarUsuarios = () => {
    let token = localStorage.getItem("token");
    let mensaje = document.getElementById("mensajeUsuarios")
    let data = ""
    axios.get("http://localhost:3000/api/v1/usuarios",{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta.data)
        listaUsuarios = respuesta.data
        let lista = document.getElementById("listaUsuarios")
        for(let i = 0; i < respuesta.data.length; i++){
            let usuario = respuesta.data[i]
            data += "<tr>"
            data += `<td>${usuario.tipo_documento}</td>`
            data += `<td>${usuario.documento}</td>`
            data += `<td>${usuario.nombre}</td>`
            data += `<td>${usuario.apellidos}</td>`
            data += `<td>${usuario.rol}</td>`
            data += `<td><button type="button" onclick = "cargarDatosUsuario(${i})" class="btn btn-primary">Editar</button></td>`
            data += `<td><button type="button" onclick = "eliminarUsuario(${usuario.documento})" class="btn btn-primary">Eliminar</button></td>`
            data += "</tr>"
        }
        lista.innerHTML = data;
    }).catch(error => {
        console.log(error)
        data = `<div class="alert alert-danger" role="alert">
            Usuario no autenticado <a href="#" class="alert-link"></a>
            </div>`
        mensaje.innerHTML = data
    })
}

let actualizarUsuario = () => {
    let mensaje = document.getElementById("mensajeUsuarios")
    let data = ""
    let tipoDocumento = document.getElementById("cmbTipoDocumento").value 
    let nombre = document.getElementById("txtNombre").value
    let apellidos = document.getElementById("txtApellidos").value 
    let celular = document.getElementById("txtCelular").value
    let correo = document.getElementById("txtCorreo").value 
    let rol = document.getElementById("cmbRoles").value 
    let info = {tipoDocumento:tipoDocumento,nombre:nombre,apellidos:apellidos,celular:celular,correo:correo,rol:rol}
    let token = localStorage.getItem("token");
    axios.put(`http://localhost:3000/api/v1/usuarios/${usuarioActualizar}`,info,{headers:{"token":token}}).then(respuesta => {
        
        data = `<div class="alert alert-success" role="alert">
        El usuario se actualizo correctamente <a href="#" class="alert-link"></a>
        </div>`
        mensaje.innerHTML = data
        document.getElementById("documento").style.display = "inline"
        document.getElementById("contraseña").style.display = "inline"
        document.getElementById("btnCrearUsuario").style.display = "inline"
        document.getElementById("btnActualizarUsuario").style.display = "none"
        listarUsuarios()
        limpiarCamposUsuarios()
    }).catch(error => {
        console.log(error)
    })
}

let eliminarUsuario = documento => {
    let mensaje = document.getElementById("mensajeUsuarios")
    let data = ""
    let token = localStorage.getItem("token");
    axios.delete(`http://localhost:3000/api/v1/usuarios/${documento}`,{headers:{"token":token}}).then(respuesta => {
        data = `<div class="alert alert-success" role="alert">
        El usuario se elimino correctamente <a href="#" class="alert-link"></a>
        </div>`
        mensaje.innerHTML = data
        listarUsuarios();
    }).catch(error => {
        console.log(error)
    })
}

let cargarDatosUsuario = index => {
    let usuario = listaUsuarios[index]
    usuarioActualizar = usuario.documento
    let rolValue =""
    let tipoDocumentoValue = ""
    switch (usuario.tipo_documento) {
        case 'CC':
            tipoDocumentoValue = 1
            break;
        case 'CE':
            tipoDocumentoValue = 2
            break;
        case 'NIT':
            tipoDocumentoValue = 3
            break;
        case 'Pasaporte':
            tipoDocumentoValue = 4
            break;             
    }
    if(usuario.rol === 'Mécanico'){
        rolValue = 1
    }else{
        rolValue = 2
    }
    document.getElementById("cmbTipoDocumento").value = tipoDocumentoValue
    document.getElementById("documento").style.display = "none"
    document.getElementById("txtNombre").value =  usuario.nombre
    document.getElementById("txtApellidos").value =  usuario.apellidos
    document.getElementById("txtCelular").value = usuario.celular
    document.getElementById("txtCorreo").value =  usuario.correo
    document.getElementById("cmbRoles").value = rolValue
    document.getElementById("contraseña").style.display = "none"
    document.getElementById("btnCrearUsuario").style.display = "none"
    document.getElementById("btnActualizarUsuario").style.display = "inline"
}

let limpiarCamposUsuarios = () => {
    document.getElementById("cmbTipoDocumento").value = ""
    document.getElementById("txtDocumento").value = ""
    document.getElementById("txtNombre").value = ""
    document.getElementById("txtApellidos").value = ""
    document.getElementById("txtCelular").value = ""
    document.getElementById("txtCorreo").value = ""
    document.getElementById("cmbRoles").value = ""
    document.getElementById("txtContraseña").value = ""
}

let validarTokenUsuarios = () => {
    let token = localStorage.getItem("token")
    axios.get("http://localhost:3000/api/v1/autenticacion",{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta)
    }).catch(error => {
        console.log(error)
        location.href="../pages/autenticacion.html"
    })
}

validarTokenUsuarios();

listarUsuarios();