// 📦 Importaciones necesarias
import React from "react";
import NavItem from "./NavItem"; // 👉 Componente hijo que representa cada ítem individual de la barra
import { scrollToSection } from "@/utils/utils"; // 👉 Función auxiliar para hacer scroll suave a una sección
import { NavBarProps } from "@/utils/types"; // 👉 Tipado del componente para mantener seguridad de tipos

// 🌟 Componente funcional NavBar
const NavBar: React.FC<NavBarProps> = ({
	sections, // 👉 Lista de secciones (cada una con clave, etiqueta e ícono)
	currentSection, // 👉 Indica cuál sección está activa actualmente
	onSectionChange, // 👉 Función que actualiza el estado de la sección activa
	labels, // 👉 Traducciones de los textos de los botones
}) => {
	return (
		// 🧭 Contenedor principal de la barra de navegación
		<nav className="fixed bottom-0 left-0 right-0 bg-transparent bg-opacity-60 backdrop-blur-sm z-50">
			{/* 📏 Contenedor interno que centra los ítems horizontalmente */}
			<div className="flex justify-around items-center max-w-md mx-auto">
				{/* 🔁 Recorre todas las secciones y crea un <NavItem> para cada una */}
				{sections.map(({ key, label, icon }) => (
					<NavItem
						key={key} // 🔑 Identificador único de React
						icon={icon} // 🎨 Icono asociado a la sección
						label={labels[label]} // 🏷 Texto traducido del botón (en inglés/español)
						isActive={currentSection === key} // 🟢 Determina si el ítem está activo
						onClick={() => {
							// 🖱 Al hacer clic:
							onSectionChange(key); // 1️⃣ Actualiza el estado de la sección actual
							scrollToSection(key); // 2️⃣ Hace scroll suave a la sección correspondiente
						}}
					/>
				))}
			</div>
		</nav>
	);
};

// 🚀 Exportación por defecto del componente
export default NavBar;
