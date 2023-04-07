const inputField = document.getElementById('input-field');
const buttons = document.querySelectorAll('input');

let input = '';
let result = '';
let previousInput = '';
let previousOperator = '';

for (const button of buttons) {
  button.addEventListener('click', () => {
    const value = button.value;
    switch(value) {
      case 'AC':
        clearInput();
        break;
      case '%':
        handlePercentage();
        break;
      case '.':
      case '(':
      case ')':
        addToInput(value);
        break;
      case '/':
      case '*':
      case '-':
      case '+':
        handleOperator(value);
        break;
      case '=':
        calculate();
        break;
      default:
        addToInput(parseInt(value));
    }
  });
}

function addToInput(value) {
  if (input.length < 10) {
    input += value;
    inputField.textContent = input;
  }
}

function clearInput() {
  input = '';
  result = '';
  previousInput = '';
  previousOperator = '';
  inputField.textContent = '';
}

function handlePercentage() {
  if (input === '') {
    inputField.textContent = result / 100;
    result = result / 100;
  } else {
    addToInput('%');
  }
}

function handleOperator(operator) {
  if (previousInput === '') {
    previousInput = input;
    previousOperator = operator;
    input = '';
  } else {
    calculate();
    previousOperator = operator;
  }
}

function calculate() {
  try {
    const currentInput = parseFloat(input);
    const previousInputValue = parseFloat(previousInput);
    let currentResult = currentInput;
    switch (previousOperator) {
      case '/':
        currentResult = previousInputValue / currentInput;
        break;
      case '*':
        currentResult = previousInputValue * currentInput;
        break;
      case '-':
        currentResult = previousInputValue - currentInput;
        break;
      case '+':
        currentResult = previousInputValue + currentInput;
        break;
    }
    if (currentResult.toString().length > 14) {
      currentResult = currentResult.toPrecision(14);
    }
    result = currentResult;
    inputField.textContent = result;
    previousInput = result.toString();
    input = '';
  } catch(e) {
    inputField.textContent = 'Error';
    input = '';
  }
}

