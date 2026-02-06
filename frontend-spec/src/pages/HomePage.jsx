import { useState, useEffect } from "react";
import { getProducts } from "./services/api";
import { Link } from "react-router-dom"
import './App.css'

function HomePage() {
 const [products, setProducts] = useState([]);

 useEffect(() => {
  //Scarico i dati appena apri la pagina
  getProducts().then(dati => {
    console.log("Dati arrivati:", dati);
    setProducts(dati)
  })
 }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 fw-bold"> I Nostri Prodotti Tech </h1>
      
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">

           {/*Card Animata*/}

            <div className="card custom-card p-3">
              <div className="card-body text-center">
                <h5 className="card-title">{product.title}</h5>
                <span className="category-badge">{product.category}</span>

                <hr className="my-3 opacity-25"/>

               <Link to={`/detail/${product.id}`} className="btn btn-custom w-100 mt-3">
                Vedi Dettagli
              </Link>
                
              </div>
            </div>
          </div>
        ))}        
      </div>
    </div>
  )
}

export default HomePage