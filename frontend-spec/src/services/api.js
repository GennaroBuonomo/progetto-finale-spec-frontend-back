const API_URL = "http://localhost:3001";

// Funzione per prendere la lista dei prodotti
export async function getProducts() {
  try{
    const response = await fetch(`${API_URL}/products`);
    if(!response.ok) throw new Error("Errore nel caricamento");
    return await response.json();
  } catch(error){
    console.error("Errore!", error);
    return[];
  } 
}

// Funzione per prendere un singolo prodotto (per il dettaglio)
export async function getProductById(id) {
  try{
    const response = await fetch(`${API_URL}/products/${id}`);
    if(!response.ok) throw new Error("Non trovato");
    return await response.json()    
  }catch(error){
    console.error("Errore!", error)
    return null
  }
}