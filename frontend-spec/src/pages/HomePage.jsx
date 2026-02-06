import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    // 1. Carichiamo i prodotti dal server
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching data", err));

    // 2. Carichiamo i preferiti dal PC dell'utente
    const savedFavs = JSON.parse(localStorage.getItem("my_favorites")) || [];
    setFavorites(savedFavs);
  }, []);

  // Funzione per il Cuore (Aggiungi/Rimuovi)
  const handleFavorite = (product) => {
    let updated;
    const isFav = favorites.find((f) => f.id === product.id);
    if (isFav) {
      updated = favorites.filter((f) => f.id !== product.id);
    } else {
      updated = [...favorites, product];
    }
    setFavorites(updated);
    localStorage.setItem("my_favorites", JSON.stringify(updated));
  };

  // Filtro semplice per la ricerca e categoria
  const displayProducts = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="container mt-5 px-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold m-0">Tech Catalog</h1>
        <div className="bg-danger text-white px-3 py-2 rounded-pill shadow-sm">
          ❤️ Favorites: <strong>{favorites.length}</strong>
        </div>
      </div>

      {/* FILTERS */}
      <div className="row g-3 mb-5 p-4 bg-light rounded-4 shadow-sm border">
        <div className="col-md-6">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="form-control border-0 shadow-none bg-white py-2"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select className="form-select border-0 shadow-none bg-white py-2" onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="row">
        {displayProducts.map((p) => {
          const isFavorite = favorites.find((f) => f.id === p.id);
          return (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm custom-card-style">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="badge bg-soft-primary text-primary px-3 py-2">
                      {p.category}
                    </span>
                    <button 
                      className="btn p-0 border-0" 
                      onClick={() => handleFavorite(p)}
                      style={{ fontSize: "1.5rem", lineHeight: 1 }}
                    >
                      {isFavorite ? "❤️" : "🤍"}
                    </button>
                  </div>
                  
                  <h4 className="card-title fw-bold text-dark mb-4">{p.title}</h4>
                  
                  <div className="mt-auto">
                    <Link to={`/detail/${p.id}`} className="btn btn-dark w-100 py-2 rounded-3 shadow-sm fw-semibold">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .bg-soft-primary { background-color: #e7f1ff; }
        .custom-card-style {
          transition: transform 0.2s ease, shadow 0.2s ease;
          border-radius: 20px;
        }
        .custom-card-style:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .btn-dark { background-color: #1a1a1a; }
      `}</style>
    </div>
  );
}