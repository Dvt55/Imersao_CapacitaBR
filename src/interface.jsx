import React, { useState } from 'react';

export default function MarcaForm() {
  const [formData, setFormData] = useState({
    empresa: '',
    nome: '',
    nomeMarca: '',
    numProtocolo: '',
  });

  const [respostaApi, setRespostaApi] = useState(''); // Estado para mostrar resposta da API

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Resposta da API:', data);
      setRespostaApi(JSON.stringify(data, null, 2)); // Atualiza a saída
      alert("Enviado com sucesso!");
    } catch (error) {
      console.error('Erro ao enviar para API:', error);
      setRespostaApi('Erro ao enviar para API.');
      alert("Erro ao enviar!");
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.subtitulo}>Escreva Aqui os Dados de Sua Empresa</h3>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Nome Da Empresa:</label>
        <input
          type="text"
          name="empresa"
          value={formData.empresa}
          onChange={handleChange}
          style={styles.input}
          required
        /><br /><br />

        <label style={styles.label}>Nome Pessoa:</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          style={styles.input}
        /><br /><br />

        <label style={styles.label}>Nome da Marca:</label>
        <input
          type="text"
          name="nomeMarca"
          value={formData.nomeMarca}
          onChange={handleChange}
          style={styles.input}
        /><br /><br />

        <label style={styles.label}>Numero do Protocolo:</label>
        <input
          type="number"
          name="numProtocolo"
          value={formData.numProtocolo}
          onChange={handleChange}
          style={styles.input}
        /><br /><br />

        <button type="submit" style={styles.button}>Enviar</button>
      </form>

      <div style={styles.output}>
        <pre>{respostaApi}</pre>
      </div>
    </div>
  );
}

const styles = {
  container: {
    paddingTop: '10px',
    paddingBottom: '200px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1a1a1a',
    color: '#CBA135',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '0px',
  },
  subtitulo: {
    marginBottom: '10px',
    color: '#CBA135',
  },
  form: {
    background: '#111111',
    padding: '20px',
    paddingLeft: '6px',
    borderRadius: '10px',
    maxWidth: '400px',
    width: '100%',
    color: '#CBA135',
    boxShadow: '0 0 10px #CBA135',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #CBA135',
    borderRadius: '5px',
    backgroundColor: '#000000',
    color: '#CBA135',
  },
  button: {
    background: '#CBA135',
    color: '#000000',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
  output: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    minHeight: '50px',
    width: '300px',
    maxWidth: '90%', /* Para melhor responsividade */
    whiteSpace: 'pre-wrap', /* Para preservar espaços e quebras de linha */
    boxSizing: 'border-box',
    color: '#000', // Para texto legível no fundo claro
  }
};
