export default function Quantity({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <button aria-label="decrease" className="w-6 h-6 grid place-items-center bg-gray-200 rounded" onClick={() => onChange(Math.max(1, value - 1))}>-</button>
      <div className="w-6 text-center">{value}</div>
      <button aria-label="increase" className="w-6 h-6 grid place-items-center bg-gray-200 rounded" onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}
