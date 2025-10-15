import React from "react";
import { FaReact, FaHtml5, FaFigma, FaNodeJs } from "react-icons/fa"; // 🔹 Íconos de tecnologías populares
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri"; // 🔹 Íconos de Tailwind y Next.js
import { FaCss3Alt } from "react-icons/fa6"; // 🔹 Ícono de CSS3 (fa6 = FontAwesome v6)
import { IoLogoJavascript } from "react-icons/io5"; // 🔹 Ícono de JavaScript
import { SiSequelize, SiExpress, SiSocketdotio } from "react-icons/si"; // 🔹 Íconos de librerías backend
import { DiMysql } from "react-icons/di"; // 🔹 Ícono de MySQL
import { SkillsBoxText } from "@/utils/types"; // 📘 Tipo TypeScript que define la estructura de las props

// 📦 Componente SkillBox
// Muestra las habilidades técnicas del usuario, organizadas por categoría (Frontend, Backend, Aprendiendo).
// Props:
//  - skillsBox: objeto con títulos y etiquetas para cada grupo de habilidades (definido en SkillsBoxText)
function SkillBox({ skillsBox }: { skillsBox: SkillsBoxText }) {
	// 🔹 Definición de las categorías de habilidades (Frontend, Backend, Learning)
	// Cada categoría incluye un título y un conjunto de íconos representando tecnologías o herramientas.
	const skills = [
		{
			title: skillsBox.frontEndTitle, // 🖥️ Título del bloque de Frontend
			icons: [
				<RiTailwindCssFill
					className="icon-style text-blue-400"
					title="Tailwind CSS"
				/>,
				<FaReact className="icon-style text-cyan-500" title="React" />,
				<FaCss3Alt className="icon-style text-blue-500" title="CSS3" />,
				<FaHtml5 className="icon-style text-orange-500" title="HTML5" />,
				<IoLogoJavascript
					className="icon-style text-yellow-400"
					title="JavaScript"
				/>,
				<FaFigma className="icon-style text-pink-500" title="Figma" />,
			],
		},
		{
			title: skillsBox.backEndTitle, // ⚙️ Título del bloque de Backend
			icons: [
				<SiSequelize
					className="icon-style"
					style={{ color: "#52B0E7" }}
					title="Sequelize"
				/>,
				<FaNodeJs className="icon-style text-green-500" title="Node.js" />,
				<SiExpress className="icon-style text-black" title="Express" />,
				<DiMysql className="icon-style text-blue-600" title="MySQL" />,
			],
		},
		{
			title: skillsBox.learningTitle, // 🚀 Título del bloque de tecnologías en aprendizaje
			icons: [
				// 🐍 Python (usado como imagen SVG personalizada)
				<img
					src="/python-svgrepo-com.svg"
					alt="Python Logo"
					title="Python"
					className="w-12"
				/>,
				<RiNextjsFill
					className="icon-style -ml-4 text-black"
					title="Next.js"
				/>,
				<SiSocketdotio
					className="icon-style text-purple-500"
					title="Socket.IO"
				/>,
			],
		},
	];

	return (
		// 🔹 Contenedor general de las secciones de habilidades
		<div className="">
			{/* Título principal del bloque de Skills */}
			<h3 className="text-xl font-semibold text-glow-turquoise-blue-30 mb-4 tracking-wide">
				{skillsBox.title}
			</h3>

			{/* 🔁 Recorre las categorías de habilidades (Frontend, Backend, Learning) */}
			{skills.map((skill, index) => (
				<section
					key={index} // Clave única para cada categoría
					className="border-l-4 mb-3 border-glow-purple-pizzazz-50 pl-2 hover:border-glow-turquoise-blue-40 transition-all duration-300"
				>
					{/* Subtítulo del grupo de habilidades */}
					<h3 className="font-semibold text-glow-turquoise-blue-40">
						{skill.title}
					</h3>

					{/* 🧠 Contenedor de íconos representando cada habilidad dentro del grupo */}
					<div className="text-3xl flex flex-wrap gap-3">
						{/* Itera sobre los íconos definidos en cada categoría */}
						{skill.icons.map((icon, idx) => (
							<span key={idx} className="flex items-center">
								{icon}
							</span>
						))}
					</div>
				</section>
			))}
		</div>
	);
}

// 🚀 Exporta el componente para su uso dentro de AboutMeBox u otras secciones del portafolio
export default SkillBox;
