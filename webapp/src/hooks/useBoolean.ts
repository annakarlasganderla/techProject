import { useState } from "react";

const useBoolean = (
	bool: boolean = false,
): [boolean, { setTrue: () => void; setFalse: () => void; toggle: () => void }] => {
	const [value, setValue] = useState<boolean>(bool);

	const setTrue = () => setValue(true);
	const setFalse = () => setValue(false);
	const toggle = () => setValue((prevValue) => !prevValue);

	return [value, { setTrue, setFalse, toggle }];
};

export default useBoolean;