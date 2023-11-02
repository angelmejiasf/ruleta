// Arrays
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
];

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
let cartera = document.getElementById("cartera");
let tokens = document.getElementById("tokens");
let board = document.getElementById("board");
let play = document.getElementById("play");
let fichaValor = 0;
let rouletteimg = document.getElementById("roulette");
let number = document.getElementById("number");
let carteraValorElement = document.getElementById("cartera-valor");
let token = document.getElementById("token");

// Functions
function generatePhrases() {
    for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * frases.length);
        let phrasegenerate = frases.splice(random, 1)[0];
        phrases.innerHTML += phrasegenerate + "<br>";
    }
}

document.addEventListener("DOMContentLoaded", generatePhrases);

// INSERT MONEY
function insertMoney() {
    const inputValue = parseFloat(input.value);

    if (isNaN(inputValue) || inputValue < 1) {
        error.textContent = "Debes insertar al menos 1€ para jugar";
    } else {
        fichauno.style.display = "flex";
        error.textContent = "";
        acumularCartera(inputValue);

        if (carteraValorElement.textContent >= 10) {
            fichadiez.style.display = "flex";
        }
        if (carteraValorElement.textContent >= 25) {
            fichaveinticinco.style.display = "flex";
        }
        if (carteraValorElement.textContent >= 50) {
            fichacincuenta.style.display = "flex";
        }
        if (carteraValorElement.textContent >= 100) {
            fichacien.style.display = "flex";
        }

        play.style.display = "block";
        input.value = "";
    }
}

insert.addEventListener("click", insertMoney);

// SELECT TOKEN
let imgsrc;
function selectToken(event) {
    if (event.target.tagName == "IMG") {
        imgsrc = event.target.getAttribute("src");
        fichaValor = parseFloat(event.target.getAttribute("value"));
        const selectedImage = document.querySelector(".select-token");
        if (selectedImage) {
            selectedImage.classList.remove("select-token");
        }
        event.target.classList.add("select-token");
    }
}

tokens.addEventListener("click", selectToken);

let juegoencurso = false;

// SELECT GRID
function grid(event) {
    if (!juegoencurso && imgsrc.trim() !== "") {
        if (event.target.tagName === 'P') {
            const casilla = event.target;

            // Check if the cell already contains an image
            if (casilla.getElementsByTagName('img').length === 0) {
                addFichaToBoard(casilla);
            }
        }
    }
}

const apuestas = {};

function addFichaToBoard(casilla) {
    if (imgsrc && fichaValor > 0) {
        const carteraValorElement = document.getElementById("cartera-valor");
        const carteraValor = parseFloat(carteraValorElement.textContent);
        const casillaValue = casilla.getAttribute("value");

        if (carteraValor >= fichaValor) {
            
            const imagen = document.createElement('img');
            imagen.style.width = "50px";
            imagen.src = imgsrc;

            casilla.appendChild(imagen);

           
            carteraValorElement.textContent = (carteraValor - fichaValor).toFixed(2);

            
            apuestas[casillaValue] = (apuestas[casillaValue] || 0) + fichaValor;
        } else {
            error.textContent = "No tienes suficiente dinero en la cartera";
        }
    }
}

board.addEventListener("click", grid);

function removeImagesFromBoard() {
    const boardElement = document.getElementById("board");
    const paragraphs = boardElement.getElementsByTagName("p");

    for (let i = 0; i < paragraphs.length; i++) {
        const images = paragraphs[i].getElementsByTagName("img");
        for (let j = images.length - 1; j >= 0; j--) {
            paragraphs[i].removeChild(images[j]);
        }
    }
}

// Wallet
function acumularCartera(valor) {
    const valorEnCartera = parseFloat(carteraValorElement.textContent) || 0;
    carteraValorElement.textContent = (valorEnCartera + valor).toFixed(2);
}

// Roulette
function playroulette() {
    juegoencurso = true;
    rouletteimg.classList.add("roulette-img");

    setTimeout(function () {
        rouletteimg.classList.remove("roulette-img");
        juegoencurso = false;
    }, 10000);
}

function generatenumber() {
    let random = Math.floor(Math.random() * 37); 
    number.textContent = random;

   
    const casilla = document.querySelector(`.numbers-${random}`);
    
    
    let colorCasilla = "verde"; 
    if (casilla) {
        const casillaValue = casilla.getAttribute("data-value");
        const colorPart = casillaValue.split(" ")[0];
        if (colorPart === "red" || colorPart === "black") {
            colorCasilla = colorPart;
        }
    }

   
    const apuestaGanadora = apuestas[colorCasilla];

    if (apuestaGanadora) {
       
        carteraValorElement.textContent = (parseFloat(carteraValorElement.textContent) + apuestaGanadora * 2).toFixed(2);
    }

    removeImagesFromBoard();
}


let delay = 10000;

play.addEventListener("click", function () {
    setTimeout(generatenumber, delay);
    playroulette();
});
