import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import "./FeaturedProducts.css";

export default function FeaturedProducts({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filters = [
    { id: "all", label: "Todos" },
    { id: "women", label: "Mujer" },
    { id: "men", label: "Hombre" },
    { id: "kids", label: "Niños" },
    { id: "sale", label: "Ofertas" },
  ];

  const productsPerPage = 4;

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const destacados = data.filter((p) => p.featured);
        setProducts(destacados);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    activeFilter === "all"
      ? products
      : activeFilter === "sale"
      ? products.filter((p) => p.onSale)
      : products.filter((p) => p.category === activeFilter);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleProducts = filteredProducts.slice(
    currentIndex * productsPerPage,
    (currentIndex + 1) * productsPerPage
  );

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Cargando productos destacados...</p>
      </Container>
    );
  }

  return (
    <section className="featured-products-section">
      <Container>
        <div className="section-header">
          <h2 className="section-title">Colecciones Destacadas</h2>
          <p className="section-subtitle">
            Descubre nuestras piezas más exclusivas
          </p>

          <div className="filters-container">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${
                  activeFilter === filter.id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setCurrentIndex(0);
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="products-slider">
          <button
            className="slider-btn prev"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={24} />
          </button>

          <Row className="gx-4">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => (
                <Col key={product.id} lg={3} md={4} sm={6} xs={12}>
                  <ProductCard product={product} addToCart={addToCart} />
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <p className="empty-message">
                  No hay productos disponibles en esta categoría
                </p>
              </Col>
            )}
          </Row>

          <button
            className="slider-btn next"
            onClick={nextSlide}
            disabled={currentIndex >= totalPages - 1}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="text-center mt-4">
          <Button variant="outline-dark" className="view-all-btn">
            Ver colección completa
          </Button>
        </div>
      </Container>
    </section>
  );
}
