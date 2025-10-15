import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import Button from "./ui/Button";
import { FaChevronCircleDown } from "react-icons/fa";
import { ProjectCardText } from "@/utils/types";
import { AnimatePresence, motion } from "framer-motion";

// 🌐 Componente que muestra la sección de proyectos
// Props:
// - projectCard: objeto con título, subtítulo y proyectos a mostrar
function ProjectBox({ projectCard }: { projectCard: ProjectCardText }) {
	// 🔹 Estado que controla cuántos proyectos se muestran inicialmente
	//    Se ajusta según el tamaño de pantalla (4 en escritorio, 2 en móvil)
	const [visibleItem, setVisibleItem] = useState(() => {
		if (typeof window !== "undefined" && window.innerWidth >= 1024) return 4;
		return 2;
	});

	// 🔹 Estado que guarda el ID del proyecto abierto en modal (si hay alguno)
	const [openProjectId, setOpenProjectId] = useState<string | null>(null);

	// 🔹 Referencia a la sección para hacer scroll al abrir un proyecto
	const sectionRef = useRef<HTMLElement | null>(null);

	// 🔹 Efecto que hace scroll automático a la sección cuando se abre un proyecto
	useEffect(() => {
		if (openProjectId && sectionRef.current) {
			sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, [openProjectId]);

	// 🔹 Función para cargar más proyectos aumentando `visibleItem`
	const loadMore = () => setVisibleItem((prev) => prev + 1);

	// 🔹 Lista de claves de los proyectos
	const projectKeys = Object.keys(projectCard.projects);

	// 🔹 Proyectos que se van a mostrar según `visibleItem`
	const projectsToShow = projectKeys.slice(0, visibleItem);

	return (
		<section id="project" className="py-16 md:py-24 lg:py-0" ref={sectionRef}>
			<div className="container mx-auto px-4 sm:px-6 lg:pr-52 max-w-7xl lg:p-10">
				{/* 📄 Encabezado de la sección */}
				<div className="text-center mb-12 md:mb-16 lg:mb-2 lg:text-left">
					<h2 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
						<span className="text-glow-turquoise-blue-30 glowing-text">
							{projectCard.title} {/* Título de la sección */}
						</span>
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto lg:mx-0">
						{projectCard.subtitle} {/* Subtítulo de la sección */}
					</p>
				</div>

				{/* 🖼️ Grilla de proyectos */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 transition-all duration-500 lg:gap-4 lg:max-w-2xl lg:mx-auto xl:pt-5 xl:max-w-4xl xl:gap-6">
					{projectsToShow.map((key) => {
						const project = projectCard.projects[key];
						return (
							<ProjectCard
								key={key}
								name={project.name} // Nombre del proyecto
								description={project.description} // Descripción
								imgPath={project.img} // Imagen
								technologies={project.technologies} // Tecnologías usadas
								link={project.link} // URL externa
								isOpen={false} // Indica si está abierto en modal (false en grilla)
								openProject={() => setOpenProjectId(key)} // Abrir modal
								closeProject={() => setOpenProjectId(null)} // Cerrar modal
							/>
						);
					})}
				</div>

				{/* ⬇️ Botón "Ver más" para cargar proyectos adicionales */}
				{visibleItem < projectKeys.length && !openProjectId && (
					<div className="flex justify-center mt-6 md:mt-16">
						<Button
							onClick={loadMore}
							className="relative px-8 py-3 text-lg rounded-full border-2 border-glow-turquoise-blue-40 
              text-glow-turquoise-blue-40 bg-transparent overflow-hidden 
              transition-all duration-300 ease-out
              hover:text-glow-purple-pizzazz-30 hover:scale-105
              hover:shadow-[0_0_20px_#22dceeaa]
              active:scale-95 group"
						>
							{/* Efecto de gradiente animado */}
							<span
								className="absolute inset-0 rounded-full bg-gradient-to-r from-glow-turquoise-blue-30/20 via-transparent to-glow-turquoise-blue-30/20 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-linear"
							/>
							<FaChevronCircleDown className="relative z-10 text-2xl transition-transform duration-300 group-hover:translate-y-1" />
						</Button>
					</div>
				)}
			</div>

			{/* 🖼️ Modal del proyecto abierto */}
			<AnimatePresence>
				{openProjectId && (
					<motion.div
						key={openProjectId}
						initial={{ opacity: 0, scale: 0.95 }} // Estado inicial de animación
						animate={{ opacity: 1, scale: 1 }} // Estado cuando aparece
						exit={{ opacity: 0, scale: 0.95 }} // Estado al cerrar
						transition={{ duration: 0.3, ease: "easeOut" }} // Transición
						className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
					>
						<ProjectCard
							key={openProjectId}
							name={projectCard.projects[openProjectId].name} // Nombre
							description={projectCard.projects[openProjectId].description} // Descripción
							imgPath={projectCard.projects[openProjectId].img} // Imagen
							technologies={projectCard.projects[openProjectId].technologies} // Tecnologías
							link={projectCard.projects[openProjectId].link} // Enlace
							isOpen={true} // Modal abierto
							openProject={() => setOpenProjectId(openProjectId)} // Mantener abierto
							closeProject={() => setOpenProjectId(null)} // Cerrar modal
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}

export default ProjectBox;
