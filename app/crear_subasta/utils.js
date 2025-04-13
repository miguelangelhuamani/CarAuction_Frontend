export const docreateAuction = async (auctionData, accessToken) => {
    const response = await fetch("http://127.0.0.1:8000/api/auctions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(auctionData),
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

