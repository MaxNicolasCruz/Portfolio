// 📦 Importación de módulos nativos de Node.js
import fs from "fs"; // Módulo para acceder y manipular el sistema de archivos
import path from "path"; // Módulo para manejar rutas de archivos de forma segura y multiplataforma

/**
 * ⚙️ getStaticProps
 *
 * Función asíncrona utilizada por Next.js para obtener datos en tiempo de compilación (Static Generation).
 *
 * En este caso, se usa para:
 *  - Leer las carpetas dentro de `public/projectsImg`
 *  - Obtener todas las imágenes de cada proyecto
 *  - Devolver una lista estructurada de proyectos con sus respectivas imágenes
 *
 * @returns {Promise<{ props: { projects: { name: string; folder: string; images: string[] }[] } }>}
 *          Un objeto con la propiedad `props` que contiene un array de proyectos,
 *          donde cada proyecto tiene su nombre, carpeta y lista de imágenes.
 */
export async function getStaticProps() {
	// 🧭 Construye la ruta absoluta a la carpeta que contiene las carpetas de proyectos
	const projectFolderPath = path.join(process.cwd(), "public", "projectsImg");

	// 📂 Obtiene una lista con los nombres de las carpetas dentro de `projectsImg`
	const projectFolders = fs.readdirSync(projectFolderPath);

	// 🧩 Recorre cada carpeta de proyecto para recopilar sus imágenes
	const projects = projectFolders.map((folder) => {
		// 🗂️ Ruta completa a la carpeta de imágenes del proyecto actual
		const imagesPath = path.join(projectFolderPath, folder);

		// 🖼️ Lee todos los archivos de la carpeta y filtra solo las imágenes válidas
		const images = fs
			.readdirSync(imagesPath) // Obtiene los nombres de los archivos dentro de la carpeta
			.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) // Acepta solo formatos de imagen comunes (case-insensitive)
			.map((image) => `/projects/${folder}/${image}`); // Construye las rutas accesibles públicamente desde el navegador

		// 📦 Devuelve un objeto con los datos del proyecto actual
		return {
			name: folder, // Nombre del proyecto (igual al nombre de la carpeta)
			folder: folder, // Carpeta donde se encuentran sus imágenes
			images: images, // Lista de rutas relativas a las imágenes
		};
	});

	// 🚀 Devuelve los datos como props para que el componente de la página los reciba al momento de la compilación
	return {
		props: {
			projects,
		},
	};
}
