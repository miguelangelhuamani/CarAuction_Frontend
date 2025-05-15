"use client";

const OrderFilter = ({onChange}) => {
  return (
    <select name="orderFilter" required onChange={(e) => onChange(e.target.value)}>
        <option value="">Ordenar precio</option>
        <option value="asc">Menor a mayor</option>
        <option value="desc">Mayor a menor</option>
    </select>
  );
};

export default OrderFilter;