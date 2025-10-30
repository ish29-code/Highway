import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useCart } from '../store/useCart';

export default function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [promo, setPromo] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [exp, setExp] = useState<any>();

  useEffect(() => {
    if (!cart.experienceId) return;
    api.get(`/experiences/${cart.experienceId}`).then((r) => setExp(r.data));
  }, [cart.experienceId]);

  const subtotal = useMemo(() => (exp ? exp.price * (cart.qty || 1) : 0), [exp, cart.qty]);
  const taxes = useMemo(() => Math.round(Math.max(0, subtotal - discount) * 0.059), [subtotal, discount]);
  const total = Math.max(0, subtotal - discount) + taxes;

  const applyPromo = async () => {
    const r = await api.post('/promo/validate', { code: promo.trim().toUpperCase(), subtotal });
    if (r.data.valid) setDiscount(r.data.discount);
    else setDiscount(0);
  };

  const pay = async () => {
    if (!agreed || !exp) return;
    const r = await api.post('/bookings', {
      experienceId: exp._id,
      name,
      email,
      date: cart.date,
      time: cart.time,
      qty: cart.qty
    });
    navigate(`/result?ref=${r.data.refId}&ok=1`);
    cart.clear();
  };

  if (!cart.experienceId) return <div className="container-max px-4 py-6">No item selected.</div>;

  return (
    <div className="container-max px-4 py-6 grid lg:grid-cols-[1fr_360px] gap-8">
      <div className="card p-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="label mb-1">Full name</div>
            <input className="input" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <div className="label mb-1">Email</div>
            <input className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="mt-4 max-w-md flex gap-2">
          <input className="input" placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} />
          <button className="px-4 py-2 rounded bg-black text-white" onClick={applyPromo}>Apply</button>
        </div>
        <label className="flex items-center gap-2 text-sm mt-4">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          I agree to the terms and safety policy
        </label>
      </div>

      <aside className="card h-fit p-5">
        <div className="label">Experience</div>
        <div className="font-medium">{exp?.title}</div>
        <div className="mt-2 grid grid-cols-2 text-sm">
          <div className="label">Date</div><div>{cart.date}</div>
          <div className="label">Time</div><div>{cart.time}</div>
          <div className="label">Qty</div><div>{cart.qty}</div>
        </div>
        <div className="mt-4 flex items-center justify-between"><div className="label">Subtotal</div><div>₹{subtotal}</div></div>
        {discount > 0 && <div className="mt-1 flex items-center justify-between"><div className="label">Discount</div><div>-₹{discount}</div></div>}
        <div className="mt-1 flex items-center justify-between"><div className="label">Taxes</div><div>₹{taxes}</div></div>
        <div className="mt-4 border-t pt-4 flex items-center justify-between"><div className="font-semibold">Total</div><div className="font-semibold">₹{total}</div></div>
        <button disabled={!agreed || !name || !email} className="btn-yellow w-full mt-4" onClick={pay}>Pay and Confirm</button>
      </aside>
    </div>
  );
}
