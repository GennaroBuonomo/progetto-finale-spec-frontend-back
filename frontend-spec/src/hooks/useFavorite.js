// src/hooks/useFavorites.js
import { useState, useEffect } from "react";

export function useFavorites() {
  // Stato interno del hook
  const [favorites, setFavorites] = useState([]);

  // Al caricamento leggo il LocalStorage
  useEffect(() => {
    // Creo una funzione che legge i dati e aggiorna lo stato
    const updateState = () => {
      const localData = localStorage.getItem("my_favorites");
      if (localData) {
        setFavorites(JSON.parse(localData));
      } else {
        setFavorites([]); // Se è vuoto, resetto a array vuoto
      }
    };

    // La eseguo subito appena il componente viene montato
    updateState();

    // Mi metto in ASCOLTO: se qualcuno (Home o Dettaglio) lancia l'evento "storage"
    window.addEventListener("storage", updateState);
    
    // Pulizia: quando chiudo il componente, smetto di ascoltare (per evitare errori)
    return () => window.removeEventListener("storage", updateState);
  }, []);

  // La funzione di aggiunge/rimuove
  const toggleFav = (product) => {
    let newFavs;
    const isPresent = favorites.find((fav) => fav.id === product.id);

    if (isPresent) {
      // Se c'è lo tolgo
      newFavs = favorites.filter((fav) => fav.id !== product.id);
    } else {
      // Se non c'è lo aggiungo
      newFavs = [...favorites, product];
    }

    // Aggiorno lo stato e il LocalStorage
    setFavorites(newFavs);
    localStorage.setItem("my_favorites", JSON.stringify(newFavs));
    
    // Mando l'evento per aggiornare la Navbar
    window.dispatchEvent(new Event("storage"));
  };

  // Restituisco sia la lista che la funzione
  return { favorites, toggleFav };
}