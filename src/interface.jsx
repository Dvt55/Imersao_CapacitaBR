import React, { useState } from 'react';

export default function MarcaForm() {
  const [formData, setFormData] = useState({
    nome: '',
    logo: '',
    dataDeposito: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
  };

  return (

    <div style={styles.container}>
      <h3 style={styles.subtitulo}>Escreva Aqui os Dados de Sua Empresa</h3>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Título:</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          style={styles.input}
          required
        /><br /><br />

        <label style={styles.label}>Logo (URL ou Descrição):</label>
        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          style={styles.input}
        /><br /><br />

        <label style={styles.label}>Data de Depósito:</label>
        <input
          type="date"
          name="dataDeposito"
          value={formData.dataDeposito}
          onChange={handleChange}
          style={styles.input}
        /><br /><br />

        <button type="submit" style={styles.button}>Enviar</button>
      </form>
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

};
