"use client";

import { useState } from "react";
import { createBid } from "./utils";

const Bid = ({ productoId }) => {
  const [amount, setAmount] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token-jwt");
    if (!token) {
      setError("Debes estar autenticado para pujar.");
      return;
    }

    try {
      await createBid(productoId, amount, token);
      setMensaje("¡Puja enviada con éxito!");
      setAmount("");
      setError(null);
    } catch (err) {
      setError(err.message);
      setMensaje(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
    >
      <input
        type="number"
        step="0.01"
        placeholder="Introduce tu puja (€)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Pujar</button>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default Bid;
