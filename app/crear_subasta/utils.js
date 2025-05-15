export const docreateAuction = async (auctionData, accessToken) => {
    const response = await fetch("http://127.0.0.1:8000/api/auctions/", {
      method: "POST",
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
  };
  

  // utils.js

export async function fetchCategories(name) {
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