"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, changeUserPassword, getMyWallet} from "./utils";
import styles from "./page.module.css";
import { deposit, withdraw } from "./utils";

export default function PerfilPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    birth_date: "",
    municipality: "",
    locality: "",
    first_name: "",
    last_name: "",
  });

  // Estado para el cambio de contraseña
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [userWallet, setUserWallet] = useState(null);
  const [walletError, setWalletError] = useState("");
  const [walletSuccess, setWalletSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token-jwt");
    setToken(token);

    const getUserWallet = async (token) => {

      const wallet = await getMyWallet(token);
      console.log(wallet)
      setUserWallet(wallet);

    }
    if (token) {
      getUserProfile(token).then((data) => {
        setUserData({
          username: data.username || "",
          email: data.email || "",
          birth_date: data.birth_date || "",
          municipality: data.municipality || "",
          locality: data.locality || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
        });
      });

      getUserWallet(token);

    } else {
      router.push("/inicio");
    }
  }, []);




  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const result = await changeUserPassword(token, oldPassword, newPassword);
      setPasswordSuccess(result.detail);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(err.message || "Error al cambiar la contraseña.");
    }
  };

  const handleDeposit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const amount = formData.get("amount");
      const result = await deposit(token, amount);
      const wallet = await getMyWallet(token);

      setUserWallet(wallet);
      if (result.error) {
        setWalletError(result.error);
      } else {
        setWalletSuccess("Depósito realizado con éxito.");
      }
    };
  const handleWithdrawal = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const amount = formData.get("amount");
      const result = await withdraw(token, amount);
      const wallet = await getMyWallet(token);

      setUserWallet(wallet);
      if (result.error) {
        setWalletError(result.error);
      } else {
        setWalletSuccess("Retiro realizado con éxito.");
      }
    };


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Mi perfil</h2>
        <p><strong>Usuario:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Nombre:</strong> {userData.first_name}</p>
        <p><strong>Apellidos:</strong> {userData.last_name}</p>
        <p><strong>Fecha de nacimiento:</strong> {userData.birth_date}</p>
        <p><strong>Municipio:</strong> {userData.municipality}</p>
        <p><strong>Localidad:</strong> {userData.locality}</p>

        <h3 className={styles.h3Title}>Cambiar contraseña</h3>
        <form onSubmit={handlePasswordChange} className={styles.form}>
        <label>
            Contraseña actual:
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={styles.inputField}
              required
            />
          </label>
          <label>
            Nueva contraseña:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.inputField}
              required
            />
          </label>
          <label>
            Confirmar nueva contraseña:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.inputField}
              required
            />
          </label>
          {passwordError && <p className={styles.error}>{passwordError}</p>}
          {passwordSuccess && <p className={styles.success}>{passwordSuccess}</p>}
          <button type="submit" className={styles.submitButton}>Cambiar contraseña</button>
        </form>
        {userWallet?(
          <div>
            <p>Balance actual en la cuenta {userWallet.balance} </p>
            <form onSubmit={handleDeposit}>
              <input
                type="number"
                name="amount"
                min="0"
                step="0.01"
                placeholder="Cantidad a añadir (€)"
                required
              />
              <button type = "input">Depositar</button>
            </form>

            <form onSubmit = {handleWithdrawal}>
              <input
                type="number"
                name="amount"
                min="0"
                step="0.01"
                placeholder="Cantidad a retirar (€)"
                required
              />
              <button type = "input">Retirar</button>
            </form>
            {walletError && <p className={styles.error}>{walletError}</p>}
            {walletSuccess && <p className={styles.success}>{walletSuccess}</p>}


          </div>):
        (
          <button onClick={()=>router.push("introducir_cartera")}>Añadir método de pago</button>
        )}
      </main>
    </div>
  );
}