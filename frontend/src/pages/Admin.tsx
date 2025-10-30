import { useEffect, useState } from 'react';
import { api, authHeaders } from '../lib/api';

type Slot = { time: string; left: number };
type Experience = {
  _id?: string;
  title: string;
  location: string;
  regionTag?: string;
  price: number;
  description: string;
  about: string;
  dates: string[];
  slots: Slot[];
  image: string;
};

const blank: Experience = {
  title: '',
  location: '',
  regionTag: '',
  price: 0,
  description: '',
  about: '',
  dates: [],
  slots: [],
  image: ''
};

export default function Admin() {
  const [items, setItems] = useState<Experience[]>([]);
  const [form, setForm] = useState<Experience>({ ...blank });
  const [useAuth, setUseAuth] = useState<boolean>(!!localStorage.getItem('bookit_admin_token'));
  const [q, setQ] = useState('');

  const headers = useAuth ? authHeaders() : {};

  const load = async () => {
    const r = await api.get('/experiences', { params: { q } });
    setItems(r.data);
  };

  useEffect(() => { load(); }, [q]);

  const save = async () => {
    if (form._id) {
      const r = await api.put(`/experiences/${form._id}`, form, { headers });
      setForm({ ...blank });
      await load();
      return r.data;
    } else {
      const r = await api.post(`/experiences`, form, { headers });
      setForm({ ...blank });
      await load();
      return r.data;
    }
  };

  const del = async (id?: string) => {
    if (!id) return;
    await api.delete(`/experiences/${id}`, { headers });
    await load();
  };

  const addSlot = () => setForm({ ...form, slots: [...form.slots, { time: '07:00 am', left: 5 }] });
  const addDate = () => setForm({ ...form, dates: [...form.dates, new Date().toISOString().slice(0, 10)] });

  return (
    <div className="container-max px-4 py-6 grid lg:grid-cols-[1fr_420px] gap-8">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <input className="input" placeholder="Search experiences" value={q} onChange={(e) => setQ(e.target.value)} />
          <label className="text-sm flex items-center gap-2">
            <input type="checkbox" checked={useAuth} onChange={(e) => setUseAuth(e.target.checked)} />
            Protected (JWT)
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it._id} className="card">
              <img src={it.image} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="font-semibold">{it.title}</div>
                <div className="text-xs text-brand-subtext">{it.regionTag || it.location}</div>
                <div className="mt-2 text-sm">₹{it.price}</div>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 rounded bg-gray-200" onClick={() => setForm(it)}>Edit</button>
                  <button className="px-3 py-1 rounded bg-red-500 text-white" onClick={() => del(it._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="card p-4 h-fit">
        <h2 className="text-lg font-semibold mb-3">{form._id ? 'Edit Experience' : 'New Experience'}</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <div className="label mb-1">Title</div>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <div className="label mb-1">Location</div>
            <input className="input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div>
            <div className="label mb-1">Region Tag</div>
            <input className="input" value={form.regionTag} onChange={(e) => setForm({ ...form, regionTag: e.target.value })} />
          </div>
          <div>
            <div className="label mb-1">Price</div>
            <input className="input" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} />
          </div>
          <div className="col-span-2">
            <div className="label mb-1">Description</div>
            <input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="col-span-2">
            <div className="label mb-1">About</div>
            <textarea className="input" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
          </div>
          <div className="col-span-2">
            <div className="label mb-1">Image URL</div>
            <input className="input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>
        </div>

        {/* Dates */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Dates</div>
            <button className="px-3 py-1 rounded bg-gray-200" onClick={addDate}>Add Date</button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {form.dates.map((d, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1">
                <input className="bg-transparent outline-none" value={d} onChange={(e) => {
                  const copy = [...form.dates]; copy[i] = e.target.value; setForm({ ...form, dates: copy });
                }} />
                <button className="text-xs" onClick={() => {
                  const copy = [...form.dates]; copy.splice(i, 1); setForm({ ...form, dates: copy });
                }}>✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* Slots */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Slots</div>
            <button className="px-3 py-1 rounded bg-gray-200" onClick={addSlot}>Add Slot</button>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {form.slots.map((s, i) => (
              <div key={i} className="grid grid-cols-3 gap-2">
                <input className="input" value={s.time} onChange={(e) => {
                  const copy = [...form.slots]; copy[i] = { ...copy[i], time: e.target.value }; setForm({ ...form, slots: copy });
                }} />
                <input className="input" type="number" value={s.left} onChange={(e) => {
                  const copy = [...form.slots]; copy[i] = { ...copy[i], left: +e.target.value }; setForm({ ...form, slots: copy });
                }} />
                <button className="px-3 py-2 rounded bg-red-500 text-white" onClick={() => {
                  const copy = [...form.slots]; copy.splice(i, 1); setForm({ ...form, slots: copy });
                }}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-black mt-4" onClick={save}>{form._id ? 'Update' : 'Create'}</button>
      </div>
    </div>
  );
}
