'use strict';

var inputaltura;
var inputpeso;

window.addEventListener('load', ()=>{
    inputaltura = document.querySelector("#altura");
    inputpeso = document.querySelector("#peso");

    inputaltura.addEventListener('keyup', alturaKeyUpEvent);
    inputpeso.addEventListener('keyup', pesoKeyUpEvent);
});

var altura = 0;
var peso = 0;

var alturaKeyUpEvent = (event)=>{    
    if(event.key === 'Enter' && inputaltura.value !== ''){
        inputpeso.focus();
    }
    else
    {
        altura = event.target.value.replace(",", ".");
    }
}

var pesoKeyUpEvent = (event)=>{
    peso = event.target.value.replace(",", ".");

    calcularImc();
}

var calcularImc = ()=>{
    let imc = peso / (altura * altura);

    document.querySelector("#imc").innerHTML = imc.toFixed(2);
    
}