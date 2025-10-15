import React from "react";

// 🔹 Props esperadas por el componente Button
interface ButtonProps {
	children: React.ReactNode; // Contenido interno del botón (texto, íconos, etc.)
	className?: string; // Clases CSS opcionales para personalizar estilo
	onClick?: React.MouseEventHandler<HTMLButtonElement>; // Callback para manejar el evento click
}

// 📦 Componente Button
// Renderiza un botón reutilizable con soporte para estilos personalizados y evento onClick.
// Props:
//  - children: contenido que se muestra dentro del botón
//  - className: clases CSS opcionales que se pueden agregar al botón
//  - onClick: función a ejecutar cuando se hace clic en el botón
function Button({ children, className = "", onClick }: ButtonProps) {
	return (
		<button
			className={`` + className} // Aplica las clases pasadas desde props
			onClick={onClick} // Ejecuta la función pasada al hacer clic
		>
			{children} {/* Renderiza el contenido del botón */}
		</button>
	);
}

// 🚀 Exporta el componente Button para ser reutilizado en toda la aplicación
export default Button;
