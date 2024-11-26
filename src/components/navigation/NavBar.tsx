import React from "react";
import Button from "@/components/ui/Button";

interface NavBarProps {
	sections: { key: string; label: string }[];
	currentSection: string;
	onSectionChange: (key: string) => void;
	labels: Record<string, string>;
}

const NavBar: React.FC<NavBarProps> = ({
	sections,
	currentSection,
	onSectionChange,
	labels,
}) => {
	return (
		<nav className="flex items-center justify-center">
			{sections.map(({ key, label }) => (
				<Button
					key={key}
					className={`mx-1.5 ${
						currentSection === key
							? "animate-navEffectUp border-gray-dark"
							: "animate-navEffectDown"
					}`}
					onClick={() => onSectionChange(key)}
				>
					{labels[label]}
				</Button>
			))}
		</nav>
	);
};

export default NavBar;
