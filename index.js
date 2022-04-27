const myArray = [
    {
        codigo: "11286886",
        nombre: "test",
        serial: 1234567890
    },
    {
        codigo: "11286485",
        nombre: "test",
        serial: 1234567891
    },
    {
        codigo: "11286243",
        nombre: "test",
        serial: 1234567892
    }
] 


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



Quagga.onDetected(function (data) {
    
    Quagga.stop()
    console.log(data)
    let codigoLeido = data.codeResult.code;
    let match = false
    document.querySelector("#resultado").innerHTML = codigoLeido;

    myArray.forEach(element => {
        if (codigoLeido == element.codigo) {
            match = true
            document.getElementById("code").innerHTML = element.codigo
            document.getElementById("name").innerHTML = element.nombre 
            document.getElementById("serial").innerHTML = element.serial      
            document.getElementById("newReading").style.display = "flex" 
        }else{
                document.getElementById("noFound").innerHTML = codigoLeido
            }

        if (match == false) {
            document.getElementById("alert").style.display = "flex"
        }

        
    });
    
})
   
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
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    document.getElementById("newReading").style.display = "none"
})



document.getElementById("alertOk").addEventListener("click", ()=> {
    document.getElementById("alert").style.display = "none"
    document.querySelector("#resultado").innerHTML = "";
    document.getElementById("code").innerHTML = ""
    document.getElementById("name").innerHTML = "" 
    document.getElementById("serial").innerHTML = ""
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




