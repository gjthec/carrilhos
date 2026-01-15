import React, { useState, useEffect } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { HiArrowRight } from 'react-icons/hi';
import logoIcon from '../Logos/Carrilhos - Logotipo - Icone.png';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 0);
      setIsScrolled(scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={scrollToTop}>
            <div className="logo-icon">
              <img src={logoIcon} alt="Carrilhos" />
            </div>
            <div className="logo-text">
              <h1>Consultoria Carrilhos</h1>
              <span className="tagline">Gestão de E-commerce</span>
            </div>
          </div>

          <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
              Início
            </a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
              Serviços
            </a>
            <a href="#comparativo" onClick={(e) => { e.preventDefault(); scrollToSection('comparativo'); }}>
              Comparativo
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
              Sobre
            </a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>
              Depoimentos
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
              Contato
            </a>
            <button
              className="cta-button"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            >
              Solicitar Consultoria
              <HiArrowRight />
            </button>
          </nav>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiXMark /> : <HiBars3 />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


