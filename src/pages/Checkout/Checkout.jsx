import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Delivery, 2: Confirmation, 3: Payment, 4: Finish
  const [formData, setFormData] = useState({
    delivery: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      phone: '',
      email: ''
    },
    payment: {
      method: 'creditCard',
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: ''
    }
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const total = 340.00;

  const handleInputChange = (step, field, value) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentStep === 4) {
      setOrderSuccess(true);
    } else {
      nextStep();
    }
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
          <p className="text-muted mb-4">Su pedido ha sido procesado con éxito.</p>
          <Button as={Link} to="/" variant="outline-dark" className="px-4 py-2">
            Volver a la tienda
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="checkout-container my-5">
      <div className="checkout-progress mb-5">
        <div className="progress-steps">
          <div className={`step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            Delivery
          </div>
          <div className={`step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            Confirmation
          </div>
          <div className={`step ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
            Payment
          </div>
          <div className={`step ${currentStep === 4 ? 'active' : ''}`}>
            Finish
          </div>
        </div>
      </div>
      
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="checkout-card">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Delivery Step */}
                {currentStep === 1 && (
                  <div className="checkout-step">
                    <h3 className="step-title mb-4">Delivery Information</h3>
                    
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group controlId="firstName" className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            value={formData.delivery.firstName}
                            onChange={(e) => handleInputChange('delivery', 'firstName', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group controlId="lastName" className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            value={formData.delivery.lastName}
                            onChange={(e) => handleInputChange('delivery', 'lastName', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={12}>
                        <Form.Group controlId="address" className="mb-3">
                          <Form.Label>Address</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            value={formData.delivery.address}
                            onChange={(e) => handleInputChange('delivery', 'address', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group controlId="city" className="mb-3">
                          <Form.Label>City</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            value={formData.delivery.city}
                            onChange={(e) => handleInputChange('delivery', 'city', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group controlId="postalCode" className="mb-3">
                          <Form.Label>Postal Code</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            value={formData.delivery.postalCode}
                            onChange={(e) => handleInputChange('delivery', 'postalCode', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group controlId="country" className="mb-3">
                          <Form.Label>Country</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            value={formData.delivery.country}
                            onChange={(e) => handleInputChange('delivery', 'country', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group controlId="phone" className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control 
                            required 
                            type="tel" 
                            value={formData.delivery.phone}
                            onChange={(e) => handleInputChange('delivery', 'phone', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={12}>
                        <Form.Group controlId="email" className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control 
                            required 
                            type="email" 
                            value={formData.delivery.email}
                            onChange={(e) => handleInputChange('delivery', 'email', e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}
                
                {/* Confirmation Step */}
                {currentStep === 2 && (
                  <div className="checkout-step">
                    <h3 className="step-title mb-4">Order Confirmation</h3>
                    
                    <Card className="confirmation-card mb-4">
                      <Card.Body>
                        <h5 className="mb-3">Delivery Address</h5>
                        <p>
                          {formData.delivery.firstName} {formData.delivery.lastName}<br />
                          {formData.delivery.address}<br />
                          {formData.delivery.city}, {formData.delivery.postalCode}<br />
                          {formData.delivery.country}<br />
                          Phone: {formData.delivery.phone}<br />
                          Email: {formData.delivery.email}
                        </p>
                      </Card.Body>
                    </Card>
                    
                    <div className="order-summary">
                      <h5 className="mb-3">Order Summary</h5>
                      <div className="summary-item">
                        <span>Subtotal</span>
                        <span>£{total.toFixed(2)}</span>
                      </div>
                      <div className="summary-item">
                        <span>Shipping</span>
                        <span>£0.00</span>
                      </div>
                      <div className="summary-item total">
                        <span>Total</span>
                        <span>£{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Payment Step */}
                {currentStep === 3 && (
                  <div className="checkout-step">
                    <h3 className="step-title mb-4">Payment Method</h3>
                    
                    <div className="payment-methods mb-4">
                      <div 
                        className={`payment-option ${formData.payment.method === 'creditCard' ? 'active' : ''}`}
                        onClick={() => handleInputChange('payment', 'method', 'creditCard')}
                      >
                        <div className="payment-method-header">
                          <img 
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" 
                            alt="Visa" 
                            className="payment-icon"
                          />
                          <span>Credit Card</span>
                        </div>
                        <div className="payment-amount">Pay £{total.toFixed(2)} with credit card</div>
                      </div>
                      
                      <div 
                        className={`payment-option ${formData.payment.method === 'paypal' ? 'active' : ''}`}
                        onClick={() => handleInputChange('payment', 'method', 'paypal')}
                      >
                        <div className="payment-method-header">
                          <img 
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" 
                            alt="PayPal" 
                            className="payment-icon"
                          />
                          <span>PayPal</span>
                        </div>
                        <div className="payment-amount">Pay £{total.toFixed(2)} with PayPal</div>
                      </div>
                    </div>
                    
                    {formData.payment.method === 'creditCard' && (
                      <div className="credit-card-form">
                        <Form.Group controlId="cardName" className="mb-3">
                          <Form.Label>Cardholder's Name</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            value={formData.payment.cardName}
                            onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                          />
                        </Form.Group>
                        
                        <Form.Group controlId="cardNumber" className="mb-3">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control 
                            required 
                            type="text" 
                            value={formData.payment.cardNumber}
                            onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                          />
                        </Form.Group>
                        
                        <Row className="g-3">
                          <Col md={6}>
                            <Form.Group controlId="cardExpiry">
                              <Form.Label>Valid thru</Form.Label>
                              <Form.Control 
                                required 
                                type="text" 
                                placeholder="MM/YY"
                                value={formData.payment.cardExpiry}
                                onChange={(e) => handleInputChange('payment', 'cardExpiry', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group controlId="cardCvc">
                              <Form.Label>CW / CVC *</Form.Label>
                              <Form.Control 
                                required 
                                type="text" 
                                placeholder="123"
                                value={formData.payment.cardCvc}
                                onChange={(e) => handleInputChange('payment', 'cardCvc', e.target.value)}
                              />
                              <Form.Text className="text-muted">
                                *CW or CVC is the card security code, unique three-digit number on the back of your card separate from its number.
                              </Form.Text>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Finish Step */}
                {currentStep === 4 && (
                  <div className="checkout-step">
                    <h3 className="step-title mb-4">Complete Your Order</h3>
                    
                    <div className="order-confirmation">
                      <div className="confirmation-icon mb-4">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4CAF50"/>
                        </svg>
                      </div>
                      
                      <h5 className="mb-3">Review Your Order</h5>
                      
                      <Card className="mb-4">
                        <Card.Body>
                          <h6 className="mb-3">Delivery Address</h6>
                          <p>
                            {formData.delivery.firstName} {formData.delivery.lastName}<br />
                            {formData.delivery.address}<br />
                            {formData.delivery.city}, {formData.delivery.postalCode}<br />
                            {formData.delivery.country}<br />
                            Phone: {formData.delivery.phone}
                          </p>
                        </Card.Body>
                      </Card>
                      
                      <Card className="mb-4">
                        <Card.Body>
                          <h6 className="mb-3">Payment Method</h6>
                          <p>
                            {formData.payment.method === 'creditCard' ? 'Credit Card' : 'PayPal'}<br />
                            {formData.payment.method === 'creditCard' && (
                              <>Card ending in {formData.payment.cardNumber.slice(-4)}</>
                            )}
                          </p>
                        </Card.Body>
                      </Card>
                      
                      <div className="order-summary">
                        <div className="summary-item total">
                          <span>Total Amount</span>
                          <span>£{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="checkout-actions mt-4">
                  {currentStep > 1 && (
                    <Button variant="outline-secondary" onClick={prevStep} className="me-2">
                      Back
                    </Button>
                  )}
                  
                  <Button type="submit" variant="primary">
                    {currentStep === 4 ? 'Place Order' : 'Continue'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}