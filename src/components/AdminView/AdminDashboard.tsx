import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FoodItem, Category } from '../../types';
import {
  BarChart3,
  Utensils,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Users,
  DollarSign,
  TrendingUp,
  Package,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    foods,
    categories,
    orders,
    reviews,
    users,
    switchUser,
    adminAddFood,
    adminUpdateFood,
    adminDeleteFood,
    adminToggleFoodAvailability,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'reviews' | 'users'>('overview');
  const [foodSearch, setFoodSearch] = useState('');
  const [foodCategoryFilter, setFoodCategoryFilter] = useState('all');

  // Food Form Modal (Add / Edit)
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    categoryId: categories[0]?.id || 'mon-man',
    price: 35000,
    originalPrice: 40000,
    image: '',
    description: '',
    stockQuantity: 20,
    prepTimeMinutes: 10,
    calories: 500,
    protein: 25,
    carbs: 60,
    fat: 15,
    fiber: 3.5,
    sodiumMg: 750,
    allergens: '',
    dietaryTags: '',
    tags: 'Món mới, Thơm ngon',
    isAvailable: true,
  });

  // Calculate Overview Metrics (US28, US29, US30)
  const completedOrders = orders.filter((o) => o.status === 'completed');
  const activeOrders = orders.filter(
    (o) =>
      o.status === 'paid_pending_confirm' ||
      o.status === 'preparing' ||
      o.status === 'ready'
  );
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  // Calculate best-selling dishes (US30)
  const itemCounts: Record<string, { name: string; count: number; revenue: number; image: string }> = {};
  orders.forEach((o) => {
    if (o.status !== 'cancelled') {
      o.items.forEach((item) => {
        if (!itemCounts[item.foodId]) {
          itemCounts[item.foodId] = {
            name: item.name,
            count: 0,
            revenue: 0,
            image: item.image,
          };
        }
        itemCounts[item.foodId].count += item.quantity;
        itemCounts[item.foodId].revenue += item.price * item.quantity;
      });
    }
  });

  const bestSellers = Object.entries(itemCounts)
    .map(([id, val]) => ({ id, ...val }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  const handleOpenAdd = () => {
    setEditingFood(null);
    setFormData({
      name: '',
      categoryId: categories[0]?.id || 'mon-man',
      price: 35000,
      originalPrice: 40000,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      description: 'Món ăn mới chuẩn vị, tươi ngon mỗi ngày phục vụ sinh viên và giảng viên.',
      stockQuantity: 30,
      prepTimeMinutes: 10,
      calories: 520,
      protein: 26,
      carbs: 65,
      fat: 16,
      fiber: 3.5,
      sodiumMg: 750,
      allergens: '',
      dietaryTags: 'Nóng hổi, Giàu năng lượng',
      tags: 'Món mới, Nóng hổi',
      isAvailable: true,
    });
    setIsFoodModalOpen(true);
  };

  const handleOpenEdit = (food: FoodItem) => {
    setEditingFood(food);
    const n = food.nutrition;
    setFormData({
      name: food.name,
      categoryId: food.categoryId,
      price: food.price,
      originalPrice: food.originalPrice || food.price,
      image: food.image,
      description: food.description,
      stockQuantity: food.stockQuantity,
      prepTimeMinutes: food.prepTimeMinutes,
      calories: food.calories || n?.calories || 450,
      protein: n?.protein || 24,
      carbs: n?.carbs || 60,
      fat: n?.fat || 15,
      fiber: n?.fiber || 3,
      sodiumMg: n?.sodiumMg || 700,
      allergens: food.allergens ? food.allergens.join(', ') : '',
      dietaryTags: food.dietaryTags ? food.dietaryTags.join(', ') : '',
      tags: food.tags.join(', '),
      isAvailable: food.isAvailable,
    });
    setIsFoodModalOpen(true);
  };

  const handleSaveFood = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === formData.categoryId);
    const parsedTags = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const parsedAllergens = formData.allergens
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);
    const parsedDietary = formData.dietaryTags
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const nutritionData = {
      calories: Number(formData.calories),
      protein: Number(formData.protein),
      carbs: Number(formData.carbs),
      fat: Number(formData.fat),
      fiber: Number(formData.fiber),
      sodiumMg: Number(formData.sodiumMg),
    };

    if (editingFood) {
      adminUpdateFood(editingFood.id, {
        name: formData.name,
        categoryId: formData.categoryId,
        categoryName: cat ? cat.name : 'Khác',
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        image: formData.image || editingFood.image,
        description: formData.description,
        stockQuantity: Number(formData.stockQuantity),
        prepTimeMinutes: Number(formData.prepTimeMinutes),
        calories: Number(formData.calories),
        nutrition: nutritionData,
        allergens: parsedAllergens,
        dietaryTags: parsedDietary,
        tags: parsedTags,
        isAvailable: formData.isAvailable,
      });
    } else {
      adminAddFood({
        name: formData.name,
        categoryId: formData.categoryId,
        categoryName: cat ? cat.name : 'Món mặn',
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        image:
          formData.image ||
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        description: formData.description,
        stockQuantity: Number(formData.stockQuantity),
        prepTimeMinutes: Number(formData.prepTimeMinutes),
        calories: Number(formData.calories),
        nutrition: nutritionData,
        allergens: parsedAllergens,
        dietaryTags: parsedDietary,
        tags: parsedTags,
        isAvailable: formData.isAvailable,
      });
    }
    setIsFoodModalOpen(false);
  };

  // Filter foods in admin table
  const filteredFoods = foods.filter((f) => {
    if (foodCategoryFilter !== 'all' && f.categoryId !== foodCategoryFilter) {
      return false;
    }
    if (foodSearch.trim()) {
      const q = foodSearch.toLowerCase();
      return f.name.toLowerCase().includes(q) || f.categoryName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <BarChart3 className="w-4 h-4" />
            <span>Trung Tâm Quản Trị & Báo Cáo EatNow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Quản trị căn tin & Phân tích kinh doanh
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Quản lý toàn bộ danh mục thực đơn, số lượng tồn kho đầu ngày, giám sát doanh thu và phản hồi từ sinh viên.
          </p>
          <div className="mt-2 text-xs text-amber-300 font-medium">
            Quản trị viên phụ trách: <strong>Ngô Thị Hồng Thu (MSSV: 2374820182)</strong> · Bộ phận: <strong>Ban Quản Trị Hệ Thống Căn Tin EatNow</strong>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 whitespace-nowrap self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm món ăn mới</span>
        </button>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Báo cáo & Thống kê
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
            activeTab === 'menu'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Quản lý thực đơn ({foods.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Đánh giá sinh viên ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Tài khoản hệ thống ({users.length})
        </button>
      </div>

      {/* Tab 1: Overview & Analytics (US28, US29, US30) */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Tổng doanh thu qua ví
                </span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono-nums text-slate-900">
                {totalRevenue.toLocaleString('vi-VN')}₫
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                +18.5% so với tuần trước
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Đơn hàng thành công
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono-nums text-slate-900">
                {completedOrders.length} đơn
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {activeOrders.length} đơn đang xử lý
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Món ăn đang phục vụ
                </span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Utensils className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono-nums text-slate-900">
                {foods.filter((f) => f.isAvailable).length} / {foods.length} món
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Phân bổ trong 4 danh mục
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Mức độ hài lòng
                </span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
              </div>
              <div className="text-2xl font-extrabold font-mono-nums text-slate-900 flex items-baseline gap-1">
                <span>{averageRating}</span>
                <span className="text-sm text-slate-400 font-normal">/ 5.0</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Từ {reviews.length} đánh giá
              </span>
            </div>
          </div>

          {/* Best Sellers Leaderboard & Hourly distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top bán chạy (US30) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Món bán chạy nhất (Top Best Sellers)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Thống kê số lượng suất đã bán để điều chỉnh lượng chuẩn bị bếp
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>

              <div className="space-y-3">
                {bestSellers.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center font-mono-nums">
                        {idx + 1}
                      </span>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate">
                          {item.name}
                        </span>
                        <span className="text-slate-500 font-mono-nums">
                          Doanh thu: {item.revenue.toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-extrabold font-mono-nums text-slate-900 text-sm block">
                        {item.count}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase">
                        suất đã bán
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time slot distribution */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Phân bố giờ cao điểm căn tin
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Số lượng đơn hẹn lấy theo khung giờ hôm nay
                  </p>
                </div>
                <Package className="w-5 h-5 text-amber-600" />
              </div>

              <div className="space-y-2 pt-2">
                {[
                  { slot: '11:00 - 11:15', percent: 25, count: 8 },
                  { slot: '11:15 - 11:30', percent: 65, count: 24 },
                  { slot: '11:30 - 11:45', percent: 90, count: 35 },
                  { slot: '11:45 - 12:00', percent: 75, count: 28 },
                  { slot: '12:00 - 12:15', percent: 45, count: 16 },
                ].map((item) => (
                  <div key={item.slot} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-700">{item.slot}</span>
                      <span className="font-mono-nums text-slate-900">
                        {item.count} đơn hẹn
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Khung giờ đông nhất: <strong>11:30 - 11:45</strong></span>
                <span className="text-emerald-700 font-semibold">Năng lực bếp: 45 suất/15p</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Menu Management (US10, US11) */}
      {activeTab === 'menu' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Danh sách thực đơn căn tin
              </h3>
              <p className="text-xs text-slate-500">
                Thêm món mới, điều chỉnh giá, cập nhật số lượng tồn kho hoặc tạm ẩn khỏi thực đơn
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Tìm món ăn..."
                  value={foodSearch}
                  onChange={(e) => setFoodSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 w-40 sm:w-52"
                />
              </div>

              <select
                value={foodCategoryFilter}
                onChange={(e) => setFoodCategoryFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-slate-700"
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Món ăn</th>
                  <th className="p-3.5">Danh mục</th>
                  <th className="p-3.5 font-mono-nums">Đơn giá</th>
                  <th className="p-3.5 font-mono-nums">Tồn kho</th>
                  <th className="p-3.5">Trạng thái bán</th>
                  <th className="p-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFoods.map((food) => (
                  <tr key={food.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{food.name}</div>
                          <div className="text-[11px] text-slate-400">
                            {food.prepTimeMinutes} phút · {food.rating}★ ({food.reviewCount})
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 whitespace-nowrap text-slate-600 font-medium">
                      {food.categoryName}
                    </td>

                    <td className="p-3.5 whitespace-nowrap font-bold font-mono-nums text-slate-900">
                      {food.price.toLocaleString('vi-VN')}₫
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`font-bold font-mono-nums px-2 py-0.5 rounded-md ${
                          food.stockQuantity > 0
                            ? 'bg-slate-100 text-slate-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {food.stockQuantity} suất
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <button
                        onClick={() => adminToggleFoodAvailability(food.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          food.isAvailable && food.stockQuantity > 0
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        {food.isAvailable && food.stockQuantity > 0 ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Đang mở bán</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Tạm ẩn/Hết</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="p-3.5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(food)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                          title="Chỉnh sửa món"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => adminDeleteFood(food.id)}
                          className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 transition-colors"
                          title="Xóa món"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Reviews (US32) */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4 animate-in fade-in duration-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Phản hồi & Đánh giá từ sinh viên
            </h3>
            <p className="text-xs text-slate-500">
              Ý kiến trực tiếp từ thực khách sau khi nhận món để cải thiện chất lượng phục vụ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{rev.foodName}</span>
                  <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{rev.rating}</span>
                  </div>
                </div>
                <p className="text-slate-700 italic bg-white p-3 rounded-xl border border-slate-100">
                  "{rev.comment}"
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Người đánh giá: <strong>{rev.userName}</strong></span>
                  <span>{new Date(rev.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Users List (US05) */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4 animate-in fade-in duration-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Danh sách tài khoản & Phân quyền hệ thống
            </h3>
            <p className="text-xs text-slate-500">
              Phân quyền theo 3 vai trò: Sinh viên, Nhân viên căn tin và Quản trị viên
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Họ và tên & MSSV</th>
                  <th className="p-3.5">Lớp / Bộ phận</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Số điện thoại</th>
                  <th className="p-3.5">Vai trò</th>
                  <th className="p-3.5 font-mono-nums">Số dư Ví CanteenGo</th>
                  <th className="p-3.5 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      {u.mssv && (
                        <div className="text-[11px] text-amber-700 font-mono font-semibold">
                          MSSV: {u.mssv}
                        </div>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">
                      {u.department || u.className || '—'}
                    </td>
                    <td className="p-3.5 text-slate-600 font-mono text-[11px]">{u.email}</td>
                    <td className="p-3.5 text-slate-600 font-mono-nums">{u.phone}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          u.role === 'customer'
                            ? 'bg-amber-100 text-amber-800'
                            : u.role === 'staff'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {u.role === 'customer'
                          ? 'Sinh viên'
                          : u.role === 'staff'
                          ? 'Nhân viên Căn tin'
                          : 'Quản trị viên'}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold font-mono-nums text-slate-900">
                      {u.walletBalance.toLocaleString('vi-VN')}₫
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => switchUser(u.id)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition-colors shadow-2xs whitespace-nowrap"
                        title="Đăng nhập và chuyển giao diện sang tài khoản này"
                      >
                        Chuyển ngay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Food Modal */}
      {isFoodModalOpen && (
        <div className="fixed inset-0 z-70 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingFood ? 'Chỉnh sửa thông tin món ăn' : 'Thêm món ăn mới vào thực đơn'}
              </h3>
              <button
                onClick={() => setIsFoodModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFood} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tên món ăn
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Cơm gà sốt nấm..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Danh mục
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Đơn giá (VNĐ)
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="1000"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono-nums focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Số lượng chuẩn bị
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stockQuantity: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono-nums focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Thời gian nấu (phút)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.prepTimeMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prepTimeMinutes: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono-nums focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        calories: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono-nums focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Đường dẫn hình ảnh (URL)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mô tả món ăn
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Đặc điểm dinh dưỡng & Thông tin (cách nhau dấu phẩy)
                </label>
                <div className="grid grid-cols-5 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                      Đạm (g)
                    </label>
                    <input
                      type="number"
                      value={formData.protein}
                      onChange={(e) =>
                        setFormData({ ...formData, protein: Number(e.target.value) })
                      }
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                      Carbs (g)
                    </label>
                    <input
                      type="number"
                      value={formData.carbs}
                      onChange={(e) =>
                        setFormData({ ...formData, carbs: Number(e.target.value) })
                      }
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                      Béo (g)
                    </label>
                    <input
                      type="number"
                      value={formData.fat}
                      onChange={(e) =>
                        setFormData({ ...formData, fat: Number(e.target.value) })
                      }
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                      Chất xơ (g)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.fiber}
                      onChange={(e) =>
                        setFormData({ ...formData, fiber: Number(e.target.value) })
                      }
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                      Natri (mg)
                    </label>
                    <input
                      type="number"
                      value={formData.sodiumMg}
                      onChange={(e) =>
                        setFormData({ ...formData, sodiumMg: Number(e.target.value) })
                      }
                      className="w-full px-2 py-1 text-xs border border-slate-300 rounded-lg bg-white font-mono-nums"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Cảnh báo chất gây dị ứng (Allergens, cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={formData.allergens}
                  onChange={(e) =>
                    setFormData({ ...formData, allergens: e.target.value })
                  }
                  placeholder="Ví dụ: Trứng, Đậu nành, Sữa bò, Gluten, Hải sản..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Để trống nếu món không chứa các chất gây dị ứng phổ biến.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Thẻ / Đặc điểm nổi bật (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Bán chạy, Giàu đạm, Giòn tan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modalIsAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) =>
                    setFormData({ ...formData, isAvailable: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-amber-600 border-slate-300 focus:ring-amber-500"
                />
                <label
                  htmlFor="modalIsAvailable"
                  className="font-medium text-slate-700 cursor-pointer"
                >
                  Công khai và mở bán ngay trên thực đơn
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsFoodModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-xs"
                >
                  {editingFood ? 'Lưu thay đổi' : 'Thêm món ăn'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
