"use client";


import { useState, useEffect} from "react";
import styles from "./page.module.css";
import createWallet from "./utils";
import { useRouter } from "next/navigation";


export default function IntroduceWalletPage(){

    const [token, setToken] = useState(null);
    const router = useRouter();
    const [error, setError] = useState("");
 

    useEffect(()=>{
        setToken(localStorage.getItem("token-jwt"))
    }, [])

    const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const cardNumber = formData.get("cardNumber");
    setError("");

    try {
        await createWallet(token, cardNumber);
        router.push("/perfil");
    } catch (err) {
        console.log(err);
        setError(err.message);
    }
    };
        
    
    return(
        <div className= {styles.main}>
            <h3>Introduzca un método de pago</h3>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <input className = {styles.cardnumber}  name = "cardNumber" type = "text" placeholder="Introduzca el número de la tarjeta"></input>
                <button className={styles.submitButton} type = "submit">Enviar</button>
                {error?(<p>Error: {error}</p>):(<></>)}
            </form>
        </div>
    )
}