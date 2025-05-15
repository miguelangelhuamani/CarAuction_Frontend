export async function doLogout(setToken, setUserName, router) {
    
    if (typeof window !== "undefined") {
      const refreshToken = localStorage.getItem("refresh-token");

      // Llamada para eliminar (blacklistear) el refresh token
      if (refreshToken) {
        try {
          await fetch("http://127.0.0.1:8000/api/users/log-out", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });
        } catch (error) {
          console.error("Error al invalidar el refresh token:", error);
        }
      }

      // Limpiar localStorage y estado
      localStorage.removeItem("token-jwt");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("userName");

      setToken(null);
      setUserName(null);

      // Redirigir al inicio de sesión
      router.push("/inicio");
    }
};