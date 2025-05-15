"use client";

import { useEffect, useState } from "react";
import { getUserAuctions } from "./utils";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function MisSubastas() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    <div className={styles.estilo}>
      <main className={styles.main}>
        <h2>Mis Subastas</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <ul>
            {auctions.length > 0 ? (
              auctions.map((auction) => (
                <div key={auction.id} className={styles.estilo}>
                  <li>Mi subasta: {auction.title}</li>
                  <button onClick={() => router.push(`/detalle/${auction.id}`)}>Ver mi subasta</button>
                </div>               
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