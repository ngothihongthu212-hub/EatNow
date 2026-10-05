import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/CustomerView/HeroBanner';
import { MenuFilter } from './components/CustomerView/MenuFilter';
import { FoodGrid } from './components/CustomerView/FoodGrid';
import { FoodDetailModal } from './components/CustomerView/FoodDetailModal';
import { CartDrawer } from './components/CustomerView/CartDrawer';
import { OrderDetailModal } from './components/CustomerView/OrderDetailModal';
import { MyOrdersView } from './components/CustomerView/MyOrdersView';
import { WalletModal } from './components/CustomerView/WalletModal';
import { UserProfileModal } from './components/CustomerView/UserProfileModal';
import { StaffDashboard } from './components/StaffView/StaffDashboard';
import { AdminDashboard } from './components/AdminView/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { OrderReceiptModal } from './components/CustomerView/OrderReceiptModal';
import { FoodReviewModal } from './components/CustomerView/FoodReviewModal';
import {
  UtensilsCrossed,
  Clock,
  ShieldCheck,
  HeartHandshake,
  PhoneCall,
  MapPin,
  Sparkles,
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    role,
    activeNavTab,
    selectedFood,
    selectedOrderForDetail,
    setSelectedOrderForDetail,
    receiptOrder,
    setReceiptOrder,
    reviewingOrder,
    setReviewingOrder,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      {/* 1. Portal Role Quick-Switcher */}
      <RoleSwitcherBar />

      {/* 2. Primary Navigation */}
      <Navbar />

      {/* 3. Main Body Content */}
      <main className="flex-1 pb-16">
        {/* Render View by Nav Tab */}
        {activeNavTab === 'menu' && (
          <div className="space-y-6">
            <HeroBanner />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <MenuFilter />
              <FoodGrid />

              {/* Service Commitments Strip (Editorial Adjacency) */}
              <section className="mt-12 p-8 rounded-3xl bg-white border border-slate-200">
                <div className="max-w-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                    Tiêu chuẩn phục vụ
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Bữa ăn chất lượng, an toàn và đúng hẹn
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    EatNow giúp căn tin tối ưu quy trình nấu nướng và đóng gói trước giờ nghỉ trưa, đảm bảo đồ ăn luôn nóng hổi khi đến tay sinh viên và giảng viên.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-xs">
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Chuẩn bị trước 10 phút
                    </h4>
                    <p className="text-slate-500 leading-relaxed">
                      Món ăn chỉ bắt đầu được hâm nóng và chia suất 10 phút trước khung giờ bạn hẹn đến lấy.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Bảo vệ số dư Ví 100%
                    </h4>
                    <p className="text-slate-500 leading-relaxed">
                      Nếu món hết đột xuất hoặc bếp từ chối, tiền được hoàn tự động về Ví CanteenGo tức thì.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Vệ sinh an toàn thực phẩm
                    </h4>
                    <p className="text-slate-500 leading-relaxed">
                      Nguyên liệu tươi nhập mỗi sớm, nguồn gốc rõ ràng, đạt chứng nhận ATTP trường học.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {activeNavTab === 'my-orders' && <MyOrdersView />}

        {activeNavTab === 'staff-orders' && <StaffDashboard />}

        {activeNavTab === 'admin-dashboard' && <AdminDashboard />}
      </main>

      {/* 4. Quiet Editorial Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                <UtensilsCrossed className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold text-slate-900">
                Eat<span className="text-amber-600">Now</span> Canteen System
              </span>
            </div>
            <p className="text-slate-400 max-w-sm">
              Hệ thống đặt món trực tuyến tại căn tin trường đại học. Giảm tải xếp hàng, thanh toán thông minh và tối ưu vận hành nhà bếp.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-700 block">Thời gian phục vụ</span>
              <div>Thứ Hai – Thứ Bảy: 06:30 – 18:30</div>
              <div>Chủ Nhật: 07:00 – 14:00</div>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-700 block">Liên hệ & Hỗ trợ</span>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                <span>Hotline Quầy Bếp: (024) 3869 2345</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Tầng 1, Tòa nhà Căn tin Trung tâm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <div>
            © {new Date().getFullYear()} EatNow Platform. Toàn quyền bảo lưu.
          </div>
          <div className="flex items-center gap-4">
            <span>Chính sách hoàn tiền Ví CanteenGo</span>
            <span>·</span>
            <span>Tiêu chuẩn an toàn thực phẩm</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedFood && <FoodDetailModal />}
      <CartDrawer />
      {selectedOrderForDetail && (
        <OrderDetailModal
          order={selectedOrderForDetail}
          onClose={() => setSelectedOrderForDetail(null)}
        />
      )}
      <WalletModal />
      <UserProfileModal />
      <AuthModal />
      {receiptOrder && (
        <OrderReceiptModal
          order={receiptOrder}
          onClose={() => setReceiptOrder(null)}
        />
      )}
      {reviewingOrder && (
        <FoodReviewModal
          order={reviewingOrder}
          onClose={() => setReviewingOrder(null)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
