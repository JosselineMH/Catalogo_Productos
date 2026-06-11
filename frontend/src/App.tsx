// src/App.tsx
import { useState } from 'react';
import { Login } from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Categorias } from './pages/Categorias/Categorias';
import { Productos } from './pages/Productos/Productos';

function App() {
  const [correoElectronico, setCorreoElectronico] = useState(
    sessionStorage.getItem('correoElectronico') || ''
  );
  const [pantalla, setPantalla] = useState<'menu' | 'categorias' | 'productos'>('menu');

  function manejarInicioSesion(correoElectronico: string) {
    setCorreoElectronico(correoElectronico);
    sessionStorage.setItem('correoElectronico', correoElectronico);
    setPantalla('menu');
  }

  function manejarCierreSesion() {
    setCorreoElectronico('');
    sessionStorage.removeItem('correoElectronico');
    setPantalla('menu');
  }

  if (correoElectronico && pantalla === 'categorias') {
    return <Categorias volverAlMenu={() => setPantalla('menu')} />;
  }

  if (correoElectronico && pantalla === 'productos') {
    return <Productos volverAlMenu={() => setPantalla('menu')} />;
  }

  if (correoElectronico) {
    return (
      <Dashboard correoElectronico={correoElectronico} onLogout={manejarCierreSesion} abrirCategorias={() => setPantalla('categorias')} abrirProductos={() => setPantalla('productos')} />
    );
  }

  return <Login alIniciarSesion={manejarInicioSesion} />;
}

export default App;