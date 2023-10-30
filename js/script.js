let frases = [
    "La rompe familias",
    "La roba ilusiones",
    "La tramposa",
    "La adictiva",
    "La hechicera",
    "La afortunada",
    "La frustra vidas",
    "La embaucadora",
    "La deshonesta",
    "La manipuladora",
    "La Come Cocos",
    "La Cuatro Stackciones",
    "La Divide Finiquitos",
    "La Chupa Sangre",
    "La Humilla Pelas",
    "La Fabrica Ilusiones",

]

// VARIABLES

let phrases = document.getElementById("frases");
let input = document.getElementById("input");
let insert = document.getElementById("insert");
let error = document.getElementById("error");
let fichauno = document.getElementById("uno");
let fichadiez = document.getElementById("diez");
let fichaveinticinco = document.getElementById("veinticinco");
let fichacincuenta = document.getElementById("cincuenta");
let fichacien = document.getElementById("cien");
let money = document.getElementById("money");
let titlemoney = document.getElementById("title__money");
let cartera = document.getElementById("cartera");
let tokens=document.getElementById("tokens");
let board=document.getElementById("board")

// FUNCTIONS
function generatePharases() {
    for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * frases.length);
        let phrasegenerate = frases[random];
        phrases.innerHTML += phrasegenerate + "<br>";
    }



}

document.addEventListener("DOMContentLoaded", generatePharases)

// INSERT MONEY
function insertMoney() {


    if (input.value <= 1) {
        error.textContent = "Debes insertar mas de 1€ para jugar"
    }
    if (input.value >= 1) {
        fichauno.style.display = "flex";
        error.textContent = "";


        if (input.value >= 10) {
            fichadiez.style.display = "flex";

        }
        if (input.value >= 25) {
            fichaveinticinco.style.display = "flex"
        }

        if (input.value >= 50) {
            fichacincuenta.style.display = "flex";

        }

        if (input.value >= 100) {
            fichacien.style.display = "flex";
        }

        input.style.display = "none";
        insert.style.display = "none";
        titlemoney.style.display = "none";
        cartera.style.display = "block"
    }
}

insert.addEventListener("click", insertMoney)

// SELECT TOKEN
let imgsrc;
function selectToken(event){
    if(event.target.tagName=="IMG"){
        imgsrc=event.target.getAttribute("src")
        
    }
}

tokens.addEventListener("click",selectToken)

// SELECT GRID
function grid(event){
    if (event.target.tagName === 'P') {
        const casilla = event.target;
    
        // Crea una imagen
        const imagen = document.createElement('img');
        imagen.style.width="50px"
        imagen.src = imgsrc;

        casilla.appendChild(imagen);
}
}
board.addEventListener("click",grid)

