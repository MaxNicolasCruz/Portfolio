import React, { useEffect, useState } from "react";
import Image from "next/image";
import ImageCarousel from "./ui/carruselProjectImg";
import { MdCancel } from "react-icons/md";
import getTechnologyIcon from "./utils/getIconsTechnologies";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
	name: string;
	description: string;
	imgPath: string;
	technologies: string[];
	link: string;
	children?: React.ReactNode;
	isOpen: boolean;
	openProject: () => void;
	closeProject: () => void;
}

function ProjectCard({
	name,
	description,
	imgPath,
	technologies,
	link,
	children,
	isOpen,
	openProject,
	closeProject,
}: ProjectCardProps) {
	const [borderActive, setBorderActive] = useState(false);
	const [images, setImages] = useState<string[]>([]);

	const handleMouseEnter = () => setBorderActive(true);
	const handleMouseLeave = () => setBorderActive(false);

	useEffect(() => {
		const fetchImages = async (project: string) => {
			try {
				const response = await fetch(`/api/images?projectName=${project}`);
				const data = await response.json();
				if (response.ok) setImages(data.images);
				else console.error("Error fetching images:", data.error);
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		};
		fetchImages(imgPath);
	}, [imgPath]);

	return (
		<>
			{isOpen ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md dark:bg-orange-primary cursor-default">
					<div className="relative bg-slate-800 text-slate-300 scrollbar-hide rounded-lg dark:shadow-none shadow-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto dark:bg-orange-primary dark:text-black">
						<span
							className="absolute top-3 right-3 cursor-pointer"
							onClick={closeProject}
						>
							<MdCancel className="text-2xl text-slate-400 hover:text-white dark:text-blue-sky-primary dark:hover:text-gray-600 dark:hover:scale-110" />
						</span>
						<ImageCarousel images={images} />
							<h3 className="mt-4 text-xl font-semibold">{name}</h3>
							<p className="mt-2">{description}</p>
							<h4 className="mt-4 font-semibold">Technologies:</h4>
							<div className="flex flex-wrap gap-2 mt-2">
								{technologies.map((tech) => (
									<span key={tech}>{getTechnologyIcon(tech)}</span>
								))}
							</div>
						<div>
							<h3 className="mt-4 text-xl font-semibold">Link: </h3>

							<a href={link} className="flex items-center" target="_blank">
								{link}

								<FaGithub className="m-2" />
							</a>
						</div>
					</div>
				</div>
			) : (
				<div
					className={`border-2 dark:border-orange-primary border-gray-dark m-2 rounded-md p-4 transition-transform transform cursor-default lg:h-[96%] ${
						borderActive ? "scale-105 lg:scale-95 shadow-xl" : ""
					}`}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onClick={openProject}
				>
					<Image
						src={`/projectsImg${imgPath}/1.webp`}
						alt={`Image for ${name}`}
						layout="responsive"
						loading="lazy"
						width={100}
						height={100}
						className="rounded-md"
					/>
					<div className="mt-3">
						<h3
							className={`text-xl font-semibold text-gray-200 ${
								borderActive ? "dark:text-slate-900 " : "dark:text-slate-800"
							} `}
						>
							{name}
						</h3>
						<p
							className={`text-gray-300 text-sm mt-1  ${
								borderActive ? "dark:text-black " : "dark:text-slate-900"
							}`}
						>
							{description}
						</p>
					</div>
				</div>
			)}
		</>
	);
}

export default ProjectCard;
