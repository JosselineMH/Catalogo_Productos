//  src/pages/Productos/Productos.tsx
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './Productos.css'

type ProductosProps = {
    volverAlMenu: () => void;
};

type Producto = {
    id_producto: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    categorias: string[];
    create_at: string;
    update_at: string;
};

type Categoria = {
  id_categoria: string;
  nombre: string;
  descripcion: string;
};


export function Productos({ volverAlMenu }: ProductosProps) {
    const [productos, setProductos] = useState<Producto[]>([]);

    const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
    const [newCodigo, setNewCodigo] = useState('');
    const [newNombre, setNewNombre] = useState('');
    const [newDescripcion, setNewDescripcion] = useState('');
    const [newPrecio, setNewPrecio] = useState('');  
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);

    async function obtenerProductos() {
        const respuesta = await fetch('http://localhost:3000/productos');
        const data = await respuesta.json();
        setProductos(data);
    }

    async function obtenerCategorias() {
        const respuesta = await fetch('http://localhost:3000/categorias');
        const data = await respuesta.json();
        setCategorias(data);
    }

    useEffect(() => {
        obtenerProductos();
        obtenerCategorias();
    }, []);


    async function crearProducto(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!newCodigo || !newNombre || !newDescripcion || !newPrecio || categoriasSeleccionadas.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Todos los campos son obligatorios',
                confirmButtonText: 'Aceptar',
            });
           return;
        }

        const precioNumero = Number(newPrecio);

        if (Number.isNaN(precioNumero)) {
            Swal.fire({
                icon: 'warning',
                title: 'Precio incorrecto',
                text: 'El precio debe ser un número válido',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        if (precioNumero <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Precio incorrecto',
                text: 'El precio debe ser mayor que cero',
                confirmButtonText: 'Aceptar',
        });
        return;
        }

        const respuesta = await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                codigo: newCodigo,
                nombre: newNombre,
                descripcion: newDescripcion,
                precio: precioNumero,
                categoriasIds: categoriasSeleccionadas,
            }),
        });

        const data = await respuesta.json();

        if(!respuesta.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message || 'No se pudo registrar el producto',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Producto registrado',
            text: 'El producto se agregó correctamente al catálogo',
            confirmButtonText: 'Aceptar',
        });

        setNewCodigo('');
        setNewNombre('');
        setNewDescripcion('');
        setNewPrecio('');
        setCategoriasSeleccionadas([]);
        setModalCrearAbierto(false);
        obtenerProductos();
    }

    async function eliminarProducto(id_producto: string) {
        const nombreProducto = productos.find((p) => p.id_producto === id_producto)?.nombre || 'El producto';
        const respuesta = await fetch(`http://localhost:3000/productos/${id_producto}`, {
            method: 'DELETE',
        });

        if (!respuesta.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el producto',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: `El producto ${nombreProducto} se eliminó correctamente del catálogo`,
            confirmButtonText: 'Aceptar',
        });

        obtenerProductos();
    }




    return(
        <main className="productos-page">
            <section className="productos-panel">
                <div className="productos-header">
                    <div>
                        <span className="productos-title">PRODUCTOS</span>
                        <h1>Gestionar Productos del Catálogo</h1>
                        <p>Consulta, registra, modifica y elimina productos</p>
                    </div>

                    <button type="button" className="volver-button" onClick={volverAlMenu}>
                        Regresar al menú
                    </button>
                </div>

                <div className= "table-actions">
                    <button type="button" className="agregarP-button" onClick={() => setModalCrearAbierto(true)}>
                        Agregar Producto
                    </button>
                </div>

                <table className="productos-table">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Categorías</th>
                        </tr>   
                    </thead>

                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id_producto}>
                                <td>{producto.codigo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.categorias.join(', ')}</td>
                                <td>
                                    <button
                                        type = "button"
                                        className="editarP-button"
                                        >
                                        Modficar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type = "button"
                                        className="eliminarP-button"
                                        onClick={() => eliminarProducto(producto.id_producto)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal para crear nuevo producto */}
                {modalCrearAbierto && (
                    <div className="modal-backdrop">
                        <div className="modal-panel">
                            <div className="modal-header">
                                <h2>Agregar Nuevo Producto</h2>
                                <button type="button" className="modal-close" onClick={() => setModalCrearAbierto(false)}>
                                    x
                                </button>
                            </div>

                            <form className="modal-form" onSubmit={crearProducto}>
                                <div className="modal-field">
                                    <label htmlFor="newCodigo">Código</label>
                                    <input
                                        id="newCodigo"
                                        type="text"
                                        value={newCodigo}
                                        onChange={(e) => setNewCodigo(e.target.value)}
                                        placeholder="Código del producto"
                                    />
                                </div>

                                <div className="modal-field">
                                    <label htmlFor="newNombre">Nombre</label>
                                    <input
                                        id="newNombre"
                                        type="text"
                                        value={newNombre}
                                        onChange={(e) => setNewNombre(e.target.value)}
                                        placeholder="Fertilizante XYZ"
                                    />
                                </div>

                                <div className="modal-field">
                                    <label htmlFor="newDescripcion">Descripción</label>
                                    <textarea
                                        id="newDescripcion"
                                        value={newDescripcion}
                                        onChange={(e) => setNewDescripcion(e.target.value)}
                                        placeholder="Producto ideal para cultivos..."
                                    />
                                </div>

                                <div className="modal-field">
                                    <label htmlFor="newPrecio">Precio</label>
                                    <input
                                        id="newPrecio"
                                        type="text"
                                        inputMode="decimal"
                                        value={newPrecio}
                                        onChange={(e) => setNewPrecio(e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className="modal-field">
                                    <label htmlFor="newCategorias">Categorías</label>
                                    <div className="categorias-options">
                                        {categorias.map((categoria) => (
                                        <label
                                            className="categoria-option"
                                            key={categoria.id_categoria}
                                        >
                                            <input
                                            type="checkbox"
                                            value={categoria.id_categoria}
                                            checked={categoriasSeleccionadas.includes(
                                                categoria.id_categoria,
                                            )}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                setCategoriasSeleccionadas([
                                                    ...categoriasSeleccionadas,
                                                    categoria.id_categoria,
                                                ]);
                                                } else {
                                                setCategoriasSeleccionadas(
                                                    categoriasSeleccionadas.filter(
                                                    (id) => id !== categoria.id_categoria,
                                                    ),
                                                );
                                                }
                                            }}
                                            />
                                            <span>{categoria.nombre}</span>
                                        </label>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="guardar-button">
                                    Guardar
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </main>

    );
}