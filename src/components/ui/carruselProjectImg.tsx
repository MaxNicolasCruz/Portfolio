import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

// Tipado de las props para el componente Carrusel
interface CarouselProps {
	images: string[];
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {

	// Configuración para el carrusel
	const settings = {
		dots: true, // Muestra puntos de navegación
		infinite: true, // Desplazamiento infinito
		speed: 500, // Velocidad de la transición
		slidesToShow: 1, // Número de imágenes visibles a la vez
		slidesToScroll: 1, // Número de imágenes que se desplazan al cambiar
		autoplay: true, // Reproducción automática
		autoplaySpeed: 1000, // Tiempo entre cada desplazamiento en ms
	};

	return (
		<div className="max-w-3xl mx-auto my-6">
			{images.length === 0 ?
			(
				<h2 className="font-bold text-red-500 text-center">NOT FOUND IMAGES</h2>
			) : (
				<Slider {...settings}>
				{images.map((image, index) => (
					<div key={index} className="p-2">
						<Image
							src={image}
							alt={`Imagen ${index + 1}`}
							layout="responsive"
							width={100}
							height={100}
							className="w-full h-auto object-cover rounded-md"
							loading="lazy"
						/>
					</div>
				))}
			</Slider>
			) }
			
		</div>
	);
};

export default ImageCarousel;
