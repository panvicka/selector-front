export const findByKeyInArray = (key, keyValue, array) => {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === keyValue) {
			return array[i];
		}
	}

	return -1;
};

export const findIndexByKeyInArray = (key, keyValue, array) => {
	for (var i = 0; i < array.length; i++) {
		if (array[i][key] === keyValue) {
			return i;
		}
	}

	return -1;
};

export const addToArrayIfKeyValueDoesntExist = (array, key, object) => {
	if (findByKeyInArray(key, object[key], array) == -1) {
		array.push(object);
		return array;
	} else {
		return array;
	}
};

export const removeFromArrayBasedOnKey = (key, keyValue, array) => {
	for (var i = 0; i < array.length; i++)
		if (array[i][key] === keyValue) {
			array.splice(i, 1);
			return array;
		}

	return array;
};

export const replaceKeyValueInToArrayIfKeyExistOrAdd = (array, keyToExist, object) => {
	let index = findIndexByKeyInArray(keyToExist, object[keyToExist], array);
	if (index == -1) {
		array.push(object);
		return array;
	} else {
		array = removeFromArrayBasedOnKey(keyToExist, object[keyToExist], array);
		array.push(object);
		return array;
	}
};
