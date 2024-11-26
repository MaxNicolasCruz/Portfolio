// useCanvas.ts
import { useEffect, useRef } from "react";

function useCanvas(circles: React.MutableRefObject<any[]>, classDark: string) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const animationFrameId = useRef<number | null>(null);
	
    function drawCircle(
        x: number,
        y: number,
        radius: number,
        fill: string,
        glowColor: string,
        canvas:  HTMLCanvasElement
    ) {
        
		const ctx = canvas.getContext("2d")!;
		if (!ctx) return;

        ctx.beginPath();
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        const gradient = ctx.createRadialGradient(
            x,
            y,
            radius * 0.1,
            x,
            y,
            radius
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    
    useEffect(() => {
		const canvas = canvasRef.current!;
		if (!canvas) return;
		const ctx = canvas.getContext("2d")!;
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		
		function animateCircles() {
			function draw() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				circles.current.forEach((circle) => {
					drawCircle(
						circle.x,
						circle.y,
						circle.radius,
						circle.fill,
						circle.glowColor,
                        canvas
					);
					circle.x += circle.dx;
					circle.y += circle.dy;
					if (circle.growing) {
						circle.radius += 0.05;
						if (circle.radius >= 14) circle.growing = false;
					} else {
						circle.radius -= 0.05;
						if (circle.radius <= 1) {
							circle.x = Math.random() * window.innerWidth;
							circle.y = Math.random() * window.innerHeight;
							circle.growing = true;
						}
					}
					if (
						circle.x + circle.radius > canvas.width ||
						circle.x - circle.radius < 0
					)
						circle.dx = -circle.dx;
					if (
						circle.y + circle.radius > canvas.height ||
						circle.y - circle.radius < 0
					)
						circle.dy = -circle.dy;
				});
				animationFrameId.current = requestAnimationFrame(draw);
			}

			draw();
		}

		// Cancela la animación anterior si existe
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current);
		}

		animateCircles();
		return () => {
			// Cancela la animación cuando el componente se desmonta
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, [classDark, circles]);

	return canvasRef;
}

export default useCanvas;
