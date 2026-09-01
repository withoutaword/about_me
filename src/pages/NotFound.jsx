import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => (
  <div className="min-h-screen bg-[var(--bg-color)]">
    <Navbar />
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-[var(--primary-color)]">404</p>
      <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-color)] mt-4">Page Not Found</h1>
      <p className="text-[var(--text-muted)] mt-4">The page you’re looking for does not exist.</p>
      <Link className="primary-cta mt-8" to="/">Back Home</Link>
    </main>
  </div>
);

export default NotFound;
