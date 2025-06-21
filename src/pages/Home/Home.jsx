import PromoBanner from '../../components/PromoBanner/PromoBanner';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import CategorySection from '../../components/CategorySection/CategorySection';
import './Home.css';

// Datos de ejemplo - en una app real vendrían de una API
const featuredProducts = [
  {
    id: 1,
    name: 'Blazer elegante negro',
    price: 129.99,
    salePrice: 99.99,
    onSale: true,
    image: '/blazer-black.jpg',
    colors: ['Negro', 'Azul marino', 'Gris'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Blazer de alta calidad para ocasiones formales.'
  },
  {
    id: 2,
    name: 'Vestido de noche largo',
    price: 159.99,
    onSale: false,
    image: '/evening-dress.jpg',
    colors: ['Rojo', 'Negro', 'Azul'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Vestido elegante para eventos especiales.'
  },
  {
    id: 3,
    name: 'Camisa formal blanca',
    price: 59.99,
    onSale: false,
    image: '/shirt-white.jpg',
    colors: ['Blanco', 'Azul claro', 'Rosa pálido'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Camisa de algodón 100% para looks formales.'
  }
];

export default function Home() {
  return (
    <div className="home-page">
      <PromoBanner />
      <FeaturedProducts products={featuredProducts} />
      <CategorySection />
    </div>
  );
}