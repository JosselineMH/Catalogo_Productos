// src/pages/Login/Login.tsx
import { useState } from 'react';
import Swal from 'sweetalert2';
import './Login.css'

type RespuestaLogin = {
    mensaje: string;
    usuario: {
        correo_electronico: string;
    };
};


export function Login() {
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [cargando, setCargando] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!correoElectronico.trim() || !contrasena.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos requeridos',
                text: 'Debes ingresar correo electrónico y contraseña',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        setCargando(true);

        try{
            const respuesta = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo_electronico: correoElectronico,
                    contrasena: contrasena,
                }),
            });

            const data = await respuesta.json();

            if(!respuesta.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: data.mensaje || 'Correo electrónico o contraseña incorrectos',
                    confirmButtonText: 'Aceptar',
                });

                return;
            }

            const loginData: RespuestaLogin = data;

            Swal.fire({
                icon: 'success',
                title: loginData.mensaje,
                text: `Has iniciado sesión como ${loginData.usuario.correo_electronico}`,
                confirmButtonText: 'Continuar',
            });
        }

        catch{
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar al servidor',
                confirmButtonText: 'Aceptar',
            });
        }finally {
            setCargando(false);
        }
    }


    return (
        <main className="login-page">
            <section className="login-panel">
                <div className="login-header">
                    <span className="login-title">CATÁLOGO</span>
                    <h1> Iniciar Sesión </h1>
                    <p> Accede al sistema de gestión de productos </p>
                </div>

                <form className="login-form"  onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="correo_electronico">Correo Electrónico</label>
                        <input
                            id = "correo_electronico"
                            name = "correo_electronico"
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={correoElectronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="contrasena">Contraseña</label>
                        <input
                            id = "contrasena"
                            name = "contrasena"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>
    
                    <button type="submit" className="login-button" disabled={cargando}>
                        {cargando ? 'Verificando...' : 'Acceder'}
                    </button>
                </form>
            </section>
        </main>
    );
}