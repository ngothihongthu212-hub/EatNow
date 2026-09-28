import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  BookOpen,
  Shield,
  GraduationCap,
  ChefHat,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    loginUser,
    registerUser,
    users,
    switchRole,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regClass, setRegClass] = useState('');
  const [regRole, setRegRole] = useState<Role>('customer');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(regName, regEmail, regPhone, regClass, regRole);
  };

  return (
    <div className="fixed inset-0 z-70 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {mode === 'login'
                  ? 'Đăng nhập EatNow'
                  : 'Đăng ký tài khoản mới'}
              </h3>
              <span className="text-[11px] text-slate-500">
                Hệ thống đặt món & thanh toán căn tin
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick Demo Switcher Section */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
              Tài khoản mẫu đăng nhập nhanh (Nhấn để đăng nhập ngay):
            </span>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {users.map((u) => {
                const isStudent = u.role === 'customer';
                const isStaff = u.role === 'staff';

                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      loginUser(u.email);
                      setIsAuthModalOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl bg-white border border-amber-200/80 text-left hover:bg-amber-100/60 hover:border-amber-400 transition-all flex items-center justify-between gap-2 shadow-2xs group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isStudent
                            ? 'bg-amber-100 text-amber-700'
                            : isStaff
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {isStudent && <GraduationCap className="w-4 h-4" />}
                        {isStaff && <ChefHat className="w-4 h-4" />}
                        {!isStudent && !isStaff && <ShieldCheck className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-amber-800 truncate">
                          {u.name} {u.mssv ? `(MSSV: ${u.mssv})` : ''}
                        </div>
                        <div className="text-[10.5px] text-slate-600 font-mono truncate">
                          E-mail: {u.email}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {isStudent
                            ? `Lớp: ${u.className} · Số dư ví: ${u.walletBalance.toLocaleString('vi-VN')}₫`
                            : `Bộ phận: ${u.department || u.className}`}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                        isStudent
                          ? 'bg-amber-100 text-amber-800'
                          : isStaff
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {isStudent
                        ? 'Sinh viên'
                        : isStaff
                        ? 'Nhân viên bếp'
                        : 'Quản trị viên'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-b border-slate-200 text-xs font-bold">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                mode === 'login'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-center border-b-2 transition-colors ${
                mode === 'register'
                  ? 'border-amber-500 text-amber-700'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Tạo tài khoản mới
            </button>
          </div>

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email hoặc MSSV
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="linhchi.2374820028@eatnow.edu.vn hoặc 2374820028"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-sm"
              >
                <span>Đăng nhập</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </form>
          )}

          {/* Register Form */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email trường học
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="nguyenvana@eatnow.edu.vn"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345..."
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Lớp / Khoa
                  </label>
                  <input
                    type="text"
                    placeholder="K22-CNTT02"
                    value={regClass}
                    onChange={(e) => setRegClass(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Vai trò đăng ký
                </label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as Role)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                >
                  <option value="customer">Sinh viên / Khách hàng</option>
                  <option value="staff">Nhân viên Căn tin</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>

              <p className="text-[11px] text-emerald-600 font-semibold pt-1">
                * Đăng ký mới được tặng ngay 100.000₫ vào Ví CanteenGo!
              </p>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm"
              >
                Tạo tài khoản & Nhận 100k
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
