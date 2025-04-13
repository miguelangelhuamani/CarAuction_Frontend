"use client";

import { useState } from "react";

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
      const response = await fetch(`http://127.0.0.1:8000/api/auctions/${productoId}/bids/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({amount: parseFloat(amount)}),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.detail || data?.non_field_errors?.[0] || "Error al pujar");
      } else {
        setMensaje("¡Puja enviada con éxito!");
        setAmount("");
        setError(null);
      }
    } catch (err) {
      setError("Error de red al enviar la puja.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
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