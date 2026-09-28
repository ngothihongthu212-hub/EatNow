import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Clock,
  User,
  ShoppingBag,
  ArrowRight,
  Wallet,
  AlertCircle,
} from 'lucide-react';
import { WalletPaymentModal } from './WalletPaymentModal';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    currentUser,
    pickupSlots,
  } = useApp();

  const [selectedSlot, setSelectedSlot] = useState(pickupSlots[2] || '11:15 - 11:30');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Giỏ hàng của bạn
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {cart.length} món
              </span>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-600 transition-colors p-1"
                  title="Xóa tất cả"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-12 h-12 text-slate-300 mb-3 stroke-[1.5]" />
                <h3 className="text-base font-semibold text-slate-700">
                  Giỏ hàng chưa có món nào
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Chọn những món ăn hấp dẫn trong thực đơn hôm nay và lên lịch hẹn nhận bạn nhé!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Xem thực đơn ngay
                </button>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.foodItem.id}
                      className="p-3 rounded-2xl border border-slate-200 bg-slate-50/50 flex gap-3 items-start"
                    >
                      <img
                        src={item.foodItem.image}
                        alt={item.foodItem.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 bg-slate-200"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {item.foodItem.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.foodItem.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs font-bold font-mono-nums text-amber-600 mt-0.5">
                          {item.foodItem.price.toLocaleString('vi-VN')}₫
                        </div>

                        {item.note && (
                          <div className="text-[11px] text-slate-500 italic mt-0.5 line-clamp-1">
                            Ghi chú: {item.note}
                          </div>
                        )}

                        {/* Quantity Stepper */}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 bg-white rounded-lg p-0.5 border border-slate-200">
                            <button
                              onClick={() =>
                                updateCartQuantity(item.foodItem.id, item.quantity - 1)
                              }
                              className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-700"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold font-mono-nums text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(item.foodItem.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= item.foodItem.stockQuantity}
                              className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-slate-700 disabled:opacity-30"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold font-mono-nums text-slate-900">
                            {(item.foodItem.price * item.quantity).toLocaleString('vi-VN')}₫
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pickup Time Slot (US15) */}
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Khung giờ hẹn nhận món
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1">
                    {pickupSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all border ${
                            isSelected
                              ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 italic">
                    * Căn tin sẽ chuẩn bị món nóng hổi trước giờ nhận khoảng 5 phút.
                  </p>
                </div>

                {/* Student Info Verification */}
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <User className="w-3.5 h-3.5 text-amber-700" />
                    <span>Thông tin nhận món:</span>
                  </div>
                  <div className="text-slate-700">
                    <strong>{currentUser.name}</strong>{currentUser.mssv ? ` (MSSV: ${currentUser.mssv})` : ''} · {currentUser.phone}
                    {currentUser.className && ` · Lớp: ${currentUser.className}`}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Summary */}
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính ({cart.reduce((s, i) => s + i.quantity, 0)} phần):</span>
                  <span className="font-mono-nums font-semibold text-slate-900">
                    {cartTotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Phí đóng gói & phục vụ:</span>
                  <span className="font-mono-nums font-semibold text-emerald-600">
                    Miễn phí
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-base font-extrabold font-mono-nums text-amber-600">
                    {cartTotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md active:scale-98 transition-all"
              >
                <span>Xác nhận & Thanh toán Ví</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {isPaymentModalOpen && (
        <WalletPaymentModal
          pickupSlot={selectedSlot}
          onClose={() => setIsPaymentModalOpen(false)}
        />
      )}
    </>
  );
};
