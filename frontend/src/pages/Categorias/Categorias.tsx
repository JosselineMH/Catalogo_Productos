// src/pages/Categorias/Categorias.tsx
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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

    const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
    const [nombreEditando, setNombreEditando] = useState('');
    const [descripcionEditando, setDescripcionEditando] = useState('');

    async function obtenerCategorias() {
        const respuesta = await fetch('http://localhost:3000/categorias');
        const data = await respuesta.json();
        setCategorias(data);
    }

    function abrirModalModificar(categoria: Categoria) {
        setCategoriaEditando(categoria);
        setNombreEditando(categoria.nombre);
        setDescripcionEditando(categoria.descripcion);
    }

    useEffect(() => {
        obtenerCategorias();
    }, []);


    async function guardarCambiosCategoria(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!categoriaEditando) {
            return;
        }

        if (!nombreEditando.trim() || !descripcionEditando.trim()) {
            Swal.fire({
            icon: 'warning',
            title: 'Campos requeridos',
            text: 'Debes ingresar nombre y descripción',
            confirmButtonText: 'Aceptar',
            });

            return;
        }

        const respuesta = await fetch(
            `http://localhost:3000/categorias/${categoriaEditando.id_categoria}`,
            {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombreEditando,
                descripcion: descripcionEditando,
            }),
            },
        );

        const data = await respuesta.json();

        if (!respuesta.ok) {
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message || 'No se pudo modificar la categoría',
            confirmButtonText: 'Aceptar',
            });

            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Categoría modificada',
            text: 'Los cambios se guardaron correctamente',
            confirmButtonText: 'Aceptar',
        });

        setCategoriaEditando(null);
        obtenerCategorias();
    }

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
                            <button
                                type="button"
                                className="table-button"
                                onClick={() => abrirModalModificar(categoria)}
                                >
                                Modificar
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>


                {categoriaEditando && (
                    <div className="modal-backdrop">
                        <div className="modal-panel">
                        <div className="modal-header">
                            <h2>Modificar categoría</h2>
                            <button
                            type="button"
                            className="modal-close"
                            onClick={() => setCategoriaEditando(null)}
                            >
                            ×
                            </button>
                        </div>

                        <form className="modal-form" onSubmit={guardarCambiosCategoria}>
                            <div className="modal-field">
                            <label htmlFor="nombreEditando">Nombre</label>
                            <input
                                id="nombreEditando"
                                type="text"
                                value={nombreEditando}
                                onChange={(e) => setNombreEditando(e.target.value)}
                            />
                            </div>

                            <div className="modal-field">
                            <label htmlFor="descripcionEditando">Descripción</label>
                            <textarea
                                id="descripcionEditando"
                                value={descripcionEditando}
                                onChange={(e) => setDescripcionEditando(e.target.value)}
                            />
                            </div>

                            <button type="submit" className="guardar-button">
                            Guardar cambios
                            </button>
                        </form>
                        </div>
                    </div>
                    )}
            </section>
        </main>
        );
}