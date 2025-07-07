import { Form, Row, Col } from 'react-bootstrap';

export default function PaymentForm({ data, onChange, total }) {
  const handleChange = (field, value) => {
    onChange('payment', field, value);
  };

  return (
    <>
      <h3 className="step-title mb-4">Payment Method</h3>
      <div className="payment-methods mb-4">
        <div className={`payment-option ${data.method === 'creditCard' ? 'active' : ''}`} onClick={() => handleChange('method', 'creditCard')}>
          <div className="payment-method-header">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="payment-icon" />
            <span>Credit Card</span>
          </div>
          <div className="payment-amount">Pay £{total.toFixed(2)} with credit card</div>
        </div>
        <div className={`payment-option ${data.method === 'paypal' ? 'active' : ''}`} onClick={() => handleChange('method', 'paypal')}>
          <div className="payment-method-header">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" alt="PayPal" className="payment-icon" />
            <span>PayPal</span>
          </div>
          <div className="payment-amount">Pay £{total.toFixed(2)} with PayPal</div>
        </div>
      </div>

      {data.method === 'creditCard' && (
        <div className="credit-card-form">
          <Form.Group className="mb-3">
            <Form.Label>Cardholder's Name</Form.Label>
            <Form.Control required value={data.cardName} onChange={e => handleChange('cardName', e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control required value={data.cardNumber} onChange={e => handleChange('cardNumber', e.target.value)} />
          </Form.Group>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Valid thru</Form.Label>
                <Form.Control required placeholder="MM/YY" value={data.cardExpiry} onChange={e => handleChange('cardExpiry', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>CVC</Form.Label>
                <Form.Control required placeholder="123" value={data.cardCvc} onChange={e => handleChange('cardCvc', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
