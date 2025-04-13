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