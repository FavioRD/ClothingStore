import { useState } from 'react';
import { toast } from 'react-toastify';
import { Heart, Eye, Bag } from 'react-bootstrap-icons';
import ProductModal from '../ProductModal/ProductModal';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Imágenes principales del producto
  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1] || product.images?.[0];

  // Manejo seguro de precios y descuentos
  const price = product.price || 0;
  const salePrice = product.salePrice || price;
  const discountPercentage = product.onSale
    ? Math.round((1 - salePrice / price) * 100)
    : 0;

  // Mapear colores personalizados a valores válidos
  const getColorValue = (color) => {
    const colorMap = {
      blanco: '#ffffff',
      negro: '#000000',
      rojo: '#e53935',
      azul: '#1e88e5',
      celeste: '#00bcd4',
      verde: '#43a047',
      'verde militar': '#4b5320',
      beige: '#f5f5dc',
      marrón: '#795548',
      gris: '#9e9e9e',
      rosado: '#f48fb1',
      naranja: '#fb8c00',
      // agregar más si es necesario
    };

    return colorMap[color.toLowerCase()] || color.toLowerCase(); // usa valor literal si no está en el mapa
  };

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
                  style={{ backgroundColor: getColorValue(color) }}
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
          onClick={() => {
            toast.success("✔ Producto agregado al carrito");
          }}
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
