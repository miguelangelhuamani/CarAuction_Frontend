// Función para obtener las subastas del usuario
export async function getUserAuctions() {
  const token = localStorage.getItem("token-jwt");

  if (!token) {
    throw new Error("No se ha encontrado un token de autenticación.");
  }

  const response = await fetch("http://127.0.0.1:8000/api/auctions/users/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las subastas.");
  }

  const data = await response.json();
  return data;
}