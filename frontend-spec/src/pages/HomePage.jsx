import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorite";

function HomePage() {
// --- LE MEMORIE (STATI) ---
  // Qui salvo i dati che cambiano mentre uso la pagin
  const [products, setProducts] = useState([]); // La lista di tutti i prodotti scaricati
  const [search, setSearch] = useState(""); // Quello che scrivo nella barra di ricerca
  const [category, setCategory] = useState("TUTTI"); // Il filtro (Smartphone, Laptop, ecc.)
  const [sortOrder, setSortOrder] = useState("asc"); // Per ordinare A-Z o Z-A (Ascending)
  const { favorites, toggleFav } = useFavorites();

   // --- ALL'AVVIO DELLA PAGINA ---
  // Questo succede solo una volta, appena apro la Home
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Errore fetch:", err));
  }, []);
   
   // --- I FILTRI ---
  // Prima di mostrare i prodotti, applico i filtri
  const filtered = products.filter((p) => {
    // Controllo se il titolo contiene quello che ho scritto (senza badare alle maiuscole)
    const mSearch = p.title.toLowerCase().includes(search.toLowerCase());
    // Controllo se la categoria è giusta (oppure se ho scelto TUTTI)
    const mCat = category === "TUTTI" || p.category === category;
    return mSearch && mCat; // Il prodotto passa solo se rispetta entrambe le cose
  });

  // --- L'ORDINAMENTO ---
  // Metto in ordine i prodotti rimasti
  filtered.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1; // Dalla A alla Z
    } else {
      return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1; // Dalla Z alla A
    }
  });

   {/*caricamento in corso*/}
  if (products.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <div className="spinner-border text-info" role="status"></div>
        <h4 className="mt-3 text-white">Caricamento prodotti...</h4> 
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Tech Catalog</h1>
      </div>

      <div className="row g-2 mb-5">
        <div className="col-md-4"> 
          <input 
            type="text" 
            className="form-control" 
            placeholder="Cerca prodotto..." 
            onChange={(e) => setSearch(e.target.value)}  // Salvo quello che scrivo
          />
        </div>
        <div className="col-md-4"> 
          <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
            <option value="TUTTI">Tutte le categorie</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-select" onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ordine A-Z</option>
            <option value="desc">Ordine Z-A</option>
          </select>
        </div>
      </div>

      <div className="row">
        {/* Disegno le Card dei prodotti filtrati */}
        {filtered.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0" style={{borderRadius: "15px", background: "#fdfdfd"}}>
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className="badge bg-primary opacity-75">{p.category}</span>
                  {/* Tasto cuore: cambia icona se è nei preferiti o no */}
                  <button onClick={() => toggleFav(p)} className="btn p-0 border-0 fs-4">
                    {favorites.find(f => f.id === p.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <h5 className="card-title fw-bold">{p.title}</h5>

                <div className="mt-auto pt-3">
                  {/* Link che porta alla pagina di dettaglio */}
                  <Link to={`/detail/${p.id}`} className="btn btn-outline-dark w-100 rounded-pill">
                    Vedi Dettagli
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;