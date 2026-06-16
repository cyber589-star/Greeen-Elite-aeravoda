'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { X, Star, ShoppingCart, Minus, Plus, Heart } from 'lucide-react';

interface Product {
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  badge: string | null;
  description: string;
}

interface CartContextType {
  cartCount: number;
  addToCart: () => void;
  selectedProduct: Product | null;
  openProduct: (product: Product) => void;
  closeProduct: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  addToCart: () => {},
  selectedProduct: null,
  openProduct: () => {},
  closeProduct: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    setCartCount((c) => c + qty);
    setSelectedProduct(null);
    setQty(1);
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setQty(1);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setQty(1);
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart, selectedProduct, openProduct, closeProduct }}>
      {children}

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={closeProduct}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProduct}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-64 sm:h-72 bg-gradient-to-b from-[#F0EDE4] to-[#E8E5DC] flex items-center justify-center overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-contain p-6"
              />
              {selectedProduct.badge && (
                <div
                  className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                  style={{
                    background:
                      selectedProduct.badge === 'Bestseller' ? 'linear-gradient(135deg, #C5A55A, #D4B76A)' :
                      selectedProduct.badge === 'New' ? 'linear-gradient(135deg, #4A6741, #5a7d4f)' :
                      'linear-gradient(135deg, #8FB573, #7DA563)',
                  }}
                >
                  {selectedProduct.badge}
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-[11px] text-[#8FB573] font-medium uppercase tracking-wider mb-1">
                {selectedProduct.subtitle}
              </p>
              <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#1E1E1E] mb-2">
                {selectedProduct.name}
              </h2>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-[#C5A55A] text-[#C5A55A]' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-[13px] text-[#6B6B6B] ml-1">{selectedProduct.rating}</span>
              </div>

              <p className="text-[14px] text-[#6B6B6B] leading-relaxed mb-5">
                {selectedProduct.description}
              </p>

              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-[24px] font-bold text-[#4A6741]">₹{selectedProduct.price}</span>
                <span className="text-[15px] text-[#999] line-through">₹{selectedProduct.originalPrice}</span>
                <span className="text-[12px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% OFF
                </span>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <span className="text-[13px] font-medium text-[#6B6B6B]">Qty:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors rounded-l-lg"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-[14px] font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors rounded-r-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addToCart}
                  className="flex-1 flex items-center justify-center gap-2 text-[14px] font-medium text-white py-3 rounded-xl transition-all duration-300 hover:shadow-xl active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #4A6741, #5a7d4f)',
                    boxShadow: '0 4px 20px rgba(74,103,65,0.3)',
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart — ₹{selectedProduct.price * qty}
                </button>
                <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all">
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}
