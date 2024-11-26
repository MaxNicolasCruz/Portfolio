import { useEffect, useState } from "react";

function useToggle() {
	const [classDark, setClassDark] = useState<string | null>(null);

	useEffect(() => {
		let htmlElement = document.documentElement;

		// Función para actualizar el estado basado en la clase del HTML
		const updateClassDark = () => {
			const hasDarkClass = htmlElement.classList.contains("dark");
			setClassDark(hasDarkClass ? "dark" : "no-dark");
		};

		// Crear un MutationObserver para observar cambios en la clase
		const observer = new MutationObserver(updateClassDark);

		observer.observe(htmlElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		// Llamar a la función inicialmente para configurar el estado
		updateClassDark();

		// Limpiar el observer cuando el hook se desmonte
		return () => observer.disconnect();
	}, []);

	return classDark;
}

export default useToggle;
