import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { AIAssistant } from './components/AIAssistant';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const filteredProducts = selectedCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === selectedCategory);

  const categories: Category[] = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Section */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 sm:p-12 mb-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Mua sắm thông minh cùng Gemini</h1>
            <p className="text-indigo-100 text-lg mb-8">Trải nghiệm mua sắm hiện đại với trợ lý ảo AI. Tìm kiếm sản phẩm, so sánh giá cả chỉ trong vài giây.</p>
            <button 
              onClick={() => {
                const aiBtn = document.querySelector('button[class*="fixed bottom-6"]');
                if (aiBtn instanceof HTMLElement) aiBtn.click();
              }}
              className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Hỏi trợ lý AI ngay
            </button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 transform translate-x-12 translate-y-12">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M44.1,-76.4C58.9,-69.7,73.9,-62.4,83.4,-50.8C92.9,-39.2,96.9,-23.3,95.8,-7.9C94.7,7.6,88.5,22.6,80.6,36.9C72.7,51.2,63.1,64.8,50.8,74.2C38.5,83.6,23.5,88.8,8.2,87.6C-7.1,86.4,-22.7,78.8,-37.2,70.5C-51.7,62.2,-65.1,53.2,-74.6,41.1C-84.1,29,-89.7,13.8,-88.7,-1C-87.7,-15.8,-80.1,-30.2,-69.8,-41.8C-59.5,-53.4,-46.5,-62.2,-33.4,-69.6C-20.3,-77,-7.1,-83,4.1,-89.4C15.3,-95.8,30.6,-102.6,44.1,-76.4Z" transform="translate(100 100)" />
             </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'All' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">Không tìm thấy sản phẩm nào trong danh mục này.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">GeminiStore</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
                Nơi hội tụ công nghệ và phong cách. Trải nghiệm mua sắm thông minh ngay hôm nay.
            </p>
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} GeminiStore. Built with React & Gemini API.</p>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <AIAssistant />
    </div>
  );
}