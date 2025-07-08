import { Card } from 'react-bootstrap';

export default function FinishOrder({ formData, total }) {
  const { delivery, payment } = formData;

  return (
    <>
      <h3 className="step-title mb-4">Complete Your Order</h3>

      <Card className="mb-4">
        <Card.Body>
          <h6>Delivery Address</h6>
          <p>
            {delivery.firstName} {delivery.lastName}<br />
            {delivery.address}<br />
            {delivery.city}, {delivery.postalCode}<br />
            {delivery.country}<br />
            Phone: {delivery.phone}
          </p>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h6>Payment Method</h6>
          <p>
            {payment.method === 'creditCard' ? 'Credit Card' : 'PayPal'}<br />
            {payment.method === 'creditCard' && `Card ending in ${payment.cardNumber.slice(-4)}`}
          </p>
        </Card.Body>
      </Card>

      <div className="order-summary">
        <div className="summary-item total">
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}
