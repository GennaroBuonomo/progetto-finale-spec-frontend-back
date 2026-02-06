import { useState, useEffect } from "react";
import "./ComparatorPage.css"; 

export default function ComparatorPage() {
  const [products, setProducts] = useState([]);
  const [productOne, setProductOne] = useState(null);
  const [productTwo, setProductTwo] = useState(null);

  // DATI COMPLETI (I tuoi dati per riempire i buchi del server)
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

  // FETCH DIRETTA
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Errore fetch:", err));
  }, []);

  const handleSelectOne = (e) => {
    const id = parseInt(e.target.value);
    const baseInfo = products.find(p => p.id === id);
    if (baseInfo) setProductOne({ ...baseInfo, ...fullDetails[id] });
    else setProductOne(null);
  };

  const handleSelectTwo = (e) => {
    const id = parseInt(e.target.value);
    const baseInfo = products.find(p => p.id === id);
    if (baseInfo) setProductTwo({ ...baseInfo, ...fullDetails[id] });
    else setProductTwo(null);
  };

  return (
    <div className="comparator-page">
      <div className="container pt-5">
        <h1 className="text-center mb-5 fw-bold neon-title">COMPARATORE DI PRODOTTI</h1>
        
        <div className="row mb-5 justify-content-center">
          {/* SELEZIONE PRODOTTO 1 */}
          <div className="col-md-5 custom-select-wrapper">
            <label>Sfidante 1</label>
            <select className="custom-select" onChange={handleSelectOne}>
              <option value="">-- Seleziona Prodotto --</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </div>

          <div className="col-md-2 d-flex align-items-center justify-content-center">
             <h2 className="text-white fw-bold mt-4" style={{opacity: 0.5}}>VS</h2>
          </div>

          {/* SELEZIONE PRODOTTO 2 */}
          <div className="col-md-5 custom-select-wrapper">
            <label>Sfidante 2</label>
            <select className="custom-select" onChange={handleSelectTwo}>
              <option value="">-- Seleziona Prodotto --</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </div>
        </div>

        {/* TABELLA DI CONFRONTO */}
        {productOne && productTwo ? (
          <div className="glass-table-container">
            <table className="custom-table text-center">
              <thead>
                <tr>
                  <th style={{padding: "15px"}}>Caratteristiche</th>
                  <th style={{color: "#00d2ff"}}>{productOne.title}</th>
                  <th style={{color: "#00d2ff"}}>{productTwo.title}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-bold text-uppercase small" style={{color: "#00d2ff"}}>Image</td>
                  <td><img src={productOne.image} className="product-img" alt="p1" /></td>
                  <td><img src={productTwo.image} className="product-img" alt="p2" /></td>
                </tr>
                <tr>
                  <td className="fw-bold">Brand</td>
                  <td>{productOne.brand}</td>
                  <td>{productTwo.brand}</td>
                </tr>
                <tr>
                  <td className="fw-bold">CPU</td>
                  <td>{productOne.cpu}</td>
                  <td>{productTwo.cpu}</td>
                </tr>
                <tr>
                  <td className="fw-bold">RAM</td>
                  <td>{productOne.ram}</td>
                  <td>{productTwo.ram}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Prezzo</td>
                  <td className="price-tag">€ {productOne.price}</td>
                  <td className="price-tag">€ {productTwo.price}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 text-center">
              <div className="winner-box shadow">
                 Miglior prezzo: {productOne.price < productTwo.price ? productOne.title : productTwo.title}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-white mt-5 opacity-50">
            <h3>Seleziona due prodotti per iniziare il duello!</h3>
          </div>
        )}
      </div>
    </div>
  );
}