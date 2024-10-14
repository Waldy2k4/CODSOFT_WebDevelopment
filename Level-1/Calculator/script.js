let currentInput = "";
let previousInput = "";
let operator = null;
let history = [];

const outputElement = document.getElementById('output');
const historyElement = document.getElementById('history');

function appendNumber(number) {
    if (currentInput.length < 12) { 
        currentInput += number.toString();
        updateDisplay();
    }
}

function calculate(op) {
    if (op === '=') {
        if (currentInput && previousInput && operator) {
            let result = eval(previousInput + operator + currentInput);
            history.push(`${previousInput} ${operator} ${currentInput} = ${result}`);
            previousInput = result;
            currentInput = '';
            operator = null;
            updateHistory();
        }
    } else {
        if (currentInput) {
            if (previousInput) {
                let result = eval(previousInput + operator + currentInput);
                previousInput = result;
            } else {
                previousInput = currentInput;
            }
            currentInput = '';
            operator = op;
        }
    }
    updateDisplay();
}

function clearHistory() {
    currentInput = '';
    previousInput = '';
    operator = null;
    history = [];
    updateDisplay();
    updateHistory();
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function negate() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function updateDisplay() {
    outputElement.innerText = currentInput || previousInput || "0";
}

function updateHistory() {
    historyElement.innerText = history.join('\n');
}
