import React from "react";
import { FaReact, FaHtml5, FaFigma, FaNodeJs } from "react-icons/fa";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";
import { FaCss3Alt } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { SiSequelize, SiExpress, SiSocketdotio } from "react-icons/si";
import { DiMysql } from "react-icons/di";

interface textProps {
	skillsBox: {
		frontEndTitle: string;
		backEndTitle: string;
		learningTitle: string;
	};
}
function SkillBox({ skillsBox }: textProps) {
	const skills = [
		{
			title: skillsBox.frontEndTitle,
			icons: [
				<RiTailwindCssFill className="icon-style text-blue-400" />,
				<FaReact className="icon-style text-cyan-500" />,
				<FaCss3Alt className="icon-style text-blue-500" />,
				<FaHtml5 className="icon-style text-orange-500" />,
				<IoLogoJavascript className="icon-style text-yellow-400" />,
				<FaFigma className="icon-style text-pink-500" />,
			],
		},
		{
			title: skillsBox.backEndTitle,
			icons: [
				<SiSequelize className="icon-style" style={{ color: "#52B0E7" }} />,
				<FaNodeJs className="icon-style text-green-500" />,
				<SiExpress className="icon-style text-black" />,
				<DiMysql className="icon-style text-blue-600" />,
			],
		},
		{
			title: skillsBox.learningTitle,
			icons: [
				<img
					src="/python-svgrepo-com.svg"
					alt="Python Logo"
					className="w-12"
				/>,
				<RiNextjsFill className="icon-style -ml-4 text-black" />,
				<SiSocketdotio className="icon-style text-purple-500" />,
			],
		},
	];
	return (
		<div className="p-2">
			{skills.map((skill, index) => (
				<section key={index} className="py-3">
					<h3 className="font-semibold text-blue-sky-primary dark:text-black">
						{skill.title}
					</h3>
					<div className="text-3xl flex space-x-4">
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

export default SkillBox;
