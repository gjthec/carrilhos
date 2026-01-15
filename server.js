const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3001;

const resend = new Resend('re_8dVcw1gf_8rrbccz3d1xSNDodDBVAZoX4');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL?.replace('http://', 'https://'),
  process.env.FRONTEND_URL?.replace('https://', 'http://')
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nome, email e mensagem' 
      });
    }

    const emailContent = `
      <h2>Nova mensagem do site - Consultoria Carrilhos</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const result = await resend.emails.send({
      from: 'Consultoria Carrilhos <noreply_page@consultoriacarrilhos.com.br>',
      to: ['contato@consultoriacarrilhos.com.br'],
      subject: `Nova mensagem do site - ${name}`,
      html: emailContent,
      reply_to: email
    });

    console.log('Email enviado com sucesso:', result);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    console.error('Detalhes do erro:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Erro ao enviar email', 
      message: error.message || 'Erro desconhecido',
      details: error.response?.data || error
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

