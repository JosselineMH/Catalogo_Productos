// src/pages/Categorias/Categorias.tsx
import { useEffect, useState } from 'react';
import './Categorias.css';

type CategoriasProps = {
  volverAlMenu: () => void;
};

type Categoria = {
  id_categoria: string;
  nombre: string;
  descripcion: string;
  create_at: string;
  update_at: string;
};

export function Categorias({ volverAlMenu }: CategoriasProps) {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    async function obtenerCategorias() {
        const respuesta = await fetch('http://localhost:3000/categorias');
        const data = await respuesta.json();
        setCategorias(data);
    }

    useEffect(() => {
        obtenerCategorias();
    }, []);

    return (
        <main className="categorias-page">
            <section className="categorias-panel">
            <div className="categorias-header">
                <div>
                <span className="categorias-title">CATEGORÍAS</span>
                <h1>Gestión de categorías</h1>
                <p>Consulta, registra y modifica categorías</p>
                </div>

                <button type="button" className="volver-button" onClick={volverAlMenu}>
                Volver
                </button>
            </div>

            <table className="categorias-table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
                </thead>

                <tbody>
                {categorias.map((categoria) => (
                    <tr key={categoria.id_categoria}>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.descripcion}</td>
                    <td>
                        <button type="button" className="table-button">
                        Modificar
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </section>
        </main>
        );
}