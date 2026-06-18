import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const STATUS_OPTIONS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

const statusColors = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-green-50 text-green-700',
  processing: 'bg-blue-50 text-blue-700',
  shipped: 'bg-indigo-50 text-indigo-700',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
  refunded: 'bg-gray-100 text-gray-700',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  function fetchOrders() {
    setLoading(true);
    const params = statusFilter ? { status: statusFilter } : {};
    api.get('/orders/admin/all/', { params })
      .then((res) => setOrders(res.data.results || res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function handleStatusChange(orderNumber, newStatus) {
    setUpdatingId(orderNumber);
    api.patch(`/orders/admin/${orderNumber}/update/`, { status: newStatus, note: `Status updated to ${newStatus} by admin` })
      .then(() => fetchOrders())
      .catch(console.error)
      .finally(() => setUpdatingId(null));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-medium text-gray-900">All orders</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-gray-500">No orders found.</p>
      ) : (
        <div className="border rounded-xl divide-y overflow-hidden">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex-1 min-w-0">
                <Link to={`/orders/${order.order_number}`} className="text-sm font-medium text-gray-900 hover:underline">
                  {order.order_number}
                </Link>
                <div className="text-xs text-gray-500 mt-0.5">
                  {order.first_item_name}{order.item_count > 1 ? ` + ${order.item_count - 1} more` : ''}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              <div className="text-sm font-medium text-gray-900 whitespace-nowrap">£{order.total}</div>

              <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize whitespace-nowrap ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                {order.status}
              </span>

              <select
                value={order.status}
                disabled={updatingId === order.order_number}
                onChange={(e) => handleStatusChange(order.order_number, e.target.value)}
                className="text-xs border border-gray-300 rounded-md px-2 py-1.5 disabled:opacity-50"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}