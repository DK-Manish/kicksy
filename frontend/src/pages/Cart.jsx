import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateItem, removeItem, refreshCart } = useCart();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(null);

  const items = cart?.items || [];

  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty < 1) return;
    setUpdating(itemId);
    try {
      await updateItem(itemId, newQty);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const handleRemove = async (itemId) => {
    setUpdating(itemId);
    try {
      await removeItem(itemId);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <i className="ti ti-shopping-cart text-5xl text-gray-300"></i>
        <h1 className="text-xl font-medium text-gray-900 mt-4">Your cart is empty</h1>
        <p className="text-sm text-gray-500 mt-1">Looks like you haven't added any sneakers yet.</p>
        <Link
          to="/products"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  const subtotal = cart?.subtotal || 0;
  const shippingCost = subtotal >= 60 ? 0 : 4.99;
  const total = parseFloat(subtotal) + shippingCost;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-xl font-medium text-gray-900 mb-6">Your cart ({items.length})</h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-4">
              <Link to={`/products/${item.product.slug}`} className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.product.primary_image && (
                  <img src={item.product.primary_image} alt={item.product.name} className="w-full h-full object-cover" />
                )}
              </Link>

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <div className="text-[10px] uppercase text-gray-500">{item.product.brand?.name}</div>
                    <Link to={`/products/${item.product.slug}`} className="text-sm font-medium text-gray-900 hover:underline">
                      {item.product.name}
                    </Link>
                    <div className="text-xs text-gray-500 mt-1">Size: UK {item.variant.size}</div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    disabled={updating === item.id}
                    className="text-gray-400 hover:text-red-500 transition disabled:opacity-50"
                    aria-label="Remove item"
                  >
                    <i className="ti ti-trash"></i>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={updating === item.id || item.quantity <= 1}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={updating === item.id}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm font-medium text-gray-900">£{item.line_total}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-6 h-fit">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Order summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>£{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `£${shippingCost.toFixed(2)}`}</span>
            </div>
            {shippingCost > 0 && (
              <p className="text-xs text-amber-600">Add £{(60 - subtotal).toFixed(2)} more for free shipping</p>
            )}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between text-sm font-medium text-gray-900">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition mt-5"
          >
            Proceed to checkout
          </button>
          <Link to="/products" className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-3">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}