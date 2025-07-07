import { Form, Row, Col } from 'react-bootstrap';

export default function DeliveryForm({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange('delivery', field, value);
  };

  return (
    <>
      <h3 className="step-title mb-4">Delivery Information</h3>
      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text" value={data.firstName} onChange={e => handleChange('firstName', e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control required type="text" value={data.lastName} onChange={e => handleChange('lastName', e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control required type="text" value={data.address} onChange={e => handleChange('address', e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control required type="text" value={data.city} onChange={e => handleChange('city', e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control required type="text" value={data.postalCode} onChange={e => handleChange('postalCode', e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control required type="text" value={data.country} onChange={e => handleChange('country', e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control required type="tel" value={data.phone} onChange={e => handleChange('phone', e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" value={data.email} onChange={e => handleChange('email', e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
