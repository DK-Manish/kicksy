import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import * as productsApi from '../../api/products';

const SIZES = ['6', '7', '8', '9', '10', '11', '12'];

export default function AdminProductForm() {
  const { slug } = useParams();
  const isEdit = !!slug;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    gender: 'unisex',
    price: '',
    discount_percent: 0,
    is_active: true,
    is_featured: false,
    is_new_arrival: false,
    is_limited_drop: false,
  });

  const [images, setImages] = useState([{ image: '', alt_text: '', is_primary: true, order: 0 }]);
  const [variants, setVariants] = useState(
    SIZES.map((size) => ({ size, stock: 0, sku: '' }))
  );

  useEffect(() => {
    productsApi.getCategories().then((res) => setCategories(res.data.results || res.data));
    productsApi.getBrands().then((res) => setBrands(res.data.results || res.data));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/products/admin/${slug}/`)
      .then((res) => {
        const p = res.data;
        setForm({
          name: p.name,
          description: p.description,
          category: p.category?.id || '',
          brand: p.brand?.id || '',
          gender: p.gender,
          price: p.price,
          discount_percent: p.discount_percent,
          is_active: p.is_active ?? true,
          is_featured: p.is_featured,
          is_new_arrival: p.is_new_arrival,
          is_limited_drop: p.is_limited_drop,
        });
        if (p.images?.length) {
          setImages(p.images.map((img) => ({ image: img.image, alt_text: img.alt_text, is_primary: img.is_primary, order: img.order })));
        }
        if (p.variants?.length) {
          // Merge with full size list so all sizes are always shown
          const variantMap = Object.fromEntries(p.variants.map((v) => [v.size, v]));
          setVariants(SIZES.map((size) => ({
            size,
            stock: variantMap[size]?.stock ?? 0,
            sku: variantMap[size]?.sku ?? '',
          })));
        }
      })
      .catch((err) => setError('Failed to load product.'))
      .finally(() => setLoading(false));
  }, [slug, isEdit]);

  function updateField(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function updateImage(index, key, value) {
    setImages((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      if (key === 'is_primary' && value) {
        // only one primary image
        next.forEach((img, i) => { if (i !== index) img.is_primary = false; });
      }
      return next;
    });
  }

  function addImage() {
    setImages((prev) => [...prev, { image: '', alt_text: '', is_primary: false, order: prev.length }]);
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function updateVariant(index, key, value) {
    setVariants((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  }

  function generateSku(size) {
    const prefix = form.name.trim().toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 20);
    return `${prefix}-UK${size}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const validImages = images.filter((img) => img.image.trim());
    if (validImages.length === 0) {
      setError('Add at least one image.');
      return;
    }
    if (!validImages.some((img) => img.is_primary)) {
      validImages[0].is_primary = true;
    }

    const validVariants = variants
      .filter((v) => Number(v.stock) > 0 || v.sku.trim())
      .map((v) => ({
        size: v.size,
        stock: Number(v.stock) || 0,
        sku: v.sku.trim() || generateSku(v.size),
      }));

    const payload = {
      ...form,
      category: form.category || null,
      brand: form.brand || null,
      price: form.price,
      discount_percent: Number(form.discount_percent) || 0,
      images: validImages.map((img, i) => ({ ...img, order: i })),
      variants: validVariants,
    };

    setSaving(true);
    const request = isEdit
      ? api.patch(`/products/admin/${slug}/`, payload)
      : api.post('/products/admin/', payload);

    request
      .then(() => navigate('/admin/products'))
      .catch((err) => {
        console.error(err.response?.data);
        setError(JSON.stringify(err.response?.data) || 'Failed to save product.');
      })
      .finally(() => setSaving(false));
  }

  if (loading) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <h2 className="text-base font-medium text-gray-900">{isEdit ? 'Edit product' : 'Add product'}</h2>

      {error && (
        <div className="bg-red-50 text-red-700 text-xs px-4 py-2.5 rounded-lg break-words">
          {error}
        </div>
      )}

      {/* Core fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text" required value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required rows={3} value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              required value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              required value={form.brand}
              onChange={(e) => updateField('brand', e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select brand</option>
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => updateField('gender', e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="unisex">Unisex</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (£)</label>
            <input
              type="number" step="0.01" required value={form.price}
              onChange={(e) => updateField('price', e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
            <input
              type="number" min="0" max="100" value={form.discount_percent}
              onChange={(e) => updateField('discount_percent', e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {[
            ['is_active', 'Active'],
            ['is_featured', 'Featured'],
            ['is_new_arrival', 'New arrival'],
            ['is_limited_drop', 'Limited drop'],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox" checked={form[key]}
                onChange={(e) => updateField(key, e.target.checked)}
                className="rounded"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Images */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Images</h3>
        <div className="space-y-3">
          {images.map((img, i) => (
            <div key={i} className="border rounded-lg p-3 space-y-2">
              <input
                type="url" placeholder="Image URL" value={img.image}
                onChange={(e) => updateImage(i, 'image', e.target.value)}
                className="w-full border rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black"
              />
              <div className="flex items-center gap-3">
                <input
                  type="text" placeholder="Alt text" value={img.alt_text}
                  onChange={(e) => updateImage(i, 'alt_text', e.target.value)}
                  className="flex-1 border rounded-md px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black"
                />
                <label className="flex items-center gap-1.5 text-xs text-gray-600 whitespace-nowrap">
                  <input
                    type="radio" name="primary_image" checked={img.is_primary}
                    onChange={() => updateImage(i, 'is_primary', true)}
                  />
                  Primary
                </label>
                {images.length > 1 && (
                  <button type="button" onClick={() => removeImage(i)} className="text-red-500 text-xs hover:text-red-700">
                    Remove
                  </button>
                )}
              </div>
              {img.image && (
                <img src={img.image} alt="" className="w-16 h-16 object-cover rounded-md" onError={(e) => e.target.style.display = 'none'} />
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={addImage} className="text-xs text-gray-600 border rounded-lg px-3 py-1.5 mt-2 hover:bg-gray-50">
          + Add another image
        </button>
      </div>

      {/* Variants */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Sizes & stock</h3>
        <div className="grid grid-cols-2 gap-3">
          {variants.map((v, i) => (
            <div key={v.size} className="border rounded-lg p-3 flex items-center gap-3">
              <span className="text-xs font-medium text-gray-700 w-12">UK {v.size}</span>
              <input
                type="number" min="0" placeholder="Stock" value={v.stock}
                onChange={(e) => updateVariant(i, 'stock', e.target.value)}
                className="w-20 border rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text" placeholder="SKU (auto if blank)" value={v.sku}
                onChange={(e) => updateVariant(i, 'sku', e.target.value)}
                className="flex-1 border rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit" disabled={saving}
          className="bg-black text-white text-sm px-6 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Saving...' : isEdit ? 'Save changes' : 'Create product'}
        </button>
        <button
          type="button" onClick={() => navigate('/admin/products')}
          className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2.5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}