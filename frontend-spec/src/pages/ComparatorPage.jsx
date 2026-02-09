import { useState, useEffect } from "react";
import "./ComparatorPage.css"; 

export default function ComparatorPage() {
  const [products, setProducts] = useState([]); // Lista di tutti i prodotti scaricati dal server
  const [productOne, setProductOne] = useState(null); // Oggetto completo del prodotto a Sinistra
  const [productTwo, setProductTwo] = useState(null); // Oggetto completo del prodotto a Destra


  
  const fullDetails = {
    1: { cpu: "A17 Pro", ram: "8GB", storage: "128GB", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600", price: 1239, brand: "Apple" },
    2: { cpu: "Exynos 2400", ram: "8GB", storage: "256GB", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600", price: 929, brand: "Samsung" },
    3: { cpu: "Tensor G3", ram: "8GB", storage: "128GB", image: "https://images.unsplash.com/photo-1697355360151-2866de32ad4d?q=80&w=1170&auto=format&fit=crop&q=80", price: 799, brand: "Google" },
    4: { cpu: "M2", ram: "8GB", storage: "256GB", image: "https://images.unsplash.com/photo-1659135890064-d57187f0946c?q=80&w=1170&auto=format&fit=crop&q=80", price: 1299, brand: "Apple" },
    5: { cpu: "Intel i7", ram: "16GB", storage: "512GB", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600", price: 1100, brand: "Dell" },
    6: { cpu: "M2", ram: "8GB", storage: "128GB", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600",price: 1069, brand: "Apple" },
    7: { cpu: "Snapdragon 8 Gen 2", ram: "12GB", storage: "256GB", image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=600", price: 899, brand: "Samsung" },
    8: { cpu: "Snapdragon 8 Gen 3", ram: "12GB", storage: "256GB", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600", price: 999, brand: "Xiaomi" },
    9: { cpu: "AMD Ryzen 9", ram: "32GB", storage: "1TB", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600", price: 1800, brand: "Asus" },
    10: { cpu: "Snapdragon 870", ram: "8GB", storage: "256GB", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600", price: 899, brand: "Lenovo" }
  };

  
  useEffect(() => {
    // Parte una sola volta all'avvio del componente ([] vuoto)
    fetch("http://localhost:3001/products")
      .then(res => res.json()) // Trasforma la risposta in JSON
      .then(data => setProducts(data)) // Salva i dati nello stato 'products'
      .catch(err => console.error("Errore fetch:", err)); // Gestisce eventuali errori
  }, []);

  const handleSelectOne = (e) => {
    const id = parseInt(e.target.value);
    const baseInfo = products.find(p => p.id === id); 
    
    if (baseInfo) {
      setProductOne({ ...baseInfo, ...fullDetails[id] });
    } else {
      setProductOne(null); 
    }
  };


  const handleSelectTwo = (e) => {
    const id = parseInt(e.target.value);
    const baseInfo = products.find(p => p.id === id);
    
    if (baseInfo) {
      setProductTwo({ ...baseInfo, ...fullDetails[id] });
    } else {
      setProductTwo(null);
    }
  };
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
    <div className="comparator-page">
      <div className="container pt-5">
        <h1 className="text-center mb-5 fw-bold neon-title">COMPARATORE DI PRODOTTI</h1>
        
        {/* --- ZONA INPUT (Menu a tendina) --- */}
        <div className="row mb-5 justify-content-center">
          
          {/* Menu Sinistra */}
          <div className="col-md-5 custom-select-wrapper">
            <label>Sfidante 1</label>
            <select className="custom-select" onChange={handleSelectOne}>
              <option value="">-- Seleziona Prodotto --</option>
              {/* Creo le opzioni dinamicamente mappando l'array 'products' */}
              {products.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </div>

          {/* Scritta VS centrale */}
          <div className="col-md-2 d-flex align-items-center justify-content-center">
             <h2 className="text-white fw-bold mt-4" style={{opacity: 0.5}}>VS</h2>
          </div>

          {/* Menu Destra */}
          <div className="col-md-5 custom-select-wrapper">
            <label>Sfidante 2</label>
            <select className="custom-select" onChange={handleSelectTwo}>
              <option value="">-- Seleziona Prodotto --</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </div>
        </div>

        {/* Mostro la tabella SOLO SE entrambi i prodotti sono stati selezionati */}
        {productOne && productTwo ? (
          <div className="glass-table-container">
            <table className="custom-table text-center">
              <thead>
                <tr>
                  <th style={{padding: "15px"}}>Caratteristiche</th>
                  {/* Titoli delle colonne dinamici */}
                  <th style={{color: "#00d2ff"}}>{productOne.title}</th>
                  <th style={{color: "#00d2ff"}}>{productTwo.title}</th>
                </tr>
              </thead>
              <tbody>
                {/* Immagini */}
                <tr>
                  <td className="fw-bold text-uppercase small" style={{color: "#00d2ff"}}>Image</td>
                  <td><img src={productOne.image} className="product-img" alt="p1" /></td>
                  <td><img src={productTwo.image} className="product-img" alt="p2" /></td>
                </tr>
                {/* Brand */}
                <tr>
                  <td className="fw-bold">Brand</td>
                  <td>{productOne.brand}</td>
                  <td>{productTwo.brand}</td>
                </tr>
                {/* CPU */}
                <tr>
                  <td className="fw-bold">CPU</td>
                  <td>{productOne.cpu}</td>
                  <td>{productTwo.cpu}</td>
                </tr>
                {/* RAM */}
                <tr>
                  <td className="fw-bold">RAM</td>
                  <td>{productOne.ram}</td>
                  <td>{productTwo.ram}</td>
                </tr>
                {/* Prezzo */}
                <tr>
                  <td className="fw-bold">Prezzo</td>
                  <td className="price-tag">€ {productOne.price}</td>
                  <td className="price-tag">€ {productTwo.price}</td>
                </tr>
              </tbody>
            </table>

            {/* --- BOX VINCITORE (Logica Ternaria) --- */}
            <div className="mt-4 text-center">
              <div className="winner-box shadow">
                 Miglior prezzo: {
                   // Se il prezzo di 1 è minore di 2, vince 1, altrimenti vince 2
                   productOne.price < productTwo.price ? productOne.title : productTwo.title
                 }
              </div>
            </div>
          </div>
        ) : (
          // --- MESSAGGIO DI ATTESA (Se non ho scelto 2 prodotti) ---
          <div className="text-center text-white mt-5 opacity-50">
            <h3>Seleziona due prodotti per iniziare il duello!</h3>
          </div>
        )}
      </div>
    </div>
  );
}