"use client";

import { useEffect, useState } from "react";
import {fetchComments, createComment, deleteComment, updateComment, getUserIdFromToken,} from "./utils";

const Comment = ({ productoId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const [editando, setEditando] = useState(null);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoTexto, setNuevoTexto] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token-jwt");
    if (t) {
      setToken(t);
      setUserId(getUserIdFromToken(t));
    }
    fetchComments(productoId).then(setComentarios).catch((err) => setError(err.message));
  }, [productoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment(productoId, { title: titulo, content: texto }, token);
      setTitulo("");
      setTexto("");
      const data = await fetchComments(productoId);
      setComentarios(data);
      setMensaje("Comentario enviado con éxito");
      setTimeout(() => setMensaje(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment(id, token);
      const data = await fetchComments(productoId);
      setComentarios(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (comentario) => {
    setEditando(comentario.id);
    setNuevoTitulo(comentario.title);
    setNuevoTexto(comentario.content);
  };

  const handleUpdate = async () => {
    try {
      await updateComment(editando, { title: nuevoTitulo, content: nuevoTexto }, token);
      const data = await fetchComments(productoId);
      setComentarios(data);
      setEditando(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 style={{ marginBottom: "1rem" }}>Comentarios</h3>

      {token && (
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px", marginBottom: "2rem" }}>
          <input
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
          <textarea
            placeholder="Escribe tu comentario..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
            rows={4}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
          <button type="submit">Enviar</button>
        </form>
      )}

      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {Array.isArray(comentarios) && comentarios.length === 0 && <p>No hay comentarios aún.</p>}

      <ul style={{ listStyle: "none", padding: 0, width: "100%", maxWidth: "600px" }}>
        {Array.isArray(comentarios) &&
          comentarios.map((c) => (
            <li
              key={c.id}
              style={{backgroundColor: "#111",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "0.5rem",
                color: "#fff",
              }}
            >
              {editando === c.id ? (
                <>
                  <input
                    value={nuevoTitulo}
                    onChange={(e) => setNuevoTitulo(e.target.value)}
                    style={{ width: "100%", marginBottom: "0.5rem" }}
                  />
                  <textarea
                    value={nuevoTexto}
                    onChange={(e) => setNuevoTexto(e.target.value)}
                    rows={3}
                    style={{ width: "100%", marginBottom: "0.5rem" }}
                  />
                  <button onClick={handleUpdate}>Guardar</button>
                  <button onClick={() => setEditando(null)} style={{ marginLeft: "0.5rem" }}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <strong style={{ fontSize: "1rem" }}>{c.title}</strong> por <em>{c.user}</em>
                  <p style={{ marginTop: "0.5rem" }}>{c.content}</p>
                  {userId && userId === c.user_id && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <button onClick={() => handleDelete(c.id)}>Borrar</button>
                      <button onClick={() => startEdit(c)} style={{ marginLeft: "0.5rem" }}>
                        Editar
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
      </ul>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Comment;
