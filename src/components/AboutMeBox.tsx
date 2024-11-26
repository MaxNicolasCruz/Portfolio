import React from "react";

interface TextProps {
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
}

// Definir socialIcons fuera del componente si no cambiará
const socialIcons = [
	{
		icon: <img src="/github-142-svgrepo-com.svg" className="icon-style hover:border-2 hover:border-b-blue-sky-secundary hover:border-t-blue-sky-secundary hover:rounded-full" />,
		link: "https://github.com/MaxNicolasCruz",
	},
	{
		icon: <img src="/linkedin-svgrepo-com.svg" className="icon-style hover:border-2 hover:border-b-blue-sky-secundary hover:border-t-blue-sky-secundary hover:rounded-full" />,
		link: "https://www.linkedin.com/in/max-nicolas-cruz/",
	},
	{
		icon: <img src="/ms-outlook-svgrepo-com.svg" className="icon-style hover:border-2 hover:border-b-blue-sky-secundary hover:border-t-blue-sky-secundary hover:rounded-full" />,
		link: "mailto:d3velopermax@gmail.com",
	},
];

const AboutMeBox: React.FC<TextProps> = ({ aboutMeBox }) => (
	<article className="p-2 cursor-default">
		<div className="my-2">
			<h3 className="font-semibold text-blue-sky-primary dark:text-black">
				{aboutMeBox.meTitle}
			</h3>
			<p className="pl-2">{aboutMeBox.meDescription}</p>
		</div>
		<div className="my-2">
			<h3 className="font-semibold text-blue-sky-primary dark:text-black">
				{aboutMeBox.educationTitle}
			</h3>
			{Object.entries(aboutMeBox.educationDescription).map(([key, element]) => (
				<div key={key} className="pl-2">
					<p>{element.name}</p>
					<p className="font-semibold pl-3">{element.certificate}</p>
					<p className="pl-3">{element.duration}</p>
				</div>
			))}
		</div>
		<div className="my-2">
			<h3 className="font-semibold text-blue-sky-primary dark:text-black mb-2">
				{aboutMeBox.meContact}
			</h3>
			<div className="flex justify-evenly p-3 ">
				{socialIcons.map(({ icon, link }, index) => (
					<a
						key={index}
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className="mx-auto text-3xl cursor-pointer  p-1"
					>
						{icon}
					</a>
				))}
			</div>
		</div>
	</article>
);

export default AboutMeBox;
