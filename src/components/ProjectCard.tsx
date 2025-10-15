import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImageCarousel from "./ui/carruselProjectImg";
import { MdCancel } from "react-icons/md";
import getTechnologyIcon from "./utils/getIconsTechnologies";
import { FaGithub } from "react-icons/fa";
import { motion, useAnimation, useInView } from "framer-motion";

// 🔹 Props del componente ProjectCard
interface ProjectCardProps {
	name: string; // Nombre del proyecto
	description: string; // Descripción del proyecto
	imgPath: string; // Ruta principal del proyecto o ID para cargar imágenes
	technologies: string[]; // Lista de tecnologías usadas
	link: string; // Enlace al proyecto o repositorio
	children?: React.ReactNode; // Contenido adicional opcional
	isOpen: boolean; // Indica si el proyecto está abierto en modal
	openProject: () => void; // Función para abrir modal
	closeProject: () => void; // Función para cerrar modal
}

// 🌐 Componente que muestra un proyecto individual, en grilla o modal
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
	// 🔹 Estado para resaltar borde al pasar mouse
	const [borderActive, setBorderActive] = useState(false);

	// 🔹 Estado que guarda las imágenes del proyecto
	const [images, setImages] = useState<string[]>([]);

	// 🔹 Estado para saber si el componente ya fue montado en cliente
	const [mounted, setMounted] = useState(false);

	// 🔹 Animaciones con framer-motion
	const controls = useAnimation();
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.7 }); // Detecta si el elemento está en viewport

	// 🔹 Funciones para resaltar borde en hover
	const handleMouseEnter = () => setBorderActive(true);
	const handleMouseLeave = () => setBorderActive(false);

	// 🔹 Marca el componente como montado (evita errores SSR)
	useEffect(() => {
		setMounted(true);
	}, []);

	// 🔹 Efecto que anima la entrada/salida del componente según si está visible en pantalla
	useEffect(() => {
		if (ref.current) {
			if (isInView) {
				controls.start({ opacity: 1, scale: 1 }); // Animación al aparecer
			} else {
				controls.start({ opacity: 0, scale: 0.9 }); // Animación al desaparecer
			}
		}
	}, [isInView, controls]);

	// 🔹 Efecto que obtiene las imágenes del proyecto desde API
	useEffect(() => {
		const fetchImages = async (project: string) => {
			try {
				const response = await fetch(`/api/images?projectName=${project}`);
				const data = await response.json();
				if (response.ok)
					setImages(data.images); // Guarda imágenes si respuesta correcta
				else console.error("Error fetching images:", data.error);
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		};
		fetchImages(imgPath);
	}, [imgPath]);

	return (
		<>
			{/* 🖼️ Modal del proyecto abierto */}
			{isOpen ? (
				<div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
					<div className="relative w-[90%] max-w-3xl p-5 md:p-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.2)] backdrop-blur-xl text-white overflow-y-auto max-h-[90vh]">
						{/* ❌ Botón de cierre */}
						<button
							onClick={closeProject}
							className="absolute top-4 right-4 text-gray-300 hover:text-white transition-transform hover:scale-110 z-50"
						>
							<MdCancel className="text-3xl" />
						</button>

						{/* 🖼️ Carrusel de imágenes */}
						<div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm bg-gradient-to-b from-white/10 to-transparent p-2">
							<ImageCarousel images={images} />
						</div>

						{/* 📄 Título y descripción */}
						<div className="mt-6 space-y-3">
							<h3 className="text-3xl font-bold text-glow-turquoise-blue-30">
								{name}
							</h3>
							<p className="text-gray-300 leading-relaxed text-sm md:text-base">
								{description}
							</p>
						</div>

						{/* 🧰 Tecnologías usadas */}
						<div className="mt-6">
							<h4 className="text-lg font-semibold text-glow-purple-pizzazz-40 mb-2">
								Technologies
							</h4>
							<div className="flex flex-wrap gap-3">
								{technologies.map((tech) => (
									<span
										key={tech}
										className="text-2xl transition-transform transform hover:scale-110"
									>
										{getTechnologyIcon(tech)}
									</span>
								))}
							</div>
						</div>

						{/* 🔗 Enlace al proyecto */}
						<div className="mt-8">
							<h3 className="text-lg font-semibold text-glow-turquoise-blue-20 mb-1">
								Project Link
							</h3>
							<a
								href={link}
								target="_blank"
								className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors max-w-full"
							>
								<FaGithub className="text-xl flex-shrink-0" />
								<span
									className="truncate max-w-[80%] overflow-hidden text-ellipsis"
									title={link}
								>
									{link}
								</span>
							</a>
						</div>
					</div>
				</div>
			) : (
				// 🖼️ Vista en grilla / tarjeta del proyecto
				<motion.div
					ref={ref}
					initial={{ opacity: 0, scale: 0 }} // Animación inicial
					animate={controls} // Animación controlada
					transition={{ duration: 0.4, ease: "easeOut" }}
					className="flex h-auto"
				>
					<div
						className={`group w-full h-auto min-h-[160px] perspective  lg:text-2xl xl:max-w-4xl cursor-pointer `}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						onClick={openProject}
					>
						{/* Tarjeta con efecto 3D al pasar el mouse */}
						<div
							className="relative bg-white/5 w-full h-full transition-transform duration-500 [transform-style:preserve-3d] 
						group-hover:[transform:rotateY(180deg)] max-w-sm mx-auto xl:max-w-4xl "
						>
							{/* Frente de la tarjeta */}
							<div
								className="absolute p-4 text-center inset-0 rounded-xl overflow-hidden 
							[backface-visibility:hidden] bg-transparent shadow-[0_0_7px_#ff4fd8] border 
							border-glow-purple-pizzazz-50 backdrop-blur-sm max-w-sm mx-auto xl:max-w-4xl "
							>
								<h3 className="text-lg font-semibold text-glow-turquoise-blue-40 glowing-text group-hover:text-glow-turquoise-blue-10 transition-colors">
									{name}
								</h3>
								<p className="text-sm mt-2 text-glow-turquoise-blue-20">
									{description}
								</p>
							</div>

							{/* Reverso de la tarjeta: tecnologías */}
							<div
								className="absolute text-center inset-0 rounded-xl bg-transparent text-white p-4 
							[backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_7px_#19b1c0] border 
							border-glow-turquoise-blue-50 backdrop-blur-sm max-w-sm mx-auto xl:max-w-4xl "
							>
								<h2 className="text-xl font-semibold mb-3 text-glow-purple-pizzazz-40 glowing-text group-hover:text-glow-purple-pizzazz-40 transition-colors">
									Tecnologies
								</h2>
								<p className="flex flex-wrap gap-3 justify-center">
									{technologies.map((tech) => (
										<span key={tech} className="text-2xl">
											{getTechnologyIcon(tech)}
										</span>
									))}
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</>
	);
}

export default ProjectCard;
