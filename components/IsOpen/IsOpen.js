"use client";

const IsOpen = ({onChange }) => {
  return (
    <select name="isOpen" required onChange={(e) => onChange(e.target.value)}>
      <option value="">Filtrar por abierta o cerrada</option>
      <option value={true}>Abierta</option>
      <option value={false}>Cerrada</option>
    </select>
  );
};

export default IsOpen;
