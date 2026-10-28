import React, { useState } from 'react';
import { 
  X, 
  School, 
  Shield, 
  KeyRound, 
  User, 
  Lock, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  LogIn, 
  ArrowRight,
  RefreshCw,
  RotateCcw,
  LogOut,
  Info
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { googleSignIn } from '../utils/firebaseAuth';
import { dataService } from '../services/dataService';
import { api } from '../utils/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
}) => {
  // Tab: 'student' | 'teacher' | 'admin' | 'change_password'
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'admin'>('student');
  
  // Available classes loaded from backend
  const [availableClasses, setAvailableClasses] = useState<string[]>(['Lớp 4A8', 'Lớp 4A1', 'Lớp 4A2', 'Lớp 4A3']);

  // Student Login State
  const [studentClass, setStudentClass] = useState<string>('Lớp 4A8');
  const [studentName, setStudentName] = useState<string>('');
  const [studentPin, setStudentPin] = useState<string>('');

  // Teacher / Staff Login State
  const [teacherUsername, setTeacherUsername] = useState<string>('');
  const [teacherPassword, setTeacherPassword] = useState<string>('');

  // Admin Login State
  const [adminUsername, setAdminUsername] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');

  // Mandatory Password Change State
  const [showPasswordChange, setShowPasswordChange] = useState<boolean>(false);
  const [tempUser, setTempUser] = useState<UserProfile | null>(null);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Google Teacher Sign-In & Registration Flow
  const [showGoogleFlow, setShowGoogleFlow] = useState<boolean>(false);
  const [googleStep, setGoogleStep] = useState<'input' | 'register'>('input');
  const [googleEmail, setGoogleEmail] = useState<string>('');
  const [teacherRegName, setTeacherRegName] = useState<string>('');
  const [teacherRegClass, setTeacherRegClass] = useState<string>('');
  const [teacherRegSchool, setTeacherRegSchool] = useState<string>('');

  // Status & Error
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      api.getClasses().then((cls) => {
        if (cls && cls.length > 0) {
          const names = Array.from(new Set(['Lớp 4A8', ...cls.map(c => c.name)]));
          setAvailableClasses(names);
        }
      }).catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 1. Student Login Handler
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await api.login({
        role: 'student',
        fullName: studentName,
        className: studentClass,
        pinCode: studentPin,
      });

      const profile: UserProfile = {
        id: res.user.id,
        name: res.user.fullName,
        username: res.user.username,
        role: 'student',
        school: res.user.schoolName || 'Trường Tiểu học Kim Liên A',
        schoolId: res.user.schoolId,
        className: res.user.className || 'Lớp 4A8',
        classId: res.user.classId,
        avatar: res.user.avatar || '🎒',
        studentCode: res.user.studentCode,
        pinCode: res.user.pinCode,
        starsCount: 42,
        streakDays: 4,
        completedEssays: 6,
      };

      onSelectUser(profile);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Đăng nhập không thành công.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Teacher & Staff Login Handler
  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await api.login({
        role: 'teacher',
        username: teacherUsername,
        password: teacherPassword,
      });

      const profile: UserProfile = {
        id: res.user.id,
        name: res.user.fullName,
        username: res.user.username,
        role: res.user.role as UserRole,
        school: res.user.schoolName || 'Trường Tiểu học Kim Liên A',
        schoolId: res.user.schoolId,
        className: res.user.className || 'Lớp 4A8',
        classId: res.user.classId,
        avatar: res.user.avatar || '👩‍🏫',
        email: res.user.email,
      };

      onSelectUser(profile);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Admin Login Handler (checks mandatory password change)
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await api.login({
        role: 'admin',
        username: adminUsername,
        password: adminPassword,
      });

      const profile: UserProfile = {
        id: res.user.id,
        name: res.user.fullName,
        username: res.user.username,
        role: 'admin',
        school: 'EDUNOVA Hub / Phòng GD&ĐT',
        className: 'Quản trị viên toàn hệ thống',
        avatar: '🛡️',
        email: res.user.email,
        mustChangePassword: res.mustChangePassword,
      };

      // Check mandatory password change on first login
      if (res.mustChangePassword) {
        setTempUser(profile);
        setOldPassword(adminPassword);
        setShowPasswordChange(true);
      } else {
        onSelectUser(profile);
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Tài khoản hoặc mật khẩu Quản trị viên không đúng.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAdminPassword = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await api.resetAdminPassword();
      setAdminUsername('admin');
      setAdminPassword('123456');
      setSuccessMessage(res.message || 'Mật khẩu tài khoản admin đã được đặt lại thành công về: 123456');
    } catch (err: any) {
      setErrorMessage(err.message || 'Không thể đặt lại mật khẩu admin.');
    } finally {
      setLoading(false);
    }
  };

  
  // Enhanced Google Workspace OAuth flow for Google Sheets integration
  const handleGoogleOAuthPopup = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const { user, accessToken } = await googleSignIn();
      if (accessToken) {
        await dataService.sendGoogleToken(accessToken).catch(() => {});
      }
      const email = user.email || '';
      const res = await api.loginWithGoogle({
        email,
        name: user.displayName || undefined,
        googleId: user.uid,
      });

      if (res.isNew) {
        setGoogleEmail(email);
        setTeacherRegName(user.displayName || '');
        setTeacherRegClass('');
        setTeacherRegSchool('');
        setGoogleStep('register');
        setShowGoogleFlow(true);
      } else if (res.user) {
        onSelectUser(res.user);
        setShowGoogleFlow(false);
        onClose();
      }
    } catch (popupErr: any) {
      const isClosedByUser = 
        popupErr?.code === 'auth/popup-closed-by-user' || 
        popupErr?.code === 'auth/cancelled-popup-request' ||
        popupErr?.message?.includes('popup-closed-by-user');

      setShowGoogleFlow(true);
      setGoogleStep('input');
      setGoogleEmail('');

      if (isClosedByUser) {
        setErrorMessage('Cửa sổ đăng nhập Google đã được đóng. Thầy/Cô có thể nhập địa chỉ Gmail cá nhân bên dưới để tiếp tục.');
      } else if (popupErr?.code === 'auth/popup-blocked') {
        setErrorMessage('Trình duyệt đang chặn cửa sổ bật lên (popup). Thầy/Cô có thể nhập trực tiếp địa chỉ Gmail cá nhân bên dưới.');
      } else {
        setErrorMessage('Vui lòng nhập địa chỉ Gmail cá nhân của Thầy/Cô bên dưới:');
      }
    } finally {
      setLoading(false);
    }
  };

  // 4. Google Teacher Sign-In & Registration Handlers
  const handleGoogleEmailSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!googleEmail || !googleEmail.includes('@')) {
      setErrorMessage('Vui lòng nhập địa chỉ Gmail hợp lệ.');
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await api.loginWithGoogle({ email: googleEmail.trim() });
      if (res.isNew) {
        setGoogleStep('register');
        setTeacherRegName('');
        setTeacherRegClass('');
        setTeacherRegSchool('');
      } else if (res.user) {
        onSelectUser(res.user);
        setShowGoogleFlow(false);
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi đăng nhập bằng Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalClass = teacherRegClass.trim();
    if (!teacherRegName.trim()) {
      setErrorMessage('Vui lòng nhập Họ và tên Giáo viên.');
      return;
    }
    if (!finalClass) {
      setErrorMessage('Vui lòng nhập tên Lớp phụ trách.');
      return;
    }
    if (!teacherRegSchool.trim()) {
      setErrorMessage('Vui lòng nhập Tên trường học.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await api.registerWithGoogle({
        email: googleEmail.trim(),
        fullName: teacherRegName.trim(),
        className: finalClass,
        schoolName: teacherRegSchool.trim(),
      });
      onSelectUser(res.user);
      setShowGoogleFlow(false);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Đăng ký tài khoản không thành công.');
    } finally {
      setLoading(false);
    }
  };

  // 5. Mandatory Password Change Submission
  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('Mật khẩu mới phải có tối thiểu 6 kí tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await api.changePassword(oldPassword, newPassword);
      setSuccessMessage('Đổi mật khẩu an toàn thành công! Bạn có thể bắt đầu sử dụng.');
      if (tempUser) {
        tempUser.mustChangePassword = false;
        onSelectUser(tempUser);
      }
      setTimeout(() => {
        setShowPasswordChange(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Không thể đổi mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full">
                Xác thực bảo mật EDUNOVA
              </span>
              <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                Hệ thống
              </span>
            </div>
            <h3 className="font-heading text-xl font-bold">
              {showPasswordChange 
                ? 'Yêu cầu đổi mật khẩu lần đầu' 
                : showGoogleFlow 
                  ? (googleStep === 'register' ? 'Đăng ký thông tin Giáo viên' : 'Đăng nhập với Google') 
                  : 'Đăng nhập vào hệ thống'}
            </h3>
            <p className="text-xs text-amber-100">
              {showGoogleFlow 
                ? 'Cổng xác thực Gmail dành riêng cho Giáo viên' 
                : 'Đổi mới cách học – Bứt phá tri thức'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mandatory Password Change Dialog */}
        {showPasswordChange ? (
          <div className="p-6 space-y-5">
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
              <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Bắt buộc đổi mật khẩu khởi tạo:</strong>
                <p className="mt-1">
                  Tài khoản Quản trị viên (Admin) đang dùng mật khẩu mặc định khởi tạo (`123456`). Để đảm bảo an toàn dữ liệu học sinh và nhà trường, vui lòng đặt mật khẩu mới trước khi tiếp tục.
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mật khẩu khởi tạo hiện tại:
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden"
                  placeholder="123456"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mật khẩu mới (tối thiểu 6 kí tự):
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden"
                  placeholder="Nhập mật khẩu mới an toàn..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Xác nhận lại mật khẩu mới:
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden"
                  placeholder="Nhập lại mật khẩu mới..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Lưu mật khẩu mới & Đăng nhập</span>
              </button>
            </form>
          </div>
        ) : showGoogleFlow ? (
          <div className="p-6 space-y-5 animate-in fade-in duration-150">
            {/* Back button */}
            <button
              type="button"
              onClick={() => {
                setShowGoogleFlow(false);
                setGoogleStep('input');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>← Quay lại đăng nhập thông thường</span>
            </button>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {/* Step 1: Input Gmail */}
            {googleStep === 'input' && (
              <form onSubmit={handleGoogleEmailSubmit} className="space-y-4">
                <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-2xl text-xs text-slate-700 space-y-1.5">
                  <div className="font-bold text-sky-900 flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Đăng nhập liên kết Gmail dành cho Giáo viên</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Hệ thống kiểm tra tài khoản theo địa chỉ Gmail. Nếu chưa có tài khoản, hệ thống sẽ mở form đăng ký nhanh (Họ tên, Lớp, Trường).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nhập địa chỉ Gmail cá nhân của Thầy/Cô:
                  </label>
                  <input
                    type="email"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="vidu.thayco@gmail.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-hidden font-medium"
                    required
                  />
                  <p className="mt-1.5 text-[11px] text-slate-500">
                    Thầy/Cô có thể sử dụng bất kỳ địa chỉ Gmail cá nhân nào để đăng nhập hoặc đăng ký tài khoản Giáo viên mới.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    </svg>
                  )}
                  <span>Tiếp tục với Google</span>
                </button>
              </form>
            )}

            {/* Step 2: Register New Teacher */}
            {googleStep === 'register' && (
              <form onSubmit={handleGoogleRegisterSubmit} className="space-y-4">
                <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-900 space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <span>✨</span>
                    <span>Tài khoản chưa tồn tại – Đăng ký hồ sơ Giáo viên</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Địa chỉ Gmail <strong>{googleEmail}</strong> chưa có tài khoản. Vui lòng điền thông tin bên dưới để hoàn tất đăng ký:
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Google liên kết:
                  </label>
                  <input
                    type="text"
                    value={googleEmail}
                    disabled
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-100 text-slate-600 font-semibold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Họ và tên Giáo viên: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={teacherRegName}
                    onChange={(e) => setTeacherRegName(e.target.value)}
                    placeholder="Ví dụ: Cô Nguyễn Thị Hoa, Thầy Trần Văn Bình..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trường học: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={teacherRegSchool}
                    onChange={(e) => setTeacherRegSchool(e.target.value)}
                    placeholder="Ví dụ: Trường Tiểu học Ba Đình, TH Chu Văn An..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lớp phụ trách / Giảng dạy: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={teacherRegClass}
                    onChange={(e) => setTeacherRegClass(e.target.value)}
                    placeholder="Ví dụ: Lớp 4B (hoặc Lớp 4A1, Lớp 4A2...)"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden font-medium"
                    required
                  />
                </div>

                {/* Important notice for new accounts */}
                <div className="p-3.5 bg-amber-50 border border-amber-300/80 rounded-2xl text-xs text-amber-900 space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Lưu ý về danh sách học sinh của tài khoản mới:</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Tài khoản mới sẽ có <strong>0 học sinh</strong> và danh sách lớp hoàn toàn trống. Sau khi đăng ký thành công, Thầy/Cô có thể tạo từng học sinh hoặc tải danh sách lớp từ file Excel trong <strong>Góc giáo viên</strong>.
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setGoogleStep('input');
                      setErrorMessage(null);
                    }}
                    className="py-3 px-4 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-sm cursor-pointer transition-colors"
                  >
                    Chọn email khác
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="grow py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                    <span>Hoàn tất đăng ký & Đăng nhập</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Role Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('student');
                  setErrorMessage(null);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'student'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🎒</span>
                <span>Học sinh</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('teacher');
                  setErrorMessage(null);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'teacher'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>👩‍🏫</span>
                <span>Giáo viên</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('admin');
                  setErrorMessage(null);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🛡️</span>
                <span>Quản trị viên</span>
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {/* TAB 1: STUDENT LOGIN (Name + Class + PIN) */}
            {activeTab === 'student' && (
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-slate-700 space-y-1.5">
                  <div className="font-bold text-amber-800 flex items-center gap-1.5">
                    <span>🌟</span> Đăng nhập học sinh Tiểu học
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    <strong>Tài khoản do Giáo viên tạo:</strong> Học sinh chọn đúng Lớp, nhập Họ và tên và mã PIN 4 số do Thầy/Cô cấp.
                  </p>
                  <p className="text-[10px] text-amber-900 bg-amber-100/90 px-2 py-1 rounded-lg font-medium">
                    💡 Chưa có tài khoản? Hãy nhờ Thầy/Cô giáo tạo tài khoản cho em trong Góc giáo viên nhé!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Lớp học:
                    </label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden font-medium"
                    >
                      {availableClasses.map((clsName) => (
                        <option key={clsName} value={clsName}>
                          {clsName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mã PIN (4 số):
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={4}
                        value={studentPin}
                        onChange={(e) => setStudentPin(e.target.value)}
                        placeholder="••••"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-mono tracking-widest text-center font-bold focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden"
                        required
                      />
                      <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Họ và tên học sinh:
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nhập họ và tên học sinh..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-hidden font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                  <span>Vào phòng học của em</span>
                </button>
              </form>
            )}

            {/* TAB 2: TEACHER & SCHOOL LOGIN */}
            {activeTab === 'teacher' && (
              <form onSubmit={handleTeacherLogin} className="space-y-4">
                <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-2xl text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-purple-800 flex items-center gap-1.5">
                    <span>👩‍🏫</span> Dành cho Giáo viên & Ban Giám Hiệu
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Sử dụng tài khoản nội bộ nhà trường hoặc đăng nhập trực tiếp bằng Google Workspace.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên đăng nhập hoặc Email:
                  </label>
                  <input
                    type="text"
                    value={teacherUsername}
                    onChange={(e) => setTeacherUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập hoặc email..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu:
                  </label>
                  <input
                    type="password"
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                  <span>Đăng nhập Giáo viên / Nhà trường</span>
                </button>

                {/* Google OAuth Button */}
                <div className="relative pt-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-white px-2 text-slate-400 font-bold">Hoặc</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleOAuthPopup}
                  disabled={loading}
                  className="w-full py-2.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Đăng nhập với Google</span>
                </button>

                <div className="text-center pt-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowGoogleFlow(true);
                      setGoogleStep('input');
                      setGoogleEmail('');
                      setErrorMessage(null);
                    }}
                    className="text-xs text-sky-700 hover:text-sky-900 font-medium hover:underline cursor-pointer"
                  >
                    Hoặc nhập địa chỉ Gmail để đăng nhập trực tiếp →
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: ADMIN LOGIN */}
            {activeTab === 'admin' && (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-2xl text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-rose-800 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-rose-600" />
                    <span>Cổng Quản trị viên Tối cao (Super Admin)</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Vui lòng nhập tài khoản và mật khẩu Quản trị viên để truy cập trung tâm điều hành hệ thống.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên đăng nhập Admin:
                  </label>
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu:
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  <span>Đăng nhập Quản trị viên</span>
                </button>
              </form>
            )}

            {/* Current user & Logout Option */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-base">{currentUser.avatar}</span>
                <span>Đang đăng nhập: <strong>{currentUser.name}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => {
                  api.logout();
                  onSelectUser({
                    id: 'student-guest',
                    name: 'Học sinh Lớp 4A8',
                    username: 'hocsinh_4a8',
                    studentCode: 'HS4A8-01',
                    pinCode: '1234',
                    role: 'student',
                    school: 'Trường Tiểu học Kim Liên A',
                    className: 'Lớp 4A8',
                    avatar: '🎒',
                    starsCount: 0,
                    streakDays: 1,
                    completedEssays: 0,
                  });
                  onClose();
                }}
                className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
