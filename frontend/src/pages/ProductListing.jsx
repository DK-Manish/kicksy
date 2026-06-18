import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as productsApi from '../api/products';
import ProductCard from '../components/ProductCard';

export default function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const gender = searchParams.get('gender') || '';
  const size = searchParams.get('size') || '';
  const minPrice = searchParams.get('min_price') || '';
  const maxPrice = searchParams.get('max_price') || '';
  const onSale = searchParams.get('on_sale') || '';
  const ordering = searchParams.get('ordering') || '';

  useEffect(() => {
    productsApi.getCategories().then((res) => setCategories(res.data.results || res.data));
    productsApi.getBrands().then((res) => setBrands(res.data.results || res.data));
  }, []);

  const [facets, setFacets] = useState({ categories: {}, brands: {} });

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    productsApi.getFacets(params).then((res) => setFacets(res.data));
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params = Object.fromEntries(searchParams.entries());
    productsApi.getProducts(params)
      .then((res) => {
        setProducts(res.data.results || res.data);
        setCount(res.data.count ?? (res.data.results || res.data).length);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams({});

  const activeFilterCount = [category, brand, gender, size, minPrice, maxPrice, onSale].filter(Boolean).length;

  const sizes = ['6', '7', '8', '9', '10', '11', '12'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-900">
            {search ? `Results for "${search}"` : 'All sneakers'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{count} products</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={ordering}
            onChange={(e) => updateFilter('ordering', e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">Sort by</option>
            <option value="price">Price: low to high</option>
            <option value="-price">Price: high to low</option>
            <option value="-created_at">Newest first</option>
            <option value="name">Name: A-Z</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <i className="ti ti-filter"></i> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>
      </div>
     {activeFilterCount > 0 && (
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {category && (
          <FilterChip label={`Category: ${categories.find(c => c.slug === category)?.name || category}`} onRemove={() => updateFilter('category', '')} />
        )}
        {brand && (
          <FilterChip label={`Brand: ${brands.find(b => b.slug === brand)?.name || brand}`} onRemove={() => updateFilter('brand', '')} />
        )}
        {gender && (
          <FilterChip label={`Gender: ${gender}`} onRemove={() => updateFilter('gender', '')} />
        )}
        {size && (
          <FilterChip label={`Size: UK ${size}`} onRemove={() => updateFilter('size', '')} />
        )}
        {minPrice && (
          <FilterChip label={`Min: £${minPrice}`} onRemove={() => updateFilter('min_price', '')} />
        )}
        {maxPrice && (
          <FilterChip label={`Max: £${maxPrice}`} onRemove={() => updateFilter('max_price', '')} />
        )}
        {onSale === 'true' && (
          <FilterChip label="On sale" onRemove={() => updateFilter('on_sale', '')} />
        )}
      </div>
    )}
      <div className="flex gap-8">
        <aside className={`w-56 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="space-y-6">
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-amber-600 hover:underline">
                Clear all filters
              </button>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
              <div className="space-y-1.5">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => updateFilter('category', category === c.slug ? '' : c.slug)}
                    className={`block text-sm w-full text-left ${category === c.slug ? 'text-amber-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {c.name} <span className="text-gray-400">({facets.categories[c.slug] ?? c.product_count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Brand</h3>
              <div className="space-y-1.5">
                {brands.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => updateFilter('brand', brand === b.slug ? '' : b.slug)}
                    className={`block text-sm w-full text-left ${brand === b.slug ? 'text-amber-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {b.name} <span className="text-gray-400">({facets.brands[b.slug] ?? b.product_count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Gender</h3>
              <div className="space-y-1.5">
                {['men', 'women', 'kids', 'unisex'].map((g) => (
                  <button
                    key={g}
                    onClick={() => updateFilter('gender', gender === g ? '' : g)}
                    className={`block text-sm w-full text-left capitalize ${gender === g ? 'text-amber-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size (UK)</h3>
              <div className="grid grid-cols-4 gap-1.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateFilter('size', size === s ? '' : s)}
                    className={`py-1.5 text-xs rounded border ${size === s ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-600 hover:border-gray-500'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Price</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => updateFilter('min_price', e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => updateFilter('max_price', e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSale === 'true'}
                  onChange={(e) => updateFilter('on_sale', e.target.checked ? 'true' : '')}
                  className="rounded"
                />
                On sale only
              </label>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">No products found matching your filters.</p>
              <button onClick={clearFilters} className="text-amber-600 hover:underline text-sm mt-2">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function FilterChip({ label, onRemove }) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full transition"
    >
      {label}
      <i className="ti ti-x text-sm"></i>
    </button>
  );
}