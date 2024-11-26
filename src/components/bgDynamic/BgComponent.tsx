"use client";
import React, { useEffect, useRef, useState } from "react";
import useCanvas from "./useCanvas";
import useToggle from "./useToggle";
import useCanvasResize from "./useCanvasResize";
import useCanvasBackground from "./useCanvasBackground";

function BgComponent({ children }: { children: React.ReactNode }) {
	const classDark = useToggle()
	const circles = useRef<Array<any>>([]);
	const canvasRef = useCanvas(circles, classDark || "no-dark");
	
	useCanvasResize(canvasRef)

	// Configura el fondo del canvas y el glow de los círculos
	useCanvasBackground(canvasRef, circles, classDark);

	function addCircle(count: number) {
		let canvas = canvasRef.current;
		if (!canvas) return;

		for (let i = 0; i < count; i++) {
			circles.current.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				radius: Math.random() * 10 + 5,
				fill: "#09D2FE",
				dx: Math.random() * 1,
				dy: Math.random() * 1,
				growing: true,
				glowColor:
					classDark === "dark"
						? "rgba(255, 255, 255, 0.8)"
						: "rgba(0, 0, 0, 0.3)",
			});
		}
	}

	useEffect(() => {
		canvasConfig();
		if (circles.current.length === 0) {
			addCircle(15);
		}
	}, []);

	function canvasConfig() {
		let canvas = canvasRef.current;
		if (!canvas) return;

		canvas.style.position = "fixed";
		canvas.style.top = "0";
		canvas.style.left = "0";
		canvas.style.zIndex = "-1";
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	return (
		<div className="relative z-10">
			<canvas ref={canvasRef}></canvas>
			{children}
		</div>
	);
}

export default BgComponent;
