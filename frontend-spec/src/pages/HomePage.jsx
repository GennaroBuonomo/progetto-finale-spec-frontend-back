import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("TUTTI");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Errore fetch:", err));

    const localData = localStorage.getItem("my_favorites");
    if (localData) {
      setFavorites(JSON.parse(localData));
    }
  }, []);

  const toggleFav = (p) => {
    let newFavs;
    if (favorites.find((fav) => fav.id === p.id)) {
      newFavs = favorites.filter((fav) => fav.id !== p.id);
    } else {
      newFavs = [...favorites, p];
    }
    setFavorites(newFavs);
    localStorage.setItem("my_favorites", JSON.stringify(newFavs));
  };

  const filtered = products.filter((p) => {
    const mSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const mCat = category === "TUTTI" || p.category === category;
    return mSearch && mCat;
  });

  filtered.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    } else {
      return a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
    }
  });

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Tech Catalog</h1>
        <span className="badge bg-danger fs-6">❤️ Preferiti: {favorites.length}</span>
      </div>

      <div className="row g-2 mb-5">
        <div className="col-md-4"> 
          <input 
            type="text" 
            className="form-control" 
            placeholder="Cerca prodotto..." 
            onChange={(e) => setSearch(e.target.value)} 
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
        {/* Selettore per ordinamento */}
        <div className="col-md-4">
          <select className="form-select" onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ordine A-Z</option>
            <option value="desc">Ordine Z-A</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filtered.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0" style={{borderRadius: "15px", background: "#fdfdfd"}}>
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className="badge bg-primary opacity-75">{p.category}</span>
                  <button onClick={() => toggleFav(p)} className="btn p-0 border-0 fs-4">
                    {favorites.find(f => f.id === p.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <h5 className="card-title fw-bold">{p.title}</h5>

                <div className="mt-auto pt-3">
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