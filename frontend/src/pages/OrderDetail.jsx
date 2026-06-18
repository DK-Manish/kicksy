import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import * as ordersApi from '../api/orders';

export default function OrderDetail() {
  const { orderNumber } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const justPaid = location.state?.justPaid;

  useEffect(() => {
    ordersApi.getOrder(orderNumber)
      .then((res) => setOrder(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [orderNumber]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-500">Loading order...</div>;
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Order not found.</p>
        <Link to="/orders" className="text-amber-600 hover:underline text-sm">View all orders</Link>
      </div>
    );
  }

  const statusColors = {
    pending: 'bg-amber-50 text-amber-700',
    confirmed: 'bg-green-50 text-green-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-indigo-50 text-indigo-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700',
    refunded: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {justPaid && (
        <div className="bg-green-50 text-green-800 rounded-lg px-4 py-3 mb-6 text-sm flex items-center gap-2">
          <i className="ti ti-circle-check text-lg"></i>
          Payment successful! Your order has been placed.
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-900">Order {order.order_number}</h1>
          <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <span className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
          {order.status}
        </span>
      </div>

      <div className="border rounded-xl divide-y">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {item.product_image && (
                <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">{item.product_name}</div>
              <div className="text-xs text-gray-500 mt-0.5">Size UK {item.size} × {item.quantity}</div>
            </div>
            <div className="text-sm font-medium text-gray-900">£{item.line_total}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="border rounded-xl p-5">
          <h2 className="text-sm font-medium text-gray-900 mb-3">Shipping address</h2>
          <div className="text-sm text-gray-600 space-y-0.5">
            <p>{order.full_name}</p>
            <p>{order.address_line1}</p>
            {order.address_line2 && <p>{order.address_line2}</p>}
            <p>{order.city}{order.county && `, ${order.county}`}</p>
            <p>{order.postcode}</p>
            <p>{order.country}</p>
          </div>
        </div>

        <div className="border rounded-xl p-5">
          <h2 className="text-sm font-medium text-gray-900 mb-3">Order summary</h2>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>£{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{parseFloat(order.shipping_cost) === 0 ? 'Free' : `£${order.shipping_cost}`}</span>
            </div>
            <div className="flex justify-between font-medium text-gray-900 pt-1.5 border-t mt-1.5">
              <span>Total</span>
              <span>£{order.total}</span>
            </div>
          </div>
        </div>
      </div>

      <Link to="/orders" className="inline-block mt-6 text-sm text-amber-600 hover:underline">
        ← Back to all orders
      </Link>
    </div>
  );
}