import React from "react";
import { motion } from "framer-motion"; // 🌀 Librería usada para animaciones declarativas en React

// 🔹 Lista de íconos sociales con sus respectivos enlaces y propiedades visuales
// Cada objeto contiene un ícono (imagen con animaciones de hover) y un enlace externo
const socialIcons = [
	{
		icon: (
			<img
				src="/github-142-svgrepo-com.svg"
				alt="GitHub"
				className="icon-style transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_6px_#22dcee] sm:w-8 sm:h-8"
				title="GitHub"
			/>
		),
		link: "https://github.com/MaxNicolasCruz", // 🔗 Enlace al perfil de GitHub
	},
	{
		icon: (
			<img
				src="/linkedin-svgrepo-com.svg"
				alt="LinkedIn"
				className="icon-style transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_6px_#22dcee] sm:w-8 sm:h-8"
				title="LinkedIn"
			/>
		),
		link: "https://www.linkedin.com/in/max-nicolas-cruz/", // 🔗 Enlace al perfil de LinkedIn
	},
	{
		icon: (
			<img
				src="/ms-outlook-svgrepo-com.svg"
				alt="Email"
				className="icon-style transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_6px_#22dcee] sm:w-8 sm:h-8"
				title="Email"
			/>
		),
		link: "mailto:d3velopermax@gmail.com", // ✉️ Enlace para enviar correo directamente
	},
];

// 🧩 Definición de la interfaz de props esperadas por el componente ContactBox
interface TextProps {
	meContact: {
		title: string; // Título principal de la sección de contacto
		subtitle: string; // Subtítulo o descripción complementaria
	};
}

// 📦 Componente funcional ContactBox
// Muestra la sección de contacto con título, subtítulo y enlaces a redes sociales.
// Props:
//  - meContact: objeto con propiedades `title` y `subtitle`.
// Retorna un bloque animado con íconos sociales interactivos.
const ContactBox: React.FC<TextProps> = ({ meContact }) => {
	return (
		// 🌀 Sección animada con framer-motion
		// Al entrar en vista, aplica una animación de opacidad y desplazamiento vertical
		<motion.section
			id="contact"
			initial={{ opacity: 0, y: 50 }} // Estado inicial (oculto y desplazado hacia abajo)
			whileInView={{ opacity: 1, y: 0 }} // Estado visible al entrar en pantalla
			viewport={{ once: false, amount: 0.2 }} // Reanima cuando el 20% del componente está visible
			transition={{ duration: 0.5, ease: "easeOut" }} // Configuración de la transición
			className="lg:mr-[18rem] lg:max-w-[calc(100%-18rem)] "
		>
			{/* Contenedor general con márgenes y relleno adaptativos */}
			<div className="relative p-4 sm:p-6 mb-20 sm:mb-10 md:p-10">
				{/* Tarjeta de fondo translúcido con borde brillante y efecto de hover */}
				<div className="p-4 sm:p-6 bg-white/5 backdrop-blur-md border border-glow-purple-pizzazz-50 rounded-2xl shadow-[0_0_15px_#db15c440] hover:shadow-[0_0_25px_#fc2ae270]">
					{/* 🏷️ Título principal de la sección de contacto */}
					<h3 className="text-2xl sm:text-xl md:text-3xl font-bold text-glow-turquoise-blue-30 mb-6 sm:mb-4 text-center">
						{meContact.title}
					</h3>

					{/* 📜 Subtítulo o descripción debajo del título */}
					<p className="text-glow-turquoise-blue-10 text-center mb-6 sm:mb-4">
						{meContact.subtitle}
					</p>

					{/* 🔗 Contenedor de íconos sociales alineados horizontalmente */}
					<div className="flex justify-center space-x-6 sm:space-x-4 md:space-x-10 flex-wrap">
						{/* Itera sobre cada ícono social y crea un enlace externo */}
						{socialIcons.map((social, idx) => (
							<a
								key={idx} // Clave única para cada elemento renderizado
								href={social.link} // URL destino
								target="_blank" // Abre en nueva pestaña
								rel="noopener noreferrer" // 🔒 Previene vulnerabilidades de seguridad
								className="transition-transform hover:scale-110" // Efecto de hover con escala
							>
								{social.icon} {/* Renderiza el ícono correspondiente */}
							</a>
						))}
					</div>
				</div>
			</div>
		</motion.section>
	);
};

// 🚀 Exporta el componente para ser usado en otras partes de la aplicación
export default ContactBox;
