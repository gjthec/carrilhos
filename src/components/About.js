import React, { useEffect, useRef, useState } from 'react';
import { HiRocketLaunch, HiBriefcase, HiCheckCircle, HiUserGroup, HiLightBulb, HiArrowTrendingUp } from 'react-icons/hi2';
import { HiArrowRight } from 'react-icons/hi';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const cardRefs = useRef([]);
  const valueCardRefs = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counters, setCounters] = useState({ years: 0, projects: 0, clients: 0 });
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const [animatedValues, setAnimatedValues] = useState(new Set());

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = cardRefs.current.indexOf(entry.target);
            if (cardIndex !== -1 && !animatedCards.has(cardIndex)) {
              setAnimatedCards(prev => new Set([...prev, cardIndex]));
              entry.target.classList.add('animated');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const valueObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const valueIndex = valueCardRefs.current.indexOf(entry.target);
            if (valueIndex !== -1 && !animatedValues.has(valueIndex)) {
              setAnimatedValues(prev => new Set([...prev, valueIndex]));
              entry.target.classList.add('animated');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    cardRefs.current.forEach(card => {
      if (card) cardObserver.observe(card);
    });

    valueCardRefs.current.forEach(card => {
      if (card) valueObserver.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardRefs.current.forEach(card => {
        if (card) cardObserver.unobserve(card);
      });
      valueCardRefs.current.forEach(card => {
        if (card) valueObserver.unobserve(card);
      });
    };
  }, [animatedCards, animatedValues]);

  useEffect(() => {
    const startCounterAnimation = () => {
      if (hasAnimated) return;

      setHasAnimated(true);

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      const targets = { years: 5, projects: 100, clients: 50 };

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = Math.min(currentStep / steps, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCounters({
          years: Math.floor(targets.years * easeOut),
          projects: Math.floor(targets.projects * easeOut),
          clients: Math.floor(targets.clients * easeOut)
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

    const statsObserver = new IntersectionObserver(
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
      if (statsRef.current && !hasAnimated) {
        const rect = statsRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          startCounterAnimation();
        } else if (statsRef.current) {
          statsObserver.observe(statsRef.current);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      checkInitialVisibility();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const values = [
    {
      icon: HiCheckCircle,
      title: 'Foco em Resultados',
      description: 'Cada estratégia é pensada para gerar resultados mensuráveis e impactantes.'
    },
    {
      icon: HiUserGroup,
      title: 'Parceria de Longo Prazo',
      description: 'Construímos relacionamentos duradouros baseados em confiança e resultados.'
    },
    {
      icon: HiLightBulb,
      title: 'Inovação Constante',
      description: 'Sempre atualizados com as últimas tendências e tecnologias do mercado.'
    },
    {
      icon: HiArrowTrendingUp,
      title: 'Crescimento Sustentável',
      description: 'Estratégias que garantem crescimento contínuo e sustentável do seu negócio.'
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="about" className="about ui-section reveal" ref={sectionRef}>
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div className="section-label ui-badge">Sobre Nós</div>
            <h2 className="section-title">
              Especialistas em E-commerce e Gestão
            </h2>
            <div className="about-description-wrapper">
              <p className="about-description">
                A Consultoria Carrilhos é uma empresa especializada em e-commerce e gestão, 
                dedicada a fornecer soluções abrangentes para empresas que buscam começar ou 
                otimizar suas vendas online.
              </p>
              <p className="about-description">
                Com foco em empresários, donos de e-commerce e entusiastas de vendas online, 
                nosso objetivo é capturar leads e compartilhar insights valiosos sobre e-commerce 
                e a evolução de clientes.
              </p>
            </div>
            <div className="about-stats" ref={statsRef}>
              <div className="about-stat">
                <div className="stat-value">{counters.years}+</div>
                <div className="stat-label">Anos de Experiência</div>
              </div>
              <div className="about-stat">
                <div className="stat-value">{counters.projects}+</div>
                <div className="stat-label">Projetos Concluídos</div>
              </div>
              <div className="about-stat">
                <div className="stat-value">{counters.clients}+</div>
                <div className="stat-label">Clientes Satisfeitos</div>
              </div>
            </div>
            <button 
              className="btn btn-primary ui-button"
              onClick={() => scrollToSection('contact')}
            >
              Falar com especialista
              <HiArrowRight />
            </button>
          </div>
          
          <div className="about-cards">
            <div 
              ref={el => cardRefs.current[0] = el}
              className="about-card card-primary ui-card hover-lift"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="card-header">
                <div className="card-icon">
                  <HiRocketLaunch />
                </div>
              </div>
              <div className="card-body">
                <h3 className="card-title">Transformação Digital</h3>
                <p className="card-text">Levamos seu negócio para o próximo nível</p>
              </div>
            </div>
            
            <div 
              ref={el => cardRefs.current[1] = el}
              className="about-card card-secondary ui-card hover-lift"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="card-header">
                <div className="card-icon">
                  <HiBriefcase />
                </div>
              </div>
              <div className="card-body">
                <h3 className="card-title">Expertise Comprovada</h3>
                <p className="card-text">Anos de experiência no mercado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="values-section">
          <div className="values-header">
            <h3 className="values-title">Nossos Valores</h3>
            <p className="values-subtitle">Princípios que guiam nosso trabalho</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index} 
                  ref={el => valueCardRefs.current[index] = el}
                  className="value-card ui-card hover-lift"
                  style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                >
                  <div className="value-icon">
                    <IconComponent />
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
