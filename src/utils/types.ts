// 📑 Interfaz principal que agrupa todos los textos del sitio en distintos apartados según su propósito o sección.
// Facilita la gestión de traducciones y el acceso estructurado a los textos multilenguaje.
export interface LanguageText {
	header: HeaderText; // Textos usados en el encabezado principal del sitio
	main: MainText; // Textos para la barra de navegación o botones principales
	projectCard: ProjectCardText; // Textos relacionados con la sección de proyectos
	aboutMeBox: AboutMeBoxText; // Textos de la sección "Sobre mí"
	meContact: MeContactText; // Textos de la sección de contacto personal
}

// 🧩 Define los textos específicos del encabezado principal
export interface HeaderText {
	greeting: string; // Mensaje de saludo inicial
	name: string; // Nombre del usuario o profesional
	rol: string; // Rol o profesión principal (por ejemplo: "Desarrollador Web")
	cvButton: string; // Texto del botón para descargar el CV
	description: string; // Descripción corta del perfil
	contactButton: string; // Texto del botón para ir a la sección de contacto
	projectButton: string; // Texto del botón para ver los proyectos
}

// 🧭 Define los textos de los botones o enlaces de la barra de navegación principal
export interface MainText extends Record<string, string> {
	homeButton: string; // Texto del botón para ir al inicio
	aboutMeButton: string; // Texto del botón para ir a la sección "Sobre mí"
	projectButton: string; // Texto del botón para ir a los proyectos
	contactButton: string; // Texto del botón para ir a la sección de contacto
}

// 🧱 Estructura que describe la información básica de un proyecto
export interface ProjectInfo {
	name: string; // Nombre del proyecto
	description: string; // Breve descripción del proyecto
	img: string; // URL o ruta de la imagen representativa
	technologies: string[]; // Lista de tecnologías utilizadas
	link: string; // Enlace al proyecto o repositorio
}

// 💼 Define los textos y estructura para la sección de proyectos
export interface ProjectCardText {
	title: string; // Título principal de la sección
	subtitle: string; // Subtítulo o descripción adicional
	projects: { [key: string]: ProjectInfo }; // Objeto con todos los proyectos disponibles
}

// 🎓 Estructura que describe la información educativa del usuario
export interface EducationInfo {
	name: string; // Nombre de la institución educativa
	certificate: string; // Título o certificado obtenido
	duration: string; // Duración o periodo de estudio
}

// 🧠 Textos para la caja de habilidades (Skills)
export interface SkillsBoxText {
	title: string; // Título de la sección de habilidades
	frontEndTitle: string; // Subtítulo para habilidades de Front-End
	backEndTitle: string; // Subtítulo para habilidades de Back-End
	learningTitle: string; // Subtítulo para habilidades en aprendizaje
}

// 🙋‍♂️ Define los textos y estructura de la sección "Sobre mí"
export interface AboutMeBoxText {
	meTitle: string; // Título principal de la sección
	meDescription: string; // Descripción personal
	educationTitle: string; // Título para la subsección de educación
	educationDescription: { [key: string]: EducationInfo }; // Lista de estudios o formaciones
	skillsBox: SkillsBoxText; // Información sobre habilidades
}

// ✉️ Textos usados en la sección de contacto
export interface MeContactText {
	title: string; // Título principal de la sección de contacto
	subtitle: string; // Subtítulo o mensaje complementario
}

// 🧭 Props utilizadas por el componente de navegación (NavBar)
export interface NavBarProps {
	sections: {
		key: string; // Identificador único de la sección
		label: string; // Texto visible del botón o enlace
		icon: React.ElementType; // Icono asociado a la sección
	}[];
	currentSection: string; // Sección actualmente activa o visible
	onSectionChange: (key: string) => void; // Función callback al cambiar de sección
	labels: Record<string, string>; // Diccionario de etiquetas traducidas según el idioma
}
