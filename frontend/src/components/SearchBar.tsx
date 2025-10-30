import { useState } from 'react';

export default function SearchBar({ defaultValue = '', onSearch }: { defaultValue?: string; onSearch: (v: string) => void }) {
  const [v, setV] = useState(defaultValue);
  return (
    <div className="flex items-center gap-2 w-full max-w-xl">
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Search experiences"
        className="flex-1 input"
      />
      <button className="btn-yellow" onClick={() => onSearch(v)}>Search</button>
    </div>
  );
}
