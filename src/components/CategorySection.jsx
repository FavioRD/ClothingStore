import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export default function CategorySection() {
  const categories = [
    {
      id: 'women',
      name: 'Mujer',
      image: 'https://www.esquire.com/es/moda-hombre/a42060469/como-combinar-colores-ropa-hombre/',
      description: 'Colección elegante para mujer'
    },
    {
      id: 'men',
      name: 'Hombre',
      image: 'https://www.esquire.com/es/moda-hombre/a42060469/como-combinar-colores-ropa-hombre/',
      description: 'Estilo formal para hombre'
    },
    {
      id: 'kids',
      name: 'Niños',
      image: 'https://www.esquire.com/es/moda-hombre/a42060469/como-combinar-colores-ropa-hombre/',
      description: 'Ropa cómoda para los más pequeños'
    }
  ];

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-5 fw-light">Explora por Categoría</h2>
        <Row>
          {categories.map(category => (
            <Col key={category.id} md={4} className="mb-4">
              <Link 
                to={`/products?category=${category.id}`} 
                className="text-decoration-none text-dark"
              >
                <div className="card border-0 h-100 shadow-sm">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h3 className="h5 fw-normal">{category.name}</h3>
                    <p className="text-muted">{category.description}</p>
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