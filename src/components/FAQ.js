import React, { useState, useEffect, useRef } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqRefs = useRef([]);
  const answerRefs = useRef([]);
  const [animatedFAQs, setAnimatedFAQs] = useState(new Set());

  const faqs = [
    {
      question: 'Como funciona a consultoria de e-commerce?',
      answer: 'Nossa consultoria oferece uma análise completa do seu negócio online, identificando oportunidades de melhoria e desenvolvendo estratégias personalizadas para aumentar suas vendas e otimizar processos.'
    },
    {
      question: 'Quanto tempo leva para ver resultados?',
      answer: 'Os resultados variam conforme o projeto, mas geralmente começamos a ver melhorias significativas entre 30 a 90 dias após a implementação das estratégias recomendadas.'
    },
    {
      question: 'Vocês trabalham com todas as plataformas de e-commerce?',
      answer: 'Sim, trabalhamos com as principais plataformas do mercado, incluindo Shopify, WooCommerce, VTEX, Tray, Nuvemshop e outras. Adaptamos nossas soluções à plataforma que você utiliza.'
    },
    {
      question: 'Qual o investimento necessário?',
      answer: 'O investimento varia conforme a complexidade do projeto e os serviços contratados. Entre em contato conosco para uma avaliação personalizada e um orçamento adequado ao seu negócio.'
    },
    {
      question: 'Oferecem suporte contínuo?',
      answer: 'Sim, oferecemos planos de suporte contínuo para acompanhar a evolução do seu e-commerce, realizar ajustes e garantir que você continue alcançando resultados positivos.'
    }
  ];

  useEffect(() => {
    const faqObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const faqIndex = faqRefs.current.indexOf(entry.target);
            if (faqIndex !== -1 && !animatedFAQs.has(faqIndex)) {
              setAnimatedFAQs(prev => new Set([...prev, faqIndex]));
              entry.target.classList.add('animated');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    faqRefs.current.forEach(faq => {
      if (faq) faqObserver.observe(faq);
    });

    return () => {
      faqRefs.current.forEach(faq => {
        if (faq) faqObserver.unobserve(faq);
      });
    };
  }, [animatedFAQs]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // useEffect separado para garantir que todos os itens animados permaneçam sempre visíveis
  useEffect(() => {
    const ensureVisibility = () => {
      faqRefs.current.forEach((faqItem, index) => {
        if (faqItem && faqItem.classList.contains('animated')) {
          // Forçar visibilidade - inline styles têm prioridade sobre CSS
          // Especial atenção ao primeiro item (índice 0)
          faqItem.style.opacity = '1';
          faqItem.style.transform = 'translateY(0)';
          faqItem.style.display = 'block';
          faqItem.style.visibility = 'visible';
          faqItem.style.height = 'auto';
          faqItem.style.minHeight = 'auto';
          
          const question = faqItem.querySelector('.faq-question');
          if (question) {
            question.style.opacity = '1';
            question.style.visibility = 'visible';
            question.style.display = 'flex';
            question.style.height = 'auto';
          }
        }
      });
    };

    // Executar imediatamente
    ensureVisibility();

    // Executar sempre que openIndex mudar (com pequeno delay para garantir que o DOM foi atualizado)
    const timeoutId = setTimeout(ensureVisibility, 10);
    
    // Também executar após um frame de animação
    const frameId = requestAnimationFrame(() => {
      ensureVisibility();
    });

    // MutationObserver para monitorar mudanças no primeiro item
    const firstItem = faqRefs.current[0];
    let observer = null;
    
    if (firstItem && firstItem.classList.contains('animated')) {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && 
              (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
            // Se o primeiro item foi modificado, garantir que permaneça visível
            if (firstItem.classList.contains('animated')) {
              firstItem.style.opacity = '1';
              firstItem.style.transform = 'translateY(0)';
              firstItem.style.display = 'block';
              firstItem.style.visibility = 'visible';
              
              const question = firstItem.querySelector('.faq-question');
              if (question) {
                question.style.opacity = '1';
                question.style.visibility = 'visible';
                question.style.display = 'flex';
              }
            }
          }
        });
      });

      observer.observe(firstItem, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }
    
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [openIndex, animatedFAQs]);

  useEffect(() => {
    // Gerenciar apenas a abertura/fechamento das respostas
    answerRefs.current.forEach((answerRef, index) => {
      if (answerRef) {
        if (openIndex === index) {
          // Abrir suavemente
          answerRef.style.display = 'block';
          setTimeout(() => {
            if (answerRef) {
              answerRef.style.maxHeight = '';
              const height = answerRef.scrollHeight;
              answerRef.style.maxHeight = height + 'px';
              answerRef.style.paddingBottom = '1.5rem';
            }
          }, 10);
        } else {
          // Fechar suavemente - apenas a resposta, não o item inteiro
          if (answerRef.style.maxHeight && answerRef.style.maxHeight !== '0px' && answerRef.scrollHeight > 0) {
            const currentHeight = answerRef.scrollHeight;
            answerRef.style.maxHeight = currentHeight + 'px';
            requestAnimationFrame(() => {
              if (answerRef) {
                answerRef.style.maxHeight = '0px';
                answerRef.style.paddingBottom = '0';
              }
            });
          } else {
            answerRef.style.maxHeight = '0px';
            answerRef.style.paddingBottom = '0';
          }
        }
      }
    });
  }, [openIndex]);

  return (
    <section id="faq" className="faq ui-section reveal glow-bg">
      <div className="container">
        <div className="section-header">
          <span className="section-tag ui-badge glow-badge">Perguntas Frequentes</span>
          <h2 className="section-title glow-text">Tire suas dúvidas</h2>
          <p className="section-description">
            Encontre respostas para as principais questões sobre nossos serviços e como podemos ajudar seu e-commerce.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              ref={el => faqRefs.current[index] = el}
              className={`faq-item ui-card hover-lift glow-card ${openIndex === index ? 'open' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <button 
                className="faq-question ui-button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <HiChevronUp className="faq-icon" />
                ) : (
                  <HiChevronDown className="faq-icon" />
                )}
              </button>
              <div 
                ref={el => answerRefs.current[index] = el}
                className="faq-answer"
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
