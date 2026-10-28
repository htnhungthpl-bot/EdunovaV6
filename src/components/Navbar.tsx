import React from 'react';
import { 
  Menu, 
  Sparkles, 
  User, 
  PhoneCall, 
  GraduationCap 
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onOpenMobileMenu,
}) => {
  const getTabLabel = (id: string) => {
    switch (id) {
      case 'home': return 'Trang chủ';
      case 'lessons': return 'Kho bài học SGK (35 bài)';
      case 'writing': return 'Bàn viết 6 bước luyện viết';
      case 'posts': return 'Thư viện bài viết học sinh';
      case 'challenges': return 'Thử thách – Học vui, viết hay';
      case 'teacher': return 'Góc quản lý giáo viên';
      case 'progress': return 'Tiến bộ & Báo cáo học tập';
      case 'admin': return 'Quản trị hệ thống';
      default: return 'Phòng học';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Top brand notification banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        <span className="font-semibold">EDUNOVA – Nền tảng giáo dục thông minh</span>
        <span className="hidden md:inline text-amber-200">•</span>
        <span className="hidden md:inline italic">Đổi mới cách học – Bứt phá tri thức</span>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left: Mobile hamburger & Brand or Desktop Page Title */}
          <div className="flex items-center gap-3">
            {/* Hamburger button on mobile */}
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-amber-100/70 border border-amber-200 transition-colors cursor-pointer"
              title="Mở menu điều hướng"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Brand Logo */}
            <div 
              onClick={() => setActiveTab('home')}
              className="lg:hidden flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-base text-slate-800">
                EDUNOVA
              </span>
            </div>

            {/* Desktop Active Tab Title / Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-600">
              <span className="font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-200">
                Lớp 4
              </span>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-slate-800 text-sm">
                {getTabLabel(activeTab)}
              </span>
            </div>
          </div>

          {/* Right: User Profile & Hotline */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-2xs">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>0973793366</span>
            </div>

            {/* Current user badge */}
            <div 
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3 py-1 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 transition-colors cursor-pointer"
              title="Đổi vai trò hoặc tài khoản"
            >
              <span className="text-base">{currentUser.avatar}</span>
              <div className="text-left hidden sm:block">
                <div className="font-bold text-xs text-slate-800 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500">
                  {currentUser.className || 'Lớp 4A8'}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenAuth}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đổi vai trò</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
