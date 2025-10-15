// "use client";
// import { IoMdDownload } from "react-icons/io";
// import { PiToolbox } from "react-icons/pi";
// import { TbMessage } from "react-icons/tb";
// import Button from "@/components/ui/Button";
// import { scrollToSection } from "@/utils/utils";
// import TypewriterClient from "./utils/typewritter";
// import { LanguageText } from "@/utils/types";

// export default function Header({
// 	savedLanguage,
// 	language,
// 	setLanguage,
// 	setNavState,
// }: {
// 	savedLanguage: LanguageText;
// 	language: string;
// 	setLanguage: (lang: string) => void;
// 	setNavState: (state: string) => void;
// }) {
// 	if (!savedLanguage) return null; // ⬅️ Espera hasta que el JSON esté cargado

// 	const viewCV = () => window.open("/Cruz Max Nicolas CV-V3_1.pdf", "_blank");

// 	return (
// 		<header
// 			id="home"
// 			className="flex flex-col items-center justify-center text-center gap-4 py-12 px-4 sm:mt-10 lg:h-screen lg:justify-center lg:mt-0"
// 		>
// 			{/* 👇 Estos textos se renderizan con SSR y luego el efecto se aplica en cliente */}
// 			<h3 className="text-glow-turquoise-blue-30 text-lg font-medium tracking-wide">
// 				<TypewriterClient text={savedLanguage.header.greeting} speed={150} />
// 			</h3>

// 			<h1 className="text-5xl md:text-6xl font-exo font-bold bg-gradient-to-r from-glow-turquoise-blue-30 via-glow-purple-pizzazz-40 to-glow-turquoise-blue-50 bg-clip-text text-transparent drop-shadow-lg">
// 				<TypewriterClient
// 					text={savedLanguage?.header?.name ?? ""}
// 					speed={100}
// 				/>
// 			</h1>

// 			<h3 className="text-glow-purple-pizzazz-40 text-xl md:text-2xl italic font-semibold">
// 				<TypewriterClient text={savedLanguage.header.rol} speed={150} />
// 			</h3>

// 			<div className="flex gap-4 mt-6 text-white justify-center">
// 				<Button
// 					className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-glow-turquoise-blue-40 bg-transparent text-glow-turquoise-blue-30 shadow-[0_0_10px_rgba(34,220,238,0.6)] hover:shadow-[0_0_20px_rgba(34,220,238,0.9)] hover:text-white hover:bg-glow-turquoise-blue-40/20 transition-all duration-300"
// 					onClick={viewCV}
// 				>
// 					<IoMdDownload size={20} />
// 				</Button>

// 				<Button
// 					className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-glow-purple-pizzazz-40 bg-transparent text-glow-purple-pizzazz-30 shadow-[0_0_10px_rgba(253,114,231,0.6)] hover:shadow-[0_0_20px_rgba(253,114,231,0.9)] hover:text-white hover:bg-glow-purple-pizzazz-40/20 transition-all duration-300"
// 					onClick={() => {
// 						setNavState("contact");
// 						scrollToSection("contact");
// 					}}
// 				>
// 					<TbMessage size={20} />
// 				</Button>

// 				<Button
// 					className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-glow-purple-pizzazz-30 bg-transparent text-glow-turquoise-blue-30 shadow-[0_0_10px_rgba(25,177,192,0.6)] hover:shadow-[0_0_20px_rgba(25,177,192,0.9)] hover:text-white hover:bg-glow-turquoise-blue-30/20 transition-all duration-300"
// 					onClick={() => {
// 						setNavState("project");
// 						scrollToSection("project");
// 					}}
// 				>
// 					<PiToolbox size={20} />
// 				</Button>

// 				<Button
// 					className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-glow-turquoise-blue-30 bg-transparent text-glow-purple-pizzazz-30 shadow-[0_0_10px_rgba(34,220,238,0.6)] hover:shadow-[0_0_20px_rgba(253,114,231,0.9)] hover:text-white hover:bg-glow-purple-pizzazz-30/20 transition-all duration-300 font-semibold tracking-wide"
// 					onClick={async () => {
// 						const newLanguage = language === "en" ? "es" : "en";
// 						setLanguage(newLanguage);
// 					}}
// 				>
// 					<span className="text-sm">{language === "en" ? "EN" : "ES"}</span>
// 				</Button>
// 			</div>
// 		</header>
// 	);
// }
