import React, { useEffect, useRef, useState } from 'react';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';
import { sendContactEmail } from '../services/emailService';
import './Contact.css';

const Contact = () => {
  const sectionRef = useRef(null);
  const contactItemRefs = useRef([]);
  const formRef = useRef(null);
  const [animatedItems, setAnimatedItems] = useState(new Set());
  const [formAnimated, setFormAnimated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemIndex = contactItemRefs.current.indexOf(entry.target);
            if (itemIndex !== -1 && !animatedItems.has(itemIndex)) {
              setAnimatedItems(prev => new Set([...prev, itemIndex]));
              entry.target.classList.add('animated');
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const formObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !formAnimated) {
            setFormAnimated(true);
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.2 }
    );

    contactItemRefs.current.forEach(item => {
      if (item) itemObserver.observe(item);
    });

    if (formRef.current) {
      formObserver.observe(formRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      contactItemRefs.current.forEach(item => {
        if (item) itemObserver.unobserve(item);
      });
      if (formRef.current) {
        formObserver.unobserve(formRef.current);
      }
    };
  }, [animatedItems, formAnimated]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendContactEmail(formData);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: HiPhone,
      label: 'Telefone',
      value: '(19) 9 8963-5680',
      link: 'tel:+5519989635680'
    },
    {
      icon: HiMail,
      label: 'Email',
      value: 'contato@consultoriacarrilhos.com.br.',
      link: 'mailto:contato@consultoriacarrilhos.com.br'
    },
    {
      icon: HiLocationMarker,
      label: 'Endereço',
      value: 'São Paulo, SP, Brasil',
      link: null
    }
  ];

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Entre em Contato</span>
          <h2 className="section-title">Vamos conversar sobre seu projeto</h2>
          <p className="section-description">
            Estamos prontos para ajudar você a transformar seu e-commerce
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Informações de Contato</h3>
            <p className="contact-intro">
              Entre em contato conosco através dos canais abaixo ou preencha o formulário.
              Responderemos o mais rápido possível!
            </p>

            <div className="contact-items">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <a
                    key={index}
                    ref={el => contactItemRefs.current[index] = el}
                    href={info.link || '#'}
                    className="contact-item"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="contact-icon">
                      <IconComponent />
                    </div>
                    <div className="contact-details">
                      <div className="contact-label">{info.label}</div>
                      <div className="contact-value">{info.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* <div className="newsletter-section">
              <h4>Inscreva-se em nossa Newsletter</h4>
              <p>Receba dicas e insights sobre e-commerce diretamente no seu email</p>
              <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); }}>
                <input
                  type="email"
                  placeholder="Insira seu Email"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  Inscrever
                </button>
              </form>
            </div> */}
          </div>

          <div className="contact-form-wrapper" ref={formRef}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Conte-nos sobre seu projeto..."
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div className="form-success">
                  ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-error">
                  ✗ Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente pelo email.
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary submit-button"
                disabled={isSubmitting}
              >
                <FiSend />
                <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

