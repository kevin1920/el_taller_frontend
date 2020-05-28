
let atraparFechas = () => {
    let fechaInferior = document.getElementById("txtFechaInferior").value
    let fechaSuperior = document.getElementById("txtFechaSuperior").value

    return {fechaInferior:fechaInferior,fechaSuperior:fechaSuperior}
}

let listarConsolidado = () => {
    let info = atraparFechas()
    let token = localStorage.getItem("token");
    let lista = document.getElementById("listaConsolidados")
    let data = ""
    axios.post("http://localhost:3000/api/v1/consolidados",info,{headers:{"token":token}}).then(respuesta => {
        console.log(respuesta.data)
        for(let i = 0; i < respuesta.data.length; i++){
            let consolidado = respuesta.data[i]
            data += "<tr>"
            data += `<td>${consolidado.id_mecanico}</td>`
            data += `<td>${consolidado.nombre}</td>`
            data += `<td>${consolidado.apellidos}</td>`
            data += `<td>${consolidado.horastrabajadas}</td>`
            data += "</tr>"
        }
        lista.innerHTML = data;
    }).catch(error => {
        console.log(error)
    })
}
