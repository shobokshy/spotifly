import React from 'react';

export const useIntersect = ({
	root,
	rootMargin,
	threshold,
}: {
	root?: HTMLElement;
	rootMargin?: string;
	threshold?: number | number[];
}): [
	React.Dispatch<React.SetStateAction<HTMLElement | null | undefined>>,
	IntersectionObserverEntry | undefined
] => {
	const [entry, updateEntry] = React.useState<IntersectionObserverEntry>();
	const [node, setNode] = React.useState<HTMLElement | null>();

	const observer = React.useRef(
		new window.IntersectionObserver(([entry]) => updateEntry(entry), {
			root,
			rootMargin,
			threshold,
		})
	);

	React.useEffect(() => {
		const { current: currentObserver } = observer;

		currentObserver.disconnect();

		if (node) currentObserver.observe(node);

		return () => currentObserver.disconnect();
	}, [node]);

	return [setNode, entry];
};
