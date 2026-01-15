import React, { useEffect, useRef, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import logoIcon from '../Logos/Carrilhos - Logotipo - Icone.png';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const metricsRef = useRef(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counters, setCounters] = useState({ projects: 0, sales: 0, years: 0 });
  
  const words = ['Assessoria', 'Gestão', 'Consultoria'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const startCounterAnimation = () => {
      if (hasAnimated) return;

      setHasAnimated(true);
      setShowMetrics(true);

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      const targets = { projects: 100, sales: 50, years: 5 };

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCounters({
          projects: Math.floor(targets.projects * easeOut),
          sales: Math.floor(targets.sales * easeOut),
          years: Math.floor(targets.years * easeOut)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounters(targets);
        }
      }, stepDuration);

      return () => {
        clearInterval(interval);
      };
    };

    const metricsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            startCounterAnimation();
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px' }
    );

    const checkInitialVisibility = () => {
      if (metricsRef.current && !hasAnimated) {
        const rect = metricsRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          startCounterAnimation();
        } else if (metricsRef.current) {
          metricsObserver.observe(metricsRef.current);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      checkInitialVisibility();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (metricsRef.current) {
        metricsObserver.unobserve(metricsRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentWord = words[wordIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentWord.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex, words]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-logo-background">
          <img src={logoIcon} alt="Carrilhos" />
        </div>
        <div className="hero-grid"></div>
      </div>
      
      <div className="container">
        <div className="hero-layout">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="typed-text">{typedText}</span>
              <span className="cursor">|</span>
              <span className="hero-title-subtitle hero-title-subtitle-inline"> de E-commerce</span>
              <br />
              <span className="hero-title-subtitle hero-title-subtitle-block">que impulsiona resultados</span>
            </h1>
            
            <p className="hero-description">
              Soluções estratégicas em e-commerce e gestão para empresas que buscam 
              crescimento sustentável e excelência operacional no ambiente digital.
            </p>

            <div className="hero-actions">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                Solicitar Consultoria
                <HiArrowRight />
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('services')}
              >
                Conhecer Serviços
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className={`hero-metrics-container ${showMetrics ? 'visible' : ''}`} ref={metricsRef}>
      <div className="container">
        <div className="hero-metrics">
          <div className="metric-item">
            <div className="metric-value">{counters.projects}+</div>
            <div className="metric-label">Projetos Entregues</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{counters.sales}%</div>
            <div className="metric-label">Aumento Médio de Vendas</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{counters.years}+</div>
            <div className="metric-label">Anos de Experiência</div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Hero;
