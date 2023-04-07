const inputField = document.getElementById('input-field');
const buttons = document.querySelectorAll('input');

let input = '';
let result = '';

for (const button of buttons) {
  button.addEventListener('click', () => {
    const value = button.value;
    switch(value) {
      case 'AC':
        clearInput();
        break;
      case '%':
      case '/':
      case '*':
      case '-':
      case '+':
      case '.':
      case '(':
      case ')':
        addToInput(value);
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
  inputField.textContent = '';
}

function calculate() {
  try {
    result = eval(input);
    if (result.toString().length > 14) {
      result = result.toPrecision(14);
    }
    inputField.textContent = result;
    input = '';
  } catch(e) {
    inputField.textContent = 'Error';
    input = '';
  }
}

