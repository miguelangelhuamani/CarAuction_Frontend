//Esta función solo es para usuarios ya registrados, tenemos que enviar el token de acceso para autenticar la solicitud


export const docreateAuction = async (auctionData, accessToken) => {
    const response = await fetch("http://127.0.0.1:8000/api/auctions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, //Necesitamos el token de acceso para autenticar la solicitud
      },
      body: JSON.stringify(auctionData),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      return { error: data.detail || "Error al crear la subasta" };
    }
  
    return data;
  };