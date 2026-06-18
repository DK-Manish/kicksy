import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as productsApi from '../api/products';
import ProductCard from '../components/ProductCard';

const CATEGORY_PILLS = [
  { label: 'All', value: '' },
  { label: 'Running', value: 'running' },
  { label: 'Basketball', value: 'basketball' },
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Limited drops', value: 'limited-drops' },
  { label: 'Kids', value: 'kids' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [limitedDrops, setLimitedDrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    Promise.all([
      productsApi.getFeatured(),
      productsApi.getNewArrivals(),
      productsApi.getLimitedDrops(),
    ])
      .then(([f, n, l]) => {
        setFeatured(f.data.results || f.data);
        setNewArrivals(n.data.results || n.data);
        setLimitedDrops(l.data.results || l.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (featured.length < 2) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % featured.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featured]);

  const heroProduct = featured[heroIndex];

  const filteredNewArrivals = activeCategory
    ? newArrivals.filter((p) => p.category?.slug === activeCategory)
    : newArrivals;

  return (
    <div>
      <section className="bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
              Step into<br />your <span className="text-amber-500">next pair</span>
            </h1>
            <p className="text-gray-600 mt-4">Free delivery on orders over £60</p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/products"
                className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition"
              >
                Shop now
              </Link>
              <Link
                to="/products?on_sale=true"
                className="border border-black px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-100 transition"
              >
                View sale
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full">
            {heroProduct && (
              <Link to={`/products/${heroProduct.slug}`} className="block relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200">
                  {heroProduct.primary_image && (
                    <img
                      key={heroProduct.id}
                      src={heroProduct.primary_image}
                      alt={heroProduct.name}
                      className="w-full h-full object-cover animate-[fadeIn_0.6s_ease]"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="text-white text-xs opacity-80">{heroProduct.brand?.name}</div>
                    <div className="text-white text-sm font-medium">{heroProduct.name}</div>
                  </div>
                </div>
                {featured.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-3">
                    {featured.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.preventDefault();
                          setHeroIndex(i);
                        }}
                        aria-label={`Show featured product ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === heroIndex ? 'w-6 bg-amber-500' : 'w-1.5 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </Link>
            )}
          </div>
        </div>
      </section>

      {limitedDrops.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-black rounded-2xl px-6 py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-white text-xl font-medium">Limited drop — {limitedDrops[0]?.name}</h2>
              <p className="text-gray-400 text-sm mt-1">Don't miss out. Shop the latest exclusive release.</p>
            </div>
            <Link
              to="/products?limited_drop=true"
              className="bg-amber-500 text-black px-5 py-2.5 rounded-md text-sm font-medium whitespace-nowrap hover:bg-amber-400 transition"
            >
              Shop limited drops
            </Link>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Trending now</h2>
          <Link to="/products?featured=true" className="text-sm text-amber-600 hover:underline">
            See all
          </Link>
        </div>
        {loading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">New arrivals</h2>
          <Link to="/products?new_arrival=true" className="text-sm text-amber-600 hover:underline">
            See all
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-2">
          {CATEGORY_PILLS.map((pill) => (
            <button
              key={pill.value}
              onClick={() => setActiveCategory(pill.value)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs border transition-colors ${
                activeCategory === pill.value
                  ? 'bg-black text-white border-black'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {loading ? (
          <ProductGridSkeleton />
        ) : filteredNewArrivals.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredNewArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-8 text-center">
            No new arrivals in this category yet.
          </p>
        )}
      </section>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}