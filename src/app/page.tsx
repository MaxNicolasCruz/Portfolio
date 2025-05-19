"use client";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/utils/spinner";

const ProjectBox = dynamic(() => import("@/components/ProjectBox"), {
	ssr: true,
	loading: () => <Spinner />,
});
const AboutMeBox = dynamic(() => import("@/components/AboutMeBox"), {
	ssr: false,
	loading: () => <Spinner />,
});
const SkillBox = dynamic(() => import("@/components/SkillBox"), {
	ssr: false,
	loading: () => <Spinner />,
});
const ConfigureBox = dynamic(
	() => import("@/components/ConfigureComponent/ConfigureBox"),
	{
		ssr: false
	}
);

import { useEffect, useState } from "react";
import textEN from "@/utils/en.json";
import textES from "@/utils/es.json";
import Button from "@/components/ui/Button";
import { IoMdDownload } from "react-icons/io";
import NavBar from "@/components/navigation/NavBar";
interface LanguageText {
	header: {
		name: string;
		rol: string;
		cvButton: string;
	};
	main: {
		projectsButton: string;
		aboutMeButton: string;
		skillsButton: string;
	};
	projectCard: {
		[key: string]: {
			name: string;
			description: string;
			img: string;
			technologies: string[];
			link: string;
		};
	};
	aboutMeBox: {
		meTitle: string;
		meDescription: string;
		educationTitle: string;
		educationDescription: {
			[key: string]: {
				name: string;
				certificate: string;
				duration: string;
			};
		};
		meContact: string;
	};
	skillsBox: {
		frontEndTitle: string;
		backEndTitle: string;
		learningTitle: string;
	};
}
const sections = [
	{ key: "project", label: "projectsButton" },
	{ key: "aboutMe", label: "aboutMeButton" },
	{ key: "skill", label: "skillsButton" },
];

// Mover el mapa de secciones fuera del componente
const createSectionsMap = (
	savedLanguage: LanguageText
): { [key: string]: JSX.Element } => ({
	project: <ProjectBox projects={savedLanguage.projectCard} />,
	aboutMe: <AboutMeBox aboutMeBox={savedLanguage.aboutMeBox} />,
	skill: <SkillBox skillsBox={savedLanguage.skillsBox} />,
});

export default function Home() {
	const [language, setLanguage] = useState("en");
	const [savedLanguage, setSavedLanguage] = useState<LanguageText>(textEN);

	const [navState, setNavState] = useState("project");

	useEffect(() => {
		const loadLanguage = async () => {
			const langData = await import(`@/utils/${language}.json`);
			setSavedLanguage(langData.default);
		};
		loadLanguage();
	}, [language]);

	const viewCV = () => {
		const cvPath = "/Cruz Max Nicolas CV-V3_1.pdf";
		window.open(cvPath, "_blank");
	};

	if (!savedLanguage) return <div>Loading...</div>;

	return (
		<>
			<header className="text-white dark:text-black text-center flex flex-col items-center py-10 font-mogra ">
				<h1 className="font-bold text-2xl">Cruz Max Nicolas </h1>
				<h3 className=" text-sm text-gray-400 dark:text-blue-primary dark:font-semibold ">
					{savedLanguage.header.rol}
				</h3>
				<Button className="mt-3 flex items-center text-black " onClick={viewCV}>
					{savedLanguage.header.cvButton}
					<IoMdDownload />
				</Button>
			</header>
			<main className="flex h-full max-h-screen flex-col items-center justify-start scrollbar-hide mb-4">
				<NavBar
					sections={sections}
					currentSection={navState}
					onSectionChange={setNavState}
					labels={savedLanguage.main}
				/>

				<section className="w-[90%] h-full rounded-md bg-slate-600 backdrop-blur-sm bg-opacity-70 -mt-1 pb-2  ">
					{createSectionsMap(savedLanguage)[navState]}
				</section>
				<section>
					<ConfigureBox
						changeLanguage={async (lang) => {
							const langData = await import(`@/utils/${lang}.json`);
							setSavedLanguage(langData.default);
						}}
					/>
				</section>
			</main>
		</>
	);
}
