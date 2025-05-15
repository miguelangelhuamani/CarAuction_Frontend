export async function fetchCategories() {
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
  
export async function doEditAuction(auctionId, auctionData, accessToken) {
    const response = await fetch(`http://localhost:8000/api/auctions/${auctionId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: auctionData,
    });

    let data = {};
    try {
      data = await response.json();
    } catch (err) {
      console.warn("Respuesta vacía o malformada");
    }

    if (!response.ok) {
      console.error("❌ Error del backend:", data);
      return { error: data };
    }
    return data;

    }


export async function createCategories(nombre, accessToken) {
  const res = await fetch("http://localhost:8000/api/auctions/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: nombre }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || 'Error al crear la categoría');
  }

  return await res.json(); // ← Esto te devuelve la categoría creada
}
