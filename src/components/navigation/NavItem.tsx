// 🧩 Interfaz que define las propiedades (props) que recibe el componente NavItem
interface NavItemProps {
	icon: React.ElementType; // 👉 Tipo genérico para cualquier componente de ícono (por ejemplo de react-icons)
	label: string; // 👉 Texto que describe la sección (por ejemplo "Home" o "Projects")
	isActive: boolean; // 👉 Indica si este ítem está actualmente activo (resaltado)
	onClick: () => void; // 👉 Función que se ejecuta al hacer clic en el ítem
}

// 🌟 Componente funcional NavItem
// Representa un solo botón o ícono dentro de la barra de navegación (NavBar)
const NavItem: React.FC<NavItemProps> = ({
	icon: Icon, // 👉 Se renombra la prop "icon" a "Icon" para usarla como componente JSX (<Icon />)
	label, // 👉 Texto del ítem
	isActive, // 👉 Estado activo/inactivo del ítem
	onClick, // 👉 Manejador de clic
}) => {
	return (
		// 🔹 Contenedor principal del ítem
		<span
			className={`
				flex flex-col items-center justify-center p-2 text-xs font-medium cursor-pointer 
				transition-colors duration-200 text-glow-turquoise-blue-30
			`}
			onClick={onClick} // 👉 Llama a la función pasada como prop al hacer clic
		>
			{/* 🔸 Ícono visual del ítem (recibido por props) */}
			<Icon className="h-6 w-6 mb-1 glowing-icon" />

			{/* 🔸 Texto del ítem, con animación o resplandor si está activo */}
			<span
				className={`text-center leading-none glowing-text ${
					isActive ? "glowing-text-active" : ""
				}`}
			>
				{label} {/* 👉 Muestra el nombre traducido de la sección */}
			</span>
		</span>
	);
};

// 🚀 Exportación del componente para que pueda ser usado dentro de NavBar
export default NavItem;
