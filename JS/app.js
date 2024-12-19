const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
    if (button.classList.contains('clear')) {
        button.addEventListener('click', clearDisplay);
    } else if (button.classList.contains('number')) {
        button.addEventListener('click', () => appendNumber(button.dataset.number));
    } else if (button.classList.contains('operator')) {
        button.addEventListener('click', () => appendOperator(button.dataset.operator));
    } else if (button.classList.contains('backspace')) {
        button.addEventListener('click', backspace);
    } else if (button.classList.contains('equals')) {
        button.addEventListener('click', calculate);
    }
});

function clearDisplay() {
    display.textContent = '0';
}

function appendNumber(number) {

    if (number === '.' && display.textContent.includes('.')) return;

    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = number;
    } else {
        display.textContent += number;
    }
}

function appendOperator(operator) {
    const lastChar = display.textContent.slice(-1);

    if (display.textContent === 'Error') {
        display.textContent = '0';
    }

    if ('+-*/%'.includes(lastChar)) {
        display.textContent = display.textContent.slice(0, -1) + operator;
    } else {
        display.textContent += operator;
    }
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1) || '0';
}

function calculate() {
    try {
        const result = eval(display.textContent.replace('÷', '/').replace('×', '*'));
        display.textContent = result.toString().length > 15 ? result.toExponential(5) : result;
    } catch {
        display.textContent = 'Error';
    }
}
