import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ordersApi from '../api/orders';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi.getOrders()
      .then((res) => setOrders(res.data.results || res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    pending: 'bg-amber-50 text-amber-700',
    confirmed: 'bg-green-50 text-green-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-indigo-50 text-indigo-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
    refunded: 'bg-gray-100 text-gray-700',
  };

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-500">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-medium text-gray-900">No orders yet</h1>
        <p className="text-sm text-gray-500 mt-1">When you place an order, it'll show up here.</p>
        <Link to="/products" className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-xl font-medium text-gray-900 mb-6">Your orders</h1>

      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.order_number}`}
            className="flex items-center gap-4 border rounded-xl p-4 hover:border-gray-400 transition"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {order.first_item_image && (
                <img src={order.first_item_image} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{order.order_number}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {order.first_item_name}{order.item_count > 1 ? ` + ${order.item_count - 1} more` : ''}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">£{order.total}</div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                {order.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}