import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Check, ArrowUpDown } from 'lucide-react';

export const MenuFilter: React.FC = () => {
  const {
    categories,
    foods,
    selectedCategoryId,
    setSelectedCategoryId,
    searchQuery,
    setSearchQuery,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    priceFilter,
    setPriceFilter,
    healthyOnly,
    setHealthyOnly,
  } = useApp();

  // Calculate counts per category
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return foods.length;
    return foods.filter((f) => f.categoryId === catId).length;
  };

  return (
    <div id="menu-section" className="space-y-4 pt-4">
      {/* Category Tabs (Segmented controls) */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          <button
            onClick={() => setSelectedCategoryId('all')}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              selectedCategoryId === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Tất cả thực đơn</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                selectedCategoryId === 'all'
                  ? 'bg-slate-800 text-amber-300'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {getCategoryCount('all')}
            </span>
          </button>

          {categories.map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-slate-800 text-amber-300'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setHealthyOnly(!healthyOnly)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 ${
              healthyOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400 hover:text-emerald-700'
            }`}
          >
            <span>🥗 Eat Clean & Chay</span>
          </button>

          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer select-none py-1">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 rounded-sm cursor-pointer"
            />
            <span>Còn món</span>
          </label>
        </div>
      </div>

      {/* Search, Price & Sort Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên món (ví dụ: Cơm sườn, Bún bò, Trà đào)..."
            className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Price & Sort Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Price Range */}
          <div className="relative inline-block">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className="text-xs sm:text-sm font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 pr-7 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer appearance-none"
            >
              <option value="all">Mọi mức giá</option>
              <option value="under30">Dưới 30.000₫</option>
              <option value="30to45">30.000₫ - 45.000₫</option>
              <option value="above45">Trên 45.000₫</option>
            </select>
            <ArrowUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort Selector */}
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs sm:text-sm font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 pr-7 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer appearance-none"
            >
              <option value="popular">Bán chạy nhất</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
            </select>
            <ArrowUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
