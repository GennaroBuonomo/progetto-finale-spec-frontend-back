import { useEffect, useState } from "react" ;
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/api"


function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // All'inizio non abbiamo dati quindi null

useEffect(() => {
    // 1. Vediamo se l'ID arriva dall'URL
    console.log("ID ricevuto dalla URL:", id); 

    getProductById(id).then(dati => {
      // 2. Vediamo cosa risponde il server
      console.log("Dati arrivati dal Server:", dati); 
      setProduct(dati.product);
    });
  }, [id]);

  if (!product) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
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
            <h1 className="fw-bold">{product.title}</h1>
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