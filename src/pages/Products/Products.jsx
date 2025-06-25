import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Button, Dropdown, Spinner } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Funnel, Grid, List } from 'react-bootstrap-icons';
import './Products.css';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');

  const category = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.onSale ? a.salePrice : a.price;
    const priceB = b.onSale ? b.salePrice : b.price;
    switch (sortBy) {
      case 'price-asc': return priceA - priceB;
      case 'price-desc': return priceB - priceA;
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      case 'newest': return b.id - a.id;
      default: return 0;
    }
  });

  if (loading) {
    return (
      <Container className="my-5 text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-3">Cargando productos...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <h1 className="fw-light">
            {category === 'women' && 'Ropa para Mujer'}
            {category === 'men' && 'Ropa para Hombre'}
            {category === 'kids' && 'Ropa para Niños'}
            {category === 'all' && 'Todos los Productos'}
          </h1>
          <p className="text-muted mb-0">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'producto' : 'productos'}
          </p>
        </Col>
        <Col md={6} className="d-flex justify-content-md-end mt-3 mt-md-0">
          <div className="d-flex gap-3">
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="sort-dropdown">
                <Funnel className="me-2" />
                Ordenar por: {({
                  'default': 'Recomendados',
                  'price-asc': 'Precio: menor a mayor',
                  'price-desc': 'Precio: mayor a menor',
                  'name-asc': 'Nombre: A-Z',
                  'name-desc': 'Nombre: Z-A',
                  'newest': 'Más nuevos'
                })[sortBy]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortBy('default')}>Recomendados</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('price-asc')}>Precio: menor a mayor</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('price-desc')}>Precio: mayor a menor</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('name-asc')}>Nombre: A-Z</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('name-desc')}>Nombre: Z-A</Dropdown.Item>
                <Dropdown.Item onClick={() => setSortBy('newest')}>Más nuevos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button
              variant={viewMode === 'grid' ? 'dark' : 'outline-dark'}
              onClick={() => setViewMode('grid')}
            >
              <Grid />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'dark' : 'outline-dark'}
              onClick={() => setViewMode('list')}
            >
              <List />
            </Button>
          </div>
        </Col>
      </Row>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="fw-light mb-3">No se encontraron productos</h4>
          <p className="text-muted mb-4">Intenta con otros filtros de búsqueda</p>
          <Button
            variant="outline-dark"
            onClick={() => {
              setSearchParams({});
              setSortBy('default');
            }}
          >
            Mostrar todos los productos
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <Row>
          {sortedProducts.map(product => (
            <Col key={product.id} xs={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col>
            <div className="list-group">
              {sortedProducts.map(product => (
                <div key={product.id} className="list-group-item list-group-item-action border-0 py-3">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid"
                        style={{ maxHeight: '150px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-6">
                      <h5 className="mb-1">{product.name}</h5>
                      <p className="mb-1 text-muted small">{product.description}</p>
                      <div>
                        {product.colors.map(color => (
                          <span
                            key={color}
                            className="me-2 small"
                            style={{
                              display: 'inline-block',
                              width: '15px',
                              height: '15px',
                              borderRadius: '50%',
                              backgroundColor: color.toLowerCase(),
                              border: '1px solid #ddd'
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-md-2 text-center">
                      {product.onSale ? (
                        <>
                          <span className="text-danger fw-bold">${product.salePrice}</span>
                          <span className="text-decoration-line-through text-muted small d-block">${product.price}</span>
                        </>
                      ) : (
                        <span className="fw-bold">${product.price}</span>
                      )}
                    </div>
                    <div className="col-md-2">
                      <Button variant="outline-dark" className="w-100">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
