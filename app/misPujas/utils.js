export async function getUserBids(token) {
    const response = await fetch("http://127.0.0.1:8000/api/auctions/bids/users/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("No se pudieron obtener las pujas del usuario.");
    }
  
    return await response.json();
  }