
import fs from "fs";
import path from "path";

export const getImages = (imgPath: string): string[] => {
	const directoryPath = path.join(process.cwd(), "public/projectsImg", imgPath);

	return fs
		.readdirSync(directoryPath)
		.filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file)) 
		.map((file) => `/projectsImg/${imgPath}/${file}`);
};
