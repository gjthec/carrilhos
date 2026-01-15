import React from 'react';
import { HiPhone, HiMail, HiLocationMarker, HiCalendar } from 'react-icons/hi';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import logoVertical from '../Logos/Carrilhos - Logotipo - Vetical - Branco.png';
import './Footer.css';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Consultoria Carrilhos</h3>
              <p>Especialistas em E-commerce e Gestão</p>
            </div>
            <p className="footer-description">
              Soluções abrangentes para empresas que buscam começar ou otimizar 
              suas vendas online.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" className="social-link">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Instagram" className="social-link">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="WhatsApp" className="social-link">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul className="footer-links">
              <li>
                <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
                  Início
                </a>
              </li>
              <li>
                <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                  Serviços
                </a>
              </li>
              <li>
                <a href="#sobre" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#depoimentos" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contato" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Serviços</h4>
            <ul className="footer-links">
              <li>
                <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                  Gestão de E-commerce
                </a>
              </li>
              <li>
                <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                  Consultoria Estratégica
                </a>
              </li>
              <li>
                <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                  Marketing Digital
                </a>
              </li>
              <li>
                <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                  Treinamento
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section footer-contact-section">
            <h4>Contato</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">
                  <HiPhone />
                </span>
                <a href="tel:+5519989635680">(19) 98963-5680</a>
              </li>
              <li>
                <span className="contact-icon">
                  <HiMail />
                </span>
                <a href="mailto:contato@consultoriacarrilhos.com.br">
                contato@consultoriacarrilhos.com.br
                </a>
              </li>
              <li>
                <span className="contact-icon">
                  <HiLocationMarker />
                </span>
                <span>São Paulo, SP, Brasil</span>
              </li>
            </ul>
            <div className="footer-cta">
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-button"
              >
                <HiCalendar />
                <span>Agendar Consulta</span>
              </a>
            </div>
          </div>

          <div className="footer-section footer-logo-section">
            <img src={logoVertical} alt="Carrilhos" className="footer-logo-bottom" />
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              &copy; {currentYear} Consultoria Carrilhos. Todos os direitos reservados.
            </p>
            <div className="footer-policies">
              <a href="#politicas">Políticas</a>
              <span>•</span>
              <a href="#privacidade">Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

