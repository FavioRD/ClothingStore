import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductModal from "../../components/ProductModal/ProductModal";
import { Funnel } from "react-bootstrap-icons";
import "./Products.css";

export default function Products({ addToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const category = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setLoading(false);
      });
  }, []);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.onSale ? a.salePrice : a.price;
    const priceB = b.onSale ? b.salePrice : b.price;
    switch (sortBy) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "newest":
        return b.id - a.id;
      default:
        return 0;
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
            {category === "women" && "Ropa para Mujer"}
            {category === "men" && "Ropa para Hombre"}
            {category === "kids" && "Ropa para Niños"}
            {category === "all" && "Todos los Productos"}
          </h1>
          <p className="text-muted mb-0">
            {sortedProducts.length}{" "}
            {sortedProducts.length === 1 ? "producto" : "productos"}
          </p>
        </Col>
        <Col md={6} className="d-flex justify-content-md-end mt-3 mt-md-0">
          <Dropdown>
            <Dropdown.Toggle variant="outline-dark" id="sort-dropdown">
              <Funnel className="me-2" />
              Ordenar por:{" "}
              {
                {
                  default: "Recomendados",
                  "price-asc": "Precio: menor a mayor",
                  "price-desc": "Precio: mayor a menor",
                  "name-asc": "Nombre: A-Z",
                  "name-desc": "Nombre: Z-A",
                  newest: "Más nuevos",
                }[sortBy]
              }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortBy("default")}>
                Recomendados
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("price-asc")}>
                Precio: menor a mayor
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("price-desc")}>
                Precio: mayor a menor
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("name-asc")}>
                Nombre: A-Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("name-desc")}>
                Nombre: Z-A
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("newest")}>
                Más nuevos
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="fw-light mb-3">No se encontraron productos</h4>
          <p className="text-muted mb-4">
            Intenta con otros filtros de búsqueda
          </p>
          <Button
            variant="outline-dark"
            onClick={() => {
              setSearchParams({});
              setSortBy("default");
            }}
          >
            Mostrar todos los productos
          </Button>
        </div>
      ) : (
        <Row>
          {sortedProducts.map((product) => (
            <Col key={product.id} xs={6} md={4} lg={3} className="mb-4">
              <ProductCard
                product={product}     
                onViewDetails={() => handleShowModal(product)}
                addToCart={addToCart}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* MODAL DE DETALLE */}
      {selectedProduct && (
        <ProductModal
          show={showModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </Container>
  );
}
