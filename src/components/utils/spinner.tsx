import { FaSpinner } from "react-icons/fa"; // O cualquier ícono que prefieras

export const Spinner = () => (
	<div className="flex justify-center items-center h-full m-10">
		<div className="border-4 border-black dark:border-l-blue-sky-secundary border-t-transparent rounded-full animate-spin relative">
			<FaSpinner className="text-black dark:text-blue-sky-primary w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
		</div>
	</div>
);
