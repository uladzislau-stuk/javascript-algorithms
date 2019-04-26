let arr = [1, 99, 22, 104, 55, 0, 4, 12, 130, 434, 5353, 535];

const bubbleSortAsc = (arr) => {
	const length = arr.length;

	if (!length) {
		return;
	}

	for (let i = 1; i < length; i++) {
		for (let j = 1; j < length; j++) {
			if (arr[j] < arr[j - 1]) {
				let temp = arr[j - 1];
				arr[j - 1] = arr[j];
				arr[j] = temp;
			}
		}
	}

	return arr;
};

console.log(bubbleSortAsc(arr));