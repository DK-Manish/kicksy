const GUEST_ID_KEY = 'kicksy_guest_id';

function generateUUID() {
  // crypto.randomUUID is available in all modern browsers
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getGuestId() {
  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = generateUUID();
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }
  return guestId;
}

export function clearGuestId() {
  localStorage.removeItem(GUEST_ID_KEY);
}