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
let money = document.getElementById("money");
let titlemoney = document.getElementById("title__money");
let cartera = document.getElementById("cartera");
let tokens = document.getElementById("tokens");
let board = document.getElementById("board");
let play=document.getElementById("play");
let fichaValor = 0;
let rouletteimg=document.getElementById("roulette");
let number=document.getElementById("number")

// Functions
function generatePhrases() {
    for (let i = 0; i < 3; i++) {
        let random = Math.floor(Math.random() * frases.length);
        let phrasegenerate = frases[random];
        phrases.innerHTML += phrasegenerate + "<br>";
    }
}

document.addEventListener("DOMContentLoaded", generatePhrases);

// INSERT MONEY
function insertMoney() {
    const inputValue = parseFloat(input.value);

    if (isNaN(inputValue) || inputValue < 1) {
        error.textContent = "Debes insertar más de 1€ para jugar";
    } else {
        fichauno.style.display = "flex";
        error.textContent = "";
        acumularCartera(inputValue);

        if (inputValue >= 10) {
            fichadiez.style.display = "flex";
        }
        if (inputValue >= 25) {
            fichaveinticinco.style.display = "flex";
        }
        if (inputValue >= 50) {
            fichacincuenta.style.display = "flex";
        }
        if (inputValue >= 100) {
            fichacien.style.display = "flex";
        }

        input.style.display = "none";
        insert.style.display = "none";
        titlemoney.style.display = "none";
        cartera.style.display = "block";
        play.style.display="block";
        
    }
}

insert.addEventListener("click", insertMoney);

// SELECT TOKEN
let imgsrc;
function selectToken(event) {
    if (event.target.tagName == "IMG") {
        imgsrc = event.target.getAttribute("src");
        fichaValor = parseFloat(event.target.getAttribute("value"));
    }
}

tokens.addEventListener("click", selectToken);

// SELECT GRID
function grid(event) {
    if (imgsrc.trim() !== "") {
        if (event.target.tagName === 'P') {
            const casilla = event.target;

            // Check if the cell already contains an image
            if (casilla.getElementsByTagName('img').length === 0) {
                addFichaToBoard(casilla);
            }
        }
    }
}

function addFichaToBoard(casilla) {
    if (imgsrc && fichaValor > 0) {
        const carteraValorElement = document.getElementById("cartera-valor");
        const carteraValor = parseFloat(carteraValorElement.textContent);

        if (carteraValor >= fichaValor) {
            // Create an image
            const imagen = document.createElement('img');
            imagen.style.width = "50px";
            imagen.src = imgsrc;

            casilla.appendChild(imagen);

            // Subtract the value of the ficha from the cartera
            carteraValorElement.textContent = (carteraValor - fichaValor).toFixed(2);
        } else {
            error.textContent="No tienes mas dinero en la cartera"
        }
    }
}

board.addEventListener("click", grid);

function removeImagesFromBoard() {
    const boardElement = document.getElementById("board");
    const images = boardElement.querySelectorAll("p img");
    
    images.forEach((image) => {
        boardElement.removeChild(image);
    });
}


// Wallet
function acumularCartera(valor) {
    const carteraValorElement = document.getElementById("cartera-valor");
    const valorEnCartera = parseFloat(carteraValorElement.textContent) || 0;
    carteraValorElement.textContent = (valorEnCartera + valor).toFixed(2);
}


//Roulette
function playroulette() {
    rouletteimg.classList.add("roulette-img");
  
    setTimeout(function() {
      rouletteimg.classList.remove("roulette-img");
    }, 10000);
  }
  
  function generatenumber() {
    let random = Math.floor(Math.random() * (36 - 1 + 1) + 1);
    number.textContent = random;
    
    removeImagesFromBoard();
  }
  
  let delay = 10000;
  
  play.addEventListener("click", function() {
    
    setTimeout(generatenumber, delay);
    playroulette();
  });
  