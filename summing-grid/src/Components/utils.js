export const numberValidation = (number) => {
	if (number.trim().length > 0 && /^[0-9]\d*(\.\d+)?$/.test(number)) {
		// if (number.trim().length > 0 && /^[0-9]*$/.test(number)) {
		return null;
	} else {
		return true;
	}
};

export const abbreviatedNumber = (value) => {
	let newValue = value;
	if (value > 100) {
		const suffixes = ["", "K", "M", "B", "T"];
		let suffixNum = 0;
		while (newValue >= 1000) {
			newValue /= 1000;
			suffixNum++;
		}

		newValue = newValue.toPrecision(3);

		newValue += suffixes[suffixNum];
	}

	return newValue;
};

export const addition = (num1, num2, num3) => {
	const add = parseFloat(num1) + parseFloat(num2) + parseFloat(num3);
	// console.log(add);
	return abbreviatedNumber(add);
};
