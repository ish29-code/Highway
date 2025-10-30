import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ExperienceCard from '../components/ExperienceCard';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/experiences').then((r) => setItems(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-max px-4 py-6">
      {loading ? (
        <div className="text-center py-20">Loading…</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (<ExperienceCard key={it._id} item={it} />))}
        </div>
      )}
    </div>
  );
}
