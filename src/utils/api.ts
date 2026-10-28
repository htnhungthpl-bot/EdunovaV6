import { UserProfile, DbSchool, DbClass, DbAuditLog } from '../types';

const TOKEN_KEY = 'edunova_auth_token';
const USER_KEY = 'edunova_auth_user';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getStoredUser(): UserProfile | null {
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setStoredUser(user: UserProfile | null) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

export function hasToken(): boolean {
  return !!getStoredToken();
}

// Client-Side Fallback for static hosting (Vercel, Netlify, GitHub Pages)
function handleStaticFallback<T>(endpoint: string, options: RequestInit = {}): T {
  const method = (options.method || 'GET').toUpperCase();
  let body: any = {};
  if (options.body && typeof options.body === 'string') {
    try {
      body = JSON.parse(options.body);
    } catch {
      body = {};
    }
  }

  // 1. Auth Login
  if (endpoint === '/api/auth/login' && method === 'POST') {
    const { role, username, password, fullName, className, pinCode } = body;
    
    if (role === 'student') {
      const studentName = (fullName || '').trim();
      const pin = (pinCode || '').trim();
      if (!studentName) {
        throw new Error('Vui lòng nhập họ và tên học sinh.');
      }
      if (!pin || pin.length < 4) {
        throw new Error('Mã PIN phải có 4 chữ số.');
      }

      const localStudentsKey = 'edunova_local_students';
      let currentStudents: any[] = [];
      try {
        const saved = localStorage.getItem(localStudentsKey);
        currentStudents = saved ? JSON.parse(saved) : [];
      } catch {
        currentStudents = [];
      }

      const matchStudent = currentStudents.find(
        (s: any) => s.fullName?.toLowerCase().trim() === studentName.toLowerCase()
      );

      if (matchStudent) {
        if (matchStudent.pinCode && matchStudent.pinCode !== pin) {
          throw new Error('Mã PIN không chính xác. Hãy hỏi lại cô giáo chủ nhiệm nhé!');
        }
        const token = 'static-token-student-' + Date.now();
        return { token, user: matchStudent } as unknown as T;
      }

      const code = 'HS-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      const user = {
        id: 'student-' + encodeURIComponent(studentName).replace(/%/g, '').toLowerCase().slice(0, 15),
        fullName: studentName,
        username: studentName.toLowerCase().replace(/\s+/g, '_'),
        role: 'student',
        className: className || 'Lớp 4A8',
        schoolName: 'Trường Tiểu học Kim Liên A',
        avatar: '🎒',
        studentCode: code,
        pinCode: pin,
        starsCount: 42,
        streakDays: 4,
        completedEssays: 6,
      };
      currentStudents.push(user);
      localStorage.setItem(localStudentsKey, JSON.stringify(currentStudents));
      const token = 'static-token-student-' + Date.now();
      return { token, user } as unknown as T;
    }

    if (role === 'admin') {
      const u = (username || '').trim().toLowerCase();
      const p = (password || '').trim();
      const storedAdminPwd = localStorage.getItem('edunova_admin_pwd') || '123456';
      
      if ((u === 'admin' || u === 'admin@edunova.edu.vn') && p === storedAdminPwd) {
        const mustChange = !localStorage.getItem('edunova_admin_pwd');
        const user = {
          id: 'user-admin-01',
          fullName: 'Quản trị viên Hệ thống (Admin)',
          username: 'admin',
          role: 'admin',
          schoolName: 'EDUNOVA Hub / Phòng GD&ĐT',
          className: 'Quản trị viên toàn hệ thống',
          avatar: '🛡️',
          email: 'admin@edunova.edu.vn',
          mustChangePassword: mustChange,
        };
        const token = 'static-token-admin-' + Date.now();
        return { token, user, mustChangePassword: mustChange } as unknown as T;
      }
      throw new Error('Tài khoản hoặc mật khẩu Quản trị viên không chính xác.');
    }

    if (role === 'teacher') {
      const u = (username || '').trim().toLowerCase();
      const p = (password || '').trim();

      const registeredTeachers: any[] = JSON.parse(localStorage.getItem('edunova_registered_teachers') || '[]');
      const registered = registeredTeachers.find(t => 
        (t.username?.toLowerCase() === u || t.email?.toLowerCase() === u) && t.password === p
      );

      if (registered) {
        const token = 'static-token-teacher-' + Date.now();
        return { token, user: registered } as unknown as T;
      }

      if ((u === 'cothuha' || u === 'nguyenthuha.kimliena@gmail.com') && p === 'giaovien@123') {
        const user = {
          id: 'teacher-thu-ha',
          fullName: 'Cô Nguyễn Thu Hà',
          username: 'cothuha',
          role: 'teacher',
          schoolName: 'Trường Tiểu học Kim Liên A',
          className: 'Lớp 4A1',
          avatar: '👩‍🏫',
          email: 'nguyenthuha.kimliena@gmail.com',
        };
        const token = 'static-token-teacher-' + Date.now();
        return { token, user } as unknown as T;
      }

      if ((u === 'bgh_kimlien_a' || u === 'bgh@kimliena.edu.vn') && p === 'school@123') {
        const user = {
          id: 'user-school-01',
          fullName: 'Ban Giám Hiệu – TH Kim Liên A',
          username: 'bgh_kimlien_a',
          role: 'teacher',
          schoolName: 'Trường Tiểu học Kim Liên A',
          className: 'Khối 4',
          avatar: '🏫',
          email: 'bgh@kimliena.edu.vn',
        };
        const token = 'static-token-school-' + Date.now();
        return { token, user } as unknown as T;
      }

      if ((u === 'htnhung_thpl' || u === 'htnhung.thpl@gmail.com' || u === 'hoangnhung.thpl@gmail.com') && (p === '123456' || p === 'giaovien@123')) {
        const user = {
          id: 'teacher-1792655672625-x1rw',
          fullName: 'Cô Hoàng Thị Nhung',
          username: 'htnhung_thpl',
          role: 'teacher',
          schoolName: 'Trường Tiểu học Kim Liên A',
          className: 'Lớp 4A8',
          avatar: '👩‍🏫',
          email: 'hoangnhung.thpl@gmail.com',
        };
        const token = 'static-token-teacher-' + Date.now();
        return { token, user } as unknown as T;
      }

      throw new Error('Tên đăng nhập hoặc mật khẩu Giáo viên không chính xác.');
    }
  }

  // 2. Google Teacher Auth
  if (endpoint === '/api/auth/google' && method === 'POST') {
    const email = (body.email || '').trim().toLowerCase();
    const registeredTeachers: any[] = JSON.parse(localStorage.getItem('edunova_registered_teachers') || '[]');
    const existing = registeredTeachers.find(t => t.email?.toLowerCase() === email);

    if (existing) {
      return { token: 'static-token-google-' + Date.now(), user: existing, isNew: false } as unknown as T;
    }

    if (email === 'htnhung.thpl@gmail.com' || email === 'hoangnhung.thpl@gmail.com') {
      const user = {
        id: 'teacher-1792655672625-x1rw',
        fullName: 'Cô Hoàng Thị Nhung',
        username: 'htnhung_thpl',
        role: 'teacher',
        schoolName: 'Trường Tiểu học Kim Liên A',
        className: 'Lớp 4A8',
        avatar: '👩‍🏫',
        email: email,
      };
      return { token: 'static-token-google-' + Date.now(), user, isNew: false } as unknown as T;
    }

    return { isNew: true, email } as unknown as T;
  }

  // 3. Google Register
  if (endpoint === '/api/auth/google-register' && method === 'POST') {
    const { email, fullName, className, schoolName } = body;
    const user = {
      id: 'teacher-' + Date.now(),
      fullName: (fullName || 'Giáo viên').trim(),
      username: (email || '').split('@')[0],
      role: 'teacher',
      className: className || 'Lớp 4A8',
      schoolName: schoolName || 'Trường Tiểu học Kim Liên A',
      avatar: '👩‍🏫',
      email: email,
    };
    const registeredTeachers: any[] = JSON.parse(localStorage.getItem('edunova_registered_teachers') || '[]');
    registeredTeachers.push(user);
    localStorage.setItem('edunova_registered_teachers', JSON.stringify(registeredTeachers));
    const token = 'static-token-google-' + Date.now();
    return { token, user, message: 'Đăng ký thông tin Giáo viên thành công!' } as unknown as T;
  }

  // 4. Change Password
  if (endpoint === '/api/auth/change-password' && method === 'POST') {
    const { newPassword } = body;
    if (newPassword && newPassword.length >= 6) {
      localStorage.setItem('edunova_admin_pwd', newPassword);
      return { success: true, message: 'Đã đổi mật khẩu an toàn thành công!' } as unknown as T;
    }
    throw new Error('Mật khẩu mới phải có tối thiểu 6 kí tự.');
  }

  // 5. Reset Admin Password
  if (endpoint === '/api/auth/reset-admin-password' && method === 'POST') {
    localStorage.removeItem('edunova_admin_pwd');
    return { success: true, message: 'Mật khẩu tài khoản admin đã được đặt lại thành công.', defaultPassword: '123456', username: 'admin' } as unknown as T;
  }

  // 6. Classes
  if (endpoint === '/api/classes') {
    const defaultClasses = [
      { id: 'class-4a8', name: 'Lớp 4A8', grade: 4, schoolId: 'school-1', schoolName: 'Trường Tiểu học Kim Liên A', teacherIds: ['teacher-1792655672625-x1rw'], teacherNames: ['Cô Hoàng Thị Nhung'], createdAt: new Date().toISOString() },
      { id: 'class-4a1', name: 'Lớp 4A1', grade: 4, schoolId: 'school-1', schoolName: 'Trường Tiểu học Kim Liên A', teacherIds: [], teacherNames: [], createdAt: new Date().toISOString() },
      { id: 'class-4a2', name: 'Lớp 4A2', grade: 4, schoolId: 'school-1', schoolName: 'Trường Tiểu học Kim Liên A', teacherIds: [], teacherNames: ['Thầy Lê Văn Tuấn'], createdAt: new Date().toISOString() },
      { id: 'class-4a3', name: 'Lớp 4A3', grade: 4, schoolId: 'school-1', schoolName: 'Trường Tiểu học Kim Liên A', teacherIds: [], teacherNames: ['Cô Trần Thị Hoa'], createdAt: new Date().toISOString() },
    ];
    const saved = localStorage.getItem('edunova_local_classes');
    return (saved ? JSON.parse(saved) : defaultClasses) as unknown as T;
  }

  // 7. Schools
  if (endpoint === '/api/schools') {
    const defaultSchools = [
      { id: 'school-1', name: 'Trường Tiểu học Kim Liên A', code: 'THKLA', address: 'Đống Đa, Hà Nội', email: 'tieuhockimliena@edu.vn', hotline: '024 3852 1234', createdAt: new Date().toISOString() }
    ];
    return defaultSchools as unknown as T;
  }

  // 8. Challenges
  if (endpoint.startsWith('/api/challenges/progress')) {
    const userId = endpoint.split('userId=')[1] || 'guest';
    const raw = localStorage.getItem(`edunova_challenges_v1_${userId}`);
    return { success: true, progress: raw ? JSON.parse(raw) : null } as unknown as T;
  }

  if (endpoint === '/api/challenges/sync' && method === 'POST') {
    const userId = body.userId || 'guest';
    localStorage.setItem(`edunova_challenges_v1_${userId}`, JSON.stringify(body));
    return { success: true, message: 'Đã lưu tiến độ thử thách thành công!' } as unknown as T;
  }

  // 9. Students Bulk Import Fallback
  if (endpoint === '/api/students/bulk-import' && method === 'POST') {
    const rawList = body.students || [];
    const targetClass = body.className || 'Lớp 4A8';
    const targetSchool = 'Trường Tiểu học Kim Liên A';
    const classTag = targetClass.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '4A8';

    const localStudentsKey = 'edunova_local_students';
    let currentList: any[] = [];
    try {
      const saved = localStorage.getItem(localStudentsKey);
      currentList = saved ? JSON.parse(saved) : [];
    } catch {
      currentList = [];
    }

    const created: any[] = [];
    const updated: any[] = [];
    const now = new Date().toISOString();

    for (let i = 0; i < rawList.length; i++) {
      const item = rawList[i];
      if (!item) continue;
      const fullName = (typeof item === 'string' ? item : item.fullName || item.name || item['Họ và tên'] || item['Họ tên'])?.trim();
      if (!fullName) continue;

      let studentCode = (item.studentCode || item.code || item['Mã học sinh'] || item['Mã HS'] || '').trim();
      let pinCode = (item.pinCode || item.pin || item['Mã PIN'] || item['PIN'] || '1234').toString().trim().replace(/\D/g, '').slice(0, 4) || '1234';

      const existingIndex = currentList.findIndex(s => 
        s.role === 'student' && 
        (s.fullName.toLowerCase() === fullName.toLowerCase() || (studentCode && s.studentCode === studentCode))
      );

      if (existingIndex !== -1) {
        currentList[existingIndex].pinCode = pinCode;
        if (studentCode) currentList[existingIndex].studentCode = studentCode;
        currentList[existingIndex].updatedAt = now;
        updated.push(currentList[existingIndex]);
      } else {
        const nextIdx = currentList.length + 1;
        if (!studentCode) {
          studentCode = `HS${classTag}-${nextIdx.toString().padStart(2, '0')}`;
        }
        const newStudent = {
          id: `student-local-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          fullName,
          username: `hs_${classTag.toLowerCase()}_${nextIdx}`,
          role: 'student',
          className: targetClass,
          schoolName: targetSchool,
          studentCode,
          pinCode,
          status: 'active',
          avatar: Math.random() > 0.5 ? '👧' : '👦',
          createdAt: now,
          updatedAt: now,
        };
        currentList.push(newStudent);
        created.push(newStudent);
      }
    }

    localStorage.setItem(localStudentsKey, JSON.stringify(currentList));

    return {
      success: true,
      message: `Đã cấp mới ${created.length} học sinh và cập nhật ${updated.length} học sinh thành công!`,
      createdCount: created.length,
      updatedCount: updated.length,
      students: created.concat(updated),
    } as unknown as T;
  }

  // 9.5 Submissions Fallback
  if (endpoint === '/api/submissions') {
    const localSubsKey = 'edunova_local_submissions';
    const saved = localStorage.getItem(localSubsKey);
    let subs: any[] = saved ? JSON.parse(saved) : [];

    if (method === 'GET') {
      const user = getStoredUser();
      if (user?.role === 'student') {
        return subs.filter(s => s.studentId === user.id) as unknown as T;
      }
      if (user?.role === 'teacher') {
        const teacherClass = (user.className || '').trim().toLowerCase();
        return subs.filter(s => s.studentClass && s.studentClass.trim().toLowerCase() === teacherClass) as unknown as T;
      }
      return subs as unknown as T;
    }

    if (method === 'POST') {
      const user = getStoredUser();
      const newSub = {
        id: `sub-local-${Date.now()}`,
        lessonId: body.lessonId || 'lesson-01',
        lessonTitle: body.lessonTitle || 'Bài làm văn lớp 4',
        content: body.content,
        wordCount: body.wordCount || 150,
        studentId: body.studentId || user?.id || `student-${Date.now()}`,
        studentName: body.studentName || user?.name || 'Học sinh Lớp 4A8',
        studentCode: body.studentCode || user?.studentCode || 'HS4A8-01',
        studentClass: body.studentClass || user?.className || 'Lớp 4A8',
        studentAvatar: body.studentAvatar || user?.avatar || '🎒',
        submittedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('vi-VN'),
        status: 'pending',
        versionCount: 1,
        isPublishedToStudent: false,
        resubmittedCount: 0,
      };
      subs.unshift(newSub);
      localStorage.setItem(localSubsKey, JSON.stringify(subs));
      return newSub as unknown as T;
    }
  }

  if (endpoint.includes('/api/submissions/') && endpoint.endsWith('/review') && method === 'POST') {
    const localSubsKey = 'edunova_local_submissions';
    const saved = localStorage.getItem(localSubsKey);
    let subs: any[] = saved ? JSON.parse(saved) : [];
    const id = endpoint.split('/api/submissions/')[1].split('/review')[0];
    const sub = subs.find(s => s.id === id);
    if (sub) {
      if (body.score !== undefined) sub.score = body.score;
      if (body.teacherComment !== undefined) sub.teacherComment = body.teacherComment;
      if (body.rubricScores !== undefined) sub.rubricScores = body.rubricScores;
      sub.isPublishedToStudent = !!body.isPublished;
      sub.status = body.isPublished ? 'graded' : 'pending';
      localStorage.setItem(localSubsKey, JSON.stringify(subs));
    }
    return { success: true } as unknown as T;
  }

  // 10. Users CRUD Fallback
  if (endpoint === '/api/users') {
    if (method === 'GET') {
      const localStudentsKey = 'edunova_local_students';
      let currentStudents: any[] = [];
      try {
        const saved = localStorage.getItem(localStudentsKey);
        if (saved) {
          currentStudents = JSON.parse(saved);
        } else {
          // Default initial students
          currentStudents = [
            { id: 'st-01', fullName: 'Nguyễn Mai Anh', role: 'student', studentCode: 'HS4A8-01', pinCode: '1234', className: 'Lớp 4A8', schoolName: 'Trường Tiểu học Kim Liên A', avatar: '👧', status: 'active' },
            { id: 'st-02', fullName: 'Trần Quốc Bảo', role: 'student', studentCode: 'HS4A8-02', pinCode: '1234', className: 'Lớp 4A8', schoolName: 'Trường Tiểu học Kim Liên A', avatar: '👦', status: 'active' },
            { id: 'st-03', fullName: 'Lê Hoàng Yến', role: 'student', studentCode: 'HS4A8-03', pinCode: '1234', className: 'Lớp 4A8', schoolName: 'Trường Tiểu học Kim Liên A', avatar: '👧', status: 'active' },
          ];
          localStorage.setItem(localStudentsKey, JSON.stringify(currentStudents));
        }
      } catch {
        currentStudents = [];
      }
      return currentStudents as unknown as T;
    }

    if (method === 'POST') {
      const localStudentsKey = 'edunova_local_students';
      const saved = localStorage.getItem(localStudentsKey);
      const currentStudents: any[] = saved ? JSON.parse(saved) : [];
      const newUser = {
        id: `student-local-${Date.now()}`,
        fullName: body.fullName || 'Học sinh mới',
        role: body.role || 'student',
        studentCode: body.studentCode || `HS4A8-${(currentStudents.length + 1).toString().padStart(2, '0')}`,
        pinCode: body.pinCode || '1234',
        className: body.className || 'Lớp 4A8',
        schoolName: body.schoolName || 'Trường Tiểu học Kim Liên A',
        avatar: '🎒',
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      currentStudents.push(newUser);
      localStorage.setItem(localStudentsKey, JSON.stringify(currentStudents));
      return newUser as unknown as T;
    }
  }

  if (endpoint.startsWith('/api/users/') && method === 'PUT') {
    const id = endpoint.split('/api/users/')[1];
    const localStudentsKey = 'edunova_local_students';
    const saved = localStorage.getItem(localStudentsKey);
    const currentStudents: any[] = saved ? JSON.parse(saved) : [];
    const idx = currentStudents.findIndex(s => s.id === id);
    if (idx !== -1) {
      currentStudents[idx] = { ...currentStudents[idx], ...body, updatedAt: new Date().toISOString() };
      localStorage.setItem(localStudentsKey, JSON.stringify(currentStudents));
      return currentStudents[idx] as unknown as T;
    }
  }

  if (endpoint.startsWith('/api/users/') && method === 'DELETE') {
    const id = endpoint.split('/api/users/')[1];
    const localStudentsKey = 'edunova_local_students';
    const saved = localStorage.getItem(localStudentsKey);
    let currentStudents: any[] = saved ? JSON.parse(saved) : [];
    currentStudents = currentStudents.filter(s => s.id !== id);
    localStorage.setItem(localStudentsKey, JSON.stringify(currentStudents));
    return { success: true, message: 'Đã xóa học sinh thành công' } as unknown as T;
  }

  if (method === 'GET') {
    return [] as unknown as T;
  }

  return { success: true } as unknown as T;
}

// Universal fetch with Bearer token & seamless static fallback for Vercel/Netlify
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const user = getStoredUser();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (user?.role === 'admin') {
    headers['x-admin-request'] = 'true';
  }

  try {
    const res = await fetch(endpoint, {
      ...options,
      headers,
    });

    const contentType = res.headers.get('content-type') || '';
    
    // Check if the response is HTML (which happens on Vercel/Netlify when SPA rewrites unknown /api/* routes to index.html)
    if (contentType.includes('text/html') || res.status === 404 || res.status === 405) {
      return handleStaticFallback<T>(endpoint, options);
    }

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 404 || res.status === 502) {
        return handleStaticFallback<T>(endpoint, options);
      }
      throw new Error(data?.error || `Lỗi máy chủ (${res.status})`);
    }

    return data as T;
  } catch (err: any) {
    // If network error (e.g. backend server not present on Vercel/Netlify static deployment)
    try {
      return handleStaticFallback<T>(endpoint, options);
    } catch (fallbackErr: any) {
      throw fallbackErr || err;
    }
  }
}


// ===================== GOOGLE SHEETS APPS SCRIPT INTEGRATION =====================

export const GOOGLE_SHEETS_SCRIPT_URL = 
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GOOGLE_SHEETS_SCRIPT_URL) ||
  (typeof process !== 'undefined' && process.env?.GOOGLE_SHEETS_SCRIPT_URL) ||
  'https://script.google.com/macros/s/AKfycbxCIpftvK5Fz8Gm_H7k4VGxuDSpdM8UhLgLwuxF8q4CrzSfk7V8vPJfZ43iObXA4bnKhg/exec';

/**
 * Lấy dữ liệu từ Google Sheets qua Google Apps Script Web App
 * @param sheetName Tên sheet (ví dụ: 'USERS', 'POSTS', 'CLASSES', 'STUDENT_PROFILES'...)
 */
export async function getGoogleData(sheetName: string): Promise<{ success: boolean; rows: any[]; error?: string }> {
  const url = GOOGLE_SHEETS_SCRIPT_URL;
  if (!url) {
    throw new Error('Chưa cấu hình GOOGLE_SHEETS_SCRIPT_URL trong .env');
  }

  const cleanSheet = sheetName.trim();

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'getRows',
        sheet: cleanSheet,
      }),
      redirect: 'follow',
    });

    if (!res.ok) {
      throw new Error(`Google Apps Script trả về mã lỗi HTTP: ${res.status}`);
    }

    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      if (text.includes('Script function not found')) {
        throw new Error('Google Apps Script thiếu hàm doGet hoặc doPost. Vui lòng kiểm tra lại bản triển khai Web App.');
      }
      throw new Error(`Dữ liệu nhận được không phải JSON: ${text.slice(0, 100)}`);
    }

    if (data.success === false) {
      throw new Error(data.error || `Lỗi khi lấy dữ liệu sheet ${cleanSheet}`);
    }

    const rows = Array.isArray(data.rows) ? data.rows : (Array.isArray(data.data) ? data.data : []);
    return { success: true, rows };
  } catch (err: any) {
    // Thử lại qua backend proxy nếu trình duyệt bị giới hạn CORS
    try {
      const proxyRes = await fetch('/api/sheets/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'getRows',
          sheet: cleanSheet,
          scriptUrl: url,
        }),
      });
      if (proxyRes.ok) {
        const proxyData = await proxyRes.json();
        return { success: true, rows: proxyData.rows || [] };
      }
    } catch {
      // Fallback
    }

    console.error(`[getGoogleData] Lỗi đọc sheet "${cleanSheet}":`, err);
    throw new Error(err.message || `Không thể kết nối tới Google Sheets sheet ${cleanSheet}`);
  }
}

/**
 * Gửi và thêm dữ liệu vào Google Sheets qua Google Apps Script Web App
 * @param sheetName Tên sheet (ví dụ: 'POSTS', 'USERS', 'POST_HISTORY'...)
 * @param data Dữ liệu (Object hoặc mảng giá trị của dòng)
 */
export async function postGoogleData(sheetName: string, data: any): Promise<{ success: boolean; message?: string; error?: string; result?: any }> {
  const url = GOOGLE_SHEETS_SCRIPT_URL;
  if (!url) {
    throw new Error('Chưa cấu hình GOOGLE_SHEETS_SCRIPT_URL trong .env');
  }

  const cleanSheet = sheetName.trim();
  const rowValues = Array.isArray(data) 
    ? data 
    : (typeof data === 'object' && data !== null ? Object.values(data) : [data]);

  const payload = {
    action: 'appendRow',
    sheet: cleanSheet,
    data: data,
    row: rowValues,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    if (!res.ok) {
      throw new Error(`Google Apps Script trả về mã lỗi HTTP: ${res.status}`);
    }

    const text = await res.text();
    let resJson: any;
    try {
      resJson = JSON.parse(text);
    } catch {
      if (text.includes('Script function not found')) {
        throw new Error('Google Apps Script thiếu hàm doPost. Vui lòng kiểm tra lại bản triển khai Web App.');
      }
      throw new Error(`Phản hồi không phải JSON hợp lệ: ${text.slice(0, 100)}`);
    }

    if (resJson.success === false) {
      throw new Error(resJson.error || `Lỗi ghi dữ liệu vào sheet ${cleanSheet}`);
    }

    return {
      success: true,
      message: resJson.message || 'Đã ghi dữ liệu thành công vào Google Sheets',
      result: resJson,
    };
  } catch (err: any) {
    // Thử lại qua backend proxy nếu trình duyệt bị giới hạn CORS
    try {
      const proxyRes = await fetch('/api/sheets/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          scriptUrl: url,
        }),
      });
      if (proxyRes.ok) {
        const proxyData = await proxyRes.json();
        return {
          success: true,
          message: proxyData.message || 'Đã ghi dữ liệu thành công qua proxy',
          result: proxyData,
        };
      }
    } catch {
      // Fallback
    }

    console.error(`[postGoogleData] Lỗi ghi sheet "${cleanSheet}":`, err);
    throw new Error(err.message || `Không thể gửi dữ liệu lên Google Sheets sheet ${cleanSheet}`);
  }
}

export const api = {
  hasToken(): boolean {
    return !!getStoredToken();
  },
  // Auth
  async login(credentials: {
    role: string;
    username?: string;
    password?: string;
    fullName?: string;
    className?: string;
    pinCode?: string;
  }): Promise<{ token: string; user: any; mustChangePassword?: boolean }> {
    const res = await apiRequest<{ token: string; user: any; mustChangePassword?: boolean }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setStoredToken(res.token);
    const profile: UserProfile = {
      id: res.user.id,
      name: res.user.fullName,
      username: res.user.username,
      role: res.user.role,
      school: res.user.schoolName || 'Trường Tiểu học Kim Liên A',
      schoolId: res.user.schoolId,
      className: res.user.className || 'Lớp 4A8',
      classId: res.user.classId,
      avatar: res.user.avatar || (res.user.role === 'teacher' ? '👩‍🏫' : '🎒'),
      email: res.user.email,
      studentCode: res.user.studentCode,
      pinCode: res.user.pinCode,
      mustChangePassword: res.mustChangePassword,
    };
    setStoredUser(profile);
    return res;
  },

  async loginWithGoogle(profileData: {
    email: string;
    name?: string;
    fullName?: string;
    className?: string;
    schoolName?: string;
    googleId?: string;
    avatar?: string;
  }): Promise<{ token?: string; user?: any; isNew?: boolean; email?: string; message?: string }> {
    const res = await apiRequest<{ token?: string; user?: any; isNew?: boolean; email?: string; message?: string }>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
    if (res.token && res.user) {
      setStoredToken(res.token);
      const profile: UserProfile = {
        id: res.user.id,
        name: res.user.fullName,
        username: res.user.username,
        role: res.user.role,
        school: res.user.schoolName || 'Trường Tiểu học',
        schoolId: res.user.schoolId,
        className: res.user.className || 'Lớp 4A8',
        classId: res.user.classId,
        avatar: res.user.avatar || '👩‍🏫',
        email: res.user.email,
        mustChangePassword: false,
      };
      setStoredUser(profile);
    }
    return res;
  },

  async registerWithGoogle(teacherData: {
    email: string;
    fullName: string;
    className: string;
    schoolName: string;
    avatar?: string;
  }): Promise<{ token: string; user: any; message: string }> {
    const res = await apiRequest<{ token: string; user: any; message: string }>('/api/auth/google-register', {
      method: 'POST',
      body: JSON.stringify(teacherData),
    });
    if (res.token && res.user) {
      setStoredToken(res.token);
      const profile: UserProfile = {
        id: res.user.id,
        name: res.user.fullName,
        username: res.user.username,
        role: res.user.role,
        school: res.user.schoolName || teacherData.schoolName,
        schoolId: res.user.schoolId,
        className: res.user.className || teacherData.className,
        classId: res.user.classId,
        avatar: res.user.avatar || '👩‍🏫',
        email: res.user.email,
        mustChangePassword: false,
      };
      setStoredUser(profile);
    }
    return res;
  },

  async getMe(): Promise<UserProfile | null> {
    try {
      const res = await apiRequest<{ user: any }>('/api/auth/me');
      const profile: UserProfile = {
        id: res.user.id,
        name: res.user.fullName,
        username: res.user.username,
        role: res.user.role,
        school: res.user.schoolName || 'Trường Tiểu học Kim Liên A',
        schoolId: res.user.schoolId,
        className: res.user.className || 'Lớp 4A8',
        classId: res.user.classId,
        avatar: res.user.avatar || '🎒',
        email: res.user.email,
        studentCode: res.user.studentCode,
        pinCode: res.user.pinCode,
        mustChangePassword: res.user.mustChangePassword,
      };
      setStoredUser(profile);
      return profile;
    } catch {
      return null;
    }
  },

  async changePassword(oldPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    return apiRequest<{ success: boolean; message: string }>('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },

  async resetAdminPassword(): Promise<{ success: boolean; message: string; defaultPassword: string; username: string }> {
    return apiRequest<{ success: boolean; message: string; defaultPassword: string; username: string }>('/api/auth/reset-admin-password', {
      method: 'POST',
    });
  },

  logout() {
    setStoredToken(null);
    setStoredUser(null);
  },

  // Users & Students
  async getUsers(params?: { className?: string }): Promise<any[]> {
    const q = params?.className ? `?className=${encodeURIComponent(params.className)}` : '';
    return apiRequest<any[]>(`/api/users${q}`);
  },

  async createUser(userData: any): Promise<any> {
    return apiRequest<any>('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async updateUser(id: string, updateData: any): Promise<any> {
    return apiRequest<any>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    return apiRequest<{ success: boolean; message: string }>(`/api/users/${id}`, {
      method: 'DELETE',
    });
  },

  async bulkImportStudents(students: any[], classId?: string, className?: string): Promise<any> {
    return apiRequest<any>('/api/students/bulk-import', {
      method: 'POST',
      body: JSON.stringify({ students, classId, className }),
    });
  },

  // Schools & Classes
  async getSchools(): Promise<DbSchool[]> {
    return apiRequest<DbSchool[]>('/api/schools');
  },

  async createSchool(schoolData: {
    name: string;
    code: string;
    address?: string;
    email?: string;
    phone?: string;
    hotline?: string;
  }): Promise<DbSchool> {
    return apiRequest<DbSchool>('/api/schools', {
      method: 'POST',
      body: JSON.stringify(schoolData),
    });
  },

  async deleteSchool(id: string): Promise<{ success: boolean; message: string }> {
    return apiRequest<{ success: boolean; message: string }>(`/api/schools/${id}`, {
      method: 'DELETE',
    });
  },

  async getClasses(): Promise<DbClass[]> {
    return apiRequest<DbClass[]>('/api/classes');
  },

  async createClass(classData: {
    name: string;
    grade?: number;
    schoolId?: string;
    schoolName?: string;
    teacherName?: string;
    teacherIds?: string[];
  }): Promise<DbClass> {
    return apiRequest<DbClass>('/api/classes', {
      method: 'POST',
      body: JSON.stringify(classData),
    });
  },

  async deleteClass(id: string): Promise<{ success: boolean; message: string }> {
    return apiRequest<{ success: boolean; message: string }>(`/api/classes/${id}`, {
      method: 'DELETE',
    });
  },

  // Assignments
  async getAssignments(): Promise<any[]> {
    return apiRequest<any[]>('/api/assignments');
  },

  async createAssignment(assignmentData: any): Promise<any> {
    return apiRequest<any>('/api/assignments', {
      method: 'POST',
      body: JSON.stringify(assignmentData),
    });
  },

  // Submissions
  async getSubmissions(): Promise<any[]> {
    return apiRequest<any[]>('/api/submissions');
  },

  async submitEssay(submission: {
    assignmentId?: string;
    lessonId: string;
    lessonTitle: string;
    content: string;
    wordCount: number;
    studentId?: string;
    studentName?: string;
    studentClass?: string;
    studentCode?: string;
    studentAvatar?: string;
  }): Promise<any> {
    const user = getStoredUser();
    const payload = {
      ...submission,
      studentId: submission.studentId || user?.id,
      studentName: submission.studentName || user?.name,
      studentClass: submission.studentClass || user?.className || 'Lớp 4A8',
      studentCode: submission.studentCode || user?.studentCode,
      studentAvatar: submission.studentAvatar || user?.avatar || '🎒',
    };
    return apiRequest<any>('/api/submissions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async reviewSubmission(id: string, reviewData: {
    score?: number;
    teacherComment?: string;
    rubricScores?: any[];
    isPublished: boolean;
    stickersEarned?: string[];
  }): Promise<any> {
    return apiRequest<any>(`/api/submissions/${id}/review`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  async requestRevision(id: string, revisionNotes: string): Promise<any> {
    return apiRequest<any>(`/api/submissions/${id}/request-revision`, {
      method: 'POST',
      body: JSON.stringify({ revisionNotes }),
    });
  },

  // Diamond Notes
  async getDiamondNotes(): Promise<any[]> {
    return apiRequest<any[]>('/api/diamond-notes');
  },

  async createDiamondNote(note: {
    title: string;
    content: string;
    category: string;
    tags?: string[];
  }): Promise<any> {
    return apiRequest<any>('/api/diamond-notes', {
      method: 'POST',
      body: JSON.stringify(note),
    });
  },

  async deleteDiamondNote(id: string): Promise<any> {
    return apiRequest<any>(`/api/diamond-notes/${id}`, {
      method: 'DELETE',
    });
  },

  // AI Coach (Gemini 3.8 Flash via server)
  async callAiCoach(params: {
    mode: 'goi_mo_tim_y' | 'lam_ro_cau' | 'phat_trien_chi_tiet' | 'lap_dan_y' | 'the_hien_cam_xuc' | 'doc_lai_gop_y' | 'tong_hop_lop_hoc';
    prompt?: string;
    currentText?: string;
    lessonTitle?: string;
    genre?: string;
  }): Promise<{ isOfflineGuidance: boolean; quota?: any; response: string }> {
    return apiRequest<{ isOfflineGuidance: boolean; quota?: any; response: string }>('/api/ai/coach', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  },

  // Reports
  async getClassSummaryReport(className?: string): Promise<any> {
    const q = className ? `?className=${encodeURIComponent(className)}` : '';
    return apiRequest<any>(`/api/reports/class-summary${q}`);
  },

  // Admin Audit Logs & Cleanup
  async getAuditLogs(): Promise<DbAuditLog[]> {
    return apiRequest<DbAuditLog[]>('/api/audit-logs');
  },

  async cleanDemoData(): Promise<any> {
    return apiRequest<any>('/api/admin/clean-demo-data', {
      method: 'POST',
    });
  },

  // Generic REST helpers for DataService
  async customGet<T>(endpoint: string): Promise<T> {
    return apiRequest<T>(endpoint, { method: 'GET' });
  },

  async customPost<T>(endpoint: string, body: any): Promise<T> {
    return apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  async customPut<T>(endpoint: string, body: any): Promise<T> {
    return apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  async customDelete<T>(endpoint: string): Promise<T> {
    return apiRequest<T>(endpoint, { method: 'DELETE' });
  },
  // Google Sheets Apps Script Integration
  getGoogleData,
  postGoogleData,

  // Studio Cloud Drafts (Multi-device persistence)
  async getStudioDraft(lessonId: string): Promise<any> {
    return apiRequest<any>(`/api/studio/draft?lessonId=${encodeURIComponent(lessonId)}`);
  },

  async saveStudioDraft(lessonId: string, state: any): Promise<any> {
    return apiRequest<any>('/api/studio/draft', {
      method: 'POST',
      body: JSON.stringify({ lessonId, state }),
    });
  },

  // Achievements Progress (Multi-device persistence)
  async getAchievementsProgress(userId?: string): Promise<any> {
    const q = userId ? `?userId=${encodeURIComponent(userId)}` : '';
    return apiRequest<any>(`/api/achievements/progress${q}`);
  },

  async saveAchievementsProgress(data: any): Promise<any> {
    return apiRequest<any>('/api/achievements/progress', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Challenges Progress
  async getChallengeProgress(userId?: string): Promise<any> {
    const q = userId ? `?userId=${encodeURIComponent(userId)}` : '';
    return apiRequest<any>(`/api/challenges/progress${q}`);
  },

  async syncChallengeProgress(data: any): Promise<any> {
    return apiRequest<any>('/api/challenges/sync', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
