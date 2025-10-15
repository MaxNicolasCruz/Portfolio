"use client"; // Indica que este componente es un Client Component en Next.js
import React, { useState } from "react";
import Slider from "react-slick"; // Librería para carrusel de imágenes
import "slick-carousel/slick/slick.css"; // Estilos base de slick-carousel
import "slick-carousel/slick/slick-theme.css"; // Tema de slick-carousel
import Image from "next/image"; // Componente optimizado de Next.js para imágenes

// 🔹 Props esperadas por el componente ImageCarousel
interface CarouselProps {
	images: string[]; // Array de URLs de imágenes a mostrar en el carrusel
}

// 📦 Componente ImageCarousel
// Muestra un carrusel de imágenes con animación de carga (loader) y efectos visuales.
// Props:
//  - images: arreglo de rutas de imágenes
const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
	// 🔹 Estado para controlar la visibilidad del loader por cada imagen
	const [loadingStates, setLoadingStates] = useState<boolean[]>(
		new Array(images.length).fill(true) // Inicialmente todas las imágenes están "cargando"
	);

	/**
	 * handleImageLoad
	 * Marca que la imagen en la posición `index` ha terminado de cargar,
	 * ocultando el loader correspondiente.
	 * @param {number} index - índice de la imagen que se ha cargado
	 */
	const handleImageLoad = (index: number) => {
		setLoadingStates((prev) => {
			const updated = [...prev];
			updated[index] = false; // Cambia el estado de "cargando" a false
			return updated;
		});
	};

	// 🔹 Configuración del carrusel (react-slick)
	const settings = {
		dots: true, // Muestra puntos de navegación
		infinite: true, // Reproduce el carrusel de manera infinita
		speed: 500, // Velocidad de transición en ms
		slidesToShow: 1, // Número de slides visibles a la vez
		slidesToScroll: 1, // Número de slides que se desplazan por acción
		autoplay: true, // Habilita autoplay
		autoplaySpeed: 2500, // Intervalo de autoplay en ms
	};

	return (
		<div className="w-full">
			{/* 🔹 Mensaje si no hay imágenes disponibles */}
			{images.length === 0 ? (
				<h2 className="text-center font-bold py-6 bg-black/40 rounded-xl text-gray-400">
					Loading...
				</h2>
			) : (
				// 🔹 Componente Slider de react-slick con configuración definida
				<Slider {...settings}>
					{images.map((image, index) => (
						<div
							key={index}
							className="relative flex items-center justify-center"
						>
							{/* Loader visible mientras la imagen se está cargando */}
							{loadingStates[index] && (
								<div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 animate-pulse">
									<div className="w-10 h-10 border-4 border-t-transparent border-glow-turquoise-blue-40 rounded-full animate-spin" />
								</div>
							)}

							{/* Imagen optimizada de Next.js */}
							<Image
								src={image}
								alt={`Imagen ${index + 1}`}
								width={900} // ancho optimizado
								height={500} // alto optimizado
								onLoadingComplete={() => handleImageLoad(index)} // Callback al cargar
								className={`w-full h-[220px] md:h-[350px] object-cover rounded-xl transition-transform duration-500 hover:scale-[1.02] border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.2)] ${
									loadingStates[index] ? "opacity-0" : "opacity-100"
								} transition-opacity duration-500`}
							/>

							{/* Overlay decorativo para efecto visual */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 hover:opacity-40 transition-opacity duration-500 rounded-xl" />
						</div>
					))}
				</Slider>
			)}
		</div>
	);
};

// 🚀 Exporta el componente para uso en otras secciones de la app
export default ImageCarousel;
