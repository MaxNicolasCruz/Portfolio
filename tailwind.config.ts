import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				mogra: ["Mogra", "cursive"],
			},
			colors: {
				"blue-sky-primary": "#09D2FE",
				"blue-sky-secundary": "#00D1FF",
				"blue-primary": "#004453",
				"blue-secundary": "#005d79",
				"orange-primary": "#FE380B",
				"gray-primary": "#c3c1c0",
				"gray-dark": "#323E4D"
			},
			// Agregar las animaciones personalizadas
			keyframes: {
				slideUp: {
					"0%": { transform: "translateY(20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				slideDown: {
					"0%": { transform: "translateY(0)", opacity: "1" },
					"100%": { transform: "translateY(20px)", opacity: "0" },
				},
				navEffectUp: {
					"0%": { transform: "translateY(0px)" },
					"100%": { transform: "translateY(-2px)" },
				},
				navEffectDown: {
					"0%": { transform: "translateY(0px)" },
					"100%": { transform: "translateY(2px)" },
				}
			},
			animation: {
				slideUp: "slideUp 0.5s ease-out forwards",
				slideDown: "slideDown 0.3s ease-out forwards",
				navEffectUp: "navEffectUp 0.3s ease-out forwards",
				navEffectDown: "navEffectDown 0.3s ease-out forwards"
			},
		},
	},
	plugins: [],
};
export default config;
