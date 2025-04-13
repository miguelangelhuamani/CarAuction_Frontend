//Esta función solo es para usuarios ya registrados, tenemos que enviar el token de acceso para autenticar la solicitud
export async function docreateAuction(auctionData, token) {
  try {
    const res = await fetch("http://localhost:8000/api/auctions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(auctionData),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
        console.error("Error del backend:", data);
        return { error: data };
    }

    if (!res.ok) {
      console.error("Error al crear la subasta:", data);
      return { error: "No se pudo crear la subasta", detail: data };
    }

    return data;
  } catch (error) {
    return { error: "Error de red", detail: error };
  }
}

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

