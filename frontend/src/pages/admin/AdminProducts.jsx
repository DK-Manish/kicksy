import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    setLoading(true);
    api.get('/products/admin/')
      .then((res) => setProducts(res.data.results || res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function handleDelete(slug, name) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingSlug(slug);
    api.delete(`/products/admin/${slug}/`)
      .then(() => setProducts((prev) => prev.filter((p) => p.slug !== slug)))
      .catch(console.error)
      .finally(() => setDeletingSlug(null));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-medium text-gray-900">All products</h2>
        <Link
          to="/admin/products/new"
          className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-1.5"
        >
          <i className="ti ti-plus text-base"></i>
          Add product
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-gray-500">No products yet.</p>
      ) : (
        <div className="border rounded-xl divide-y overflow-hidden">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {product.images?.[0]?.image && (
                    <img src={product.images[0].image} alt={product.name} className="w-full h-full object-cover" />
                    )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {product.brand?.name} · {product.category?.name}
                </div>
              </div>

              <div className="text-sm text-gray-900 whitespace-nowrap">
                £{product.discounted_price}
                {product.discount_percent > 0 && (
                  <span className="text-xs text-gray-400 line-through ml-1">£{product.price}</span>
                )}
              </div>

              <div className="flex gap-1.5 whitespace-nowrap">
                {product.is_featured && <Badge label="Featured" />}
                {product.is_new_arrival && <Badge label="New" />}
                {product.is_limited_drop && <Badge label="Limited" />}
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap">
                <Link
                  to={`/admin/products/${product.slug}/edit`}
                  className="text-xs text-gray-600 hover:text-black border rounded-md px-3 py-1.5"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.slug, product.name)}
                  disabled={deletingSlug === product.slug}
                  className="text-xs text-red-600 hover:text-red-700 border border-red-200 rounded-md px-3 py-1.5 disabled:opacity-50"
                >
                  {deletingSlug === product.slug ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Badge({ label }) {
  return (
    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
      {label}
    </span>
  );
}