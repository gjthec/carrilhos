import React, { useEffect, useRef, useState } from 'react';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import './Testimonials.css';

const Testimonials = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

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

    const sliderObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            if (sliderRef.current) {
              sliderRef.current.classList.add('animated');
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sliderRef.current) {
      sliderObserver.observe(sliderRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (sliderRef.current) {
        sliderObserver.unobserve(sliderRef.current);
      }
    };
  }, [hasAnimated]);

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'CEO, Loja Online',
      content: 'A Consultoria Carrilhos fez toda a diferença no meu negócio. Suas estratégias de e-commerce impulsionaram minhas vendas online e aumentaram significativamente a visibilidade da minha marca.',
      rating: 5,
      avatar: 'MS'
    },
    {
      name: 'Rafael Oliveira',
      role: 'Diretor de Marketing',
      content: 'Estou impressionado com o profissionalismo e conhecimento da equipe da Consultoria Carrilhos. Eles me ajudaram a otimizar a experiência de compra dos meus clientes, resultando em um aumento nas vendas.',
      rating: 5,
      avatar: 'RO'
    },
    {
      name: 'Carolina Santos',
      role: 'Empreendedora',
      content: 'Recomendo fortemente a Consultoria Carrilhos. Sua abordagem personalizada e focada em resultados foi fundamental para o crescimento do meu negócio online.',
      rating: 5,
      avatar: 'CS'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="testimonials ui-section reveal glow-bg" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag ui-badge glow-badge">Depoimentos</span>
          <h2 className="section-title glow-text">O que nossos clientes dizem</h2>
          <p className="section-description">
            Confira a opinião de quem já trabalhou conosco
          </p>
        </div>

        <div className="testimonials-slider" ref={sliderRef}>
          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card ui-card hover-lift glow-card ${
                  index === currentIndex ? 'active' : ''
                } ${index < currentIndex ? 'prev' : ''} ${
                  index > currentIndex ? 'next' : ''
                }`}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiStar key={i} className="star" />
                  ))}
                </div>
                <blockquote className="testimonial-content">
                  "{testimonial.content}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls">
            <button
              className="slider-button prev"
              onClick={prevTestimonial}
              aria-label="Depoimento anterior"
            >
              <HiChevronLeft />
            </button>
            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
            <button
              className="slider-button next"
              onClick={nextTestimonial}
              aria-label="Próximo depoimento"
            >
              <HiChevronRight />
            </button>
          </div>
        </div>

        <div className="testimonials-cta">
          <p>Quer resultados parecidos no seu e-commerce?</p>
          <button
            className="btn btn-primary ui-button glow-button"
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Quero falar com a Carrilhos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
