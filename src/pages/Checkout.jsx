import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { CreditCard, Person, GeoAlt, Telephone, Envelope, ArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const [validated, setValidated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Datos de ejemplo del carrito
  const cartItems = [
    {
      id: 1,
      name: 'Blazer elegante negro',
      price: 99.99,
      quantity: 1,
      size: 'M',
      color: 'Negro',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Camisa formal blanca',
      price: 59.99,
      quantity: 2,
      size: 'L',
      color: 'Blanco',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.10;
  const total = subtotal + shipping + tax;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setOrderSuccess(true);
    }
    setValidated(true);
  };

  if (orderSuccess) {
    return (
      <Container className="checkout-success-container">
        <Card className="success-card text-center p-5">
          <div className="success-icon mb-4">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4CAF50"/>
            </svg>
          </div>
          <h2 className="mb-3">¡Gracias por su compra!</h2>
          <p className="text-muted mb-4">Su pedido ha sido procesado con éxito. Hemos enviado un correo electrónico con los detalles de su compra.</p>
          <Button as={Link} to="/" variant="outline-dark" className="px-4 py-2">
            Volver a la tienda
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="checkout-container my-5">
      <div className="checkout-header text-center mb-5">
        <h1 className="mb-3">Finalizar Compra</h1>
        <p className="text-muted">Complete su información para procesar el pedido</p>
      </div>
      
      <Row>
        <Col lg={8}>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="checkout-form">
            {/* Sección de Información Personal */}
            <Card className="checkout-card mb-4">
              <Card.Body>
                <div className="section-header mb-4">
                  <Person className="section-icon" />
                  <h3>Información Personal</h3>
                </div>
                
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control 
                        required 
                        type="text" 
                        className="form-control-elegant"
                        placeholder="Ingrese su nombre"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su nombre
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control 
                        required 
                        type="text" 
                        className="form-control-elegant"
                        placeholder="Ingrese su apellido"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su apellido
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={12}>
                    <Form.Group controlId="email">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control 
                        required 
                        type="email" 
                        className="form-control-elegant"
                        placeholder="ejemplo@dominio.com"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese un correo válido
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={12}>
                    <Form.Group controlId="phone">
                      <Form.Label>
                        <Telephone className="me-2" />
                        Teléfono
                      </Form.Label>
                      <Form.Control 
                        required 
                        type="tel" 
                        className="form-control-elegant"
                        placeholder="Ingrese su número telefónico"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su teléfono
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Sección de Dirección */}
            <Card className="checkout-card mb-4">
              <Card.Body>
                <div className="section-header mb-4">
                  <GeoAlt className="section-icon" />
                  <h3>Dirección de Envío</h3>
                </div>
                
                <Form.Group controlId="address" className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control 
                    required 
                    type="text" 
                    className="form-control-elegant"
                    placeholder="Calle y número"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese su dirección
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Row className="g-3">
                  <Col md={4}>
                    <Form.Group controlId="city">
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control 
                        required 
                        type="text" 
                        className="form-control-elegant"
                        placeholder="Ciudad"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su ciudad
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group controlId="state">
                      <Form.Label>Estado/Provincia</Form.Label>
                      <Form.Control 
                        required 
                        type="text" 
                        className="form-control-elegant"
                        placeholder="Estado/Provincia"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su estado/provincia
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group controlId="zip">
                      <Form.Label>Código postal</Form.Label>
                      <Form.Control 
                        required 
                        type="text" 
                        className="form-control-elegant"
                        placeholder="Código postal"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese su código postal
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Sección de Pago */}
            <Card className="checkout-card mb-4">
              <Card.Body>
                <div className="section-header mb-4">
                  <CreditCard className="section-icon" />
                  <h3>Método de Pago</h3>
                </div>
                
                <Form.Group className="mb-4">
                  <Form.Check
                    type="radio"
                    id="creditCard"
                    label={
                      <div className="payment-method-label">
                        <span>Tarjeta de crédito/débito</span>
                        <div className="card-icons">
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" />
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" />
                          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Apple Pay" />
                        </div>
                      </div>
                    }
                    name="paymentMethod"
                    checked={paymentMethod === 'creditCard'}
                    onChange={() => setPaymentMethod('creditCard')}
                    className="payment-radio"
                  />
                </Form.Group>
                
                {paymentMethod === 'creditCard' && (
                  <div className="credit-card-form">
                    <Row className="g-3 mb-3">
                      <Col md={12}>
                        <Form.Group controlId="cardNumber">
                          <Form.Label>Número de tarjeta</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            className="form-control-elegant"
                            placeholder="1234 5678 9012 3456"
                          />
                          <Form.Control.Feedback type="invalid">
                            Por favor ingrese un número de tarjeta válido
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group controlId="cardName">
                          <Form.Label>Nombre en la tarjeta</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            className="form-control-elegant"
                            placeholder="Como aparece en la tarjeta"
                          />
                          <Form.Control.Feedback type="invalid">
                            Por favor ingrese el nombre como aparece en la tarjeta
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={3}>
                        <Form.Group controlId="cardExpiry">
                          <Form.Label>Expiración</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            className="form-control-elegant"
                            placeholder="MM/AA"
                          />
                          <Form.Control.Feedback type="invalid">
                            Por favor ingrese la fecha de expiración
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      
                      <Col md={3}>
                        <Form.Group controlId="cardCvc">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            className="form-control-elegant"
                            placeholder="123"
                          />
                          <Form.Control.Feedback type="invalid">
                            Por favor ingrese el código de seguridad
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    id="paypal"
                    label={
                      <div className="payment-method-label">
                        <span>PayPal</span>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" alt="PayPal" className="paypal-icon" />
                      </div>
                    }
                    name="paymentMethod"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="payment-radio"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            
            <div className="checkout-actions d-flex justify-content-between">
              <Button as={Link} to="/cart" variant="outline-dark" className="back-button">
                <ArrowLeft className="me-2" />
                Volver al carrito
              </Button>
              <Button type="submit" variant="dark" className="submit-button">
                Completar Compra • ${total.toFixed(2)}
              </Button>
            </div>
          </Form>
        </Col>
        
        {/* Resumen del Pedido */}
        <Col lg={4}>
          <Card className="checkout-summary">
            <Card.Body>
              <h3 className="summary-title mb-4">Resumen del Pedido</h3>
              
              <ListGroup variant="flush" className="mb-4">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.id} className="cart-item">
                    <div className="d-flex align-items-center">
                      <div className="item-image-container">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="item-image"
                        />
                      </div>
                      <div className="item-details">
                        <div className="item-name">{item.name}</div>
                        <div className="item-variants">
                          {item.color} • Talla {item.size}
                        </div>
                        <div className="item-quantity-price">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <div className="summary-totals">
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
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}