import React from "react";
import { motion } from "framer-motion"; // 🌀 Librería para animaciones declarativas en React
import SkillBox from "./SkillBox"; // 📦 Componente hijo encargado de mostrar las habilidades (skills)
import { AboutMeBoxText } from "@/utils/types"; // 📘 Tipo TypeScript que define la estructura de las props

// 📦 Componente principal: AboutMeBox
// Muestra información personal, educación y habilidades del usuario.
// Props:
//  - aboutMeBox: objeto que contiene textos, títulos, descripciones y datos de educación y habilidades.
function AboutMeBox({ aboutMeBox }: { aboutMeBox: AboutMeBoxText }) {
	return (
		// 🌀 Contenedor animado con framer-motion
		// Realiza una animación al entrar en pantalla (fade-in y desplazamiento vertical)
		<motion.div
			initial={{ opacity: 0, y: 100 }} // Estado inicial (invisible y desplazado hacia abajo)
			whileInView={{ opacity: 1, y: 0 }} // Estado visible al entrar al viewport
			viewport={{ once: false, amount: 0.3 }} // Se anima cada vez que el 30% del componente está visible
			transition={{ duration: 0.1, ease: "easeOut" }} // Configuración de duración y suavidad
		>
			{/* 🧱 Estructura principal de la sección "Sobre mí" */}
			<article
				id="aboutMe"
				className="
				relative p-3 sm:p-7 md:p-10
				lg:mr-[18rem] lg:max-w-[calc(100%-18rem)]
			"
			>
				{/* 🔹 Sección: SOBRE MÍ (título + descripción personal) */}
				<section className="mb-6 sm:mb-10">
					<h3 className="text-xl sm:text-2xl font-bold text-glow-turquoise-blue-30 mb-2 sm:mb-3 tracking-wide">
						{aboutMeBox.meTitle}
					</h3>
					<p className="text-sm sm:text-base text-glow-turquoise-blue-10 leading-relaxed">
						{aboutMeBox.meDescription}
					</p>
				</section>

				{/* 🔹 Contenedor que agrupa EDUCACIÓN + SKILLS (disposición en columnas en pantallas grandes) */}
				<div className="md:flex md:gap-6 lg:gap-10">
					{/* 🏫 Sección: EDUCACIÓN */}
					<section
						className="mb-6 sm:mb-10 md:mb-0 md:w-1/2 bg-white/5 backdrop-blur-md border border-glow-purple-pizzazz-50 
					shadow-[0_0_15px_#db15c440] transition-all duration-200 hover:shadow-[0_0_25px_#fc2ae270] rounded-2xl 
					p-3 sm:p-4 md:p-10 lg:p-4 lg:max-w-sm xl:max-w-4xl "
					>
						{/* Título de la sección de educación */}
						<h3 className="text-lg sm:text-xl font-semibold text-glow-turquoise-blue-30 mb-3 sm:mb-4 tracking-wide">
							{aboutMeBox.educationTitle}
						</h3>

						{/* 📘 Lista dinámica de formaciones o certificaciones */}
						<div className="space-y-3 sm:space-y-4">
							{/* Se recorre el objeto educationDescription, donde cada entrada representa una formación */}
							{Object.entries(aboutMeBox.educationDescription).map(
								([key, element]) => (
									<div
										key={key} // Clave única por elemento
										className="border-l-4 border-glow-purple-pizzazz-50 pl-2 hover:border-glow-turquoise-blue-40 
									transition-all duration-300"
									>
										{/* Nombre de la institución o formación */}
										<p className="text-glow-turquoise-blue-10 font-medium text-sm sm:text-base">
											{element.name}
										</p>

										{/* Tipo de certificado, título o curso obtenido */}
										<p className="text-glow-turquoise-blue-20 text-xs sm:text-sm italic">
											{element.certificate}
										</p>

										{/* Duración o período de la formación */}
										<p className="text-glow-turquoise-blue-40 text-[10px] sm:text-xs">
											{element.duration}
										</p>
									</div>
								)
							)}
						</div>
					</section>

					{/* ⚙️ Sección: SKILLS (Habilidades técnicas o blandas) */}
					<section
						className="md:w-1/2 bg-white/5 backdrop-blur-md border border-glow-purple-pizzazz-50 shadow-[0_0_15px_#db15c440]
					transition-all duration-500 hover:shadow-[0_0_25px_#fc2ae270] rounded-2xl p-3 sm:p-4 md:p-10 lg:p-4 lg:max-w-sm
					xl:max-w-4xl "
					>
						{/* Componente hijo que recibe las habilidades desde las props */}
						<SkillBox skillsBox={aboutMeBox.skillsBox} />
					</section>
				</div>
			</article>
		</motion.div>
	);
}

// 🚀 Exporta el componente para ser reutilizado en otras partes de la aplicación (por ejemplo, la sección "About Me" del portafolio)
export default AboutMeBox;
