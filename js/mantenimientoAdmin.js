let listaMecanicos = []

let listaPlacas = []

let listaMantenimientos = []

let idMecanico = ""

let idMoto = ""


let listarMecanicos = () => {
    let token = localStorage.getItem("token");
    axios.get("http://localhost:3000/api/v1/mecanicos",{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta.data)
        listaMecanicos = respuesta.data
        let data = ""
        let lista = document.getElementById("listaMecanicos")
        for(let i = 0; i < respuesta.data.length; i++){
            let mecanico = respuesta.data[i]
            data += "<tr>"
            data += `<td>${mecanico.documento}</td>`
            data += `<td>${mecanico.nombre}</td>`
            data += `<td>${mecanico.apellidos}</td>`
            data += `<td><button type="button" onclick = "asignarTxtMecanico(${i})" class="btn btn-primary">Asignar</button></td>`
            data += "</tr>"
        }
        lista.innerHTML = data;
    }).catch(error => {
        console.log(error)
    })
}

let listarPlacas = () => {
    let token = localStorage.getItem("token");
    let data = ""
    axios.get("http://localhost:3000/api/v1/placas",{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta.data)
        listaPlacas = respuesta.data
        let lista = document.getElementById("listaPlacas")
        for(let i = 0; i < respuesta.data.length; i++){
            let placa = respuesta.data[i]
            data += "<tr>"
            data += `<td>${placa.placa}</td>`
            data += `<td><button type="button" onclick = "asignarTxtPlaca(${i})" class="btn btn-primary">Asignar</button></td>`
            data += "</tr>"
        }
        lista.innerHTML = data;
    }).catch(error => {
        console.log(error)
    })
}

let listarMantenimientos = () => {
    let token = localStorage.getItem("token");
    let data = ""
    axios.get("http://localhost:3000/api/v1/mantenimientoAdmin",{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta.data)
        listaMantenimientos = respuesta.data
        let lista = document.getElementById("listaMantenimientos")
        for(let i = 0; i < respuesta.data.length; i++){
            let mantenimiento = respuesta.data[i]
            data += "<tr>"
            data += `<td>${mantenimiento.id_mecanico}</td>`
            data += `<td>${mantenimiento.nombre}</td>`
            data += `<td>${mantenimiento.apellidos}</td>`
            data += `<td>${mantenimiento.placa}</td>`
            data += `<td>${mantenimiento.fecha.slice(0,10)}</td>`
            data += `<td><button type="button" onclick = "eliminarMantenimiento('${mantenimiento.placa}')" class="btn btn-primary">Eliminar</button></td>`
            data += "</tr>"
        }
        lista.innerHTML = data;
    }).catch(error => {
        console.log(error)
    })
}

let asignarTxtMecanico = index => {
    let mecanico = listaMecanicos[index]
    idMecanico = mecanico.documento
    document.getElementById("txtMecanico").value = `${mecanico.nombre} ${mecanico.apellidos}`
}

let asignarTxtPlaca = index => {
    let placa = listaPlacas[index]
    idMoto = placa.placa
    document.getElementById("txtPlaca").value = idMoto
}

let asignarMantenimiento = () => {
    let date = new Date();
    let dia = date.getDate()
    let mes = date.getMonth()+1
    let año = date.getFullYear()
    let fecha = año+"-"+mes+"-"+dia;
    let data = ""
    let mensaje = document.getElementById("mensajeMantenimiento")
    if(document.getElementById("txtMecanico").value === "" || document.getElementById("txtPlaca").value === ""){
        data = `<div class="alert alert-danger" role="alert">
            Falta el mecanico y/o la placa <a href="#" class="alert-link"></a>
            </div>`
            mensaje.innerHTML = data
    }else{
        let info = {idMecanico:idMecanico,placa:idMoto,fecha:fecha,trabajosRealizados:"ninguno",horasInvertidas:0}
        let token = localStorage.getItem("token");
        axios.post("http://localhost:3000/api/v1/mantenimientos",info,{headers:{"token":token}}).then(respuesta => {
            axios.put(`http://localhost:3000/api/v1/estado/${idMoto}`,{estado:"en reparacion"},{headers:{"token":token}}).then(respuesta => {
                data = `<div class="alert alert-success" role="alert">
                El mantenimiento se creo correctamente  <a href="#" class="alert-link"></a>
                </div>`
                mensaje.innerHTML = data
                document.getElementById("txtMecanico").value = ""
                document.getElementById("txtPlaca").value = ""
                listarMantenimientos();
                listarPlacas();
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

let eliminarMantenimiento = placa => {
    let token = localStorage.getItem("token");
    let data = ""
    let mensaje = document.getElementById("mensajeMantenimiento")
    axios.delete(`http://localhost:3000/api/v1/mantenimientos/${placa}`,{headers:{"token":token}}).then(respuesta => {
        axios.put(`http://localhost:3000/api/v1/estado/${placa}`,{estado:"mala"},{headers:{"token":token}}).then(respuesta => {
                data = `<div class="alert alert-success" role="alert">
                El mantenimiento se Elimino correctamente  <a href="#" class="alert-link"></a>
                </div>`
                mensaje.innerHTML = data
                listarMantenimientos();
                listarPlacas();
        }).catch(error => {
             console.log(error)
        })
    }).catch(error => {
        console.log(error)
    })
}

let validarTokenManteAdmin = () => {
    let token = localStorage.getItem("token")
    axios.get("http://localhost:3000/api/v1/autenticacion",{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta)
    }).catch(error => {
        console.log(error)
        location.href="../pages/autenticacion.html"
    })
}

validarTokenManteAdmin();

listarPlacas();
listarMecanicos();
listarMantenimientos();