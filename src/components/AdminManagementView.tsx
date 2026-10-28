import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, FileSpreadsheet, 
  School, 
  KeyRound, 
  FileText, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Unlock, 
  RefreshCw, 
  Download, 
  Upload, 
  Activity, 
  Clock, 
  UserCheck
} from 'lucide-react';
import { UserProfile, DbSchool, DbClass, DbAuditLog } from '../types';
import { api } from '../utils/api';

interface AdminManagementViewProps {
  currentUser: UserProfile;
}

export const AdminManagementView: React.FC<AdminManagementViewProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'schools' | 'students' | 'logs' | 'cleanup'>('users');
  
  // Data lists
  const [users, setUsers] = useState<any[]>([]);
  const [schools, setSchools] = useState<DbSchool[]>([]);
  const [classes, setClasses] = useState<DbClass[]>([]);
  const [auditLogs, setAuditLogs] = useState<DbAuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string>('all');

  // Modals
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [showAddClassModal, setShowAddClassModal] = useState<boolean>(false);
  const [showAddSchoolModal, setShowAddSchoolModal] = useState<boolean>(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<any | null>(null);
  const [schoolToDelete, setSchoolToDelete] = useState<DbSchool | null>(null);
  const [classToDelete, setClassToDelete] = useState<DbClass | null>(null);
  const [showCleanConfirmModal, setShowCleanConfirmModal] = useState<boolean>(false);
  const [isCleaning, setIsCleaning] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Form states
  const [newFullName, setNewFullName] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [newRole, setNewRole] = useState<string>('teacher');
  const [newPassword, setNewPassword] = useState<string>('123456');
  const [newPinCode, setNewPinCode] = useState<string>('1234');
  const [newClassName, setNewClassName] = useState<string>('Lớp 4A1');
  const [newEmail, setNewEmail] = useState<string>('');

  // School form states
  const [newSchoolName, setNewSchoolName] = useState<string>('');
  const [newSchoolCode, setNewSchoolCode] = useState<string>('');
  const [newSchoolAddress, setNewSchoolAddress] = useState<string>('');
  const [newSchoolEmail, setNewSchoolEmail] = useState<string>('');
  const [newSchoolPhone, setNewSchoolPhone] = useState<string>('');

  // Class form states
  const [newClassInputName, setNewClassInputName] = useState<string>('');
  const [newClassGrade, setNewClassGrade] = useState<number>(4);
  const [newClassSchoolId, setNewClassSchoolId] = useState<string>('');
  const [newClassTeacherName, setNewClassTeacherName] = useState<string>('');

  // Bulk import state
  const [bulkText, setBulkText] = useState<string>(
    'Nguyễn Mai Anh, HS4A1-01, 1234\nTrần Quốc Bảo, HS4A1-02, 5678\nLê Thùy Dương, HS4A1-03, 2468\nPhạm Minh Khôi, HS4A1-04, 1357'
  );

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [uList, sList, cList, lList] = await Promise.all([
        api.getUsers().catch(() => []),
        api.getSchools().catch(() => []),
        api.getClasses().catch(() => []),
        api.getAuditLogs().catch(() => []),
      ]);
      setUsers(uList);
      setSchools(sList);
      setClasses(cList);
      setAuditLogs(lList);
    } catch (err: any) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Lock / Unlock user
  const handleToggleLock = async (user: any) => {
    try {
      const newStatus = user.status === 'locked' ? 'active' : 'locked';
      await api.updateUser(user.id, { status: newStatus });
      showNotification('success', `Đã ${newStatus === 'locked' ? 'khóa' : 'mở khóa'} tài khoản ${user.fullName}`);
      loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi cập nhật trạng thái');
    }
  };

  // Reset Student PIN
  const handleResetPin = async (user: any) => {
    const pin = prompt(`Nhập mã PIN 4 số mới cho học sinh ${user.fullName}:`, '1234');
    if (!pin) return;
    try {
      await api.updateUser(user.id, { pinCode: pin.trim() });
      showNotification('success', `Đã cập nhật mã PIN mới (${pin}) cho học sinh ${user.fullName}`);
      loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi đặt lại mã PIN');
    }
  };

  // Reset Password for staff/admin
  const handleResetPassword = async (user: any) => {
    const pwd = prompt(`Nhập mật khẩu mới cho ${user.fullName}:`, '123456');
    if (!pwd) return;
    try {
      await api.updateUser(user.id, { password: pwd.trim() });
      showNotification('success', `Đã đổi mật khẩu cho tài khoản ${user.username}`);
      loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi đặt lại mật khẩu');
    }
  };

  // Create User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createUser({
        fullName: newFullName,
        username: newUsername,
        role: newRole,
        password: newPassword,
        pinCode: newRole === 'student' ? newPinCode : undefined,
        className: newClassName,
        email: newEmail,
      });
      showNotification('success', `Đã tạo tài khoản ${newFullName} thành công!`);
      setShowAddUserModal(false);
      setNewFullName('');
      setNewUsername('');
      loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi tạo tài khoản');
    }
  };

  // Bulk Import
  const handleBulkImport = async () => {
    try {
      const lines = bulkText.split('\n').filter(l => l.trim().length > 0);
      const studentObjects = lines.map((line, idx) => {
        const parts = line.split(',').map(p => p.trim());
        return {
          fullName: parts[0] || `Học sinh ${idx + 1}`,
          studentCode: parts[1] || `HS4A1-${(idx + 10).toString().padStart(2, '0')}`,
          pinCode: parts[2] || '1234',
        };
      });

      const res = await api.bulkImportStudents(studentObjects, 'class-4a1', 'Lớp 4A1');
      showNotification('success', `Đã thêm thành công ${res.createdCount} học sinh vào Lớp 4A1!`);
      setShowBulkImportModal(false);
      loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi nhập danh sách học sinh');
    }
  };

  // Export CSV Roster
  const handleExportStudents = () => {
    const students = users.filter(u => u.role === 'student');
    const headers = 'Mã học sinh,Họ và tên,Lớp,Mã PIN,Trạng thái\n';
    const rows = students.map(s => `${s.studentCode || ''},"${s.fullName}","${s.className || 'Lớp 4A1'}",${s.pinCode || '1234'},${s.status === 'locked' ? 'Đã khóa' : 'Đang hoạt động'}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `danh_sach_hoc_sinh_lop4A1_kimliena_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showNotification('success', 'Đã tải xuống danh sách học sinh và mã PIN!');
  };

  // Delete User Confirmed
  const handleDeleteConfirmed = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await api.deleteUser(userToDelete.id);
      showNotification('success', `Đã xóa tài khoản "${userToDelete.fullName}" thành công!`);
      setUserToDelete(null);
      await loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi khi xóa tài khoản');
    } finally {
      setIsDeleting(false);
    }
  };

  // Clean Demo Data Confirmed
  const handleCleanConfirmed = async () => {
    setIsCleaning(true);
    try {
      const res = await api.cleanDemoData();
      showNotification('success', res.message || 'Đã dọn dẹp dữ liệu thử nghiệm và tài khoản mẫu thành công.');
      setShowCleanConfirmModal(false);
      await loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi dọn dẹp dữ liệu');
    } finally {
      setIsCleaning(false);
    }
  };

  const handleCleanDemoData = () => {
    setShowCleanConfirmModal(true);
  };

  // Delete School Confirmed
  const handleDeleteSchoolConfirmed = async () => {
    if (!schoolToDelete) return;
    setIsDeleting(true);
    try {
      await api.deleteSchool(schoolToDelete.id);
      showNotification('success', `Đã xóa trường học "${schoolToDelete.name}" thành công!`);
      setSchoolToDelete(null);
      await loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi khi xóa trường học');
    } finally {
      setIsDeleting(false);
    }
  };

  // Delete Class Confirmed
  const handleDeleteClassConfirmed = async () => {
    if (!classToDelete) return;
    setIsDeleting(true);
    try {
      await api.deleteClass(classToDelete.id);
      showNotification('success', `Đã xóa lớp "${classToDelete.name}" thành công!`);
      setClassToDelete(null);
      await loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi khi xóa lớp học');
    } finally {
      setIsDeleting(false);
    }
  };

  // Create School
  const handleCreateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createSchool({
        name: newSchoolName,
        code: newSchoolCode,
        address: newSchoolAddress,
        email: newSchoolEmail,
        phone: newSchoolPhone,
      });
      showNotification('success', `Đã tạo trường học "${newSchoolName}" thành công!`);
      setShowAddSchoolModal(false);
      setNewSchoolName('');
      setNewSchoolCode('');
      setNewSchoolAddress('');
      setNewSchoolEmail('');
      setNewSchoolPhone('');
      await loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi tạo trường học');
    }
  };

  // Create Class
  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedSchool = schools.find(s => s.id === newClassSchoolId);
      await api.createClass({
        name: newClassInputName,
        grade: newClassGrade,
        schoolId: newClassSchoolId,
        schoolName: selectedSchool ? selectedSchool.name : '',
        teacherName: newClassTeacherName,
      });
      showNotification('success', `Đã tạo lớp "${newClassInputName}" thành công!`);
      setShowAddClassModal(false);
      setNewClassInputName('');
      setNewClassTeacherName('');
      await loadAllData();
    } catch (err: any) {
      showNotification('error', err.message || 'Lỗi tạo lớp học');
    }
  };

  const filteredUsers = users.filter(u => {
    const matchSearch = u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (u.username && u.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (u.studentCode && u.studentCode.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchRole = filterRole === 'all' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Toast Alert */}
      {statusMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom ${
          statusMessage.type === 'success' ? 'bg-emerald-900 text-white' : 'bg-red-900 text-white'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Admin Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-rose-500/80 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Hệ thống Quản trị Cấp cao (Super Admin)</span>
            </span>
            <span className="bg-white/10 text-slate-200 text-xs font-medium px-2 py-0.5 rounded-full">
              Bảo mật RBAC & CSDL Nội bộ
            </span>
          </div>
          <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
            <span>Trung tâm Quản trị EDUNOVA</span>
          </h2>
          <p className="text-xs text-slate-300 flex items-center gap-2">
            <School className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {schools.length > 0
                ? `Đơn vị: ${schools.map(s => s.name).join(', ')}`
                : 'Chương trình Viết văn Tiểu học EDUNOVA (SGK Kết nối tri thức)'}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={loadAllData}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tạo tài khoản mới</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white hover:bg-amber-50 text-slate-600 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Quản lý Tài khoản ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'students'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white hover:bg-amber-50 text-slate-600 border border-slate-200'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Học sinh & Mã PIN ({users.filter(u => u.role === 'student').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('schools')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'schools'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white hover:bg-amber-50 text-slate-600 border border-slate-200'
          }`}
        >
          <School className="w-4 h-4" />
          <span>Trường & Lớp học</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'logs'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white hover:bg-amber-50 text-slate-600 border border-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Nhật ký Hệ thống ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cleanup')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'cleanup'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white hover:bg-rose-50 text-rose-700 border border-rose-200'
          }`}
        >
          <Trash2 className="w-4 h-4" />
          <span>Dọn dẹp Dữ liệu Thử nghiệm</span>
        </button>
      </div>

      {/* TAB 1: USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-800">
                Danh sách Tài khoản & Phân quyền RBAC
              </h3>
              <p className="text-xs text-slate-500">
                Quản lý các tài khoản Admin, Nhà trường, Giáo viên và Học sinh trong hệ thống.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:border-amber-500 outline-hidden w-48 sm:w-60"
                />
              </div>

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:border-amber-500 outline-hidden font-medium"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="admin">Quản trị viên (Admin)</option>
                <option value="school">Nhà trường (School)</option>
                <option value="teacher">Giáo viên (Teacher)</option>
                <option value="student">Học sinh (Student)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Người dùng</th>
                  <th className="py-3 px-3">Vai trò</th>
                  <th className="py-3 px-3">Tài khoản / Mã</th>
                  <th className="py-3 px-3">Đơn vị / Lớp</th>
                  <th className="py-3 px-3">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const isAdmin = u.role === 'admin';
                  const isTeacher = u.role === 'teacher';
                  const isSchool = u.role === 'school';
                  const isLocked = u.status === 'locked';

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{u.avatar || '👤'}</span>
                          <div>
                            <div className="font-bold text-slate-800 flex items-center gap-1.5">
                              <span>{u.fullName}</span>
                              {u.mustChangePassword && (
                                <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                                  Đổi MK lần đầu
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">{u.email || 'Nội bộ'}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isAdmin
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : isSchool
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : isTeacher
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {isAdmin ? 'ADMIN' : isSchool ? 'NHÀ TRƯỜNG' : isTeacher ? 'GIÁO VIÊN' : 'HỌC SINH'}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono font-medium text-slate-600">
                        {u.role === 'student' ? (
                          <div className="space-y-0.5">
                            <div>{u.studentCode || 'HS-VN'}</div>
                            <div className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded w-fit">
                              PIN: {u.pinCode || '1234'}
                            </div>
                          </div>
                        ) : (
                          <div>{u.username}</div>
                        )}
                      </td>

                      <td className="py-3 px-3 text-slate-600">
                        <div>{u.className || u.schoolName || 'Kim Liên A'}</div>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isLocked ? 'bg-red-100 text-red-700' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {isLocked ? 'Đã khóa' : 'Hoạt động'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {u.role === 'student' ? (
                            <button
                              onClick={() => handleResetPin(u)}
                              title="Đặt lại mã PIN"
                              className="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <KeyRound className="w-3 h-3" />
                              <span>Đổi PIN</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleResetPassword(u)}
                              title="Đặt lại mật khẩu"
                              className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Lock className="w-3 h-3" />
                              <span>Đổi MK</span>
                            </button>
                          )}

                          {u.id !== currentUser.id && (
                            <button
                              onClick={() => handleToggleLock(u)}
                              title={isLocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                              className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                                isLocked
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                            </button>
                          )}

                          {u.id !== currentUser.id && u.username !== 'admin' && (
                            <button
                              onClick={() => setUserToDelete(u)}
                              title={`Xóa tài khoản ${u.fullName}`}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 text-xs cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENTS & PIN MANAGEMENT */}
      {activeTab === 'students' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-800">
                Quản lý Học sinh & Mã PIN Lớp 4
              </h3>
              <p className="text-xs text-slate-500">
                Cấp mã định danh học sinh, mã PIN 4 số đăng nhập an toàn cho học sinh tiểu học.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBulkImportModal(true)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-amber-600" />
                <span>Nhập hàng loạt (Bulk Import)</span>
              </button>

              <button
                onClick={handleExportStudents}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất file CSV</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {users.filter(u => u.role === 'student').map((s) => (
              <div key={s.id} className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50/80 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{s.avatar || '👧'}</span>
                  <span className="font-mono text-xs font-bold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                    {s.studentCode || 'HS4A1-XX'}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{s.fullName}</h4>
                  <p className="text-xs text-slate-500">{s.className || 'Lớp 4A1'} • Kim Liên A</p>
                </div>
                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500">Mã PIN:</span>
                    <span className="font-mono font-bold text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                      {s.pinCode || '1234'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleResetPin(s)}
                      className="text-[11px] font-bold text-amber-700 hover:underline cursor-pointer"
                    >
                      Đổi PIN
                    </button>
                    <button
                      onClick={() => setUserToDelete(s)}
                      title={`Xóa học sinh ${s.fullName}`}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SCHOOLS & CLASSES */}
      {activeTab === 'schools' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="font-heading text-lg font-bold text-slate-800">
                Quản lý Trường học & Lớp học
              </h3>
              <p className="text-xs text-slate-500">
                Cơ cấu các trường học và lớp học tham gia chương trình viết văn tiểu học.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddSchoolModal(true)}
                className="px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm trường học</span>
              </button>

              <button
                onClick={() => setShowAddClassModal(true)}
                className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm lớp học</span>
              </button>
            </div>
          </div>

          {schools.length === 0 && classes.length === 0 ? (
            <div className="py-12 px-6 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <School className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-700 text-sm">
                Đã dọn dẹp dữ liệu thử nghiệm! Chưa có trường học hoặc lớp học mẫu.
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Hệ thống hiện đã sạch hoàn toàn. Quản trị viên có thể thêm trường học và lớp học thực tế để bắt đầu triển khai cho giáo viên và học sinh.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowAddSchoolModal(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm trường học</span>
                </button>
                <button
                  onClick={() => setShowAddClassModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm lớp học</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schools.map((school) => (
                <div key={school.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        Mã: {school.code}
                      </span>
                      <h4 className="font-heading font-bold text-slate-800 text-base mt-1">
                        {school.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{school.address || 'Chưa cập nhật địa chỉ'}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <School className="w-8 h-8 text-amber-500 shrink-0" />
                      <button
                        onClick={() => setSchoolToDelete(school)}
                        title={`Xóa trường ${school.name}`}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-600 space-y-1">
                    <div><strong>Email:</strong> {school.email || 'Chưa cập nhật'}</div>
                    <div><strong>Hotline:</strong> {school.phone || school.hotline || 'Chưa cập nhật'}</div>
                  </div>
                </div>
              ))}

              {classes.map((cls) => (
                <div key={cls.id} className="p-5 rounded-2xl border border-purple-200 bg-purple-50/40 space-y-3 relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                        Khối {cls.grade}
                      </span>
                      <h4 className="font-heading font-bold text-slate-800 text-base mt-1">
                        {cls.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{cls.schoolName || 'Chưa gán trường'}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-8 h-8 text-purple-500 shrink-0" />
                      <button
                        onClick={() => setClassToDelete(cls)}
                        title={`Xóa lớp ${cls.name}`}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-200/80 text-xs text-slate-600 flex items-center justify-between">
                    <div>
                      <strong>Giáo viên phụ trách:</strong>{' '}
                      <span className="font-semibold text-slate-700">
                        {cls.teacherNames && cls.teacherNames.length > 0 ? cls.teacherNames.join(', ') : 'Chưa phân công'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold text-slate-800">
              Nhật ký Hoạt động Hệ thống (Audit Logs)
            </h3>
            <p className="text-xs text-slate-500">
              Ghi nhận các sự kiện đăng nhập, đổi mật khẩu, nộp bài, chấm điểm và bảo mật.
            </p>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {log.action}
                    </span>
                    <span className="text-slate-600 font-semibold">{log.username}</span>
                  </div>
                  <p className="text-slate-600">{log.details}</p>
                </div>
                <div className="text-[10px] text-slate-400 shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(log.timestamp).toLocaleString('vi-VN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CLEAN DEMO DATA */}
      {activeTab === 'cleanup' && (
        <div className="bg-white p-6 rounded-3xl border border-rose-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold text-rose-900">
              Dọn dẹp & Chuẩn bị Môi trường Triển khai
            </h3>
            <p className="text-xs text-slate-500">
              Loại bỏ các dữ liệu mẫu, trường học và lớp học thử nghiệm, bài nộp giả lập trước khi bàn giao cho học sinh và giáo viên thật.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-rose-900">
                <strong className="text-sm">Xóa toàn bộ dữ liệu thử nghiệm, trường/lớp mẫu và tài khoản giả lập:</strong>
                <p>
                  Thao tác này sẽ làm sạch danh sách trường học và lớp học thử nghiệm, bài nộp thử nghiệm và các tài khoản demo giả lập (cô Thu Hà mẫu, BGH mẫu, học sinh mẫu).
                  Tài khoản Quản trị (Admin) và các tài khoản giáo viên thật đăng nhập bằng Google vẫn được bảo toàn nguyên vẹn.
                </p>
              </div>
            </div>

            <button
              onClick={handleCleanDemoData}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Thực hiện Dọn dẹp Dữ liệu Thử nghiệm ngay</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW USER */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-slate-800 text-base">
                Thêm tài khoản người dùng mới
              </h4>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Vai trò:</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                >
                  <option value="student">Học sinh (Student)</option>
                  <option value="teacher">Giáo viên (Teacher)</option>
                  <option value="school">Nhà trường (School)</option>
                  <option value="admin">Quản trị viên (Admin)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Họ và tên:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Lê Bảo Châu"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  required
                />
              </div>

              {newRole === 'student' ? (
                <>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mã PIN (4 số):</label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="1234"
                      value={newPinCode}
                      onChange={(e) => setNewPinCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono tracking-widest text-center font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Lớp:</label>
                    <input
                      type="text"
                      value={newClassName}
                      onChange={(e) => setNewClassName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tên đăng nhập:</label>
                    <input
                      type="text"
                      placeholder="lebaochau"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mật khẩu khởi tạo:</label>
                    <input
                      type="text"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email:</label>
                    <input
                      type="email"
                      placeholder="teacher@kimliena.edu.vn"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-500 font-bold text-white cursor-pointer"
                >
                  Tạo người dùng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BULK IMPORT */}
      {showBulkImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-slate-800 text-base">
                Nhập danh sách học sinh theo lớp
              </h4>
              <button
                onClick={() => setShowBulkImportModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Nhập theo định dạng mỗi dòng: <code>Họ và tên, Mã học sinh, Mã PIN 4 số</code>
            </p>

            <textarea
              rows={6}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              className="w-full p-3 text-xs font-mono rounded-xl border border-slate-300 focus:border-amber-500 outline-hidden"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowBulkImportModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 text-xs cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-white text-xs cursor-pointer"
              >
                Tiến hành Nhập vào Lớp 4A1
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE USER CONFIRMATION */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-base">
                  Xác nhận xóa tài khoản
                </h4>
                <p className="text-xs text-slate-500">
                  Hành động này không thể hoàn tác sau khi xác nhận.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Họ và tên:</span>
                <span className="font-bold text-slate-800">{userToDelete.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tên đăng nhập / Mã HS:</span>
                <span className="font-mono font-bold text-slate-700">
                  {userToDelete.username || userToDelete.studentCode || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vai trò:</span>
                <span className="font-semibold text-slate-700 uppercase">
                  {userToDelete.role === 'student' ? 'Học sinh' : userToDelete.role === 'teacher' ? 'Giáo viên' : userToDelete.role === 'school' ? 'Ban Giám Hiệu' : 'Admin'}
                </span>
              </div>
            </div>

            <p className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
              ⚠️ Xóa tài khoản sẽ đồng thời xóa toàn bộ thông tin đăng nhập của người dùng này khỏi hệ thống.
            </p>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setUserToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs cursor-pointer transition-colors"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteConfirmed}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-white text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20"
              >
                {isDeleting ? (
                  <span>Đang xóa...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xác nhận Xóa</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CLEAN DEMO DATA CONFIRMATION */}
      {showCleanConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-base">
                  Xác nhận Dọn dẹp Dữ liệu Thử nghiệm
                </h4>
                <p className="text-xs text-slate-500">
                  Làm sạch hệ thống để sẵn sàng bàn giao cho giáo viên và học sinh thật.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-xs space-y-2.5">
              <p className="font-bold text-rose-900">Những dữ liệu sẽ được dọn dẹp:</p>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Xóa toàn bộ các <strong>trường học và lớp học thử nghiệm mẫu</strong> (Kim Liên A, Lớp 4A1, Lớp 4A8).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Xóa toàn bộ các <strong>tài khoản thử nghiệm mẫu</strong> (cô Thu Hà mock, BGH mock, học sinh mẫu Mai Anh, Quốc Bảo,...).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Xóa toàn bộ <strong>bài nộp thử nghiệm</strong> giả lập trong hàng chờ chấm.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Giữ nguyên:</strong> Tài khoản Quản trị viên (Admin) và các tài khoản giáo viên thật đăng nhập bằng Google.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Giữ nguyên:</strong> Toàn bộ 35 tuần bài tập chuẩn sách Kết nối tri thức.</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                disabled={isCleaning}
                onClick={() => setShowCleanConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs cursor-pointer transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={isCleaning}
                onClick={handleCleanConfirmed}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-white text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20"
              >
                {isCleaning ? (
                  <span>Đang dọn dẹp...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Dọn dẹp & Làm sạch ngay</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD SCHOOL */}
      {showAddSchoolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-slate-800 text-base flex items-center gap-2">
                <School className="w-5 h-5 text-amber-500" />
                <span>Thêm trường học mới</span>
              </h4>
              <button
                onClick={() => setShowAddSchoolModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSchool} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên trường học *:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Trường Tiểu học Phúc Lợi"
                  value={newSchoolName}
                  onChange={(e) => setNewSchoolName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mã trường *:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: THPL"
                  value={newSchoolCode}
                  onChange={(e) => setNewSchoolCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono uppercase"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Địa chỉ:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Long Biên, Hà Nội"
                  value={newSchoolAddress}
                  onChange={(e) => setNewSchoolAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email trường:</label>
                  <input
                    type="email"
                    placeholder="c1phucloi@edu.vn"
                    value={newSchoolEmail}
                    onChange={(e) => setNewSchoolEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hotline / SĐT:</label>
                  <input
                    type="text"
                    placeholder="024 3827 1234"
                    value={newSchoolPhone}
                    onChange={(e) => setNewSchoolPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSchoolModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-white cursor-pointer"
                >
                  Tạo trường học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CLASS */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-slate-800 text-base flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Thêm lớp học mới</span>
              </h4>
              <button
                onClick={() => setShowAddClassModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên lớp *:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Lớp 4A1"
                  value={newClassInputName}
                  onChange={(e) => setNewClassInputName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Khối:</label>
                  <select
                    value={newClassGrade}
                    onChange={(e) => setNewClassGrade(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value={4}>Khối 4</option>
                    <option value={3}>Khối 3</option>
                    <option value={5}>Khối 5</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Trường học:</label>
                  <select
                    value={newClassSchoolId}
                    onChange={(e) => setNewClassSchoolId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  >
                    <option value="">-- Chọn trường (tùy chọn) --</option>
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Giáo viên phụ trách:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cô Hoàng Thị Nhung"
                  value={newClassTeacherName}
                  onChange={(e) => setNewClassTeacherName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 font-bold text-white cursor-pointer"
                >
                  Tạo lớp học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE SCHOOL CONFIRMATION */}
      {schoolToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-base">
                  Xác nhận xóa trường học
                </h4>
                <p className="text-xs text-slate-500">
                  Hành động này sẽ xóa trường học và các lớp trực thuộc.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Tên trường:</span>
                <span className="font-bold text-slate-800">{schoolToDelete.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mã trường:</span>
                <span className="font-mono font-bold text-slate-700">{schoolToDelete.code}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setSchoolToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs cursor-pointer transition-colors"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteSchoolConfirmed}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-white text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20"
              >
                {isDeleting ? (
                  <span>Đang xóa...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xác nhận Xóa trường</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CLASS CONFIRMATION */}
      {classToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-900 text-base">
                  Xác nhận xóa lớp học
                </h4>
                <p className="text-xs text-slate-500">
                  Lớp học sẽ bị gỡ bỏ khỏi cơ cấu của trường.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Tên lớp:</span>
                <span className="font-bold text-slate-800">{classToDelete.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Khối:</span>
                <span className="font-bold text-slate-700">Khối {classToDelete.grade}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setClassToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs cursor-pointer transition-colors"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteClassConfirmed}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-white text-xs cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20"
              >
                {isDeleting ? (
                  <span>Đang xóa...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xác nhận Xóa lớp</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
