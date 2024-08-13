// Initial Data
let square = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "o",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};

let player = "";
let warning = "";
let playing = false;

// Functions
const togglePlayer = () => {
  player = player === "x" ? "o" : "x";
  renderInfo();
};

const itemClick = (e) => {
  //ao clicar, pega a class do quadrado
  let item = e.target.getAttribute("data-item");
  //ao clicar, se o quadrado estiver vazio...
  if (square[item] === "" && playing) {
    //o quadrado sera igual ao player (x ou o)
    square[item] = player;
    //renderize o square de novo
    renderSquare();

    checkGame();
    //troque o player
    togglePlayer();
  }
};

//renderiza 'square' no DOM de fato
const renderSquare = () => {
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`);
    // console.log(square[i]);
    item.innerHTML = square[i];
  }

  // checkGame();
};

//renderiza 'player e warning' no DOM de fato
const renderInfo = () => {
  document.querySelector(".vez").innerHTML = player;
  document.querySelector(".resultado").innerHTML = warning;
};

//limpa square, e reinicia playing(x ou o) e warning(vazio)
const reset = () => {
  //reseta msg 'fulano ganhou' para --
  warning = "";

  //aleatoriedade player
  let random = Math.floor(Math.random() * 2); //random gera entre 0 e 1 e, ou seja, sempre 0-1
  player = random === 0 ? "x" : "o";

  //limpa square
  for (let i in square) {
    square[i] = ""; //square.a1 ou square['a1'] (esse caso)
  }

  //ativa playing, ou seja, não está travado o jogo
  playing = true;

  renderSquare();
  renderInfo();
};

// Events
document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
});

const checkGame = () => {
  if (checkWinnerFor("x")) {
    warning = 'O "x" venceu';
    playing = false;
  } else if (checkWinnerFor("o")) {
    warning = 'O "o" venceu';
    playing = false;
  } else if (isFull()) {
    warning = "Deu empate";
    playing = false;
  };
  
  renderInfo();
};

const checkWinnerFor = (player) => {
  let pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",
    "a1,b1,c1",  // Removi o espaço extra aqui
    "a2,b2,c2",
    "a3,b3,c3",
    "a1,b2,c3",
    "a3,b2,c1",
  ];

  for (let w in pos) {
    let pArray = pos[w].split(","); // [a1,a2,a3], [b1,b2,b3], ...
    let hasWon = pArray.every((option) => square[option] === player);
    
    if (hasWon) {
      return true; // Retorna true se uma combinação vencedora for encontrada
    }
  }

  return false; // Retorna false apenas após todas as combinações serem verificadas
};


const isFull = () => {
  for(let i in  square) {
    //se algum quadrado estiver vazio, retorne false
    if(square[i] === '')
    return false;
  }

  return true;
}
reset();

