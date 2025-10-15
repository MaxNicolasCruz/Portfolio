"use client";
// 📍 Marca que este archivo es un componente del lado del cliente (Client Component) en Next.js.
//    Esto permite el uso de hooks, efectos y otras APIs de React que dependen del navegador.

// 📦 Importaciones principales
import dynamic from "next/dynamic"; // Importa carga dinámica de componentes para optimizar rendimiento
import { Spinner } from "@/components/utils/spinner"; // Spinner de carga
import { motion, useInView } from "framer-motion"; // Animaciones y hooks para detectar visibilidad
import { useRef, useEffect, useState } from "react"; // Hooks de React

import textEN from "@/utils/en.json"; // Textos en inglés
import textES from "@/utils/es.json"; // Textos en español
import NavBar from "@/components/navigation/NavBar"; // Navbar para móviles
import { MdPersonOutline } from "react-icons/md"; // Icono “persona”
import { PiToolbox } from "react-icons/pi"; // Icono “herramientas”
import { TbMessage } from "react-icons/tb"; // Icono “mensaje”
import { HiOutlineHome } from "react-icons/hi"; // Icono “home”
import { LanguageText } from "@/utils/types"; // Tipado para textos de idioma
import NavDesk from "@/components/navigation/NavDesk"; // Navbar para escritorio
import Button from "@/components/ui/Button"; // Componente Button reutilizable
import { IoMdDownload } from "react-icons/io"; // Icono descarga
import { scrollToSection } from "@/utils/utils"; // Función para scroll suave

// ⚡ Carga dinámica de componentes para mejorar el rendimiento y reducir el tiempo de carga inicial
const ProjectBox = dynamic(() => import("@/components/ProjectBox"), {
	ssr: true, // Permite renderizado del lado del servidor
	loading: () => <Spinner />, // Muestra un spinner mientras carga
});

const AboutMeBox = dynamic(
	() => import("@/components/AboutMeBox"),
	{ ssr: false } // Evita renderizado del lado del servidor (depende del cliente)
);

const TypewriterClient = dynamic(
	() => import("@/components/utils/typewritter"),
	{ ssr: false } // Efecto de máquina de escribir depende del cliente
);

const ContactBox = dynamic(() => import("@/components/ContactBox"), {
	ssr: false,
});

// 🔗 Secciones para navegación: key = id, label = texto del botón, icon = icono
const sections = [
	{ key: "home", label: "homeButton", icon: HiOutlineHome },
	{ key: "project", label: "projectButton", icon: PiToolbox },
	{ key: "aboutMe", label: "aboutMeButton", icon: MdPersonOutline },
	{ key: "contact", label: "contactButton", icon: TbMessage },
];

