"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getUserBids } from "./utils";

export default function MisPujas() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const token = localStorage.getItem("token-jwt");
        const data = await getUserBids(token);
        setBids(data);
      } catch (error) {
        console.error("Error al obtener las pujas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Mis Pujas</h2>
        {loading ? (
          <p>Cargando pujas...</p>
        ) : bids.length === 0 ? (
          <p>No has realizado ninguna puja.</p>
        ) : (
          <ul className={styles.bidList}>
            {bids.map((bid) => (
              <li key={bid.id} className={styles.bidItem}>
                <strong>Subasta:</strong> {bid.auction_title} <br />
                <strong>Monto:</strong> {bid.amount}€ <br />
                <strong>Fecha:</strong> {new Date(bid.creation_date).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}