import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as cartApi from '../api/cart';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const res = await cartApi.getCart();
      setCart(res.data);
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = async (productId, variantId, quantity = 1) => {
    const res = await cartApi.addToCart({
      product_id: productId,
      variant_id: variantId,
      quantity,
    });
    setCart(res.data);
    return res.data;
  };

  const updateItem = async (itemId, quantity) => {
    const res = await cartApi.updateCartItem(itemId, quantity);
    setCart(res.data);
    return res.data;
  };

  const removeItem = async (itemId) => {
    const res = await cartApi.removeCartItem(itemId);
    setCart(res.data);
    return res.data;
  };

  const clearCart = async () => {
    await cartApi.clearCart();
    setCart(null);
    await fetchCart();
  };

  const value = {
    cart,
    loading,
    totalItems: cart?.total_items || 0,
    subtotal: cart?.subtotal || 0,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}