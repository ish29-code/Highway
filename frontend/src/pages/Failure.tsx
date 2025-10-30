import { Link } from 'react-router-dom';

export default function Failure() {
  return (
    <div className="container-max px-4 py-24 text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-red-500 grid place-items-center text-white text-3xl">!</div>
      <h1 className="text-2xl font-semibold mt-6">Payment Failed</h1>
      <Link to="/" className="mt-6 inline-block px-4 py-2 bg-gray-200 rounded">Back to Home</Link>
    </div>
  );
}
