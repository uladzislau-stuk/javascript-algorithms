const calculator = document.querySelector('.calculator');
const clearBtn = document.querySelector('button[data-action="clear"]');

const display = document.querySelector('.calculator__display');
const keys = document.querySelector('.calculator__keys');

const operators = Array.from(document.querySelectorAll('.key--operator'));

const clearSelection = () => operators.forEach(operator => operator.classList.remove('is-depressed'));

const clearActions = () => {
	for (const prop of Object.getOwnPropertyNames(calculator.dataset)) {
		delete calculator[prop];
	}
};

const calculate = (operator) => new Function('n1', 'n2', `return parseFloat(n1)${operator}parseFloat(n2)`);

keys.addEventListener('click', (e) => {
	const key = e.target;
	const keyValue = key.textContent;
	const displayNum = display.textContent;
	const action = key.dataset.action;
	let actions = calculator.dataset;

	const operators = {'add': '+', 'subtract': '-', 'multiply': '×', 'divide': '÷'};

	// numbers
	const isDisplayedNull = displayNum === '0';

	// numbers
	const isNumber = !action;
	if (isNumber) {
		if (actions.previousKey === 'operator') {
			actions.firstNum = displayNum;
		}
		//////
		if (isDisplayedNull ||
			actions.previousKey === 'operator' ||
			actions.previousKey === 'calculate' ||
			display.textContent === 'Error') {
			display.textContent = keyValue;
			clearBtn.textContent = 'C';
		} else {
			display.textContent += keyValue;
		}

		actions.previousKey = 'number';
	}

	// operators
	const isOperator = Object.getOwnPropertyNames(operators).includes(action);
	clearSelection();
	if (isOperator) {
		key.classList.add('is-depressed');

		if (actions.previousKeyOperator) {
			actions.penultimate = actions.previousKeyOperator
		}

		actions.previousKeyOperator = action;
		actions.previousKey = 'operator';
	}

	if (action === 'calculate') {
		if ((displayNum === '0' && actions.previousKey === 'divide') || (displayNum === '0' && actions.previousKeyOperator === 'divide')) {
			display.textContent = 'Error';
			actions.firstNum = display.textContent;
		} else if (actions.previousKey === action || actions.previousKey === 'number' && actions.secondNum) {
			const result = calculate(operators[actions.previousKeyOperator])(displayNum, actions.secondNum);

			actions.firstNum = result;
			display.textContent = result;
		} else if (actions.previousKey === 'clear' && actions.secondNum) {
			display.textContent = actions.secondNum;
		} else if (actions.firstNum && actions.previousKey === 'number') {
			const result = calculate(operators[actions.previousKeyOperator])(actions.firstNum, displayNum);

			// actions.firstNum = result;
			actions.firstNum = '';
			actions.secondNum = displayNum;
			display.textContent = result;
		} else if (actions.previousKey === 'operator') {
			const result = calculate(operators[actions.previousKeyOperator])(displayNum, displayNum);

			actions.firstNum = result;
			actions.secondNum = displayNum;
			display.textContent = result;
		}

		actions.previousKey = action;
	}
	//
	// decimal
	if (action === 'decimal') {
		const decimal = '.';
		const zero = '0';
		const hasDecimal = displayNum.includes(decimal);

		if (
			actions.previousKey === 'operator' ||
			actions.previousKey === 'calculate'
		) {
			display.textContent = zero + decimal;
		} else if (!hasDecimal) {
			display.textContent += decimal;
		}

		actions.previousKey = action;
	}

	// clear
	if (action === 'clear') {
		const zero = '0';
		let prevActiveOperator;
		//
		if (actions.previousKey === action) {
			clearActions();
		} else if (actions.firstNum &&
			actions.previousKeyOperator) {
			prevActiveOperator = document.querySelector(`button[data-action='${actions.previousKeyOperator}'`);
			prevActiveOperator.classList.add('is-depressed');
			display.textContent = zero;
			clearBtn.textContent = 'AC';
		} else if (displayNum !== zero) {
			display.textContent = zero;
			clearBtn.textContent = 'AC';
			clearSelection();
		}
		////
		actions.previousKey = action;
	}
});