import React, { useState } from 'react';

export default function MarcaForm() {
  const [formData, setFormData] = useState({
    empresa: '',
    nome: '',
    nomeMarca: '',
    numProtocolo: '',
  });

  const [campoSelecionado, setCampoSelecionado] = useState('');
  const [respostaApi, setRespostaApi] = useState(''); // Estado para mostrar resposta da API

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [campoSelecionado]: value }));
  };

  const handleCampoChange = (e) => {
    setCampoSelecionado(e.target.value);
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
        <label style={styles.label}>Entrada:</label>
        <input
          type="text"
          name= {campoSelecionado}
          value={formData.campoSelecionado}
          onChange={handleChange}
          style={styles.input}
          required
        /><br /><br />

        <div style={{ marginBottom: '15px' }}>
          <label style={styles.label}>
            <input
              type="radio"
              name="campo"
              value="empresa"
              checked={campoSelecionado === 'empresa'}
              onChange={handleCampoChange}
              style={{ marginRight: '8px' }}
            />
            Nome da Empresa
          </label><br />
          
          <label style={styles.label}>
            <input
              type="radio"
              name="campo"
              value="nome"
              checked={campoSelecionado === 'nome'}
              onChange={handleCampoChange}
              style={{ marginRight: '8px' }}
            />
            Nome
          </label><br />
          
          <label style={styles.label}>
            <input
              type="radio"
              name="campo"
              value="nomeMarca"
              checked={campoSelecionado === 'nomeMarca'}
              onChange={handleCampoChange}
              style={{ marginRight: '8px' }}
            />
            Nome da Marca
          </label><br />
          
          <label style={styles.label}>
            <input
              type="radio"
              name="campo"
              value="numProtocolo"
              checked={campoSelecionado === 'numProtocolo'}
              onChange={handleCampoChange}
              style={{ marginRight: '8px' }}
            />
            Número do Protocolo
          </label>
        </div>
      

        

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
