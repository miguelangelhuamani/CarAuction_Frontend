export const getUserProfile = async (token) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/profile/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  
    const data = await response.json();
    return data;
  };
  
export const changeUserPassword = async (token, oldPassword, newPassword) => {
const response = await fetch("http://127.0.0.1:8000/api/users/change-password/", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
    old_password: oldPassword,
    new_password: newPassword,
    }),
});

if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
    errorData.new_password?.[0] ||
    errorData.old_password ||
    "Error desconocido al cambiar la contraseña"
    );
}

return await response.json();
};