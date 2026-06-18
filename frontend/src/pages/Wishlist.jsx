import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as reviewsApi from '../api/reviews';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewsApi.getWishlist()
      .then((res) => setItems(res.data.results || res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-500">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <i className="ti ti-heart text-4xl text-gray-300"></i>
        <h1 className="text-xl font-medium text-gray-900 mt-4">Your wishlist is empty</h1>
        <p className="text-sm text-gray-500 mt-1">Save items you love so you can find them later.</p>
        <Link to="/products" className="inline-block mt-6 bg-black text-white px-5 py-2.5 rounded-lg text-sm hover:bg-gray-800">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-xl font-medium text-gray-900 mb-6">Your wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
        {items.map((item) => {
          const product = item.product || item;
          return (
            <ProductCard
              key={product.id}
              product={product}
              initialWishlisted={true}
              onWishlistChange={(productId, isWishlisted) => {
                if (!isWishlisted) {
                  setItems((prev) => prev.filter((i) => (i.product || i).id !== productId));
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}