import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Wallet,
  User,
  Plus,
  ClipboardList,
  UtensilsCrossed,
  ChefHat,
  BarChart3,
  Clock,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    currentUser,
    cartItemCount,
    cartTotal,
    setIsCartOpen,
    setIsWalletModalOpen,
    setIsProfileModalOpen,
    setIsAuthModalOpen,
    activeNavTab,
    setActiveNavTab,
    orders,
  } = useApp();

  // Pending orders for customer
  const activeOrdersCount = orders.filter(
    (o) =>
      o.userId === currentUser.id &&
      (o.status === 'paid_pending_confirm' ||
        o.status === 'preparing' ||
        o.status === 'ready')
  ).length;

  // New orders for staff
  const staffPendingCount = orders.filter(
    (o) => o.status === 'paid_pending_confirm' || o.status === 'preparing'
  ).length;

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveNavTab('menu')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                Eat<span className="text-amber-600">Now</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
                Căn tin Thông Minh
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {role === 'customer' && (
            <>
              <button
                onClick={() => setActiveNavTab('menu')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeNavTab === 'menu'
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Thực đơn hôm nay
              </button>
              <button
                onClick={() => setActiveNavTab('my-orders')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeNavTab === 'my-orders'
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>Đơn của tôi</span>
                {activeOrdersCount > 0 && (
                  <span className="ml-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center font-mono-nums">
                    {activeOrdersCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-1 text-xs text-slate-500 px-2 py-1 bg-slate-50 rounded-md border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Giờ mở: 06:30 – 18:30</span>
              </div>
            </>
          )}

          {role === 'staff' && (
            <>
              <button
                onClick={() => setActiveNavTab('staff-orders')}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeNavTab === 'staff-orders'
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ChefHat className="w-4 h-4" />
                <span>Tiếp nhận & Xử lý đơn bếp</span>
                {staffPendingCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center font-mono-nums animate-pulse">
                    {staffPendingCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveNavTab('menu')}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
              >
                Xem thực đơn khách
              </button>
            </>
          )}

          {role === 'admin' && (
            <>
              <button
                onClick={() => setActiveNavTab('admin-dashboard')}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeNavTab === 'admin-dashboard'
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Bảng Quản Trị & Doanh Thu</span>
              </button>
              <button
                onClick={() => setActiveNavTab('menu')}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
              >
                Xem Menu Trực Quan
              </button>
            </>
          )}
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Wallet Balance Pill */}
          {role === 'customer' && (
            <div className="flex items-center bg-amber-50/80 border border-amber-200/80 rounded-xl p-1 pr-2">
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="flex items-center gap-2 px-2 py-1 text-slate-800 hover:text-amber-700 transition-colors"
                title="Ví CanteenGo"
              >
                <Wallet className="w-4 h-4 text-amber-600" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-500 uppercase leading-none font-medium">
                    Ví CanteenGo
                  </span>
                  <span className="text-xs font-bold font-mono-nums text-slate-900">
                    {currentUser.walletBalance.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </button>
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="w-6 h-6 rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center text-xs transition-colors ml-1 shadow-sm"
                title="Nạp thêm tiền demo"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Cart Button (for Customer) */}
          {role === 'customer' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-all shadow-sm active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline font-mono-nums font-semibold">
                {cartTotal > 0 ? `${cartTotal.toLocaleString('vi-VN')}₫` : 'Giỏ hàng'}
              </span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center font-mono-nums">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}

          {/* User Profile Button */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-700"
            title="Tài khoản & Thông tin"
          >
            <div className="w-7 h-7 rounded-full bg-slate-100 overflow-hidden border border-slate-300 flex items-center justify-center">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-4 h-4 text-slate-500" />
              )}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-none truncate max-w-[110px]">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-500 leading-none mt-1">
                {role === 'customer'
                  ? 'Sinh viên'
                  : role === 'staff'
                  ? 'Nhân viên bếp'
                  : 'Quản trị viên'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};
