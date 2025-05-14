export const getUserIdFromToken = (token) => {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = atob(payloadBase64);
      const parsedPayload = JSON.parse(decodedPayload);
      return parsedPayload.user_id;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };
  
export const fetchAuctionDetail = async (auctionId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la subasta");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching auction:", error);
      throw error;
    }
  };

export const deleteAuction = async (auctionId, token) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("No se pudo eliminar la subasta");
      }
  
      return true; // Eliminación exitosa
    } catch (error) {
      console.error("Error al eliminar la subasta:", error);
      throw error;
    }
  };

export const createRating = async (auctionId, rating, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/ratings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Detalles del error:", data);
      throw new Error(data?.detail || "Error al crear la valoración");
    }
    return data;
  } catch (error) {
    console.error("Error al crear la valoración:", error);
    throw error;
  }
};

export const getMyRating = async (auctionId, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/my-rating/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });


    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error al obtener la valoración:", error);
    throw error;
  }
}

export const deleteRating = async(auctionId, ratingId, token) => {
  try {
    console.log(auctionId, ratingId);
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/ratings/${ratingId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("No se pudo eliminar la valoración");
    }

  } catch (error) {
    console.error("Error al eliminar la valoración:", error);
    throw error;
  }
}

export const editRating = async(auctionId, ratingId, token, rating) => {
  try {
    console.log(auctionId, ratingId);
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/ratings/${ratingId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      throw new Error("No se pudo editar la valoración");
    }


  } catch (error) {
    console.error("Error al editar la valoración:", error);
    throw error;
  }
}

