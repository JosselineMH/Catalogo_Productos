// src/App.tsx
import { useState } from 'react';
import { Login } from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Categorias } from './pages/Categorias/Categorias';

function App() {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [pantalla, setPantalla] = useState<'menu' | 'categorias'>('menu');

  function manejarInicioSesion(correoElectronico: string) {
    setCorreoElectronico(correoElectronico);
    setPantalla('menu');
  }

  function manejarCierreSesion() {
    setCorreoElectronico('');
    setPantalla('menu');
  }

  if (correoElectronico && pantalla === 'categorias') {
    return <Categorias volverAlMenu={() => setPantalla('menu')} />;
  }

  if (correoElectronico) {
    return (
      <Dashboard correoElectronico={correoElectronico} onLogout={manejarCierreSesion} abrirCategorias={() => setPantalla('categorias')} />
    );
  }

  return <Login alIniciarSesion={manejarInicioSesion} />;
}

export default App;