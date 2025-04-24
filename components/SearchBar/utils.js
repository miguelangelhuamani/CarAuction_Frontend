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

export const fetchProducts = async (category, searchTerm) => {
  try {
    let url = "http://127.0.0.1:8000/api/auctions";

    const queryParams = new URLSearchParams();
    if (category) {
      queryParams.append("category", category);
    }

    if (searchTerm) {
      queryParams.append("search", searchTerm);
    }


    const response = await fetch(`${url}?${queryParams.toString()}`);

    if (!response.ok)
      return [];

    const data = await response.json();
    return data.results;

  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};
