import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            kick<span className="text-amber-500">sy</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/products?gender=men" className="hover:text-amber-500 transition">Men</Link>
            <Link to="/products?gender=women" className="hover:text-amber-500 transition">Women</Link>
            <Link to="/products?gender=kids" className="hover:text-amber-500 transition">Kids</Link>
            <Link to="/products?on_sale=true" className="hover:text-amber-500 transition">Sale</Link>
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sneakers..."
              className="w-full px-3 py-1.5 rounded-l-md text-black text-sm focus:outline-none"
            />
            <button type="submit" className="bg-amber-500 px-3 rounded-r-md text-black text-sm">
              Search
            </button>
          </form>

          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="hover:text-amber-500 transition" aria-label="Wishlist">
              <i className="ti ti-heart text-xl"></i>
            </Link>
            <Link to="/cart" className="relative hover:text-amber-500 transition" aria-label="Cart">
              <i className="ti ti-shopping-cart text-xl"></i>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="hover:text-amber-500 transition" aria-label="Account">
                  <i className="ti ti-user text-xl"></i>
                </button>
                <div className="absolute right-0 top-full w-44 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <div className="px-4 py-2 text-xs text-gray-500 border-b">{user?.email}</div>
                  <Link to="/account" className="block px-4 py-2 text-sm hover:bg-gray-100">My account</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">My orders</Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100">Admin dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hover:text-amber-500 transition" aria-label="Login">
                <i className="ti ti-user text-xl"></i>
              </Link>
            )}

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <i className="ti ti-menu-2 text-xl"></i>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-800 flex flex-col gap-3 text-sm">
            <Link to="/products?gender=men" onClick={() => setMenuOpen(false)}>Men</Link>
            <Link to="/products?gender=women" onClick={() => setMenuOpen(false)}>Women</Link>
            <Link to="/products?gender=kids" onClick={() => setMenuOpen(false)}>Kids</Link>
            <Link to="/products?on_sale=true" onClick={() => setMenuOpen(false)}>Sale</Link>
          </div>
        )}
      </div>
    </header>
  );
}