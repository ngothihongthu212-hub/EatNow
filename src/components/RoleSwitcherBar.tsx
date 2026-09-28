import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  ChefHat,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { role, switchRole, switchUser, currentUser, users } = useApp();

  const students = users.filter((u) => u.role === 'customer');

  return (
    <header className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 select-none relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Portal title & Active User badge */}
        <div className="flex items-center gap-2.5 text-slate-300">
          <span className="flex items-center gap-1.5 font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EatNow Portal</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
            <span>Đang đóng vai:</span>
            <strong className="text-slate-200 font-semibold">{currentUser.name}</strong>
            {currentUser.mssv && (
              <span className="text-amber-400/90 font-mono">({currentUser.mssv})</span>
            )}
          </span>
        </div>

        {/* Right: Quick Role Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
          {/* Student Role & Specific Student Selector */}
          <div className="flex items-center gap-1 bg-slate-900/90 rounded-lg p-0.5 border border-slate-800">
            <button
              onClick={() => switchRole('customer')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                role === 'customer'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Sinh viên</span>
            </button>

            {/* Quick chips for the students */}
            {role === 'customer' && (
              <div className="flex items-center gap-1 pl-1 pr-1">
                {students.map((st) => {
                  const isCurrent = currentUser.id === st.id;
                  const shortName = st.name.split(' ').slice(-2).join(' ');
                  return (
                    <button
                      key={st.id}
                      onClick={() => switchUser(st.id)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                        isCurrent
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                      title={`${st.name} (MSSV: ${st.mssv}) - Ví: ${st.walletBalance.toLocaleString('vi-VN')}₫`}
                    >
                      {shortName}
                      <span className="ml-1 opacity-70 font-mono text-[10px]">
                        ({Math.round(st.walletBalance / 1000)}k)
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Staff: Nguyễn Thị Hồng */}
          <button
            onClick={() => switchRole('staff')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all whitespace-nowrap ${
              role === 'staff'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Nguyễn Thị Hồng (MSSV: 2374820071) - Bếp Trưởng & Quản lý Quầy Căn Tin A1"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Nhân viên: Nguyễn Thị Hồng</span>
          </button>

          {/* Admin: Ngô Thị Hồng Thu */}
          <button
            onClick={() => switchRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all whitespace-nowrap ${
              role === 'admin'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Ngô Thị Hồng Thu (MSSV: 2374820182) - Ban Quản Trị Hệ Thống Căn Tin EatNow"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Quản trị: Ngô Thị Hồng Thu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
