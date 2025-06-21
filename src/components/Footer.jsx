import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="fw-light mb-3">ELEGANCE</h5>
            <p className="small text-muted">
              Tienda de ropa elegante y formal para toda la familia. 
              Ofrecemos calidad y estilo en cada prenda.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white">
                <Twitter size={20} />
              </a>
            </div>
          </Col>
          
          <Col md={2} className="mb-4">
            <h6 className="fw-light mb-3">TIENDA</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Mujer</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Hombre</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Niños</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Nuevos</a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">Ofertas</a>
              </li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4">
            <h6 className="fw-light mb-3">AYUDA</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Contacto</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Envíos</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Devoluciones</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Pagos</a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">FAQ</a>
              </li>
            </ul>
          </Col>
          
          <Col md={4} className="mb-4">
            <h6 className="fw-light mb-3">NEWSLETTER</h6>
            <p className="small text-muted mb-3">
              Suscríbete para recibir nuestras últimas ofertas y novedades.
            </p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control bg-transparent text-white border-secondary" 
                placeholder="Tu correo electrónico" 
              />
              <button className="btn btn-outline-light" type="button">
                Suscribirse
              </button>
            </div>
          </Col>
        </Row>
        
        <hr className="border-secondary mt-0" />
        
        <Row>
          <Col className="text-center text-muted small">
            © {new Date().getFullYear()} ELEGANCE. Todos los derechos reservados.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}