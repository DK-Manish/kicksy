import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as authApi from '../api/auth';

export default function Account() {
  const { user, setUser } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');

  // Profile form
  const [profileForm, setProfileForm] = useState({ first_name: '', last_name: '', phone: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  // Password form
  const [pwForm, setPwForm] = useState({ old_password: '', new_password: '', confirm_password: '' });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState(null);

  // Addresses
  const [addresses, setAddresses] = useState([]);
  const [addrLoading, setAddrLoading] = useState(true);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrForm, setAddrForm] = useState({
    full_name: '', phone: '', address_line1: '', address_line2: '',
    city: '', county: '', postcode: '', country: 'United Kingdom', is_default: false,
  });
  const [addrSaving, setAddrSaving] = useState(false);
  const [addrMsg, setAddrMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'addresses') fetchAddresses();
  }, [activeTab]);

  function fetchAddresses() {
    setAddrLoading(true);
    authApi.getAddresses()
      .then(res => setAddresses(res.data.results || res.data))
      .catch(console.error)
      .finally(() => setAddrLoading(false));
  }

  function handleProfileSave(e) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg(null);
    authApi.updateProfile(profileForm)
      .then(res => {
        setUser(res.data);
        setProfileMsg({ type: 'success', text: 'Profile updated.' });
      })
      .catch(() => setProfileMsg({ type: 'error', text: 'Failed to update profile.' }))
      .finally(() => setProfileSaving(false));
  }

  function handlePasswordSave(e) {
    e.preventDefault();
    if (pwForm.new_password !== pwForm.confirm_password) {
      setPwMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setPwSaving(true);
    setPwMsg(null);
    authApi.changePassword({ old_password: pwForm.old_password, new_password: pwForm.new_password, new_password2: pwForm.confirm_password })
      .then(() => {
        setPwMsg({ type: 'success', text: 'Password changed.' });
        setPwForm({ old_password: '', new_password: '', confirm_password: '' });
      })
      .catch(() => setPwMsg({ type: 'error', text: 'Current password is incorrect.' }))
      .finally(() => setPwSaving(false));
  }

  function handleAddrSave(e) {
    e.preventDefault();
    setAddrSaving(true);
    setAddrMsg(null);
    authApi.addAddress(addrForm)
      .then(() => {
        fetchAddresses();
        setShowAddrForm(false);
        setAddrForm({
          full_name: '', phone: '', address_line1: '', address_line2: '',
          city: '', county: '', postcode: '', country: 'United Kingdom', is_default: false,
        });
        setAddrMsg({ type: 'success', text: 'Address added.' });
      })
      .catch(() => setAddrMsg({ type: 'error', text: 'Failed to save address.' }))
      .finally(() => setAddrSaving(false));
  }

  function handleSetDefault(id) {
    authApi.updateAddress(id, { is_default: true })
      .then(() => fetchAddresses())
      .catch(console.error);
  }

  function handleDeleteAddr(id) {
    authApi.deleteAddress(id)
      .then(() => fetchAddresses())
      .catch(console.error);
  }

  const tabs = [
    { key: 'profile', label: 'Profile', icon: 'ti-user' },
    { key: 'password', label: 'Password', icon: 'ti-lock' },
    { key: 'addresses', label: 'Addresses', icon: 'ti-map-pin' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-xl font-medium text-gray-900 mb-6">My account</h1>

      {/* Tabs */}
      <div className="flex gap-1 border-b mb-8">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === t.key
                ? 'border-black text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className={`ti ${t.icon} text-base`}></i>
            {t.label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSave} className="space-y-4 max-w-md">
          {profileMsg && (
            <div className={`text-sm px-4 py-2.5 rounded-lg ${profileMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {profileMsg.text}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
              <input
                type="text"
                value={profileForm.first_name}
                onChange={e => setProfileForm(p => ({ ...p, first_name: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
              <input
                type="text"
                value={profileForm.last_name}
                onChange={e => setProfileForm(p => ({ ...p, last_name: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={profileForm.phone}
              onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            disabled={profileSaving}
            className="bg-black text-white text-sm px-6 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {profileSaving ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      )}

      {/* Password tab */}
      {activeTab === 'password' && (
        <form onSubmit={handlePasswordSave} className="space-y-4 max-w-md">
          {pwMsg && (
            <div className={`text-sm px-4 py-2.5 rounded-lg ${pwMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {pwMsg.text}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current password</label>
            <input
              type="password"
              value={pwForm.old_password}
              onChange={e => setPwForm(p => ({ ...p, old_password: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New password</label>
            <input
              type="password"
              value={pwForm.new_password}
              onChange={e => setPwForm(p => ({ ...p, new_password: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm new password</label>
            <input
              type="password"
              value={pwForm.confirm_password}
              onChange={e => setPwForm(p => ({ ...p, confirm_password: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <button
            type="submit"
            disabled={pwSaving}
            className="bg-black text-white text-sm px-6 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {pwSaving ? 'Saving...' : 'Change password'}
          </button>
        </form>
      )}

      {/* Addresses tab */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          {addrMsg && (
            <div className={`text-sm px-4 py-2.5 rounded-lg ${addrMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {addrMsg.text}
            </div>
          )}

          {addrLoading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : (
            <div className="space-y-3">
              {addresses.map(addr => (
                <div key={addr.id} className="border rounded-xl p-4 flex justify-between items-start gap-4">
                  <div className="text-sm text-gray-700 space-y-0.5">
                    <p className="font-medium text-gray-900">{addr.full_name}</p>
                    <p>{addr.address_line1}</p>
                    {addr.address_line2 && <p>{addr.address_line2}</p>}
                    <p>{addr.city}{addr.county ? `, ${addr.county}` : ''}</p>
                    <p>{addr.postcode}</p>
                    <p>{addr.country}</p>
                    {addr.is_default && (
                      <span className="inline-block mt-1 text-xs bg-black text-white px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {!addr.is_default && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-xs text-gray-500 hover:text-black underline"
                      >
                        Set default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAddr(addr.id)}
                      className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {addresses.length === 0 && !showAddrForm && (
                <p className="text-sm text-gray-500">No addresses saved yet.</p>
              )}
            </div>
          )}

          {/* Add address form */}
          {showAddrForm ? (
            <form onSubmit={handleAddrSave} className="border rounded-xl p-5 space-y-3 mt-4">
              <h3 className="text-sm font-medium text-gray-900">New address</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <input placeholder="Full name" required value={addrForm.full_name}
                    onChange={e => setAddrForm(p => ({ ...p, full_name: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div className="col-span-2">
                  <input placeholder="Phone" value={addrForm.phone}
                    onChange={e => setAddrForm(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div className="col-span-2">
                  <input placeholder="Address line 1" required value={addrForm.address_line1}
                    onChange={e => setAddrForm(p => ({ ...p, address_line1: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div className="col-span-2">
                  <input placeholder="Address line 2 (optional)" value={addrForm.address_line2}
                    onChange={e => setAddrForm(p => ({ ...p, address_line2: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <input placeholder="City" required value={addrForm.city}
                  onChange={e => setAddrForm(p => ({ ...p, city: e.target.value }))}
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                <input placeholder="County (optional)" value={addrForm.county}
                  onChange={e => setAddrForm(p => ({ ...p, county: e.target.value }))}
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                <input placeholder="Postcode" required value={addrForm.postcode}
                  onChange={e => setAddrForm(p => ({ ...p, postcode: e.target.value }))}
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
                <input placeholder="Country" required value={addrForm.country}
                  onChange={e => setAddrForm(p => ({ ...p, country: e.target.value }))}
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={addrForm.is_default}
                  onChange={e => setAddrForm(p => ({ ...p, is_default: e.target.checked }))}
                  className="rounded" />
                Set as default address
              </label>
              <div className="flex gap-3">
                <button type="submit" disabled={addrSaving}
                  className="bg-black text-white text-sm px-5 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50">
                  {addrSaving ? 'Saving...' : 'Save address'}
                </button>
                <button type="button" onClick={() => setShowAddrForm(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowAddrForm(true)}
              className="flex items-center gap-1.5 text-sm text-gray-700 border rounded-lg px-4 py-2.5 hover:bg-gray-50 mt-2"
            >
              <i className="ti ti-plus text-base"></i>
              Add new address
            </button>
          )}
        </div>
      )}
    </div>
  );
}