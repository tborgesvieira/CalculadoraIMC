'use strict';

var inputaltura;
var inputpeso;

window.addEventListener('load', () => {
    inputaltura = document.querySelector("#altura");
    inputpeso = document.querySelector("#peso");

    inputaltura.addEventListener('keyup', alturaKeyUpEvent);
    inputpeso.addEventListener('keyup', pesoKeyUpEvent);

    inputaltura.focus();
});

var altura = 0;
var peso = 0;

var alturaKeyUpEvent = (event) => {
    if (event.key === 'Enter' && inputaltura.value !== '') {
        inputpeso.focus();
    }
    else {
        altura = event.target.value.replace(",", ".");        
    }
}

var pesoKeyUpEvent = (event) => {
    peso = event.target.value.replace(",", ".");

    if (peso > 10) {
        let imc = calcularImc(peso, altura);

        document.querySelector("#imc").innerHTML = imc;

        progressBar(imc);

        explicacao(imc);

    } else {
        document.querySelector("#imc").innerHTML = 0;

        document.querySelector("#explicacao").innerHTML = "";

        progressBar(0);
    }
}

var calcularImc = (p, a) => {
    return (p / (a * a)).toFixed(2);
}

var progressBar = (imc) => {

    let bg = "";

    let percent = 0;

    if (imc === 0) {
        percent = 0;        
    } else if (imc < 18.5) {
        bg = "bg-danger";
        percent = 25;        
    }
    else if (imc >= 18.5 && imc < 25) {
        bg = "bg-success"
        percent = 50;
    }
    else if (imc >= 25 && imc < 30) {
        bg = "bg-warning"
        percent = 70;        
    } else {
        bg = "bg-danger"
        percent = 100;        
    }

    if(imc !== 0)    
        explicacao(imc);
    else
        document.querySelector("#explicacao").innerHTML="";

    var div = `<div class="progress-bar progress-bar-striped ${bg}" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>`;

    document.querySelector(".progress").innerHTML = div;
}

var pesoIdeal = () => {
    let p = peso;
    let a = altura;

    let imc = calcularImc(p, a);

    if (imc < 18.5) {

        while (imc < 18.5) {
            p = (+p + 0.1).toFixed(2);
            imc = calcularImc(p, a);
        }
    }
    else if (imc > 24.99) {
        while (imc > 24.99) {            
            p = (p - 0.1).toFixed(2);
            imc = calcularImc(p, a);
        }
    }

    return p;
}

var explicacao = (imc) => {
    let texto = ` - o ideal para sua altura seria de ${pesoIdeal().replace(".",",")} Kg`;
    let div = document.querySelector("#explicacao");

    switch (true) {
        case imc < 17:
            div.innerHTML = 'Muito abaixo do peso' + texto;
            break;
        case imc < 18.5:
            div.innerHTML = 'Abaixo do peso' + texto;
            break;
        case imc < 25:
            div.innerHTML = "Peso normal";
            break;
        case imc < 30:
            div.innerHTML = 'Acima do peso' + texto;
            break;
        case imc < 35:
            div.innerHTML = 'Obesidade I' + texto;
            break;
        case imc < 40:
            div.innerHTML = 'Obesidade II (severa)' + texto;
            break;
        case imc >= 40:
            div.innerHTML = 'Obesidade III (mórbida)' + texto;
            break;
    }
}