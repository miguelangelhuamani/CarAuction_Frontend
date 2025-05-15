"use client";

const CategoryFilter = ({ categories, onChange }) => {
  return (
    <select name="category" required onChange={(e) => onChange(Number(e.target.value))}>
      <option value="">Selecciona una categoría</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;