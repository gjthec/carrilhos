import React, { useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  useEffect(() => {
    const checkChatwootSDK = setInterval(() => {
      if (window.chatwootSDK) {
        clearInterval(checkChatwootSDK);
        console.log('Chatwoot SDK carregado com sucesso');
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkChatwootSDK);
    }, 10000);
  }, []);

  const handleOpenChat = () => {
    console.log('Tentando abrir o chat do Chatwoot...');
    
    if (window.chatwootSDK) {
      try {
        if (typeof window.chatwootSDK.toggle === 'function') {
          window.chatwootSDK.toggle('open');
          console.log('Chat aberto via chatwootSDK.toggle');
          return;
        }
      } catch (error) {
        console.error('Erro ao usar chatwootSDK.toggle:', error);
      }
    }

    if (window.$chatwoot) {
      try {
        if (typeof window.$chatwoot.toggle === 'function') {
          window.$chatwoot.toggle('open');
          console.log('Chat aberto via $chatwoot.toggle');
          return;
        }
      } catch (error) {
        console.error('Erro ao usar $chatwoot.toggle:', error);
      }
    }

    const widgetHolder = document.getElementById('woot-widget-holder');
    if (widgetHolder) {
      const toggleButton = widgetHolder.querySelector('[data-chatwoot-toggle]') || 
                          widgetHolder.querySelector('button[aria-label*="chat"]') ||
                          widgetHolder.querySelector('button[aria-label*="Chat"]');
      
      if (toggleButton) {
        toggleButton.click();
        console.log('Chat aberto via clique no botão do widget');
        return;
      }

      const widget = widgetHolder.querySelector('[data-chatwoot-widget]');
      if (widget) {
        widget.style.display = 'block';
        widget.style.visibility = 'visible';
        widget.style.opacity = '1';
        console.log('Widget do Chatwoot exibido via CSS');
        return;
      }
    }

    console.warn('SDK do Chatwoot não encontrado, tentando novamente em 1 segundo...');
    setTimeout(() => {
      if (window.chatwootSDK && typeof window.chatwootSDK.toggle === 'function') {
        window.chatwootSDK.toggle('open');
        console.log('Chat aberto após retry');
      } else if (window.$chatwoot && typeof window.$chatwoot.toggle === 'function') {
        window.$chatwoot.toggle('open');
        console.log('Chat aberto após retry via $chatwoot');
      } else {
        console.error('Chatwoot SDK não encontrado. Verifique se o script foi carregado corretamente.');
        alert('O chat não está disponível no momento. Por favor, tente novamente mais tarde ou entre em contato pelo email.');
      }
    }, 1000);
  };

  return (
    <button
      className="whatsapp-button"
      onClick={handleOpenChat}
      aria-label="Abrir chat"
    >
      <FaWhatsapp />
    </button>
  );
};

export default WhatsAppButton;

