import React, { useEffect, useRef, useState } from 'react';
import { 
  HiShoppingBag, 
  HiChartBar, 
  HiLightBulb, 
  HiDevicePhoneMobile,
  HiCheckCircle 
} from 'react-icons/hi2';
import './Services.css';

const Services = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [animatedCards, setAnimatedCards] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardRefs.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, [animatedCards]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const services = [
    {
      icon: HiShoppingBag,
      title: 'Gestão de E-commerce',
      description: 'Soluções completas para gerenciar e otimizar sua loja virtual, desde a configuração inicial até a gestão diária.',
      features: [
        'Configuração de plataformas',
        'Gestão de produtos e estoque',
        'Otimização de processos',
        'Suporte contínuo'
      ]
    },
    {
      icon: HiChartBar,
      title: 'Análise e Estratégia',
      description: 'Análise profunda do seu negócio e desenvolvimento de estratégias personalizadas para maximizar resultados.',
      features: [
        'Análise de mercado',
        'Planejamento estratégico',
        'Definição de KPIs',
        'Relatórios detalhados'
      ]
    },
    {
      icon: HiLightBulb,
      title: 'Consultoria Especializada',
      description: 'Orientações especializadas para tomar as melhores decisões e impulsionar o crescimento do seu e-commerce.',
      features: [
        'Consultoria personalizada',
        'Mentoria de negócios',
        'Otimização de vendas',
        'Treinamento de equipe'
      ]
    },
    {
      icon: HiDevicePhoneMobile,
      title: 'Marketing Digital',
      description: 'Estratégias de marketing digital para aumentar sua visibilidade online e atrair mais clientes.',
      features: [
        'Gestão de redes sociais',
        'Campanhas publicitárias',
        'SEO e conteúdo',
        'Email marketing'
      ]
    }
  ];

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Nossos Serviços</span>
          <h2 className="section-title">Soluções Completas para seu E-commerce</h2>
          <p className="section-description">
            Oferecemos serviços especializados para transformar seu negócio online em uma máquina de vendas.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index} 
                ref={el => cardRefs.current[index] = el}
                className="service-card" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="service-icon">
                  <IconComponent />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <div className="check-icon">
                        <HiCheckCircle />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="service-button"
                  onClick={() => scrollToSection('contact')}
                >
                  Saiba Mais
                </button>
              </div>
            );
          })}
        </div>

        <div className="services-cta">
          <p>Pronto para transformar seu e-commerce?</p>
          <button
            className="btn btn-primary"
            onClick={() => scrollToSection('contact')}
          >
            Solicitar Consultoria
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;



