"use client";

const CategorySelect = ({ categories, category, setCategory, newCategory, setNewCategory}) => {
  return (
    <>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value = "">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
        <option value="nueva"> Crear nueva categoría </option>
      </select>

      {category === "nueva" && (
        <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Nombre nueva categoría" required/>
      )}

    </>
  );
};

export default CategorySelect;