// 🌐 Componente principal de la página Home
export default function Home() {
	// 🌍 Estados de idioma
	const [language, setLanguage] = useState("en"); // Idioma actual ("en" o "es")
	const [savedLanguage, setSavedLanguage] = useState<LanguageText>(textEN); // Contiene textos cargados del JSON

	// 📍 Estado de navegación: sección actualmente visible
	const [navState, setNavState] = useState("home");

	// 📱 Detecta pantallas pequeñas (< 640px)
	const [isSmall, setIsSmall] = useState(false);

	// 💻 Marca si el componente ya se montó en el cliente (evita errores SSR)
	const [isClient, setIsClient] = useState(false);

	// ✅ Efecto para marcar que el componente ya se montó
	useEffect(() => {
		setIsClient(true);
	}, []);

	// 🧭 Referencias a las secciones para scroll y observación de intersección
	const sectionRefs = useRef<Record<string, HTMLElement | null>>({
		home: null,
		project: null,
		aboutMe: null,
		contact: null,
	});

	// 🌐 Carga dinámica del idioma cuando cambia `language`
	useEffect(() => {
		const loadLanguage = async () => {
			const langData = await import(`@/utils/${language}.json`);
			setSavedLanguage(langData.default);
		};
		loadLanguage();
	}, [language]);

	// 📏 Detecta cambios en tamaño de pantalla y actualiza `isSmall`
	useEffect(() => {
		const handleResize = () => setIsSmall(window.innerWidth < 640);

		// Escucha cambios de tamaño
		window.addEventListener("resize", handleResize);

		// Ejecuta el chequeo inicial inmediatamente
		const timerId = setTimeout(handleResize, 0);

		// Limpieza al desmontar
		return () => {
			window.removeEventListener("resize", handleResize);
			clearTimeout(timerId);
		};
	}, []);

	// 👁️ IntersectionObserver para actualizar la sección activa al hacer scroll
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				let found = false;
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setNavState(entry.target.id); // Actualiza la sección visible
						found = true;
					}
				});
			},
			{ threshold: 0.5 } // Se considera visible si al menos 50% del elemento está en pantalla
		);

		// Observa todas las secciones (orden inverso para detectar la más visible primero)
		const elements = Object.values(sectionRefs.current)
			.filter(Boolean)
			.reverse() as HTMLElement[];

		elements.forEach((el) => observer.observe(el));

		// Limpieza al desmontar
		return () => elements.forEach((el) => observer.unobserve(el));
	}, [sectionRefs.current.home]);

	// 🕒 Muestra un loader temporal si los textos aún no están cargados
	if (!savedLanguage) return <div>Loading...</div>;

	// 📄 Función para abrir el CV en una nueva pestaña
	const viewCV = () => window.open("/Cruz Max Nicolas CV-V3_1.pdf", "_blank");

	return (
		<>
			{/* 🧭 HEADER PRINCIPAL */}
			{isClient && savedLanguage && (
				<header
					id="home"
					ref={(el) => {
						sectionRefs.current.home = el as HTMLElement | null;
					}}
					className="flex flex-col items-center justify-center text-center gap-4 py-12 px-4 sm:mt-10 lg:h-screen lg:justify-center lg:mt-0"
				>
					{/* 💬 Texto animado con efecto máquina de escribir */}
					<h3 className="text-glow-turquoise-blue-30 text-lg font-medium tracking-wide">
						<TypewriterClient
							text={savedLanguage?.header?.greeting ?? ""}
							speed={150} // Velocidad de escritura
						/>
					</h3>

					<h1 className="text-5xl md:text-6xl font-exo font-bold bg-gradient-to-r from-glow-turquoise-blue-30 via-glow-purple-pizzazz-40 to-glow-turquoise-blue-50 bg-clip-text text-transparent drop-shadow-lg">
						<TypewriterClient
							text={savedLanguage?.header?.name ?? ""}
							speed={100}
						/>
					</h1>

					<h3 className="text-glow-purple-pizzazz-40 text-xl md:text-2xl italic font-semibold">
						<TypewriterClient
							text={savedLanguage?.header?.rol ?? ""}
							speed={150}
						/>
					</h3>

					{/* 🧭 Botones principales (CV, contacto, proyectos, idioma) */}
					<div className="flex gap-4 mt-6 text-white justify-center">
						{/* 📄 Botón para descargar el CV */}
						<Button
							className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-glow-turquoise-blue-40 bg-transparent text-glow-turquoise-blue-30 shadow-[0_0_10px_rgba(34,220,238,0.6)] hover:shadow-[0_0_20px_rgba(34,220,238,0.9)] hover:text-white hover:bg-glow-turquoise-blue-40/20 transition-all duration-300"
							onClick={viewCV}
						>
							<IoMdDownload size={20} />
						</Button>

						{/* ✉️ Botón que lleva a la sección de contacto */}
						<Button
							className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-glow-purple-pizzazz-40 bg-transparent text-glow-purple-pizzazz-30 shadow-[0_0_10px_rgba(253,114,231,0.6)] hover:shadow-[0_0_20px_rgba(253,114,231,0.9)] hover:text-white hover:bg-glow-purple-pizzazz-40/20 transition-all duration-300"
							onClick={() => {
								setNavState("contact");
								scrollToSection("contact");
							}}
						>
							<TbMessage size={20} />
						</Button>

						{/* 🧰 Botón que lleva a la sección de proyectos */}
						<Button
							className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-glow-purple-pizzazz-30 bg-transparent text-glow-turquoise-blue-30 shadow-[0_0_10px_rgba(25,177,192,0.6)] hover:shadow-[0_0_20px_rgba(25,177,192,0.9)] hover:text-white hover:bg-glow-turquoise-blue-30/20 transition-all duration-300"
							onClick={() => {
								setNavState("project");
								scrollToSection("project");
							}}
						>
							<PiToolbox size={20} />
						</Button>

						{/* 🌐 Botón para cambiar idioma (EN ↔ ES) */}
						<Button
							className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-glow-turquoise-blue-30 bg-transparent text-glow-purple-pizzazz-30 shadow-[0_0_10px_rgba(34,220,238,0.6)] hover:shadow-[0_0_20px_rgba(253,114,231,0.9)] hover:text-white hover:bg-glow-purple-pizzazz-30/20 transition-all duration-300 font-semibold tracking-wide"
							onClick={async () => {
								const newLanguage = language === "en" ? "es" : "en";
								setLanguage(newLanguage); // Cambia el idioma
							}}
						>
							<span className="text-sm">{language === "en" ? "EN" : "ES"}</span>
						</Button>
					</div>
				</header>
			)}

			{/* 📦 MAIN CONTENT */}
			<main className="flex h-full max-h-screen flex-col items-center justify-start scrollbar-hide mb-4 pb-5">
				{/* 🧭 Navbar para móvil */}
				<div className="flex lg:hidden">
					<NavBar
						sections={sections}
						currentSection={navState} // Sección activa
						onSectionChange={setNavState} // Callback para cambiar sección
						labels={savedLanguage.main} // Textos del navbar según idioma
					/>
				</div>

				{/* 🧭 Navbar para escritorio */}
				<div className="lg:flex hidden">
					<NavDesk
						sections={sections}
						currentSection={navState}
						onSectionChange={setNavState}
						labels={savedLanguage.main}
					/>
				</div>

				{/* 💼 Sección de proyectos */}
				<div
					id="project"
					ref={(el) => {
						sectionRefs.current.project = el as HTMLElement | null;
					}}
					className="w-full"
				>
					<motion.div
						initial={{ opacity: 0, y: 50 }} // Estado inicial de animación
						animate={
							navState === "project"
								? { opacity: 1, y: 0 } // Cuando la sección es visible
								: { opacity: 0, y: 50 } // Cuando no lo es
						}
						transition={{ duration: 0.3, ease: "easeOut" }} // Configuración de transición
					>
						<ProjectBox projectCard={savedLanguage.projectCard} />
					</motion.div>
				</div>

				{/* 👤 Sección “Sobre mí” */}
				<div
					id="aboutMe"
					ref={(el) => {
						sectionRefs.current.aboutMe = el as HTMLElement | null;
					}}
				>
					<AboutMeBox aboutMeBox={savedLanguage.aboutMeBox} />
				</div>

				{/* 💬 Sección de contacto */}
				<div
					id="contact"
					ref={(el) => {
						sectionRefs.current.contact = el as HTMLElement | null;
					}}
				>
					<ContactBox meContact={savedLanguage.meContact} />
				</div>
			</main>
		</>
	);
}
