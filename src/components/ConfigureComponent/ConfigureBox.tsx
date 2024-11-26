"use client";

import React, { useEffect, useState } from "react";
import { FaMoon, FaSun, FaCog } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";

interface ConfigureBoxProps {
	changeLanguage: (lang: string) => void;
}

function ConfigureBox({ changeLanguage }: ConfigureBoxProps) {
	const [language, setLanguage] = useState("en");
	const [cogFocus, setCogFocus] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	function toggle() {
		setDarkMode(!darkMode);
		document.documentElement.classList.toggle("dark");
	}

	useEffect(() => {
		changeLanguage(language);
	}, [language]);

	useEffect(() => {
		if (cogFocus) {
			setShowMenu(true); 
		} else {
			setTimeout(() => setShowMenu(false), 500); 
		}
	}, [cogFocus]);

	return (
		<>
			<div className="fixed bottom-5 right-5 z-40">
				
				<FaCog
					className={`dark:bg-blue-sky-primary dark:hover:bg-gray-200 text-gray-500 dark:text-gray-950  bg-gray-800 hover:bg-gray-300 text-4xl rounded-full p-1 cursor-pointer shadow-lg  transform transition-all duration-300 ${
						cogFocus ? "rotate-90" : ""
					}`}
					onClick={() => setCogFocus(!cogFocus)}
				/>
			</div>
			{showMenu && (
				<div
					className={`fixed bottom-[1.2rem] right-4 z-30 dark:bg-blue-sky-primary bg-gray-800 rounded-lg shadow-xl p-1 pb-12 transition-all ${
						cogFocus ? "animate-slideUp" : "animate-slideDown"
					}`}
				>
					<button
						onClick={toggle}
						className="flex items-center justify-center w-9 h-9 mb-3 dark:bg-gray-900 bg-gray-700 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-100"
					>
						<FaMoon className="hidden dark:block text-2xl text-yellow-300 transition-opacity duration-300 ease-in-out" />
						<FaSun className="block dark:hidden text-2xl text-yellow-500 transition-opacity duration-300 ease-in-out" />
					</button>

					<button
						className="flex items-center justify-center w-9 h-9 dark:bg-gray-900 bg-gray-700 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600"
						onClick={() => setLanguage(language == "en" ? "es" : "en")}
					>
						<BsTranslate className="text-2xl  text-blue-500 dark:text-blue-300" />
					</button>
				</div>
			)}
		</>
	);
}

export default ConfigureBox;
