"use client"; // 🔧 Indica que este componente se renderiza del lado del cliente (necesario en Next.js para usar hooks)

// 🧩 Importación de hooks y tipos necesarios
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react"; // Librería para renderizar partículas animadas en React
import type { Container, ISourceOptions } from "@tsparticles/engine"; // Tipos para definir opciones y contenedores de partículas
import { loadAll } from "@tsparticles/all"; // Carga todos los presets, plugins y generadores disponibles

// 🌌 Componente principal que crea un fondo animado con partículas hexagonales dinámicas
export default function HexagonParticles() {
	// 📍 Estado que indica si el motor de partículas está inicializado
	const [init, setInit] = useState(false);

	// ⚙️ Efecto que inicializa el motor de partículas al montar el componente
	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadAll(engine); // 👈 Carga todas las funciones, incluidas las trayectorias poligonales
		}).then(() => setInit(true)); // ✅ Una vez cargado, activa el renderizado de partículas
	}, []);

	// 🎨 Paleta de colores personalizada usada en las partículas
	const colorVar = {
		"glow-turquoise-blue-30": "#2cc9dd", // Azul turquesa brillante
		"glow-purple-pizzazz-60": "#db15c4", // Rosa púrpura vibrante
	};

	// 🧠 Configuración de partículas, definida con useMemo para optimizar el rendimiento
	const options: ISourceOptions = useMemo(
		() => ({
			particles: {
				// 🎨 Colores que alternan entre los dos tonos definidos
				color: {
					value: [
						colorVar["glow-purple-pizzazz-60"],
						colorVar["glow-turquoise-blue-30"],
					],
				},

				// 💫 Movimiento de las partículas
				move: {
					enable: true, // Habilita el movimiento
					speed: 4, // Velocidad base
					outModes: { default: "destroy" }, // Destruye la partícula al salir del canvas
					path: {
						enable: true, // Usa trayectorias poligonales
						generator: "polygonPathGenerator", // Generador de trayectorias poligonales
						options: { sides: 9, turnSteps: 40, angle: 30 }, // Define la forma y curva del movimiento
					},
					trail: {
						enable: true, // Deja un rastro al moverse
						length: 12, // Largo del rastro
						fill: { color: "#000" }, // Color de relleno del rastro
					},
				},

				number: { value: 0 }, // No genera partículas por defecto (solo mediante emisores)
				opacity: { value: 1 }, // Opacidad completa
				shape: { type: "circle" }, // Forma circular de las partículas
				size: { value: 3 }, // Tamaño de las partículas pequeñas

				// ⏳ Ciclo de vida de las partículas
				life: {
					duration: {
						sync: true,
						value: 9, // Duración de vida en segundos
					},
					count: 1, // La partícula se destruye una vez termina su vida
				},
			},

			// 🖤 Fondo negro del canvas
			background: { color: "#000000" },

			// 🎯 Emisores: generan partículas desde puntos o áreas específicas
			emitters: [
				// 🔹 Primer emisor: centro del canvas, genera partículas de movimiento rápido
				{
					rate: { quantity: 1, delay: 0.5 }, // Genera 1 partícula cada 0.5s
					position: { x: 50, y: 50 }, // Posición central (en porcentaje del canvas)
				},
				// 🔹 Segundo emisor: emite partículas lentas con efecto difuminado por todo el canvas
				{
					rate: { quantity: 2, delay: 0.5 }, // Genera menos partículas pero de manera constante
					position: { x: 50, y: 50 }, // También centrado
					size: { width: 100, height: 100 }, // Ocupa todo el canvas

					particles: {
						zIndex: { value: 10 }, // 👈 Se dibuja sobre las demás capas
						color: {
							value: [
								colorVar["glow-purple-pizzazz-60"],
								colorVar["glow-turquoise-blue-30"],
							],
						},
						size: { width: 100, height: 50 }, // Tamaños más variados
						opacity: { value: { min: 0.02, max: 0.08 } }, // Muy sutiles y suaves visualmente

						move: {
							enable: true,
							speed: { min: 0.05, max: 0.3 }, // Movimiento muy lento y fluido
							direction: "none",
							straight: false,
							outModes: { default: "out" }, // Sale del canvas sin destruirse
							random: true, // Movimiento aleatorio
							drift: { min: -2, max: 2 }, // Pequeña oscilación (efecto de humo o neblina)
						},

						// ⏳ Vida más corta para partículas lentas y difusas
						life: {
							duration: {
								sync: true,
								value: 7, // Viven 7 segundos
							},
							count: 1, // Se destruyen al finalizar su duración
						},
					},
				},
			],
		}),
		[]
	);

	// 🧱 Evita renderizar el componente hasta que el motor esté inicializado
	if (!init) return null;

	// 🪄 Renderiza el canvas de partículas con las opciones configuradas
	return <Particles id="tsparticles" options={options} />;
}
