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
      // Clear the input and result when the "AC" button is clicked
      case 'AC':
        clearInput();
        break;
      // Divide the current result by 100 when the "%" button is clicked, or add a "%" sign to the input if there is one already
      case '%':
        handlePercentage();
        break;
      // Add any numbers, decimal points, or parentheses to the input
      case '.':
      case '(':
      case ')':
        addToInput(value);
        break;
      // Handle the four basic math operators (+, -, *, /)
      case '/':
      case '*':
      case '-':
      case '+':
        handleOperator(value);
        break;
      // Calculate the result when the "=" button is clicked
      case '=':
        calculate();
        break;
      // Add any other numbers to the input
      default:
        addToInput(parseInt(value));
    }
  });
}

// Add a number, decimal point, or parentheses to the input field, with a limit of 14 characters
function addToInput(value) {
  if (input.length < 14) {
    input += value;
    inputField.textContent = input;
  }
}

// Clear the input and result fields
function clearInput() {
  input = '';
  result = '';
  previousInput = '';
  previousOperator = '';
  inputField.textContent = '';
}

// Handle the percentage button by either dividing the current result by 100 or adding a "%" sign to the input
function handlePercentage() {
  if (input === '') {
    inputField.textContent = result / 100;
    result = result / 100;
  } else {
    addToInput('%');
  }
}

// Handle the four basic math operators (+, -, *, /) by either storing the previous input and operator or calculating the result
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

// Calculate the result based on the previous input, current input, and operator
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
    // Limit the result to 14 characters or less
    if (currentResult.toString().length > 14) {
      currentResult = currentResult.toPrecision(14);
    }
    result = currentResult;
    inputField.textContent = result;
    previousInput = result.toString();
    input = '';
  } catch(e) {
    // Display an error message if the calculation fails
    inputField.textContent = 'Error';
    input = '';
  }
}

