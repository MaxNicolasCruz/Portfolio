// Función utilitaria para hacer scroll suave hacia una sección específica del documento
export const scrollToSection = (sectionId: string) => {
	// Obtiene el elemento del DOM cuyo id coincide con el parámetro recibido
	const element = document.getElementById(sectionId);

	// Si el elemento existe, realiza un desplazamiento suave hasta su posición
	if (element) {
		element.scrollIntoView({
			behavior: "smooth", // Desplazamiento con animación suave
			block: "start",     // Alinea la parte superior del elemento con la parte superior del viewport
		});
	}
};
