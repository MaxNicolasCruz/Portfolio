import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>; // Maneja el evento de clic
}

function Button({ children, className = "", onClick }: ButtonProps) {
	return (
		<button
			className={`dark:bg-blue-sky-primary dark:border-orange-primary dark:text-black text-slate-950 border-2 rounded-md px-2 font-bold bg-blue-secundary border-gray-primary ${className} `}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
