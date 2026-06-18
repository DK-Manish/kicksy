import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { path: '/admin/orders', label: 'Orders', icon: 'ti-package' },
    { path: '/admin/products', label: 'Products', icon: 'ti-shoe' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-xl font-medium text-gray-900 mb-6">Admin dashboard</h1>
      <div className="flex gap-8">
        <aside className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className={`ti ${item.icon} text-base`}></i>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}