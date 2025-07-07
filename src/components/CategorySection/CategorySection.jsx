import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './CategorySection.css';
import { PersonFill, PersonBadge, PeopleFill } from 'react-bootstrap-icons';

export default function CategorySection() {
  const categories = [
    {
      id: 'women',
      name: 'Mujer',
      icon: <PersonFill />,
      image: 'https://img.freepik.com/foto-gratis/feliz-linda-mujer-pelos-sobre-fondo-rosa-mujer-feliz-chaqueta-blanca-panama-moda-negro-posando-estudio_273443-4044.jpg?semt=ais_hybrid&w=740',
      description: 'Colección distinguida con elegancia atemporal.'
    },
    {
      id: 'men',
      name: 'Hombre',
      icon: <PersonBadge />,
      image: 'https://img.freepik.com/foto-gratis/retrato-guapo-sonriente-elegante-joven-modelo-vistiendo-ropa-jeans-gafas-sol-hombre-moda_158538-5016.jpg?semt=ais_hybrid&w=740',
      description: 'Moda formal y contemporánea para él.'
    },
    {
      id: 'kids',
      name: 'Niños',
      icon: <PeopleFill />,
      image: 'https://us.123rf.com/450wm/gelpi/gelpi1705/gelpi170500169/78051898-hermosos-ni%C3%B1os-aislados-en-un-fondo-blanco.jpg?ver=6',
      description: 'Estilo clásico y cómodo para los pequeños.'
    }
  ];

  return (
    <section className="category-section">
      <Container>
        <h2 className="section-title text-center">Colecciones Exclusivas</h2>
        <p className="section-subtitle text-center">
          Diseño refinado, materiales premium y una experiencia única en cada categoría.
        </p>
        <Row className="g-4 mt-4">
          {categories.map(category => (
            <Col key={category.id} md={4}>
              <Link to={`/products?category=${category.id}`} className="category-link">
                <div className="category-card">
                  <img src={category.image} alt={category.name} className="category-image" />
                  <div className="category-overlay">
                    <div className="overlay-content">
                      <div className="category-icon">{category.icon}</div>
                      <h3 className="category-name">{category.name}</h3>
                      <p className="category-description">{category.description}</p>
                      <span className="view-button">Ver productos</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
