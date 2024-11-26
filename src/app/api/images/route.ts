import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		// Obtener los query parameters
		const { searchParams } = new URL(req.url);

		const filter = searchParams.get("projectName"); // Ejemplo de parámetro "filter"


		if (!filter) {
			// Manejar el caso en el que `filter` es `null`
			return NextResponse.json(
				{ error: "El parámetro 'projectName' es obligatorio" },
				{ status: 400 }
			);
		}
		// Ruta a la carpeta de imágenes en 'public/images'
		const imagesDirectory = path.join(
			process.cwd(),
			"public",
			"projectsImg",
			filter
		);


		// Leer los nombres de los archivos de imágenes
		const imageFiles = fs.readdirSync(imagesDirectory);


		// Construir las rutas públicas de las imágenes
		const imagePaths = imageFiles.map((file) => `/projectsImg${filter}/${file}`);


		// Devolver la lista de rutas de las imágenes
		return NextResponse.json({ images: imagePaths });
	} catch (error) {
		return NextResponse.json(
			{ error: "Error al leer las imágenes" },
			{ status: 500 }
		);
	}
}
