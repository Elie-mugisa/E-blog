import MainLayout from "./../../components/MainLayout";
import Article from "./container/Article";
import CTA from "./container/CTA";
import Hero from "./container/Hero";

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <Article />
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
