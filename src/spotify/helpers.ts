export const parseMS = (ms: number) => {
	let hours: number, minutes: number, seconds: number;
	seconds = Math.floor(ms / 1000);
	minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;
	hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	hours = hours % 24;
	return {
		hours,
		minutes,
		seconds,
	};
};

export const padWithZero = (number: number, size: number) => {
	let s = number + '';
	while (s.length < size) s = '0' + s;
	return s;
};

export const msToString = (ms: number) => {
	const parsed = parseMS(ms);
	return `${parsed.minutes}:${padWithZero(parsed.seconds, 2)}`;
};
