import { Link } from 'react-router-dom';
import Badge from './Badge';

export default function ExperienceCard({ item }: { item: any }) {
  return (
    <div className="card">
      <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold">{item.title}</div>
            <div className="text-xs text-brand-subtext mt-1">{item.description}</div>
          </div>
          <Badge>{item.regionTag || item.location}</Badge>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm"><span className="text-brand-subtext">From</span> <span className="font-semibold">₹{item.price}</span></div>
          <Link to={`/details/${item._id}`} className="btn-yellow text-sm">View Details</Link>
        </div>
      </div>
    </div>
  );
}
