let listaMotos = []
let motoActualizar = ""

let atraparDatosMoto = () => {
    let placa = document.getElementById("txtPlaca").value
    let estado = "mala"
    let clase = document.getElementById("txtClase").value
    let marca = document.getElementById("txtMarca").value
    let modelo = document.getElementById("txtModelo").value
    let color = document.getElementById("txtColor").value
    let cilindraje = document.getElementById("txtCilindraje").value
    let idPropietario = document.getElementById("txtIdPropietario").value
    let nroSoat = document.getElementById("txtNroSoat").value
    let vencimientoSoat = document.getElementById("txtVencimientoSoat").value
    let nroTecnomecanica = document.getElementById("txtNumeroTecnomecanica").value
    let venTecnomecanica = document.getElementById("txtVenTecnomecanica").value

    return {placa:placa,estado:estado,clase:clase,marca:marca,modelo:modelo,color:color,cilindraje:cilindraje,idPropietario:idPropietario,
    nroSoat:nroSoat,vencimientoSoat:vencimientoSoat,nroTecnomecanica:nroTecnomecanica,venTecnomecanica,venTecnomecanica}
}

let guardarMoto = () => {
    let info = atraparDatosMoto();
    let mensaje = document.getElementById("mensajeMotos")
    let data = ""
    let token = localStorage.getItem("token");
    axios.post("http://localhost:3000/api/v1/motos",info,{headers:{"token":token}}).then(respuesta => {
        if(respuesta.data.mensaje){
            data = `<div class="alert alert-success" role="alert">
            ${respuesta.data.mensaje} <a href="#" class="alert-link"></a>
            </div>`
            mensaje.innerHTML = data
            console.log(respuesta)
            limpiarCampos()
            listarMotos()
        }else{
            console.log(respuesta)
            data = `<div class="alert alert-danger" role="alert">
            La moto ya se encuentra ingresada <a href="#" class="alert-link"></a>
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

let listarMotos = () => {
    let token = localStorage.getItem("token");
    let mensaje = document.getElementById("mensajeMotos")
    let data = ""
    axios.get("http://localhost:3000/api/v1/motos",{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta.data)
        listaMotos = respuesta.data
        let lista = document.getElementById("listaMotos")
        for(let i = 0; i < respuesta.data.length; i++){
            let moto = respuesta.data[i]
            data += "<tr>"
            data += `<td>${moto.placa}</td>`
            data += `<td>${moto.id_propietario}</td>`
            data += `<td>${moto.marca}</td>`
            data += `<td>${moto.estado}</td>`
            data += `<td><button type="button" onclick = "cargarDatos(${i})" class="btn btn-primary">Editar</button></td>`
            data += `<td><button type="button" onclick = "eliminarMoto('${moto.placa}')" class="btn btn-primary">Eliminar</button></td>`
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

let actualizarMoto = () => {
    let mensaje = document.getElementById("mensajeMotos")
    let data = ""
    let estado = document.getElementById("cmbEstados").value
    let clase = document.getElementById("txtClase").value
    let marca = document.getElementById("txtMarca").value
    let modelo = document.getElementById("txtModelo").value
    let color = document.getElementById("txtColor").value
    let cilindraje = document.getElementById("txtCilindraje").value
    let idPropietario = document.getElementById("txtIdPropietario").value
    let nroSoat = document.getElementById("txtNroSoat").value
    let vencimientoSoat = document.getElementById("txtVencimientoSoat").value
    let nroTecnomecanica = document.getElementById("txtNumeroTecnomecanica").value
    let venTecnomecanica = document.getElementById("txtVenTecnomecanica").value
    let info = {estado:estado,clase:clase,marca:marca,modelo:modelo,color:color,cilindraje:cilindraje,idPropietario:idPropietario,
        nroSoat:nroSoat,vencimientoSoat:vencimientoSoat,nroTecnomecanica:nroTecnomecanica,venTecnomecanica,venTecnomecanica}
    let token = localStorage.getItem("token");
    console.log(motoActualizar)
    axios.put(`http://localhost:3000/api/v1/motos/${motoActualizar}`,info,{headers:{"token":token}}).then(respuesta => {
        
        data = `<div class="alert alert-success" role="alert">
        la moto se actualizo correctamente <a href="#" class="alert-link"></a>
        </div>`
        mensaje.innerHTML = data
        document.getElementById("placa").style.display = "inline"
        document.getElementById("estado").style.display = "none"
        document.getElementById("btnCrearMoto").style.display = "inline"
        document.getElementById("btnActualizarMoto").style.display = "none"
        listarMotos()
        limpiarCampos()
    }).catch(error => {
        console.log(error)
    })
}


let cargarDatos = index => {
    let moto = listaMotos[index]
    motoActualizar = moto.placa
    document.getElementById("placa").style.display = "none"
    document.getElementById("estado").style.display = "inline"
    document.getElementById("cmbEstados").value = moto.estado
    document.getElementById("txtClase").value = moto.clase
    document.getElementById("txtMarca").value = moto.marca
    document.getElementById("txtModelo").value = moto.modelo
    document.getElementById("txtColor").value = moto.color
    document.getElementById("txtCilindraje").value = moto.cilindraje
    document.getElementById("txtIdPropietario").value = moto.id_propietario
    document.getElementById("txtNroSoat").value = moto.nro_soat
    document.getElementById("txtVencimientoSoat").value = moto.vencimiento_soat.slice(0,10)
    document.getElementById("txtNumeroTecnomecanica").value = moto.nro_tecnomecanica
    document.getElementById("txtVenTecnomecanica").value = moto.vencimiento_tecnomecanica.slice(0,10)
    document.getElementById("btnCrearMoto").style.display = "none"
    document.getElementById("btnActualizarMoto").style.display = "inline"
}

let eliminarMoto = placa => {
    let mensaje = document.getElementById("mensajeMotos")
    let data = ""
    let token = localStorage.getItem("token");
    axios.delete(`http://localhost:3000/api/v1/motos/${placa}`,{headers:{"token":token}}).then(respuesta => {
        data = `<div class="alert alert-success" role="alert">
        La moto se elimino correctamente <a href="#" class="alert-link"></a>
        </div>`
        mensaje.innerHTML = data
        listarMotos();
    }).catch(error => {
        console.log(error)
    })
}

let limpiarCampos = () => {
    document.getElementById("txtPlaca").value = ""
    document.getElementById("txtClase").value = ""
    document.getElementById("txtMarca").value = ""
    document.getElementById("txtModelo").value = ""
    document.getElementById("txtColor").value = ""
    document.getElementById("txtCilindraje").value = ""
    document.getElementById("txtIdPropietario").value = ""
    document.getElementById("txtNroSoat").value = ""
    document.getElementById("txtVencimientoSoat").value = ""
    document.getElementById("txtNumeroTecnomecanica").value = ""
    document.getElementById("txtVenTecnomecanica").value = ""
}

let validarTokenMotos = () => {
    let token = localStorage.getItem("token")
    axios.get("http://localhost:3000/api/v1/autenticacion",{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta)
    }).catch(error => {
        console.log(error)
        location.href="../pages/autenticacion.html"
    })
}

validarTokenMotos();

listarMotos();