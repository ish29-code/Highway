/*import { Outlet, useNavigate, useSearchParams, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import { assets } from './assets/assets';

export default function App() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get('q') || '';
  return (
    <div className="min-h-screen bg-white">
      
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="container-max flex items-center justify-between py-3 gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.HD} alt="" />
          </Link>
          <SearchBar defaultValue={q} onSearch={(v) => navigate(`/search?q=${encodeURIComponent(v)}`)} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
*/

import { Outlet, useNavigate, useSearchParams, Link } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import { assets } from './assets/assets';


export default function App() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get('q') || '';

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.HD} alt="Highway Delite Logo" className="h-12 w-auto" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <SearchBar
              defaultValue={q}
              onSearch={(v) => navigate(`/search?q=${encodeURIComponent(v)}`)}
            />
          </div>
        </div>
      </header>

      {/* Main page content */}
      <main className="pt-4">
        <Outlet />
      </main>
    </div>
  );
}
