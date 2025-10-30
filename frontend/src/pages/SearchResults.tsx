import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../lib/api';
import ExperienceCard from '../components/ExperienceCard';

export default function SearchResults() {
  const [params] = useSearchParams();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const q = params.get('q') || '';

  useEffect(() => {
    setLoading(true);
    api.get('/experiences', { params: { q } }).then((r) => setItems(r.data)).finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="container-max px-4 py-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? <div className="col-span-full text-center py-20">Searching…</div> : items.map((it) => <ExperienceCard key={it._id} item={it} />)}
      </div>
    </div>
  );
}
