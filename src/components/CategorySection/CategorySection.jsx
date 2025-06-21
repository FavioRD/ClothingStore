import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './CategorySection.css';

export default function CategorySection() {
  const categories = [
    {
      id: 'women',
      name: 'Mujer',
      image: 'https://i.ibb.co/PGFMyc7/woman-fashion.jpg',
      description: 'Colección distinguida con elegancia atemporal.'
    },
    {
      id: 'men',
      name: 'Hombre',
      image: 'https://i.ibb.co/wc1L4mJ/men-fashion.jpg',
      description: 'Moda formal y contemporánea para él.'
    },
    {
      id: 'kids',
      name: 'Niños',
      image: 'https://i.ibb.co/F5DrS9r/kids-fashion.jpg',
      description: 'Estilo clásico y cómodo para los pequeños.'
    }
  ];

  return (
    <section className="category-section">
      <Container>
        <h2 className="section-title text-center">Colecciones Exclusivas</h2>
        <p className="section-subtitle text-center">
          Descubre nuestras categorías seleccionadas con diseño y calidad superior.
        </p>
        <Row className="g-4 mt-4">
          {categories.map(category => (
            <Col key={category.id} md={4}>
              <Link to={`/products?category=${category.id}`} className="category-link">
                <div className="category-card">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                  <div className="category-body">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">{category.description}</p>
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
