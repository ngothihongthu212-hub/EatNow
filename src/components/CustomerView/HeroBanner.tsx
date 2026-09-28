import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, ShieldCheck, Zap, ArrowDown } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategoryId } = useApp();

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white rounded-2xl sm:rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6 shadow-xl">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/canteen_hero_banner_1790330085053.jpg"
          alt="Không gian Căn tin EatNow"
          className="w-full h-full object-cover object-center filter brightness-[0.45]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl px-6 py-10 sm:py-16 md:py-20 lg:px-12 flex flex-col items-start justify-center">
        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-3">
          <span>Căn tin Đại học Thông Minh</span>
          <span aria-hidden="true">·</span>
          <span>Phục vụ hôm nay: 06:30 – 18:30</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl leading-tight">
          Đặt món trước, đến nhận ngay — Không còn cảnh chờ đợi
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
          Giải pháp đặt bữa trưa & giải khát nhanh chóng cho sinh viên và giảng viên. Chọn khung giờ lấy món yêu thích, thanh toán nhanh qua Ví CanteenGo và theo dõi bếp làm món theo thời gian thực.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={scrollToMenu}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-95"
          >
            <span>Khám phá thực đơn</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setSelectedCategoryId('mon-man');
              scrollToMenu();
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-sm border border-white/20 transition-colors"
          >
            Cơm trưa nóng hổi
          </button>

          <button
            onClick={() => {
              setSelectedCategoryId('do-uong');
              scrollToMenu();
            }}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-sm border border-white/20 transition-colors"
          >
            Trà đào & Cafe
          </button>
        </div>

        {/* Feature proof strip */}
        <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Tiết kiệm 15–20 phút giờ nghỉ trưa</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Hẹn giờ nhận món từ 10:45 – 13:00</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Ví CanteenGo hoàn tiền tự động 100% nếu bếp từ chối</span>
          </div>
        </div>
      </div>
    </section>
  );
};
