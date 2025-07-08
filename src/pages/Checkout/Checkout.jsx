import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeliveryForm from '../../components/Checkout/DeliveryForm';
import OrderConfirmation from '../../components/Checkout/OrderConfirmation';
import PaymentForm from '../../components/Checkout/PaymentForm';
import FinishOrder from '../../components/Checkout/FinishOrder';
import './Checkout.css';

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);

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

  const total = 340.00;

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4CAF50" />
            </svg>
          </div>
          <h2 className="mb-3">¡Gracias por su compra!</h2>
          <p className="text-muted mb-4">Su pedido ha sido procesado con éxito.</p>
          <Button as={Link} to="/" variant="outline-dark">Volver a la tienda</Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="checkout-container my-5">
      {/* Barra de progreso */}
      <div className="checkout-progress mb-5">
        <div className="progress-steps">
          <div className={`step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>Delivery</div>
          <div className={`step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>Confirmation</div>
          <div className={`step ${currentStep === 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>Payment</div>
          <div className={`step ${currentStep === 4 ? 'active' : ''}`}>Finish</div>
        </div>
      </div>

      {/* Contenido del formulario */}
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="checkout-card">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <DeliveryForm data={formData.delivery} onChange={handleInputChange} />
                )}
                {currentStep === 2 && (
                  <OrderConfirmation deliveryData={formData.delivery} total={total} />
                )}
                {currentStep === 3 && (
                  <PaymentForm data={formData.payment} onChange={handleInputChange} total={total} />
                )}
                {currentStep === 4 && (
                  <FinishOrder formData={formData} total={total} />
                )}

                <div className="checkout-actions mt-4">
                  {currentStep > 1 && (
                    <Button variant="outline-secondary" onClick={prevStep}>Back</Button>
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
