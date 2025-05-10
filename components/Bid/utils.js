
export async function createBid(productoId, amount, token) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auctions/${productoId}/bids/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Devuelve el error para manejarlo donde se llame
        throw new Error(data?.detail || data?.non_field_errors?.[0] || "Error al pujar");
      }
  
      return data; // Éxito
    } catch (err) {
      throw new Error(err.message || "Error de red al enviar la puja.");
    }
  }
  