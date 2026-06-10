// src/pages/Login/Login.tsx
import { useState } from 'react';
import Swal from 'sweetalert2';
import './Login.css'



export function Login() {
    return (
        <main className="login-page">
            <section className="login-panel">
                <div className="login-header">
                    <span className="login-title">CATÁLOGO</span>
                    <h1> Iniciar Sesión </h1>
                    <p> Accede al sistema de gestión de productos </p>
                </div>

                <form className="login-form"  onSubmit={(event) => event.preventDefault()}>
                    <div className="login-field">
                        <label htmlFor="correo_electronico">Correo Electrónico</label>
                        <input
                            id = "correo_electronico"
                            name = "correo_electronico"
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="contrasena">Contraseña</label>
                        <input
                            id = "contrasena"
                            name = "contrasena"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>
    
                    <button type="submit" className="login-button">
                        Acceder
                    </button>
                </form>
            </section>
        </main>
    );
}