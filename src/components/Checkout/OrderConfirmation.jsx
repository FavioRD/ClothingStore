import { Card } from 'react-bootstrap';

export default function OrderConfirmation({ deliveryData, total }) {
  return (
    <>
      <h3 className="step-title mb-4">Order Confirmation</h3>
      <Card className="confirmation-card mb-4">
        <Card.Body>
          <h5 className="mb-3">Delivery Address</h5>
          <p>
            {deliveryData.firstName} {deliveryData.lastName}<br />
            {deliveryData.address}<br />
            {deliveryData.city}, {deliveryData.postalCode}<br />
            {deliveryData.country}<br />
            Phone: {deliveryData.phone}<br />
            Email: {deliveryData.email}
          </p>
        </Card.Body>
      </Card>
      <div className="order-summary">
        <h5 className="mb-3">Order Summary</h5>
        <div className="summary-item"><span>Subtotal</span><span>£{total.toFixed(2)}</span></div>
        <div className="summary-item"><span>Shipping</span><span>£0.00</span></div>
        <div className="summary-item total"><span>Total</span><span>£{total.toFixed(2)}</span></div>
      </div>
    </>
  );
}
