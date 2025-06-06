import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import CompanyInfo from './components/CompanyInfo';
import News from './components/News';
import Contact from './components/Contact';
import Navigation from './components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <CompanyInfo />
      <News />
      <Contact />
    </main>
  );
}