
import React from 'react';
import { Product } from '../../types';
import { CloseIcon, CheckCircleSolidIcon, StoreIcon, ShoppingBagIcon } from '../icons';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-loco-gray w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col relative animate-fade-in-up">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
        >
            <CloseIcon className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="aspect-square w-full bg-gray-100 dark:bg-black relative">
            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
            
            <div className={`absolute bottom-4 left-4 text-xs font-bold px-3 py-1 rounded shadow-sm ${
                product.condition === 'Novo' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
            }`}>
                {product.condition}
            </div>
        </div>

        {/* Info */}
        <div className="p-6">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                    <h2 className="text-2xl font-bold text-black dark:text-white leading-tight mt-1">{product.title}</h2>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-black text-loco-red">R$ {product.price}</p>
                    {product.originalPrice && (
                        <p className="text-sm text-gray-400 line-through">R$ {product.originalPrice}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
                <span className="text-xs bg-gray-100 dark:bg-black/50 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                    Tamanho: {product.size || 'Único'}
                </span>
            </div>

            {/* Seller Info */}
            <div className="flex items-center p-3 bg-gray-50 dark:bg-black/20 rounded-xl mb-6 border border-gray-100 dark:border-gray-800">
                {product.seller.avatar ? (
                    <img src={product.seller.avatar} alt={product.seller.name} className="w-10 h-10 rounded-full mr-3" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                        <StoreIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                )}
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Vendido por</p>
                    <p className="font-bold text-sm text-black dark:text-white flex items-center">
                        {product.seller.name}
                        {product.seller.isTeammate && (
                            <span className="ml-2 text-[10px] bg-green-500/10 text-green-600 px-1.5 py-0.5 rounded font-bold border border-green-500/20">Time</span>
                        )}
                    </p>
                </div>
            </div>

            <button className="w-full bg-loco-red text-white font-bold py-4 rounded-xl hover:bg-green-700 transition shadow-lg flex items-center justify-center">
                <ShoppingBagIcon className="w-5 h-5 mr-2" />
                Comprar Agora
            </button>
        </div>
      </div>
    </div>
  );
};
