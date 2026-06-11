import './Dashboard.css';

type DashboardProps = {
  correoElectronico: string;
  onLogout: () => void;
  abrirCategorias: () => void;
  abrirProductos: () => void;
};


export function Dashboard({ correoElectronico, onLogout, abrirCategorias, abrirProductos }: DashboardProps) {
    return (
        <main className="dashboard-page">
        <section className="dashboard-panel">
            <header className="dashboard-header">
            <div>
                <span className="dashboard-title">CATÁLOGO</span>
                <h1>Panel Administrativo</h1>
                <p>Bienvenido, {correoElectronico}</p>
            </div>

            <button className="logout-button" type="button" onClick={onLogout}>
                Cerrar sesión
            </button>
            </header>

            <section className="dashboard-menu">
            <button className="dashboard-option" type="button" onClick={abrirProductos}>
                <span>Productos</span>
                <p>Gestionar el catálogo de productos disponibles.</p>
            </button>

            <button className="dashboard-option" type="button" onClick={abrirCategorias}>
                <span>Categorías</span>
                <p>Registrar y modificar categorías de productos.</p>
            </button>
            </section>
        </section>
        </main>
    );
}