
export const getUserProfile = async (token) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/profile/", 
        {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`},
        }
    );
      
    const data = await response.json();
    return data;
};