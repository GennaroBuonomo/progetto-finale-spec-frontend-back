import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  // Creo una variabile "isOpen" (acceso/spento) partendo da false (chiuso)
  const [isOpen, setIsOpen] = useState(false);

  // Funzione per invertire lo stato quando clicchiamo
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/"> TechShop </Link>
        
        {/*Al click chiamiamo la nostra funzione toggleMenu */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/*Uso lo stato per aggiungere la classe "show" se isOpen è true */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>
              Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/comparator" onClick={() => setIsOpen(false)}>
              Confronta
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;