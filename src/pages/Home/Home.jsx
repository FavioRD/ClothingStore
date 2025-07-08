import PromoBanner from '../../components/PromoBanner/PromoBanner';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import CategorySection from '../../components/CategorySection/CategorySection';
import './Home.css';

export default function Home({ addToCart }) {
  return (
    <div className="home-page">
      <PromoBanner />
      <FeaturedProducts addToCart={addToCart} />
      <CategorySection />
    </div>
  );
}
