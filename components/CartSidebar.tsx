import React from 'react';
import { CartItem } from '../types';
import { FORMAT_CURRENCY } from '../constants';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemove,
  onUpdateQuantity
}) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className={`absolute inset-y-0 right-0 max-w-md w-full flex pl-10 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="w-full h-full bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h2 className="text-lg font-bold text-slate-800">Giỏ hàng ({cartItems.length})</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-slate-300"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <p>Giỏ hàng đang trống</p>
                <button onClick={onClose} className="mt-4 text-indigo-600 font-medium hover:underline">Tiếp tục mua sắm</button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-slate-200">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-slate-900">
                        <h3 className="line-clamp-1"><a href="#">{item.name}</a></h3>
                        <p className="ml-4">{FORMAT_CURRENCY(item.price)}</p>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-slate-300 rounded-lg">
                        <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-1 text-slate-600 hover:bg-slate-100 rounded-l-lg disabled:opacity-50"
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>
                        <span className="px-2 py-1 font-medium text-slate-900">{item.quantity}</span>
                        <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-1 text-slate-600 hover:bg-slate-100 rounded-r-lg"
                        >
                            +
                        </button>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => onRemove(item.id)}
                        className="font-medium text-red-500 hover:text-red-700"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-slate-100 bg-slate-50 p-6">
              <div className="flex justify-between text-base font-medium text-slate-900 mb-4">
                <p>Tổng tiền</p>
                <p>{FORMAT_CURRENCY(total)}</p>
              </div>
              <p className="mt-0.5 text-sm text-slate-500 mb-6">Đã bao gồm thuế và phí vận chuyển.</p>
              <button 
                className="w-full flex items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-all hover:shadow-indigo-200 hover:shadow-lg"
              >
                Thanh toán
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};