import React from 'react';
import Interface from './interface';

const styles = {
  containerUnico: {
  backgroundColor: '#1a1a1a',
  padding: '10px', 
  textAlign: 'center',
  marginBottom: '0px', 
},

  titulo: {
  fontSize: '50px',
  fontFamily: '"Georgia", serif',
  color: '#FFFFF2',
  fontWeight: 'normal',
  lineHeight: '1.4',
  marginBottom: '5px',
  textShadow: `
      0 0 3pxrgb(243, 241, 237),
      0 0 6pxrgb(243, 241, 237),
    `,
},

  subtitulo_main: {
  fontSize: '20px',
  fontFamily: '"Georgia", serif',
  color: '#FFFFF2',
  fontWeight: 'normal',
  lineHeight: '1.4',
  marginBottom: '5px', 
  textShadow: `
      0 0 3pxrgb(243, 241, 237),
      0 0 6pxrgb(243, 241, 237),
    `,
},

  destaque: {
    color: '#CBA135',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '32px',
    textShadow: `
      0 0 3px #CBA135,
      0 0 6px #CBA135
    `,
  },
};

function App() {
  return (
    <div>
      <div style={styles.containerUnico}>
        <h1 style={styles.titulo}>REIS Marcas & Patentes</h1>
        <h3 style={styles.subtitulo_main}>
          Seja o <span style={styles.destaque}>DONO</span> da sua <span style={styles.destaque}>MARCA!</span>
        </h3>
      </div>
      <Interface />
    </div>
  );
}

export default App;
