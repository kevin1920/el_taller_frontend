let placaActualizar = ""

let listarMantenimientoMecanico = () => {
    let token = localStorage.getItem("token");
    let data = ""
    let documento = localStorage.getItem("documento")
    axios.get(`http://localhost:3000/api/v1/mantenimientoMecanicos/${documento}`,{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta.data)
        let lista = document.getElementById("listaMantenimientos")
        for(let i = 0; i < respuesta.data.length; i++){
            let mantenimiento = respuesta.data[i]
            data += "<tr>"
            data += `<td>${mantenimiento.placa}</td>`
            data += `<td>${mantenimiento.fecha.slice(0,10)}</td>`
            data += `<td><button type="button" onclick = "asignarPlacaActualizar('${mantenimiento.placa}')" class="btn btn-primary">Actualizar</button></td>`
            data += "</tr>"
        }
        lista.innerHTML = data;
    }).catch(error => {
        console.log(error)
    })
}

let asignarPlacaActualizar = (placa) => {
    placaActualizar = placa
    document.getElementById("contenedorActualizar").style.display = "inline"
}

let actualizarMantenimieto = () => {
    let token = localStorage.getItem("token");
    let mensaje = document.getElementById("mensajeMantenimiento")
    let data = ""
    let trabajosRealizados = document.getElementById("txtTrabajosRealizados").value
    let horasInvertidas = document.getElementById("txtHorasInvertidas").value
    let info = {trabajosRealizados:trabajosRealizados,horasInvertidas:horasInvertidas}
    axios.put(`http://localhost:3000/api/v1/mantenimientos/${placaActualizar}`,info,{headers:{"token":token}}).then(respuesta => {
            axios.put(`http://localhost:3000/api/v1/estado/${placaActualizar}`,{estado:"reparada"},{headers:{"token":token}}).then(respuesta => {
                data = `<div class="alert alert-success" role="alert">
                El mantenimiento se actualizo correctamente  <a href="#" class="alert-link"></a>
                </div>`
                mensaje.innerHTML = data
                document.getElementById("txtTrabajosRealizados").value = ""
                document.getElementById("txtHorasInvertidas").value = ""
                document.getElementById("contenedorActualizar").style.display = "none"
                listarMantenimientoMecanico();
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })
}

let validarTokenManteMecanico = () => {
    let token = localStorage.getItem("token")
    axios.get("http://localhost:3000/api/v1/autenticacion",{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta)
    }).catch(error => {
        console.log(error)
        location.href="../pages/autenticacion.html"
    })
}

validarTokenManteMecanico();

listarMantenimientoMecanico();