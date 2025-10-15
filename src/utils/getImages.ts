// 📦 Importación de módulos nativos de Node.js
import fs from "fs"; // Módulo para interactuar con el sistema de archivos
import path from "path"; // Módulo para manejar y resolver rutas de archivos

/**
 * 📁 getImages
 *
 * Obtiene todas las imágenes (con extensiones válidas) ubicadas dentro de una carpeta específica
 * en el directorio `public/projectsImg`.
 *
 * @param {string} imgPath - Nombre de la subcarpeta dentro de `public/projectsImg`
 *                           donde se encuentran las imágenes del proyecto.
 * @returns {string[]} - Lista de rutas relativas accesibles desde el navegador
 *                       (por ejemplo: `/projectsImg/project1/image1.jpg`).
 */
export const getImages = (imgPath: string): string[] => {
	// 🧭 Construye la ruta absoluta al directorio de imágenes
	const directoryPath = path.join(process.cwd(), "public/projectsImg", imgPath);

	return (
		fs
			// 📂 Lee de manera síncrona todos los archivos dentro del directorio especificado
			.readdirSync(directoryPath)
			// 🧹 Filtra solo los archivos con extensiones de imagen válidas
			.filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file))
			// 🔗 Genera las rutas relativas que se pueden usar en componentes <Image /> o etiquetas <img>
			.map((file) => `/projectsImg/${imgPath}/${file}`)
	);
};
