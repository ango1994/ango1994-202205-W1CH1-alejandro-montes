const keys = document.querySelector(".calculator_keys");
const calculatorDisplay = document.querySelector(".calculator_display");

let input1;
let input2;
let operator;
let result;
let next = false;

keys.addEventListener("click", (event) => {
  const key = event.target;
  const keyValue = key.innerText;

  createInput1(key, keyValue);

  createOperator(key, keyValue);

  createInput2(key, keyValue);

  calculate(key);

  clear(key);

  deleteNumber(key);
});

function createInput1(key, keyValue) {
  if (key.classList.contains("number")) {
    if (!input1 && !input2) {
      input1 = keyValue;
      calculatorDisplay.innerText = input1;
    } else if (!operator && keyValue === ".") {
      if (!input1.includes(".")) {
        input1 += keyValue;
        calculatorDisplay.innerText = input1;
      }
    } else if (input1 && !input2 && !operator) {
      input1 += keyValue;
      calculatorDisplay.innerText = input1;
    }
  }
  console.log(input1);
}

function createOperator(key, keyValue) {
  if (key.classList.contains("operator")) {
    if (input1 && input2) {
      next = true;
      calculate(key);
    }
    if (input1 && next === false) {
      operator = keyValue;
    }
  }
}

function createInput2(key, keyValue) {
  if (key.classList.contains("number")) {
    if (input1 && operator && !input2) {
      input2 = keyValue;
      calculatorDisplay.innerText = input2;
    } else if (operator && keyValue === ".") {
      if (!input2.includes(".")) {
        input2 += keyValue;
        calculatorDisplay.innerText = input2;
      }
    } else if (input1 && input2) {
      input2 += keyValue;
      calculatorDisplay.innerText = input2;
    }
  }
}

function calculate(key) {
  if (key.classList.contains("equal") || next === true) {
    if (input1 && input2) {
      if (operator === "+") {
        result = parseFloat(input1) + parseFloat(input2);
        calculatorDisplay.innerText = checkFloat(result);
      }
      if (operator === "-") {
        result = parseFloat(input1) - parseFloat(input2);
        calculatorDisplay.innerText = checkFloat(result);
      }
      if (operator === "÷") {
        result = parseFloat(input1) / parseFloat(input2);
        calculatorDisplay.innerText = checkFloat(result);
      }
      if (operator === "×") {
        result = parseFloat(input1) * parseFloat(input2);
        calculatorDisplay.innerText = checkFloat(result);
      }
      next = false;
      input1 = result;
      input2 = undefined;
      operator = undefined;
    }
  }
}

function clear(key) {
  if (key.classList.contains("clear")) {
    input1 = undefined;
    input2 = undefined;
    operator = undefined;
    result = undefined;
    calculatorDisplay.innerText = 0;
  }
}

function checkIsInt(num) {
  if (num % 1 === 0) {
    return;
  }
}

function checkFloat(num) {
  if (!(num % 1 === 0)) {
    return Math.round(num * 10000) / 10000;
  } else {
    return num;
  }
}

function deleteNumber(key) {
  if (key.classList.contains("del")) {
    if (input1 && !input2 && !operator) {
      input1 = input1.slice(0, -1);
      calculatorDisplay.innerText = input1;
    } else {
      input2 = input2.slice(0, -1);
      calculatorDisplay.innerText = input2;
    }
  }
}
