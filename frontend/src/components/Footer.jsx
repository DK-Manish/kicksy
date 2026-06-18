import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="text-white font-medium mb-3">Kicksy</h3>
          <p className="text-gray-500">Step into your next pair. Premium sneakers, delivered fast.</p>
        </div>
        <div>
          <h3 className="text-white font-medium mb-3">Shop</h3>
          <ul className="space-y-2">
            <li><Link to="/products?category=running" className="hover:text-amber-500">Running</Link></li>
            <li><Link to="/products?category=basketball" className="hover:text-amber-500">Basketball</Link></li>
            <li><Link to="/products?category=lifestyle" className="hover:text-amber-500">Lifestyle</Link></li>
            <li><Link to="/products?category=limited-drops" className="hover:text-amber-500">Limited drops</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium mb-3">Help</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-amber-500">Returns</a></li>
            <li><a href="#" className="hover:text-amber-500">Shipping info</a></li>
            <li><a href="#" className="hover:text-amber-500">Size guide</a></li>
            <li><a href="#" className="hover:text-amber-500">Contact us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium mb-3">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-amber-500">About</a></li>
            <li><a href="#" className="hover:text-amber-500">Careers</a></li>
            <li><a href="#" className="hover:text-amber-500">Privacy policy</a></li>
            <li><a href="#" className="hover:text-amber-500">Terms of service</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
        © 2026 Kicksy Ltd. All rights reserved.
      </div>
    </footer>
  );
}