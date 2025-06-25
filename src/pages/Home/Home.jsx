import PromoBanner from '../../components/PromoBanner/PromoBanner';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import CategorySection from '../../components/CategorySection/CategorySection';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <PromoBanner />
      <FeaturedProducts />
      <CategorySection />
    </div>
  );
}
