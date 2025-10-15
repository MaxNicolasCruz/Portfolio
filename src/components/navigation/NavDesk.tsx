// 📦 Importaciones necesarias
import { NavBarProps } from "@/utils/types"; // 👉 Tipado de las props que recibe el componente
import Link from "next/link"; // 👉 Componente de navegación de Next.js (enlaces internos)
import { useState, useEffect } from "react"; // 👉 Hooks de React para manejar estado y efectos secundarios

// 🌟 Componente funcional NavDesk (barra de navegación lateral en escritorio)
const NavDesk: React.FC<NavBarProps> = ({
	sections,         // 👉 Lista de secciones disponibles (cada una con key, label e ícono)
	currentSection,   // 👉 Sección actualmente activa (según el scroll o interacción)
	onSectionChange,  // 👉 Función que actualiza el estado de la sección activa
	labels,           // 👉 Traducciones de los textos de los botones
}) => {
	
	// 🧠 Estado local para manejar cuál enlace está activo visualmente
	const [activeLink, setActiveLink] = useState(currentSection);

	// 🔁 Efecto: cada vez que cambia la sección actual, actualiza el link activo
	useEffect(() => {
		setActiveLink(currentSection);
	}, [currentSection]);

	return (
		// 🧭 Contenedor principal de la barra de navegación lateral (visible solo en pantallas grandes)
		<nav
			className="
				hidden lg:flex flex-col fixed right-1 top-1/2 -translate-y-1/2 p-4 bg-transparent 
				rounded-lg z-50
			"
		>
			{/* 📋 Lista de enlaces de navegación */}
			<ul className="flex flex-col border-glow-turquoise-blue-70 border border-r-0 rounded-s-lg ">
				
				{/* 🔁 Itera sobre cada sección y genera un enlace */}
				{sections.map((section) => (
					<li key={section.key}>
						{/* 🔗 Enlace hacia la sección correspondiente */}
						<Link
							href={`#${section.key}`} // 👉 Usa anclas (#) para scroll automático a la sección
							scroll={true} // 👉 Permite el desplazamiento suave (Next.js maneja el scroll)
							
							className={`
								block w-full px-8 py-3 text-center font-bold tracking-widest uppercase
								transition-all duration-300 ease-in-out border-b border-glow-turquoise-blue-70 
								text-glow-turquoise-blue-40 text-lg
								${activeLink === section.key ? "glowing-text-active" : ""}
							`}
							
							onClick={() => {
								// 🖱 Al hacer clic:I
								setActiveLink(section.key); // 1️⃣ Actualiza el enlace activo localmente
								onSectionChange(section.key); // 2️⃣ Informa al componente padre el cambio de sección
							}}
						>
							{/* 🏷 Muestra el texto traducido de la sección */}
							{labels[section.label]}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

// 🚀 Exportación del componente para uso en otros módulos
export default NavDesk;
