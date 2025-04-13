export const registerUser = async (userData) => {
    const response = await fetch(
        "https://das-p2-backend.onrender.com/api/users/register/", 
        {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" },
        }
    );

    const data = await response.json();
    
    return data;
    };