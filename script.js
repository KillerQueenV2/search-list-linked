let list = {};

const inputField = document.querySelector("input");
const textareaFIeld = document.querySelector("textarea");
const button = document.querySelector("button");
const resultField = document.querySelector("#result");

let founded = [];
let wordArray = [];

button.onclick = () => {
  const { value } = textareaFIeld;
  wordArray = value.split(" ");
  generateLinkedList(wordArray);
  listar();
};

function generateLinkedList(wordArray) {
  for (const i in wordArray) {
    const value = wordArray[wordArray.length - i - 1];
    list = {
      value,
      next: list,
    };
  }
}

let index = 0;
let row = 0;

function listar() {
  let aux = { ...list };
  var novoArray = [];
  var corte = 48;

  for (let i = 0; i < textareaFIeld.value.length; i = i + corte) {
    novoArray.push(textareaFIeld.value.slice(i, i + corte));
  }

  while (aux !== undefined) {
    if (novoArray[row] === undefined) {
      break;
    }

    novoArray.forEach((line, i) => {
      const column = line
        .split(" ")
        .map((e) => e.replace(/\s/g, ""))
        .indexOf(inputField.value);

      const row = i;

      if (column !== -1) {
        const result = {
          column: column + 1,
          row: row + 1,
        };

        localStorage.setItem(
          "result",
          `column: ${result.column} row: ${result.row}`
        );

        resultField.value = localStorage.getItem("result");
      }
    });

    index++;
    row++;
    aux = aux.next;
  }

  founded.forEach(
    (found) =>
      (resultField.value = `
    palavras encontrada: ${found.palavraEncontrada} 
    indice: ${found.indice} 
  `)
  );
  novoArray;
  resetValues();

  location.reload();
}

const resetValues = () => {
  founded = [];
  novoArray = [];
  wordArray = [];
  list = {};
  index = 0;
};
