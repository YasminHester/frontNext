"use client";

interface ItemChecklistProps {
  nome: string;
  marcado: boolean;
  aoAlterar: () => void;
}

export default function ItemChecklist({
  nome,
  marcado,
  aoAlterar,
}: ItemChecklistProps) {
  return (
    <label className="item-checklist">
      <input
        type="checkbox"
        checked={marcado}
        onChange={aoAlterar}
      />

      <span>{nome}</span>
    </label>
  );
}