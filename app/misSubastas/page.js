"use client";

import { useEffect, useState } from "react";
import { getUserAuctions } from "./utils";
import styles from "./page.module.css";

export default function MisSubastas() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserAuctions() {
      try {
        const data = await getUserAuctions();
        setAuctions(data);
      } catch (error) {
        console.error("Error al obtener las subastas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAuctions();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Mis Subastas</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul>
            {auctions.length > 0 ? (
              auctions.map((auction) => (
                <li key={auction.id}>
                  <h3>{auction.title}</h3>
                  <p>{auction.description}</p>
                  <p>Cierre: {auction.closing_date}</p>
                </li>
              ))
            ) : (
              <p>No tienes subastas creadas.</p>
            )}
          </ul>
        )}
      </main>
    </div>
  );
}