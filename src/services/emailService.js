export const sendContactEmail = async (formData) => {
  try {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao enviar email:', errorData);
      throw new Error(errorData.message || 'Erro ao enviar email');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
};

