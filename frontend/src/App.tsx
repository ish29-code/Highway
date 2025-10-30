import { Outlet, useNavigate, useSearchParams, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';

export default function App() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get('q') || '';
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar (exact layout) */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="container-max flex items-center justify-between py-3 gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-black grid place-items-center text-white text-xs">hd</div>
            <div className="text-sm font-semibold leading-tight">highway<br/>delite</div>
          </Link>
          <SearchBar defaultValue={q} onSearch={(v) => navigate(`/search?q=${encodeURIComponent(v)}`)} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
