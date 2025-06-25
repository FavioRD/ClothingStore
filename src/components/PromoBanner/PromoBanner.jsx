import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import './PromoBanner.css';

export default function PromoBanner() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const promotions = [
    {
      id: 1,
      title: "Colección de Verano",
      subtitle: "Hasta 40% de descuento en selección de prendas",
      image: "https://concepto.de/wp-content/uploads/2018/08/verano1-e1535637769656.jpg",
      link: "/products?category=summer",
      cta: "Descubrir la colección",
      theme: "light"
    },
    {
      id: 2,
      title: "Nuevos Ingresos",
      subtitle: "Descubre nuestras últimas tendencias para esta temporada",
      image: "https://www.shutterstock.com/image-vector/promo-banner-healthy-lifestyle-natural-260nw-1996820612.jpg",
      link: "/products?sort=newest",
      cta: "Ver novedades",
      theme: "dark"
    },
    {
      id: 3,
      title: "Ofertas Exclusivas",
      subtitle: "Solo por tiempo limitado | Envío gratuito en pedidos superiores a $100",
      image: "https://www.shutterstock.com/image-vector/ad-banner-design-kids-clothes-260nw-2191568211.jpg",
      link: "/products?discount=gt30",
      cta: "Ver ofertas",
      theme: "light"
    }
  ];

  // Auto-rotación del carrusel
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % promotions.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovering, promotions.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div 
      className="promo-banner-container"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="promo-slides">
        {promotions.map((promo, index) => (
          <div 
            key={promo.id}
            className={`promo-slide ${index === activeIndex ? 'active' : ''} ${promo.theme}`}
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,${promo.theme === 'light' ? 0.3 : 0.5}), rgba(0,0,0,${promo.theme === 'light' ? 0.3 : 0.5})), url(${promo.image})`
            }}
          >
            <div className="promo-content">
              <div className="promo-text">
                <span className="promo-badge">Nueva Colección</span>
                <h2 className="promo-title">{promo.title}</h2>
                <p className="promo-subtitle">{promo.subtitle}</p>
                <button 
                  className="promo-cta"
                  onClick={() => navigate(promo.link)}
                >
                  {promo.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <button className="nav-arrow prev" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="nav-arrow next" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>

      {/* Indicadores de paginación */}
      <div className="slide-indicators">
        {promotions.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}