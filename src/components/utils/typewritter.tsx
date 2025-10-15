"use client";
import { useEffect, useState } from "react";

export default function Typewriter({
	text,
	speed = 80,
}: {
	text: string;
	speed?: number;
}) {
	// Paso 1: SSR muestra el texto completo
	const [displayedText, setDisplayedText] = useState(text);

	useEffect(() => {
		// Paso 2: Solo en cliente, animamos desde vacío
		setDisplayedText("");
		let i = 0;
		const interval = setInterval(() => {
			setDisplayedText(text.slice(0, i));
			i++;
			if (i > text.length) clearInterval(interval);
		}, speed);

		return () => clearInterval(interval);
	}, [text, speed]);

	return (
		<span>
			{displayedText}
			<span className="animate-pulse text-glow-purple-pizzazz-40">|</span>
		</span>
	);
}
