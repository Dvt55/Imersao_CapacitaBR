import React, { useState} from 'react';

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
    const filtrosValidos = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== '')
    );

    const queryParams = new URLSearchParams(filtrosValidos).toString();
    const url = `http://localhost:5000/busca?${queryParams}`;

    const response = await fetch(url);

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
          value={formData[campoSelecionado] || ''}
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

      {respostaApi && (
  <div style={styles.outputBox}>
    <h4 style={styles.outputTitle}>Resultado:</h4>
    {respostaApi.startsWith('{') || respostaApi.startsWith('[') ? (
      (() => {
        try {
          const parsed = JSON.parse(respostaApi);
          if (Array.isArray(parsed)) {
            return parsed.map((item, idx) => (
              <div key={idx} style={styles.jsonContainer}>
                {Object.entries(item).map(([key, value], subIdx) => (
                  <div key={subIdx} style={styles.jsonItem}>
                    <span style={styles.jsonKey}>{key}:</span>
                    <span style={styles.jsonValue}>
                      {typeof value === 'object'
                        ? JSON.stringify(value, null, 2)
                        : value.toString()}
                    </span>
                  </div>
                ))}
              </div>
            ));
          } else {
            return Object.entries(parsed).map(([key, value], index) => (
              <div key={index} style={styles.jsonItem}>
                <span style={styles.jsonKey}>{key}:</span>
                <span style={styles.jsonValue}>
                  {typeof value === 'object'
                    ? JSON.stringify(value, null, 2)
                    : value.toString()}
                </span>
              </div>
            ));
          }
        } catch (error) {
          return <pre style={{ color: 'red' }}>Erro ao interpretar JSON.</pre>;
        }
      })()
    ) : (
      <pre style={{ color: '#CBA135' }}>{respostaApi}</pre>
    )}
  </div>
)}

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
  },

  outputBox: {
  marginTop: '30px',
  backgroundColor: '#111', // fundo escuro
  borderRadius: '8px',
  padding: '20px',
  width: '100%',
  maxWidth: '500px',
  color: '#CBA135',
  boxShadow: '0 0 10px #CBA135',
},

outputTitle: {
  marginBottom: '15px',
  fontSize: '18px',
  fontWeight: 'bold',
  borderBottom: '1px solid #CBA135',
  paddingBottom: '5px',
  color: '#CBA135',
},

jsonContainer: {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: '#1a1a1a',
  padding: '10px',
  borderRadius: '5px',
},

jsonItem: {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #333',
  paddingBottom: '6px',
  marginBottom: '6px',
  wordBreak: 'break-word',
},

jsonKey: {
  fontWeight: 'bold',
  color: '#CBA135',
  marginRight: '10px',
},

jsonValue: {
  color: '#eee',
  flex: 1,
  textAlign: 'right',
},


};


