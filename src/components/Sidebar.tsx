import React from 'react';
import { 
  Home, 
  BookOpen, 
  PenTool, 
  LayoutDashboard, 
  Award, 
  Shield, 
  Sparkles, 
  User, 
  X,
  PhoneCall,
  GraduationCap,
  Library
} from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  mobileOpen,
  onCloseMobile,
}) => {
  // Define navigation items strictly by role
  const getNavItems = () => {
    // Items visible to all roles (Students, Teachers, Admins)
    const items = [
      { 
        id: 'home', 
        label: 'Trang chủ', 
        icon: Home,
        color: 'text-sky-600',
        emoji: '🏠' 
      },
      { 
        id: 'lessons', 
        label: 'Kho bài học', 
        icon: BookOpen,
        color: 'text-amber-600',
        emoji: '📖' 
      },
      { 
        id: 'writing', 
        label: 'Bàn viết 6 bước', 
        icon: PenTool,
        color: 'text-orange-600',
        emoji: '✍️' 
      },
            {
        id: 'posts',
        label: 'Thư viện bài viết',
        icon: Library,
        color: 'text-blue-600',
        emoji: '📚'
      },
      { 
        id: 'challenges', 
        label: 'Thử thách học vui', 
        icon: Sparkles,
        color: 'text-amber-500',
        emoji: '🎯' 
      },
    ];

    // "Góc giáo viên": ONLY visible to Teachers and Admins (Never students!)
    if (currentUser.role === 'teacher' || currentUser.role === 'admin') {
      items.push({ 
        id: 'teacher', 
        label: 'Góc giáo viên', 
        icon: LayoutDashboard,
        color: 'text-emerald-600',
        emoji: '👩‍🏫' 
      });
    }

    // Progress tab
    items.push({ 
      id: 'progress', 
      label: currentUser.role === 'student' ? 'Tiến bộ của em' : 'Báo cáo & Tiến độ', 
      icon: Award,
      color: 'text-purple-600',
      emoji: '🏆' 
    });

    // "Quản trị hệ thống": ONLY visible to Admin
    if (currentUser.role === 'admin') {
      items.push({ 
        id: 'admin', 
        label: 'Quản trị hệ thống', 
        icon: Shield,
        color: 'text-rose-600',
        emoji: '🛡️' 
      });
    }

    return items;
  };

  const navItems = getNavItems();

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    onCloseMobile();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-white border-r border-amber-200/80 shadow-xs overflow-y-auto">
      {/* Top: Logo & Brand */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-600 bg-clip-text text-transparent">
                  EDUNOVA
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                  Lớp 4
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Writing Coach – Luyện viết văn
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list (Cards vertical layout matching image) */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 cursor-pointer relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white shadow-lg shadow-blue-500/25 ring-2 ring-yellow-400/80 scale-[1.02]'
                    : 'text-slate-700 hover:bg-amber-50 hover:text-amber-900'
                }`}
              >
                {/* Active yellow vertical pill indicator (as shown in image) */}
                {isActive && (
                  <span className="w-1.5 h-6 bg-yellow-300 rounded-full shrink-0 shadow-xs animate-in fade-in duration-150" />
                )}

                {/* Icon */}
                <div className={`shrink-0 flex items-center justify-center ${isActive ? 'text-white' : item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Label */}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Promo Mascot Card & User Profile */}
      <div className="space-y-4 pt-6">
        {/* Friendly AI Mascot Motivational Card */}
        <div className="p-4 rounded-3xl bg-gradient-to-b from-sky-100 via-sky-50 to-blue-100/60 border border-sky-200 text-center space-y-2 relative overflow-hidden shadow-xs">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500 text-white font-extrabold text-[11px] shadow-xs">
            Học thông minh – Làm chủ tương lai!
          </div>

          <div className="flex justify-center pt-1">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-sky-200">
              🤖
            </div>
          </div>

          <p className="text-[11px] text-sky-950 font-medium leading-relaxed">
            "Viết hay hơn mỗi ngày – Đổi mới cách học, bứt phá tri thức!"
          </p>
        </div>

        {/* User Card */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between gap-2">
          <div 
            onClick={onOpenAuth}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
            title="Đổi vai trò hoặc tài khoản"
          >
            <div className="w-9 h-9 rounded-full bg-amber-200 flex items-center justify-center text-lg shadow-inner shrink-0 group-hover:scale-105 transition-transform">
              {currentUser.avatar}
            </div>
            <div className="min-w-0 text-left">
              <div className="font-bold text-xs text-slate-800 truncate group-hover:text-amber-700 flex items-center gap-1">
                <span className="truncate">{currentUser.name}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-bold shrink-0 ${
                  currentUser.role === 'admin'
                    ? 'bg-rose-100 text-rose-800'
                    : currentUser.role === 'teacher'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-amber-200 text-amber-900'
                }`}>
                  {currentUser.role === 'admin' ? 'ADMIN' : currentUser.role === 'teacher' ? 'GV' : 'HS'}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                {currentUser.className || 'Lớp 4A8'}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenAuth}
            className="p-1.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-200 text-slate-700 text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer transition-colors shadow-2xs"
            title="Đổi vai trò"
          >
            <User className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Đổi</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed on the left) */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64 xl:w-72">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Slide in from left) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
          />

          {/* Drawer Body */}
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
