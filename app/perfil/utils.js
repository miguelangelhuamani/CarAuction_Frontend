
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


export const updateUserProfile = async (token, formData) => {
    const response = await fetch("http://127.0.0.1:8000/api/users/profile/", 
        {
            method: "PATCH",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            body: JSON.stringify(formData),
        }
    );

    const data = await response.json()
    return data;
}


export const deleteUserAccount = async (token) => {

    const response = await fetch("http://127.0.0.1:8000/api/users/profile/", 
        {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`,},
        }
    );
};