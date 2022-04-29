//Quagga es la librería que permite realizar lecturas de códigos de barra mediante la cámara de un dispositivo
Quagga.init({
    inputStream : {
    name : "Live",
    type : "LiveStream",
    target: document.querySelector('#camara') 
    },
    decoder : {
    readers : ["code_128_reader"]
    }
}, 

function(err) {
    if (err) {
        console.log(err);
        return
    }
    Quagga.start();
});

//Acá, se dispara todo lo que necesitemos una vez se detecte el código por la cámara
Quagga.onDetected(function (data) {
    Quagga.stop() //Detenemos Quagga para que no siga realizando lecturas
    let codigoLeido = data.codeResult.code;
    let match = false //En caso de que no se encuentre una coincidencia entre la lectura y la BD, este valor disparará los eventos que consideremos
    document.querySelector("#resultado_lectura").innerHTML = codigoLeido;

    //Consulta al servidor
    fetch('./listarObjetosControl.php')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            switch (codigoLeido) {//Evaluamos sí el código leído se encuentra en la BD
                case element['inventario_codigo_barras']://En caso de que se encuentre el código, se toman las acciones necesarias
                    document.getElementById("tipo").innerHTML = element.inventario_tipo
                    document.getElementById("marca").innerHTML = element.inventario_marca
                    document.getElementById("modelo").innerHTML = element.inventario_modelo  
                    document.getElementById("serial").innerHTML = element.inventario_serial 
                    document.getElementById("estado").innerHTML = element.inventario_estado  
                    document.getElementById("codigoBarras").innerHTML = element.inventario_codigo_barras 
                    document.getElementById("newReading").style.display = "flex" 
                    match = true
                    break;
            }

        });
            switch (match) {//En caso de que no se encuentre el código, se tomarán las acciones necesarias
                case false:
                    document.getElementById("alert").style.display = "flex"
                    document.getElementById("noFound").innerHTML = codigoLeido
                    document.getElementById("tipo").innerHTML = ""
                    document.getElementById("marca").innerHTML = ""
                    document.getElementById("modelo").innerHTML = ""  
                    document.getElementById("serial").innerHTML = ""
                    document.getElementById("estado").innerHTML = ""
                    document.getElementById("codigoBarras").innerHTML = ""
                    break;
            }
    })
})
   
//Botón que habilita una nueva lectura, sólo aparece cuando la última lectura fue positiva
document.getElementById("newReading").addEventListener("click", ()=> {
    Quagga.init({
        inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#camara')    // Or '#yourElement' (optional)
        },
        decoder : {
        readers : ["code_128_reader"]
        }
    }, 
    
    function(err) {
        if (err) {
            console.log(err);
            return
        }
        Quagga.start();
    });

    document.getElementById("newReading").style.display = "none"
})


//Limpiamos lo resultados anterioes, en caso de no obtener una respuesta positiva
document.getElementById("alertOk").addEventListener("click", ()=> {
    document.getElementById("alert").style.display = "none"
    document.querySelector("#resultado_lectura").innerHTML = "";
    document.getElementById("tipo").innerHTML = ""
    document.getElementById("marca").innerHTML = "" 
    document.getElementById("modelo").innerHTML = "" 
    document.getElementById("serial").innerHTML = ""
    document.getElementById("estado").innerHTML = ""
    document.getElementById("codigoBarras").innerHTML = ""  
    codigo = "";

    Quagga.init({
        inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#camara')    // Or '#yourElement' (optional)
        },
        decoder : {
        readers : ["code_128_reader"]
        }
    }, 
    
    function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
})






    

  
