import type { Config } from "tailwindcss";

// 🔹 Configuración principal de Tailwind CSS
const config: Config = {
	// Modo oscuro habilitado mediante clase "dark" en el body o root
	darkMode: "class",

	// 📂 Rutas donde Tailwind buscará clases para generar los estilos
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Páginas
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Componentes
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Carpeta app (Next.js 13+)
	],

	theme: {
		extend: {
			// 🔤 Fuentes personalizadas
			fontFamily: {
				exo: ['"Exo 2"', "sans-serif"], // Fuente Exo 2 con fallback a sans-serif
			},

			// 🎨 Colores personalizados para efectos glow y acentos
			colors: {
				"glow-turquoise-blue": {
					"10": "#d0f8ff",
					"20": "#8af0fe",
					"30": "#22dcee",
					"40": "#1ecada",
					"50": "#19b1c0",
					"60": "#1496a2",
					"70": "#0e7983",
					"80": "#085b64",
					"90": "#043e44",
					"100": "#012226",
					"110": "#011416",
				},
				"glow-purple-pizzazz": {
					"10": "#ffebfa",
					"20": "#fed0f5",
					"30": "#fda2ed",
					"40": "#fd72e7",
					"50": "#fc2ae2",
					"60": "#db15c4",
					"70": "#bd10a9",
					"80": "#950a85",
					"90": "#69055e",
					"100": "#3d0236",
					"110": "#270122",
				},
			},

			// 🔹 Animaciones personalizadas con keyframes
			keyframes: {
				slideUp: {
					// Deslizar hacia arriba con fade-in
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				slideDown: {
					// Deslizar hacia abajo con fade-out
					"0%": { transform: "translateY(0)", opacity: "1" },
					"100%": { transform: "translateY(20px)", opacity: "0" },
				},
				navEffectUp: {
					// Pequeño desplazamiento hacia arriba (efecto hover nav)
					"0%": { transform: "translateY(0px)" },
					"100%": { transform: "translateY(-2px)" },
				},
				navEffectDown: {
					// Pequeño desplazamiento hacia abajo (efecto hover nav)
					"0%": { transform: "translateY(0px)" },
					"100%": { transform: "translateY(2px)" },
				},
			},

			// 🔹 Alias de animaciones para usar directamente con clases
			animation: {
				slideUp: "slideUp 0.5s ease-out forwards",
				slideDown: "slideDown 0.3s ease-out forwards",
				navEffectUp: "navEffectUp 0.3s ease-out forwards",
				navEffectDown: "navEffectDown 0.3s ease-out forwards",
			},

			// 🔹 Sombras personalizadas para glow
			boxShadow: {
				"glow-turq": "0 0 15px 2px rgba(34, 220, 238, 0.5)", // Glow turquesa
				"glow-purple": "0 0 15px 5px rgba(252, 42, 226, 0.6)", // Glow púrpura
			},
		},
	},

	// 🔌 Plugins adicionales (vacío en este proyecto)
	plugins: [],
};

// 🚀 Exporta la configuración de Tailwind CSS
export default config;
