import { useEffect, useState } from "react" ;
import { useParams, Link } from "react-router-dom"; // useParams serve per leggere l'ID dall'indirizzo
import { getProductById } from "../services/api"


function DetailPage() {
  const { id } = useParams(); // Prendo l'ID dalla barra in alto (es: /detail/1)
  const [product, setProduct] = useState(null); // Qui salvo i dati del prodotto
  const [favorites, setFavorites] = useState([]); // All'inizio non abbiamo dati quindi null

useEffect(() => {
  // Scarico i dettagli SOLO di questo prodotto
    getProductById(id).then(dati => {
      setProduct(dati.product);
    });
    // Leggo i preferiti per sapere se mostrare il cuore rosso o bianco
    const localData = JSON.parse(localStorage.getItem("my_favorites")) || [];
     setFavorites(localData);
  }, [id]);


  // La stessa funzione della Home per aggiungere/togliere preferiti
  const toggleFav = (p) => {
    let newFavs;
    if (favorites.find((fav) => fav.id === p.id)) {
      newFavs = favorites.filter((fav) => fav.id !== p.id);
    } else {
      newFavs = [...favorites, p];
    }
    setFavorites(newFavs);
    localStorage.setItem("my_favorites", JSON.stringify(newFavs));

    // Avviso la Navbar
    window.dispatchEvent(new Event("storage"));
  };

  // Finché non ho i dati, mostro la rotellina che gira
if (!product) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="spinner-border text-info" role="status"></div>
      
      <h4 className="mt-3 text-white">Caricamento in corso...</h4>
    </div>
  );
}

  return (
    <div className="container mt-5">
      
      {/* Card Grande per il Dettaglio */}
      <div className="card custom-card p-4 shadow-lg">
        <div className="row">
          
          {/* COLONNA SINISTRA: Immagine */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img 
              src={product.image} 
              alt={product.title} 
              className="img-fluid rounded" 
              style={{ maxHeight: "400px", objectFit: "contain" }} 
            />
          </div>

          {/* COLONNA DESTRA: Informazioni */}
          <div className="col-md-6 mt-4 mt-md-0">
            <span className="category-badge mb-3 d-inline-block">{product.category}</span>
            <button 
                onClick={() => toggleFav(product)} 
                className="btn p-0 border-0 fs-2"
                title="Aggiungi ai preferiti"
              >
                {favorites.find(f => f.id === product.id) ? "❤️" : "🤍"}
            </button>
            <h1 className="fw-bold" style={{ color: "#0d6efd" }}>{product.title}</h1>
            <h3 className="text-primary fw-bold my-3">€ {product.price}</h3>
            
            <p className="lead text-muted">{product.description}</p>

            {/* Specifiche tecniche */}
            <div className="bg-light p-3 rounded mt-4">
              <h5 className="fw-bold mb-3">Scheda Tecnica:</h5>
              <ul className="list-unstyled mb-0">
                <li><strong>Brand:</strong> {product.brand}</li>
                <li><strong>CPU:</strong> {product.cpu}</li>
                <li><strong>RAM:</strong> {product.ram}</li>
                <li><strong>Storage:</strong> {product.storage}</li>
              </ul>
            </div>

            {/* Bottone per tornare indietro */}
            <Link to="/" className="btn btn-outline-dark mt-4">
              ← Torna alla Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DetailPage;