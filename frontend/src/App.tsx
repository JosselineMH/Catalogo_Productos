// src/App.tsx
import { useState } from 'react';
import { Login } from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';

function App() {
  const [correoElectronico, setCorreoElectronico] = useState('');

  function manejarInicioSesion(correoElectronico: string) {
    setCorreoElectronico(correoElectronico);
  }

  function manejarCierreSesion() {
    setCorreoElectronico('');
  }

  if (correoElectronico) {
    return (
      <Dashboard correoElectronico={correoElectronico} onLogout={manejarCierreSesion} />
    );
  }

  return <Login alIniciarSesion={manejarInicioSesion} />;
}

export default App;