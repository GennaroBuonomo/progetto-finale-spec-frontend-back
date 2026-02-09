import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Serve per aprire il menu sul cellulare"Responsive design"
  const [showFavs, setShowFavs] = useState(false); // Serve per aprire la tendina rossa dei preferiti
  const [favorites, setFavorites] = useState([]); // Qui salvo la lista dei preferiti da mostrare
  const location = useLocation(); // Mi dice in che pagina mi trovo
  
  // Funzione che legge la memoria del browser
  const updateFavorites = () => { 
    const saved = JSON.parse(localStorage.getItem("my_favorites")) || [];
    setFavorites(saved);
  };

  useEffect(() => {
    updateFavorites(); // Leggo i dati appena la pagina carica
      // Se la Home cambia i preferiti, io aggiorno subito la lista qui!
    window.addEventListener("storage", updateFavorites);
    // Pulizia (serve per non lasciare cose aperte quando cambio pagina)
    return () => window.removeEventListener("storage", updateFavorites);
  }, [location]); // Se cambio pagina, ricontrollo per sicurezza 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/"> TechShop </Link>
        
        <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/comparator" onClick={() => setIsOpen(false)}>Confronta</Link>
            </li>

            <li className="nav-item dropdown ms-lg-3" onMouseLeave={() => setShowFavs(false)}>
              <button 
                className="btn btn-danger btn-sm rounded-pill" 
                type="button"
                onClick={() => setShowFavs(!showFavs)}
              >
                ❤️ {favorites.length}
              </button>
              
              <ul className={`dropdown-menu dropdown-menu-end shadow ${showFavs ? "show" : ""}`} 
                  style={{ minWidth: '200px', position: 'absolute', right: 0 }}>
                <li className="dropdown-header fw-bold text-dark">I tuoi preferiti:</li>
                
                {favorites.length === 0 && (
                  <li className="dropdown-item text-muted small">Ancora vuoto...</li>
                )}
    
                {favorites.map(f => (
                  <li key={f.id}>
                    <Link 
                      className="dropdown-item d-flex justify-content-between align-items-center" 
                      to={`/detail/${f.id}`}
                      onClick={() => {
                        setShowFavs(false);
                        setIsOpen(false);
                      }} 
                    >
                      <small>{f.title}</small>
                      <span className="badge bg-light text-dark border">Vai</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;