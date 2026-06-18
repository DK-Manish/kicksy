import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as productsApi from '../api/products';
import * as reviewsApi from '../api/reviews';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [adding, setAdding] = useState(false);
  const [addedMessage, setAddedMessage] = useState('');
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setLoading(true);
    setActiveImage(0);
    setSelectedSize(null);
    setAddedMessage('');

    Promise.all([
      productsApi.getProduct(slug),
      productsApi.getRelatedProducts(slug),
      reviewsApi.getProductReviews(slug),
    ])
      .then(([p, r, rv]) => {
        setProduct(p.data);
        setRelated(r.data.results || r.data);
        setReviews(rv.data.results || rv.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!selectedSize) {
      setAddedMessage('Please select a size');
      return;
    }
    setAdding(true);
    try {
      await addItem(product.id, selectedSize.id, 1);
      setAddedMessage('Added to cart');
    } catch (err) {
      setAddedMessage(err.response?.data?.error || 'Could not add to cart');
    } finally {
      setAdding(false);
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      const res = await reviewsApi.toggleWishlist(slug);
      setWishlisted(res.data.status === 'added');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="aspect-square bg-gray-200 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Product not found.</p>
        <Link to="/products" className="text-amber-600 hover:underline text-sm">Back to all products</Link>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [{ image: product.primary_image }];
  const hasDiscount = product.discount_percent > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-xs text-gray-500 mb-6 flex gap-1.5">
        <Link to="/" className="hover:text-gray-800">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-gray-800">Products</Link>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
            <img
              src={images[activeImage]?.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                    i === activeImage ? 'border-amber-500' : 'border-transparent'
                  }`}
                >
                  <img src={img.image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500">{product.brand?.name}</div>
          <h1 className="text-2xl font-semibold text-gray-900 mt-1">{product.name}</h1>

          {product.review_count > 0 && (
            <div className="flex items-center gap-1.5 mt-2 text-sm">
              <span className="text-amber-500">★★★★★</span>
              <span className="text-gray-700">{product.average_rating}</span>
              <span className="text-gray-400">({product.review_count} reviews)</span>
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-semibold text-gray-900">£{product.discounted_price}</span>
            {hasDiscount && (
              <>
                <span className="text-base text-gray-400 line-through">£{product.price}</span>
                <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                  -{product.discount_percent}%
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-5 leading-relaxed">{product.description}</p>

          <div className="mt-6">
            <div className="text-sm font-medium text-gray-900 mb-2">Select size (UK)</div>
            <div className="grid grid-cols-4 gap-2">
              {product.variants?.map((variant) => (
                <button
                  key={variant.id}
                  disabled={!variant.is_in_stock}
                  onClick={() => setSelectedSize(variant)}
                  className={`py-2.5 rounded-md text-sm border transition
                    ${!variant.is_in_stock ? 'opacity-30 cursor-not-allowed line-through' : 'cursor-pointer'}
                    ${selectedSize?.id === variant.id
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-gray-500'}`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          {addedMessage && (
            <div className={`mt-4 text-sm ${addedMessage === 'Added to cart' ? 'text-green-600' : 'text-red-600'}`}>
              {addedMessage}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="flex-1 bg-black text-white py-3.5 rounded-md text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add to cart'}
            </button>
            <button
              onClick={handleWishlist}
              aria-label="Wishlist"
              className={`w-12 h-12 rounded-md border flex items-center justify-center transition
                ${wishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-300 text-gray-500 hover:border-gray-500'}`}
            >
              <i className={wishlisted ? 'ti ti-heart-filled' : 'ti ti-heart'}></i>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t pt-10">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Customer reviews ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">No reviews yet. Be the first to review this product.</p>
        ) : (
          <div className="space-y-6 max-w-2xl">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm text-gray-900">{review.user_full_name}</div>
                  {review.is_verified_purchase && (
                    <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                      Verified purchase
                    </span>
                  )}
                </div>
                <div className="text-amber-500 text-sm mt-1">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                <div className="font-medium text-sm text-gray-900 mt-2">{review.title}</div>
                <p className="text-sm text-gray-600 mt-1">{review.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t pt-10">
          <h2 className="text-lg font-medium text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}