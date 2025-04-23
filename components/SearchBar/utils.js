export async function fetchCategories() {
    // Hacer un fetch de las categorías
    try {
      const res = await fetch("http://localhost:8000/api/auctions/categories/");
      const data = await res.json();
  
      // Asegurarse de que data sea un array o contenga uno
      return Array.isArray(data) ? data : data.results || data.categories || [];
    } catch (err) {
      console.error("Error cargando categorías:", err);
      return [];
    }
}

