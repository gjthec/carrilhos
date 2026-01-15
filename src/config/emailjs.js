// Configuração do EmailJS
// Para configurar:
// 1. Acesse https://www.emailjs.com/ e crie uma conta gratuita
// 2. Crie um serviço de email (Gmail, Outlook, etc.)
// 3. Crie um template de email
// 4. Obtenha suas credenciais e preencha abaixo:

export const emailjsConfig = {
  // Seu Public Key do EmailJS (Dashboard > Account > General)
  publicKey: 'YOUR_PUBLIC_KEY',
  
  // ID do seu serviço de email (Dashboard > Email Services)
  serviceId: 'YOUR_SERVICE_ID',
  
  // ID do template de email (Dashboard > Email Templates)
  templateId: 'YOUR_TEMPLATE_ID',
  
  // Email de destino (onde você receberá os formulários)
  // Pode ser configurado também no template do EmailJS
  toEmail: 'info@consultoriacarrilhos.com.br'
};




