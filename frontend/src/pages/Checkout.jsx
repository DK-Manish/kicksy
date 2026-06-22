import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import * as ordersApi from '../api/orders';
import * as paymentsApi from '../api/payments';
import * as authApi from '../api/auth';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState('address');
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [address, setAddress] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
  });

  useEffect(() => {
    paymentsApi.getPaymentConfig().then((res) => {
      setStripePromise(loadStripe(res.data.publishable_key));
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      authApi.getAddresses().then((res) => {
        const addrs = res.data.results || res.data;
        setSavedAddresses(addrs);
        const defaultAddr = addrs.find((a) => a.is_default) || addrs[0];
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
          prefillAddress(defaultAddr);
        }
      }).catch(() => {});
    }
  }, [isAuthenticated]);

  const prefillAddress = (addr) => {
    setAddress({
      full_name: addr.full_name,
      email: user?.email || '',
      phone: addr.phone || '',
      address_line1: addr.address_line1,
      address_line2: addr.address_line2 || '',
      city: addr.city,
      county: addr.county || '',
      postcode: addr.postcode,
      country: addr.country,
    });
  };

  const handleSelectSavedAddress = (addr) => {
    setSelectedAddressId(addr.id);
    prefillAddress(addr);
  };

  const handleUseNewAddress = () => {
    setSelectedAddressId(null);
    setAddress({
      full_name: user?.full_name || '',
      email: user?.email || '',
      phone: '',
      address_line1: '',
      address_line2: '',
      city: '',
      county: '',
      postcode: '',
      country: 'United Kingdom',
    });
  };

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const shippingCost = subtotal >= 60 ? 0 : 4.99;
  const total = parseFloat(subtotal) + shippingCost;

  if (items.length === 0 && step === 'address') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600">Your cart is empty.</p>
        <Link to="/products" className="text-amber-600 hover:underline text-sm">Continue shopping</Link>
      </div>
    );
  }

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const orderRes = await ordersApi.createOrder(address);
      setOrder(orderRes.data);

      // Auto-save address if logged in and it's a new address (not a saved one)
      if (isAuthenticated && !selectedAddressId) {
        const isAlreadySaved = savedAddresses.some(
          (a) => a.address_line1 === address.address_line1 && a.postcode === address.postcode
        );
        if (!isAlreadySaved) {
          authApi.addAddress({
            full_name: address.full_name,
            phone: address.phone,
            address_line1: address.address_line1,
            address_line2: address.address_line2,
            city: address.city,
            county: address.county,
            postcode: address.postcode,
            country: address.country,
            is_default: savedAddresses.length === 0,
          }).catch(() => {});
        }
      }

      const intentRes = await paymentsApi.createPaymentIntent(orderRes.data.order_number);
      setClientSecret(intentRes.data.client_secret);
      setStep('payment');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong creating your order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-xl font-medium text-gray-900 mb-6">Checkout</h1>

      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8 flex items-start gap-3">
        <div className="text-sm text-amber-800">
          <span className="font-medium">Demo store</span> — Stripe is in test mode. No real payments are processed.
          Use card <span className="font-mono font-medium">4242 4242 4242 4242</span>, any future date, any CVC.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <h2 className="text-sm font-medium text-gray-900 mb-2">Shipping address</h2>

              {/* Saved addresses */}
              {isAuthenticated && savedAddresses.length > 0 && (
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Saved addresses</p>
                  <div className="grid gap-2">
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => handleSelectSavedAddress(addr)}
                        className={`text-left border rounded-lg px-4 py-3 text-sm transition ${
                          selectedAddressId === addr.id
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <span className="font-medium text-gray-900">{addr.full_name}</span>
                        {addr.is_default && (
                          <span className="ml-2 text-[10px] bg-black text-white px-1.5 py-0.5 rounded-full">Default</span>
                        )}
                        <br />
                        <span className="text-gray-500">{addr.address_line1}, {addr.city}, {addr.postcode}</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleUseNewAddress}
                      className={`text-left border rounded-lg px-4 py-3 text-sm transition ${
                        selectedAddressId === null && address.address_line1 === ''
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <span className="text-gray-700">+ Use a new address</span>
                    </button>
                  </div>
                  <hr className="my-4" />
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md">{error}</div>
              )}

              <div className="flex gap-3">
                <input
                  required
                  placeholder="Full name"
                  value={address.full_name}
                  onChange={(e) => setAddress({ ...address, full_name: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <input
                required
                type="email"
                placeholder="Email"
                value={address.email}
                onChange={(e) => setAddress({ ...address, email: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                required
                placeholder="Address line 1"
                value={address.address_line1}
                onChange={(e) => setAddress({ ...address, address_line1: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                placeholder="Address line 2 (optional)"
                value={address.address_line2}
                onChange={(e) => setAddress({ ...address, address_line2: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div className="flex gap-3">
                <input
                  required
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  placeholder="County"
                  value={address.county}
                  onChange={(e) => setAddress({ ...address, county: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  required
                  placeholder="Postcode"
                  value={address.postcode}
                  onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
                  className="w-32 border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {submitting ? 'Processing...' : 'Continue to payment'}
              </button>
            </form>
          )}

          {step === 'payment' && clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm order={order} onSuccess={async () => {
                await clearCart();
                navigate(`/orders/${order.order_number}`, { state: { justPaid: true } });
              }} />
            </Elements>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl p-6 h-fit">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Order summary</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 text-sm">
                <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  {item.product.primary_image && (
                    <img src={item.product.primary_image} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-gray-900">{item.product.name}</div>
                  <div className="text-gray-500 text-xs">UK {item.variant.size} × {item.quantity}</div>
                </div>
                <div className="text-gray-900">£{item.line_total}</div>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>£{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'Free' : `£${shippingCost.toFixed(2)}`}</span>
            </div>
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between text-sm font-medium text-gray-900">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentForm({ order, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setError('');

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message);
      setSubmitting(false);
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-sm font-medium text-gray-900 mb-2">Payment details</h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md">{error}</div>
      )}

      <PaymentElement options={{ wallets: { link: 'never' } }} />

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 mt-6"
      >
        {submitting ? 'Processing payment...' : 'Pay now'}
      </button>
    </form>
  );
}