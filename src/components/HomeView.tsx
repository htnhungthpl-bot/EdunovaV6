import React from 'react';
import { 
  Sparkles, 
  PenTool, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  School, 
  ArrowRight, 
  BookMarked,
  Layers,
  Heart,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { UserProfile } from '../types';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  currentUser: UserProfile;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, currentUser }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Official Cover Banner Section */}
      <section className="overflow-hidden rounded-3xl bg-white border border-amber-200/80 shadow-xl shadow-amber-500/10">
        <div className="relative w-full overflow-hidden bg-amber-50/50">
          <img
            src="/assets/aistudio/EDUNOVA__Vi_t_hay_h_n_m_i_ng_y_f83b0b50.png"
            alt="EDUNOVA Writing Coach – Viết hay hơn mỗi ngày"
            className="w-full h-auto object-cover max-h-[580px] rounded-t-3xl"
          />
        </div>

        {/* Action ribbon right below cover */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate(currentUser.role === 'student' ? 'writing' : 'writing')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm sm:text-base hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
            >
              <PenTool className="w-5 h-5 text-amber-400" />
              <span>{currentUser.role === 'student' ? 'Vào Phòng luyện viết' : 'Bàn viết bài'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('challenges')}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-yellow-200" />
              <span>Thử thách – Học vui, viết hay</span>
            </button>

            <button
              onClick={() => onNavigate('lessons')}
              className="px-5 py-3.5 rounded-2xl bg-white text-amber-900 font-bold text-sm sm:text-base hover:bg-amber-100 transition-all border border-amber-300 shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>Kho bài học SGK</span>
            </button>

            <button
              onClick={() => onNavigate('lessons-theory')}
              className="px-4 py-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs sm:text-sm transition-all border border-amber-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>Học cách viết (7 kỹ năng)</span>
            </button>

            <button
              onClick={() => onNavigate('workshop')}
              className="px-4 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all border border-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Xưởng luyện câu & đoạn</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-amber-200 shadow-xs">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>Đang đăng nhập: <strong>{currentUser.name}</strong> ({currentUser.className || 'Lớp 4A8'})</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-amber-200 shadow-xs text-amber-900 font-bold">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>Hotline: 0973793366</span>
            </div>
          </div>
        </div>
      </section>


      {/* 5 Main Learning Spaces for Students */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            Không gian học tập toàn diện
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-800">
            Học văn thật vui, không còn nỗi sợ "bí ý"
          </h2>
          <p className="text-slate-600 text-sm">
            5 không gian được thiết kế khoa học, hỗ trợ học sinh tự học và giáo viên quản lý lớp hiệu quả.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Space 1: Trang của em */}
          <div 
            onClick={() => onNavigate(currentUser.role === 'student' ? 'progress' : 'teacher')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold group-hover:scale-105 transition-transform">
              🎒
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-amber-600">
              {currentUser.role === 'student' ? '1. Trang của em (Dashboard)' : '1. Bàn điều khiển chung'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentUser.role === 'student'
                ? 'Theo dõi nhiệm vụ cô giao, tiếp tục bài đang viết dở, đọc lời nhận xét chính thức và xem huy hiệu điểm 10.'
                : 'Theo dõi tiến độ chung, giao bài tập mới và quản lý hoạt động dạy học của lớp.'}
            </p>
          </div>

          {/* Space 2: Bàn viết 6 bước */}
          <div 
            onClick={() => onNavigate('writing')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-700 font-bold group-hover:scale-105 transition-transform">
              ✍️
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-amber-600">
              2. Bàn viết 6 bước luyện viết
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tìm ý → Lập dàn ý → Tự viết → Nhận gợi ý → Tự sửa → Hoàn thiện & Nộp bài.
            </p>
          </div>

          {/* Space 3: Học cách viết */}
          <div 
            onClick={() => onNavigate('lessons')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold group-hover:scale-105 transition-transform">
              📖
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-amber-600">
              3. Kho bài học SGK (35 bài)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Toàn bộ bài tập làm văn theo chuẩn chương trình GDPT lớp 4, bám sát sách giáo khoa Tiếng Việt 4.
            </p>
          </div>

          {/* Space 4: Thử thách – Học vui, viết hay */}
          <div 
            onClick={() => onNavigate('challenges')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold group-hover:scale-105 transition-transform">
              🎯
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-amber-600">
              4. Thử thách – Học vui, viết hay
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              4 đấu trường trò chơi: Xây câu thần tốc, Thám tử chính tả, Vua từ láy và Thợ rèn câu văn tích lũy huy hiệu danh dự.
            </p>
          </div>

          {/* Space 5: Tiến bộ & Báo cáo */}
          <div 
            onClick={() => onNavigate('progress')}
            className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold group-hover:scale-105 transition-transform">
              💎
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-amber-600">
              5. Sổ tay & Tiến bộ của em
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kho báu lưu giữ các quan sát thật, câu văn tự viết hay, sao tích lũy và các bài văn đạt điểm cao.
            </p>
          </div>

          {/* Space 6: Role-specific - Tiến bộ (Học sinh) hoặc Góc giáo viên (Giáo viên / Admin) */}
          {currentUser.role === 'student' ? (
            <div 
              onClick={() => onNavigate('progress')}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold group-hover:scale-105 transition-transform">
                🏆
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 group-hover:text-amber-600">
                6. Bảng vinh danh & Lời cô dặn
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đọc lời nhận xét chi tiết của cô giáo, số điểm bài viết và hướng dẫn tự hoàn thiện bài văn hay hơn.
              </p>
            </div>
          ) : (
            <div 
              onClick={() => onNavigate('teacher')}
              className="p-6 rounded-3xl bg-white border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold group-hover:scale-105 transition-transform">
                👩‍🏫
              </div>
              <h3 className="font-heading font-bold text-lg text-purple-900 group-hover:text-purple-600">
                6. Góc quản lý giáo viên
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quản lý lớp học, cấp tài khoản & mã PIN cho học sinh, giao bài tập, chấm điểm theo Rubric 4 mức.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
