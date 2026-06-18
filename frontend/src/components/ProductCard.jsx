import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as reviewsApi from '../api/reviews';

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  const [wishlisted, setWishlisted] = useState(false);
  const hasDiscount = product.discount_percent > 0;

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    try {
      const res = await reviewsApi.toggleWishlist(product.slug);
      setWishlisted(res.data.status === 'added');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
        {product.primary_image ? (
          <img
            src={product.primary_image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}

        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full z-10">
            -{product.discount_percent}%
          </span>
        )}
        {product.is_new_arrival && !hasDiscount && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-medium px-2 py-0.5 rounded-full z-10">
            New
          </span>
        )}

        <button
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 flex items-center justify-center text-sm transition-all duration-200
            ${wishlisted ? 'opacity-100 translate-y-0 text-red-500' : 'opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 text-gray-500'}`}
        >
          <i className={wishlisted ? 'ti ti-heart-filled' : 'ti ti-heart'}></i>
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-[11px] text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          View details
        </div>
      </div>

      <div className="text-[10px] uppercase tracking-wide text-gray-500">
        {product.brand?.name}
      </div>
      <h3 className="text-sm font-medium text-gray-900 leading-snug mt-0.5">
        {product.name}
      </h3>

      {product.review_count > 0 && (
        <div className="flex items-center gap-1 mt-1 text-xs">
          <span className="text-amber-500">★</span>
          <span className="text-gray-700">{product.average_rating}</span>
          <span className="text-gray-400">({product.review_count})</span>
        </div>
      )}

      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-medium text-gray-900">
          £{product.discounted_price}
        </span>
        {hasDiscount && (
          <span className="text-xs text-gray-400 line-through">
            £{product.price}
          </span>
        )}
      </div>
    </Link>
  );
}