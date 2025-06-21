import { Container, Row, Col, Form } from 'react-bootstrap';
import { Facebook, Instagram, Twitter, Pinterest, Linkedin } from 'react-bootstrap-icons';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Aquí iría la lógica para enviar el email a tu servicio de newsletter
      console.log('Email suscrito:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-dark text-white py-5 mt-auto border-top border-light">
      <Container>
        <Row className="g-4">
          {/* Sección Brand */}
          <Col lg={4} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <span className="h4 fw-light text-uppercase letter-spacing-2">ELEGANCE</span>
            </div>
            <p className="small text-muted mb-4">
              Tienda de moda sofisticada para el estilo contemporáneo. 
              Ofrecemos prendas de calidad superior con atención meticulosa al detalle.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white hover-gold" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover-gold" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover-gold" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover-gold" aria-label="Pinterest">
                <Pinterest size={20} />
              </a>
              <a href="#" className="text-white hover-gold" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </Col>
          
          {/* Secciones de enlaces */}
          <Col md={6} lg={2} className="mb-4">
            <h6 className="text-uppercase fw-light mb-3 letter-spacing-1">Colecciones</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Mujer</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Hombre</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Niños</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Nueva Colección</a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none hover-gold">Edición Limitada</a>
              </li>
            </ul>
          </Col>
          
          <Col md={6} lg={2} className="mb-4">
            <h6 className="text-uppercase fw-light mb-3 letter-spacing-1">Servicio</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Citas Personalizadas</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Asesoría de Imagen</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Envío Express</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Devoluciones</a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none hover-gold">Preguntas Frecuentes</a>
              </li>
            </ul>
          </Col>
          
          <Col md={6} lg={2} className="mb-4">
            <h6 className="text-uppercase fw-light mb-3 letter-spacing-1">Empresa</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Nuestra Historia</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Sostenibilidad</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Trabaja con Nosotros</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none hover-gold">Contacto</a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none hover-gold">Boutiques</a>
              </li>
            </ul>
          </Col>
          
          {/* Newsletter */}
          <Col lg={4} className="mb-4">
            <h6 className="text-uppercase fw-light mb-3 letter-spacing-1">Newsletter</h6>
            <p className="small text-muted mb-3">
              Suscríbete para recibir nuestras últimas colecciones, eventos exclusivos y ofertas especiales.
            </p>
            <Form onSubmit={handleSubscribe}>
              <div className="input-group mb-3">
                <Form.Control 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control bg-transparent text-white border-secondary placeholder-light" 
                  placeholder="Tu correo electrónico"
                  required
                />
                <button className="btn btn-outline-light border-secondary hover-gold" type="submit">
                  Suscribirse
                </button>
              </div>
            </Form>
            {subscribed && (
              <div className="text-success small mt-2">
                ¡Gracias por suscribirte! Pronto recibirás nuestras novedades.
              </div>
            )}
            <div className="mt-4">
              <h6 className="text-uppercase fw-light mb-3 letter-spacing-1">Métodos de Pago</h6>
              <div className="d-flex flex-wrap gap-2">
                <img src="https://via.placeholder.com/40x25?text=VISA" alt="Visa" className="payment-icon" />
                <img src="https://via.placeholder.com/40x25?text=MC" alt="Mastercard" className="payment-icon" />
                <img src="https://via.placeholder.com/40x25?text=AMEX" alt="American Express" className="payment-icon" />
                <img src="https://via.placeholder.com/40x25?text=PP" alt="PayPal" className="payment-icon" />
              </div>
            </div>
          </Col>
        </Row>
        
        <hr className="border-light mt-4 mb-4" />
        
        <Row className="align-items-center">
          <Col md={6} className="text-md-start text-center mb-3 mb-md-0">
            <span className="small text-muted">
              © {new Date().getFullYear()} ELEGANCE. Todos los derechos reservados.
            </span>
          </Col>
          <Col md={6} className="text-md-end text-center">
            <div className="d-flex gap-3 justify-content-center justify-content-md-end">
              <a href="#" className="text-muted small text-decoration-none hover-gold">Términos y Condiciones</a>
              <a href="#" className="text-muted small text-decoration-none hover-gold">Política de Privacidad</a>
              <a href="#" className="text-muted small text-decoration-none hover-gold">Cookies</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}