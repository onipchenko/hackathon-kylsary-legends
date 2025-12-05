import { useEffect, useState } from 'react';
import HomePage from '../pages/home/ui/HomePage';
import CatalogPage from '../pages/catalog/ui/CatalogPage';
import UniversityDetailPage from '../pages/university-detail/ui/UniversityDetailPage';
import DetailWrapper from '../widgets/detail-wrapper/ui/DetailWrapper';
import { navLinks } from '../shared/config/constants';
import { type University } from '../entities/university/model/universities';

const App = () => {
  const [activeView, setActiveView] = useState<string | number>('home');
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUnySlug, setSelectedUnySlug] = useState<string | null>(null);

  useEffect(() => {
    // Handle scroll to hide/show navbar
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Fetch university data
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/universities');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();

    // Cleanup scroll listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Handle smooth scrolling when view changes back to home
    if (activeView === 'home' && pendingScroll) {
      const el = document.getElementById(pendingScroll);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setPendingScroll(null);
    }
  }, [activeView, pendingScroll]);

  const goToSection = (id: string) => {
    if (activeView !== 'home') {
      setPendingScroll(id);
      setActiveView('home');
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectUniversity = (slug: string) => {
    setSelectedUnySlug(slug);
    setActiveView('universityDetail');
  };

  const backToHome = () => {
    setActiveView('home');
    setSelectedUnySlug(null);
  };
  
  const backToCatalog = () => {
    setActiveView('catalog');
    setSelectedUnySlug(null);
  }

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomePage
            navLinks={navLinks}
            universities={universities}
            scrolled={scrolled}
            onScrollTo={goToSection}
            onNavigate={setActiveView}
            onSelectUniversity={handleSelectUniversity}
          />
        );
      case 'catalog':
        return <CatalogPage universities={universities} onSelectView={handleSelectUniversity} onBack={backToHome} />;
      case 'universityDetail':
        return (
          <DetailWrapper title="University Details" onBack={backToCatalog}>
            <UniversityDetailPage slug={selectedUnySlug} />
          </DetailWrapper>
        );
      default:
        return <HomePage navLinks={navLinks} universities={universities} scrolled={scrolled} onScrollTo={goToSection} onNavigate={setActiveView} onSelectUniversity={handleSelectUniversity} />;
    }
  };

  return <div className="font-sans">{renderContent()}</div>;
};

export default App;
  