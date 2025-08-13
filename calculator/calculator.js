// Get DOM elements
const display = document.getElementById("display");
const one = document.getElementById("button1");
const two = document.getElementById("button2");
const three = document.getElementById("button3");
const four = document.getElementById("button4");
const five = document.getElementById("button5");
const six = document.getElementById("button6");
const seven = document.getElementById("button7");
const eight = document.getElementById("button8");
const nine = document.getElementById("button9");
const zero = document.getElementById("button0");
const minus = document.getElementById("buttonMinus");
const equal = document.getElementById("buttonEqual");
const multiply = document.getElementById("buttonMultiply");
const addition = document.getElementById("buttonAdd");
const division = document.getElementById("buttonDiv");
const clear = document.getElementById("buttonClear");
const deleteBtn = document.getElementById("buttonDelete");
const percent = document.getElementById("buttonPercent");
const dot = document.getElementById("buttonDot");

// Calculator state
let currentInput = "";
let operator = "";
let previousInput = "";

// Helper function to update display
function updateDisplay(value) {
  display.value = value || "0";
}

// Helper function to handle number input
function inputNumber(num) {
  if (currentInput.length < 10) {
    currentInput += num;
    updateDisplay(currentInput);
  }
}

// Helper function to handle operator input
function inputOperator(op) {
  if (currentInput === "" && previousInput === "") return;

  if (currentInput === "" && previousInput !== "") {
    operator = op;
    return;
  }

  if (previousInput !== "" && currentInput !== "" && operator !== "") {
    calculate();
  }

  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

// Calculate function
function calculate() {
  if (previousInput === "" || currentInput === "" || operator === "") return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Cannot divide by zero!");
        clearCalculator();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  if (currentInput.length > 10) {
    currentInput = result.toFixed(8).toString();
    if (currentInput.length > 10) {
      currentInput = result.toExponential(5);
    }
  }

  updateDisplay(currentInput);
  previousInput = "";
  operator = "";
}

// Clear calculator (AC - All Clear)
function clearCalculator() {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay("0");
}

// Delete last character (backspace functionality)
function deleteLastChar() {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  }
}

// Calculate percentage
function calculatePercent() {
  if (currentInput !== "") {
    const current = parseFloat(currentInput);
    const result = current / 100;
    currentInput = result.toString();
    updateDisplay(currentInput);
  }
}

// Add event listeners for numbers
one.addEventListener("click", () => inputNumber("1"));
two.addEventListener("click", () => inputNumber("2"));
three.addEventListener("click", () => inputNumber("3"));
four.addEventListener("click", () => inputNumber("4"));
five.addEventListener("click", () => inputNumber("5"));
six.addEventListener("click", () => inputNumber("6"));
seven.addEventListener("click", () => inputNumber("7"));
eight.addEventListener("click", () => inputNumber("8"));
nine.addEventListener("click", () => inputNumber("9"));
zero.addEventListener("click", () => inputNumber("0"));
dot.addEventListener("click", () => inputNumber("."));

// Add event listeners for operators
addition.addEventListener("click", () => inputOperator("+"));
minus.addEventListener("click", () => inputOperator("-"));
multiply.addEventListener("click", () => inputOperator("*"));
division.addEventListener("click", () => inputOperator("/"));

// Add event listeners for special buttons
equal.addEventListener("click", calculate);
clear.addEventListener("click", clearCalculator);
percent.addEventListener("click", calculatePercent);

// Add delete button event listener (only if the button exists)
if (deleteBtn) {
  deleteBtn.addEventListener("click", deleteLastChar);
}

// Initialize display
updateDisplay("0");
