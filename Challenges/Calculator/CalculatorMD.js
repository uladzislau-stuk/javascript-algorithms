// https://codepen.io/anon/pen/JVvvjJ?editors=0010
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const calculate = (operator) => new Function('n1', 'n2', `return parseFloat(n1)${operator}parseFloat(n2)`)

const operators = {'add': '+', 'subtract': '-', 'multiply': '*', 'divide': '/'};

const clearButton = calculator.querySelector('[data-action=clear]')

// const clearActions = () => {
// 	for (const prop of Object.getOwnPropertyNames(calculator.dataset)) {
// 		delete calculator.dataset[prop];
// 	}
// };

keys.addEventListener('click', (e) => {
	const key = e.target
	const action = key.dataset.action
	const keyContent = key.textContent
	const displayNum = display.textContent
	const actions = calculator.dataset

	const previousKeyType = actions.previousKeyType

	const dot = '.'

	Array.from(key.parentNode.children)
		.forEach(button => button.classList.remove('is-depressed'))

	if (!action) {
		// const secondValue = displayNum
		if (
			displayNum === '0' ||
			previousKeyType === 'operator' ||
			previousKeyType === 'calculate'
		) {
			display.textContent = keyContent
		} else {
			display.textContent += keyContent
		}

		actions.previousKeyType = 'number'
	}

	if (
		action === 'add' ||
		action === 'subtract' ||
		action === 'multiply' ||
		action === 'divide'
	) {
		const firstValue = actions.firstValue
		const operator = actions.operator
		const secondValue = displayNum
		// Note: It's sufficient to check for firstValue and operator because secondValue always exists
		if (firstValue && operator && actions.previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
			const calcValue = calculate(operators[operator])(firstValue, secondValue)

			display.textContent = calcValue
			// Update calculated value as firstValue
			actions.firstValue = calcValue
		} else {
			// If there are no calculations, set displayedNum as the firstValue
			actions.firstValue = displayNum
		}

		key.classList.add('is-depressed')
		actions.previousKeyType = 'operator'
		actions.operator = action
	}

	if (action === 'decimal') {
		if (
			!displayNum.includes(dot)
		) {
			display.textContent += dot
		} else if (
			previousKeyType === 'operator' ||
			previousKeyType === 'calculate'
		) {
			display.textContent = '0.'
		}

		actions.previousKeyType = action
	}

	if (action === 'clear') {
		if (actions.previousKeyType === action) {
			actions.firstValue = ''
			actions.modValue = ''
			actions.operator = ''
			actions.previousKeyType = ''
		} else {
			display.textContent = '0'
		}

		key.textContent = 'AC'
		actions.previousKeyType = 'clear'
	}

	if (action === 'calculate') {
		const operator = actions.operator
		let firstValue = actions.firstValue
		let secondValue = displayNum

		if(firstValue) {
			if (previousKeyType === action) {
				firstValue = displayNum
				secondValue = actions.modValue
			}

			display.textContent = calculate(operators[operator])(firstValue, secondValue)
		}

		actions.modValue = secondValue
		actions.previousKeyType = action
	}
});
