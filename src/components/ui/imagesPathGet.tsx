import fs from "fs";
import path from "path";

export async function getStaticProps() {
	const projectFolderPath = path.join(process.cwd(), "public", "projectsImg");
	const projectFolders = fs.readdirSync(projectFolderPath);

	const projects = projectFolders.map((folder) => {
		const imagesPath = path.join(projectFolderPath, folder);
		const images = fs
			.readdirSync(imagesPath) // Obtener todos los archivos en la carpeta
			.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) // Filtrar sólo imágenes
			.map((image) => `/projects/${folder}/${image}`); // Construir rutas de imágenes

		return {
			name: folder,
			folder: folder,
			images: images,
		};
	});

	return {
		props: {
			projects,
		},
	};
}
