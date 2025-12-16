import React from 'react';
import { Product, CartItem } from '../types';
import { FORMAT_CURRENCY } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 bg-white text-indigo-600 p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-indigo-600 hover:text-white"
          aria-label="Add to cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/>
            <path d="M12 5v14"/>
          </svg>
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                <span>★</span> {product.rating}
            </div>
        </div>
        
        <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-indigo-900">
            {FORMAT_CURRENCY(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};