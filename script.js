let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperator(parseFloat(buffer));
      previousOperator = null;
      buffer = runningTotal.toString();
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1 || buffer === "0") {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseFloat(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperator(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperator(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷") {
    if (intBuffer === 0) {
      alert("Cannot divide by zero");
      buffer = "0";
      runningTotal = 0;
      return;
    }
    runningTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  const buttons = document.querySelectorAll(".calc-button");
  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
  });
}

init();
