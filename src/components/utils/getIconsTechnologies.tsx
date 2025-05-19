import { FaReact, FaNodeJs, FaBootstrap } from "react-icons/fa";
import {
	SiCss3,
	SiMysql,
	SiExpress,
	SiSequelize,
	SiSocketdotio,
	SiJsonwebtokens,
	SiAxios,
	SiFigma,
	SiGithub,
	SiJavascript,
	SiHtml5,
	SiGit,
	SiPython,
	SiMariadbfoundation
} from "react-icons/si";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";

function getTechnologyIcon(techName: string) {

	switch (techName.toLowerCase()) {
		case "reactjs":
			return <FaReact className="text-cyan-500 text-2xl" />;
		case "nodejs":
			return <FaNodeJs className="text-green-500 text-2xl" />;
		case "tailwindcss":
			return <RiTailwindCssFill className="text-sky-400 text-2xl" />;
		case "socketio":
			return <SiSocketdotio className="text-gray-600 text-2xl" />;
		case "jwt":
			return <SiJsonwebtokens className="text-red-500 text-2xl" />;
		case "axios":
			return <SiAxios className="text-blue-400 text-2xl" />;
		case "figma":
			return <SiFigma className="text-pink-500 text-2xl" />;
		case "github":
			return <SiGithub className="text-black text-2xl" />;
		case "javascript":
			return <SiJavascript className="text-yellow-500 text-2xl" />;
		case "html5":
			return <SiHtml5 className="text-orange-500 text-2xl" />;
		case "git":
			return <SiGit className="text-orange-600 text-2xl" />;
		case "python":
			return <SiPython className="text-blue-500 text-2xl" />;
		case "bootstrapcss":
			return <FaBootstrap className="text-purple-600 text-2xl" />;
		case "css":
			return <SiCss3 className="text-blue-500 text-2xl" />;
		case "mysql":
			return <SiMysql className="text-blue-800 text-2xl" />;
		case "expressjs":
			return <SiExpress className="text-gray-700 text-2xl" />;
		case "sequelize":
			return <SiSequelize className="text-indigo-600 text-2xl" />;
		case "mariadb":
			return <SiMariadbfoundation className="text-white-500 text-2xl" />;
		case "nextjs":
			return <RiNextjsFill />
		default:
			return null;
	}
}

export default getTechnologyIcon;
