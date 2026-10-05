import React from 'react';
import { useApp } from '../../context/AppContext';
import { FoodCard } from './FoodCard';
import { Utensils, RotateCcw } from 'lucide-react';

export const FoodGrid: React.FC = () => {
  const {
    foods,
    selectedCategoryId,
    searchQuery,
    inStockOnly,
    sortBy,
    priceFilter,
    setPriceFilter,
    healthyOnly,
    setHealthyOnly,
    setSearchQuery,
    setSelectedCategoryId,
    setInStockOnly,
  } = useApp();

  // Filter logic
  let filtered = foods.filter((food) => {
    // Category match
    if (selectedCategoryId !== 'all' && food.categoryId !== selectedCategoryId) {
      return false;
    }
    // Search match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchName = food.name.toLowerCase().includes(q);
      const matchDesc = food.description.toLowerCase().includes(q);
      const matchCategory = food.categoryName.toLowerCase().includes(q);
      const matchTags = food.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchCategory && !matchTags) {
        return false;
      }
    }
    // In-stock only
    if (inStockOnly && (!food.isAvailable || food.stockQuantity <= 0)) {
      return false;
    }
    // Price range filter
    if (priceFilter === 'under30' && food.price >= 30000) return false;
    if (priceFilter === '30to45' && (food.price < 30000 || food.price > 45000)) return false;
    if (priceFilter === 'above45' && food.price <= 45000) return false;

    // Healthy / Low calorie filter (< 550 kcal or veggie)
    if (healthyOnly) {
      const isLowCal = food.calories ? food.calories <= 550 : false;
      const isVeggie = food.categoryId === 'mon-chay';
      const isCleanTag = food.tags.some((t) =>
        ['healthy', 'chay', 'thanh mát', 'giàu đạm'].some((kw) => t.toLowerCase().includes(kw))
      );
      if (!isLowCal && !isVeggie && !isCleanTag) return false;
    }

    return true;
  });

  // Sort logic
  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Popular: by reviewCount or default order
    return b.reviewCount - a.reviewCount;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryId('all');
    setInStockOnly(false);
    setPriceFilter('all');
    setHealthyOnly(false);
  };

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-slate-300 p-8 my-6">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
          <Utensils className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          Không tìm thấy món ăn phù hợp
        </h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm">
          Vui lòng thử từ khóa khác hoặc xóa bộ lọc để xem toàn bộ thực đơn căn tin hôm nay.
        </p>
        <button
          onClick={resetFilters}
          className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại bộ lọc</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-6">
      {filtered.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
};
