import { Modal, Button } from "react-bootstrap";
import { XCircle, ArrowLeft, CreditCard, Bag } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart({
  show,
  handleClose,
  cartItems = [],
  setCartItems,
}) {
  const navigate = useNavigate();

  // Validación por si cartItems es undefined o no es array
  const validCartItems = Array.isArray(cartItems) ? cartItems : [];

  const subtotal = validCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + tax + shipping;

  const removeItem = (id) => {
    setCartItems(validCartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      validCartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      className="cart-modal"
      centered
    >
      <Modal.Header className="border-0">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <h2 className="mb-0">Tu Bolsa de Compra</h2>
          <button
            onClick={handleClose}
            className="close-button"
            aria-label="Cerrar carrito"
          >
            <XCircle size={24} />
          </button>
        </div>
      </Modal.Header>

      <Modal.Body>
        {validCartItems.length === 0 ? (
          <div className="empty-cart text-center py-5">
            <Bag size={64} className="mb-4 text-muted" />
            <h3 className="mb-3">Tu bolsa está vacía</h3>
            <p className="text-muted mb-4">
              Explora nuestras colecciones para encontrar algo especial
            </p>
            <Button
              variant="outline-dark"
              onClick={handleClose}
              className="continue-shopping-btn"
            >
              <ArrowLeft size={18} className="me-2" />
              Continuar comprando
            </Button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {validCartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                  </div>

                  <div className="item-details">
                    <div className="d-flex justify-content-between">
                      <h4 className="item-name">{item.name}</h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="remove-item-button"
                        aria-label="Eliminar producto"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>

                    <p className="item-variants">
                      {item.color} • Talla {item.size}
                    </p>
                    <div className="item-price">${item.price.toFixed(2)}</div>

                    <div className="quantity-selector">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="quantity-button"
                        aria-label="Reducir cantidad"
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="quantity-button"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h3 className="summary-title">Resumen del Pedido</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Impuestos (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button
                variant="dark"
                className="checkout-button"
                onClick={() => {
                  handleClose();
                  navigate("/checkout");
                }}
              >
                <CreditCard size={18} className="me-2" />
                Proceder al pago
              </Button>

              <Button
                variant="outline-dark"
                onClick={handleClose}
                className="continue-shopping-btn"
              >
                <ArrowLeft size={18} className="me-2" />
                Continuar comprando
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
