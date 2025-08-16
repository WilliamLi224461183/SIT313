import HeaderBar from './components/HeaderBar';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';
import TutorialsSection from './components/TutorialsSection';
import FooterBar from './components/FooterBar';
import { featuredArticles, tutorials } from './data/content';

export default function App() {
  return (
    <>
      <HeaderBar />
      <Hero />
      <FeaturedSection items={featuredArticles} />
      <TutorialsSection items={tutorials} />
      <FooterBar />
    </>
  );
}
