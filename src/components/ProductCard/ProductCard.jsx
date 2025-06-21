import { useState } from 'react';
import { Heart, Eye, Bag } from 'react-bootstrap-icons';
import ProductModal from '../ProductModal/ProductModal';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // URLs de imágenes por defecto
  const defaultImages = [
    'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  // Manejo seguro de imágenes
  const images = product.images?.length ? product.images : defaultImages;
  const primaryImage = images[0];
  const secondaryImage = images[1] || images[0];

  // Manejo seguro de precios y descuentos
  const price = product.price || 0;
  const salePrice = product.salePrice || price;
  const discountPercentage = product.onSale 
    ? Math.round((1 - salePrice / price) * 100)
    : 0;

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen del producto con efecto parallax */}
      <div className="product-image-container">
        <div 
          className="primary-image" 
          style={{ backgroundImage: `url(${primaryImage})` }}
        />
        <div 
          className="secondary-image" 
          style={{ backgroundImage: `url(${secondaryImage})` }}
        />
        
        {/* Overlay de interacción */}
        <div className="image-overlay">
          <button 
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            aria-label={isWishlisted ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Heart size={18} />
          </button>
          
          <div className="quick-actions">
            <button 
              className="quick-view-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              aria-label="Vista rápida del producto"
            >
              <Eye size={16} />
              <span>Vista rápida</span>
            </button>
          </div>
        </div>
      </div>

      {/* Badges flotantes */}
      <div className="floating-badges">
        {product.onSale && (
          <span className="sale-badge">-{discountPercentage}%</span>
        )}
        {product.isNew && <span className="new-badge">Nuevo</span>}
      </div>

      {/* Detalles del producto */}
      <div className="product-details">
        <div className="product-meta">
          <span className="product-category">{product.category || "Premium"}</span>
          {product.colors?.length ? (
            <div className="color-indicators">
              {product.colors.slice(0, 3).map((color, index) => (
                <span 
                  key={index}
                  className="color-dot"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          ) : null}
        </div>
        
        <h3 className="product-title">{product.name || "Producto exclusivo"}</h3>
        
        <div className="price-container">
          {product.onSale ? (
            <>
              <span className="current-price">${salePrice.toFixed(2)}</span>
              <span className="original-price">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="current-price">${price.toFixed(2)}</span>
          )}
        </div>
        
        <button 
          className="add-to-cart-btn"
          aria-label="Añadir al carrito"
        >
          <Bag size={16} />
          <span>Añadir</span>
        </button>
      </div>

      {/* Modal de producto */}
      <ProductModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        product={{ ...product, images: [primaryImage, secondaryImage] }}
      />
    </div>
  );
}