import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { X, Plus, Dash, Bag } from 'react-bootstrap-icons';
import './ProductModal.css';

export default function ProductModal({ show, handleClose, product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  const colorMap = {
    "Negro": "#000000",
    "Gris": "#808080",
    "Azul Marino": "#003366",
    "Rojo": "#FF0000",
    "Azul": "#0000FF",
    "Blanco": "#FFFFFF",
    "Azul Claro": "#ADD8E6",
    "Rosa Pálido": "#FADADD",
    "Beige": "#F5F5DC"
  };

  const price = product.onSale ? product.salePrice : product.price;
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);

  const originalPrice = product.onSale
    ? new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
      }).format(product.price)
    : null;

  useEffect(() => {
    const imageByColor = product.colorImages?.[selectedColor];
    setMainImage(imageByColor || product.image || '');
  }, [selectedColor, product]);

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="product-modal">
      <Modal.Header className="border-0 pb-0">
        <button onClick={handleClose} className="close-button" aria-label="Cerrar modal">
          <X size={24} />
        </button>
      </Modal.Header>

      <Modal.Body className="pt-0">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="product-modal-image-container">
              <img src={mainImage} alt={product.name} className="img-fluid rounded" />
              {product.onSale && (
                <div className="discount-badge">
                  -{Math.round((1 - product.salePrice / product.price) * 100)}%
                </div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="product-details">
              <h2 className="product-name mb-2">{product.name}</h2>
              <p className="product-description text-muted mb-4">{product.description}</p>

              <div className="price-section mb-4">
                <span className="current-price">{formattedPrice}</span>
                {originalPrice && (
                  <span className="original-price">{originalPrice}</span>
                )}
              </div>

              {product.colors?.length > 0 && (
                <div className="option-section mb-4">
                  <h6 className="option-title">
                    Color: <span className="selected-option">{selectedColor}</span>
                  </h6>
                  <div className="color-options">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className={`color-option ${selectedColor === color ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Seleccionar color ${color}`}
                        style={{
                          backgroundColor: colorMap[color] || '#ccc',
                          border: selectedColor === color ? '2px solid #000' : '1px solid #ccc'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes?.length > 0 && (
                <div className="option-section mb-4">
                  <h6 className="option-title">
                    Talla: <span className="selected-option">{selectedSize}</span>
                  </h6>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`size-option ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                        aria-label={`Seleccionar talla ${size}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="option-section mb-5">
                <h6 className="option-title">Cantidad</h6>
                <div className="quantity-selector">
                  <button
                    className="quantity-button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Reducir cantidad"
                  >
                    <Dash size={14} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <Button variant="dark" className="add-to-cart-button w-100 py-3">
                <Bag size={18} className="me-2" />
                Añadir al carrito - {formattedPrice}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
