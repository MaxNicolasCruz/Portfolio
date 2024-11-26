import { useEffect, MutableRefObject } from "react";

function useCanvasResize(
	canvasRef: MutableRefObject<HTMLCanvasElement | null>
) {
	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleResize = () => {
			let canvas = canvasRef.current;
			if (!canvas) return;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, [canvasRef]);
}

export default useCanvasResize;
