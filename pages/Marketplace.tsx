
import React, { useState } from 'react';
import { SearchIcon, FilterIcon, TagIcon, PlusIcon, StoreIcon, ShoppingBagIcon } from '../components/icons';
import { MARKETPLACE_MOCK } from '../constants';
import { ProductCategory, Product } from '../types';
import { ProductDetailsModal } from '../components/common/ProductDetailsModal';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Todos'>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: (ProductCategory | 'Todos')[] = ['Todos', 'Capacetes', 'Pads', 'Luvas', 'Chuteiras', 'Acessórios', 'Merch', 'Suplementos'];

  const filteredProducts = MARKETPLACE_MOCK.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-24 space-y-6">
      {/* Header Area: Search & Actions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black dark:text-white">Marketplace</h1>
            <button className="flex items-center text-loco-red font-bold text-sm">
                <PlusIcon className="w-4 h-4 mr-1" /> Vender Item
            </button>
        </div>

        <div className="flex space-x-3">
            <div className="relative flex-1">
                <input 
                    type="text" 
                    placeholder="Buscar equipamentos..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-loco-gray border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-black dark:text-white focus:ring-2 focus:ring-loco-red outline-none shadow-sm text-sm"
                />
                <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
            <button className="bg-gray-200 dark:bg-loco-gray p-3 rounded-xl text-gray-600 dark:text-gray-300">
                <FilterIcon className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-loco-red to-green-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
              <p className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">Parceiro Oficial</p>
              <h2 className="text-2xl font-bold mb-2">Renove seu Gear</h2>
              <p className="text-sm mb-4 max-w-[200px]">Descontos exclusivos em luvas e chuteiras para atletas do Locomotiva.</p>
              <button className="bg-white text-loco-red px-4 py-2 rounded-lg font-bold text-sm">Ver Ofertas</button>
          </div>
          <ShoppingBagIcon className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-10 rotate-12" />
      </div>

      {/* Categories Scroll */}
      <div>
          <h3 className="font-bold text-black dark:text-white mb-3">Categorias</h3>
          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
              {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition border ${
                        selectedCategory === cat 
                        ? 'bg-loco-black text-white border-loco-black dark:bg-white dark:text-black' 
                        : 'bg-white dark:bg-loco-gray text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                      {cat}
                  </button>
              ))}
          </div>
      </div>

      {/* Products Grid */}
      <div>
         <h3 className="font-bold text-black dark:text-white mb-3">
            {selectedCategory === 'Todos' ? 'Destaques da Comunidade' : selectedCategory}
         </h3>
         
         <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map(product => (
                <div 
                    key={product.id} 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white dark:bg-loco-gray rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group cursor-pointer hover:border-loco-red transition"
                >
                    {/* Image Area */}
                    <div className="aspect-square bg-gray-100 dark:bg-black relative">
                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                        
                        {/* Condition Badge */}
                        <div className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                            product.condition === 'Novo' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'
                        }`}>
                            {product.condition}
                        </div>

                        {/* Size Badge (if applicable) */}
                        {product.size && (
                            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                {product.size}
                            </div>
                        )}
                    </div>

                    {/* Info Area */}
                    <div className="p-3">
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate pr-2">{product.category}</p>
                            {product.originalPrice && (
                                <span className="text-[10px] line-through text-gray-400">R$ {product.originalPrice}</span>
                            )}
                        </div>
                        <h4 className="font-bold text-sm text-black dark:text-white leading-tight mb-2 line-clamp-2 h-10">{product.title}</h4>
                        
                        <div className="flex items-center justify-between">
                             <p className="font-bold text-loco-red">R$ {product.price}</p>
                        </div>

                        {/* Seller Info */}
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center">
                            {product.seller.type === 'Loja' ? (
                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                                    <StoreIcon className="w-3 h-3 mr-1" />
                                    <span>{product.seller.name}</span>
                                </div>
                            ) : (
                                <div className="flex items-center w-full">
                                    <img src={product.seller.avatar} className="w-5 h-5 rounded-full mr-2" alt="" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-black dark:text-white truncate">{product.seller.name}</p>
                                        {product.seller.isTeammate && (
                                            <p className="text-[10px] text-green-600 dark:text-green-400 truncate">Do seu time</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
         </div>

         {filteredProducts.length === 0 && (
             <div className="text-center py-10">
                 <TagIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                 <p className="text-gray-500">Nenhum item encontrado.</p>
             </div>
         )}
      </div>

      <ProductDetailsModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default Marketplace;
