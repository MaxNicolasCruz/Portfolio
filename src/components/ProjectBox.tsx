import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Button from "./ui/Button";

interface ProjectBoxProps {
	projects: {
		[key: string]: {
			name: string;
			description: string;
			img: string;
			technologies: string[];
			link: string;
		};
	};
}

function ProjectBox({ projects }: ProjectBoxProps) {
	const [visibleItem, setVisibleItem] = useState(2);

	const [openProjectId, setOpenProjectId] = useState<string | null>(null);

	const loadMore = () => {
		setVisibleItem((prev) => prev + 1);
	};

	return (
		<div
			className={`relative ${
				openProjectId ? "h-[63vh] overflow-y-auto " : "h-auto"
			}`}
		>
			<div
				className={`${
					openProjectId
						? "flex justify-center items-center "
						: "lg:flex lg:flex-row lg:flex-wrap "
				}`}
			>
				{Object.keys(projects)
					.slice(0, openProjectId ? Object.keys(projects).length : visibleItem)
					.map((key) => {
						const project = projects[key];
						if (openProjectId && openProjectId !== key) return null;
						return (
							<div
								key={key}
								className={`${
									openProjectId ? "w-full max-w-3xl  " : " lg:w-2/4 2xl:w-1/3 "
								}`}
							>
								<ProjectCard
									name={project.name}
									description={project.description}
									imgPath={project.img}
									technologies={project.technologies}
									link={project.link}
									isOpen={openProjectId === key}
									openProject={() => setOpenProjectId(key)}
									closeProject={() => setOpenProjectId(null)}
								/>
							</div>
						);
					})}
			</div>
			{!openProjectId && visibleItem < Object.keys(projects).length && (
				<div className="flex justify-center mt-4">
					<Button onClick={loadMore} className="">
						Ver más
					</Button>
				</div>
			)}
		</div>
	);
}

export default ProjectBox;
