// 📦 Importa el tipo Metadata de Next.js, usado para definir metadatos del documento (título, descripción, etc.)
import type { Metadata } from "next";

// 📄 Importa los estilos globales de la aplicación
import "./globals.css";

// 🌌 Importa el componente de fondo dinámico con partículas hexagonales
import HexagonParticles from "@/components/bgDynamic/HexagonParticles";

// 🧾 Define los metadatos globales del sitio web (aparecen en el <head> del documento HTML)
export const metadata: Metadata = {
	title: "Cruz Max Nicolas Portfolio", // Título que aparece en la pestaña del navegador
	description: "Portfolio by Nico Cruz", // Descripción del sitio para SEO
};

// 🧩 Componente raíz que envuelve toda la aplicación
// Este layout se aplica a todas las páginas del proyecto Next.js
export default function RootLayout({
	children, // 🧠 Contenido dinámico que representa las páginas hijas del layout
}: {
	children: React.ReactNode; // Tipo de dato que puede contener cualquier nodo de React
}) {
	return (
		// 🌍 Estructura base del documento HTML
		<html lang="en" className="scrollbar-hide" id="html">
			{/* 🧍‍♂️ Cuerpo principal del documento */}
			<body className="font-mogra relative">
				{/* 🔹 Fondo dinámico con partículas hexagonales animadas */}
				<HexagonParticles />

				{/* 🔹 Contenido principal (páginas, secciones, componentes) */}
				{/* Se coloca por encima del fondo gracias al z-index */}
				<main className="relative z-10">{children}</main>
			</body>
		</html>
	);
}
