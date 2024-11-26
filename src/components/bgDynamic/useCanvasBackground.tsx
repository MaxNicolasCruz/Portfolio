import { useEffect, MutableRefObject } from "react";

function useCanvasBackground(
	canvasRef: MutableRefObject<HTMLCanvasElement | null>,
	circles: MutableRefObject<any[]>,
	classDark: string | null
) {
	useEffect(() => {
		let canvas = canvasRef.current;
		if (!canvas) return;

		canvas.style.background =
			classDark === "no-dark"
				? "linear-gradient(90deg, #00080A 0%, #00080A 10%,  #00323D 100%)"
				: "linear-gradient(90deg, #09d2fe 0%, #09d2fe 10%, #fbfbfb 100%)";

		circles.current.forEach((circle) => {
			circle.glowColor =
				classDark === "no-dark"
					? "rgba(255, 255, 255, 0.8)"
					: "rgba(0, 0, 0, 0.3)";
		});
	}, [canvasRef, circles, classDark]);
}

export default useCanvasBackground;
