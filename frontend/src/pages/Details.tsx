import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import Quantity from '../components/Quantity';
import { useCart } from '../store/useCart';

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState<any>();
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [qty, setQty] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cart = useCart();

  useEffect(() => {
    api.get(`/experiences/${id}`).then((r) => {
      setItem(r.data);
      setDate(r.data.dates?.[0] || '');
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container-max px-4 py-6">Loading…</div>;
  if (!item) return <div className="container-max px-4 py-6">Not found</div>;

  const subtotal = item.price * qty;
  const taxes = Math.round(subtotal * 0.059);
  const total = subtotal + taxes;

  return (
    <div className="container-max px-4 py-6 grid lg:grid-cols-[1fr_360px] gap-8">
      <div>
        <img src={item.image} className="w-full h-80 object-cover rounded-xl" />
        <h1 className="text-2xl font-semibold mt-6">{item.title}</h1>
        <p className="text-brand-subtext mt-2 max-w-3xl">
          {item.description} Helmet and Life jackets along with an expert will accompany in kayaking.
        </p>

        {/* Dates */}
        <div className="mt-6">
          <div className="font-semibold">Choose date</div>
          <div className="flex flex-wrap gap-2 mt-3 ">
            {item.dates.map((d: string) => (
              <button
                key={d}
                onClick={() => setDate(d)}
                className={`px-3 py-1.5 rounded bg-gray-100 ${date === d ? 'bg-brand-yellow text-gray-900 font-medium'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                {new Date(d).toLocaleDateString(undefined, { month: 'short', day: '2-digit' })}
              </button>
            ))}
          </div>
        </div>

        {/* Times */}
        <div className="mt-6">
          <div className="font-semibold">Choose time</div>
          <div className="flex flex-wrap gap-2 mt-3">
            {item.slots.map((s: any) => (
              <button
                key={s.time}
                disabled={s.left === 0}
                onClick={() => setTime(s.time)}
                className={`px-3 py-1.5 rounded bg-gray-100 disabled:opacity-50 ${time === s.time ? 'bg-brand-yellow text-gray-900 font-medium'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                {s.time} {s.left === 0
                  ? <span className="ml-1 text-xs text-red-500">Sold out</span>
                  : <span className="ml-1 text-xs text-brand-subtext">{s.left} left</span>}
              </button>
            ))}
          </div>
          <div className="text-xs text-brand-subtext mt-2">All times are in IST (GMT +5:30)</div>
        </div>

        {/* About */}
        <div className="mt-6">
          <div className="font-semibold mb-2">About</div>
          <div className="bg-gray-100 rounded-lg px-4 py-3 text-sm">{item.about}</div>
        </div>
      </div>

      <aside className="card h-fit p-5">
        <div className="flex items-center justify-between">
          <div className="label">Starts at</div><div className="font-semibold">₹{item.price}</div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="label">Quantity</div><Quantity value={qty} onChange={setQty} />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="label">Subtotal</div><div>₹{subtotal}</div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="label">Taxes</div><div>₹{taxes}</div>
        </div>
        <div className="mt-4 border-t pt-4 flex items-center justify-between">
          <div className="font-semibold">Total</div><div className="font-semibold">₹{total}</div>
        </div>
        <button
          className="btn-yellow w-full mt-4"
          onClick={() => {
            cart.set({ experienceId: item._id, date, time, qty });
            navigate('/checkout');
          }}
          disabled={!date || !time}
        >
          Confirm
        </button>
      </aside>
    </div>
  );
}
