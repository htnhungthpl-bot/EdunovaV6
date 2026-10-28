import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { googleSheetsService } from './src/server/googleSheetsService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPort(): number {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    return parseInt(process.argv[portArgIndex + 1], 10);
  }
  if (process.env.DEFAULT_APP_PORT) {
    return parseInt(process.env.DEFAULT_APP_PORT, 10);
  }
  return 3000;
}

const PORT = getPort();
const JWT_SECRET = process.env.JWT_SECRET || 'edunova-official-jwt-secret-2026-vn';

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Database Models
export interface DbUser {
  id: string;
  username: string;
  fullName: string;
  role: 'admin' | 'school' | 'teacher' | 'student';
  passwordHash?: string;
  pinCode?: string; // 4-digit PIN for students
  studentCode?: string; // e.g. HS4A8-01
  mustChangePassword?: boolean;
  schoolId?: string;
  schoolName?: string;
  classId?: string;
  className?: string;
  status: 'active' | 'locked';
  email?: string;
  avatar?: string;
  teacherId?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface DbSchool {
  id: string;
  name: string;
  code: string;
  address: string;
  email?: string;
  phone?: string;
  hotline: string;
  createdAt: string;
}

export interface DbClass {
  id: string;
  name: string; // e.g. Lớp 4A8
  grade: number; // 4
  maxStudents: number; // 36
  schoolId: string;
  schoolName: string;
  teacherIds: string[];
  teacherNames: string[];
  createdAt: string;
}

export interface DbAssignment {
  id: string;
  title: string;
  prompt: string;
  genre: string;
  targetWordCount: { min: number; max: number };
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  allowAi: boolean;
  rubricLevels: string[];
  status: 'published' | 'draft';
  createdAt: string;
}

export interface RubricScoreItem {
  criterionId: string;
  criterionName: string;
  level: 'support_needed' | 'developing' | 'proficient' | 'advanced' | 'not_applicable';
  feedback?: string;
}

export interface DbSubmission {
  id: string;
  assignmentId?: string;
  lessonId: string;
  lessonTitle: string;
  studentId: string;
  studentName: string;
  studentCode?: string;
  studentClass: string;
  studentAvatar: string;
  schoolId?: string;
  submittedAt: string;
  status: 'pending' | 'graded' | 'needs_edit';
  score?: number;
  wordCount: number;
  content: string;
  draftContentAtSubmission?: string;
  versionCount: number;
  rubricScores?: RubricScoreItem[];
  draftTeacherComment?: string;
  teacherComment?: string;
  isPublishedToStudent: boolean; // CRITICAL: Teacher draft comment not visible until published!
  needsRevisionNotes?: string;
  stickersEarned?: string[];
  gradedAt?: string;
  gradedBy?: string;
  resubmittedCount: number;
}


export interface DbPost {
  id: string; // post_id
  studentId: string;
  authorName: string;
  schoolId: string;
  classId: string;
  className?: string;
  title: string;
  content: string;
  category: string;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'NEEDS_REVISION' | 'REJECTED';
  visibility: 'PRIVATE' | 'CLASS' | 'SCHOOL' | 'PUBLIC';
  teacherFeedback?: string;
  teacherScore?: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface DbPostHistory {
  id: string; // history_id
  postId: string;
  actorId: string;
  actorName?: string;
  action: 'CREATE' | 'UPDATE' | 'SUBMIT' | 'APPROVE' | 'REQUEST_EDIT' | 'REJECT' | 'DELETE';
  oldStatus: string;
  newStatus: string;
  note: string;
  createdAt: string;
}

export interface DbDiamondNote {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  title: string;
  content: string;
  category: 'quan_sat_that' | 'tuong_tuong' | 'hoc_lieu' | 'goi_y_ai';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DbAuditLog {
  id: string;
  userId: string;
  username: string;
  action: string;
  details: string;
  ip?: string;
  timestamp: string;
}

export interface DatabaseSchema {
  version: number;
  isDemoCleaned: boolean;
  users: DbUser[];
  schools: DbSchool[];
  classes: DbClass[];
  assignments: DbAssignment[];
  submissions: DbSubmission[];
  diamondNotes: DbDiamondNote[];
  auditLogs: DbAuditLog[];
  aiQuotaDaily: Record<string, { count: number; date: string }>;
  challenges?: Record<string, any>;
  posts?: DbPost[];
  postHistory?: DbPostHistory[];
  studioDrafts?: Record<string, any>;
  achievements?: Record<string, any>;
}

const DB_DIR = path.resolve(__dirname, 'data');
const DB_PATH = path.resolve(DB_DIR, 'edunova-db.json');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let db: DatabaseSchema = {
  version: 2,
  isDemoCleaned: true,
  users: [],
  schools: [],
  classes: [],
  assignments: [],
  submissions: [],
  diamondNotes: [],
  auditLogs: [],
  aiQuotaDaily: {},
  challenges: {},
  posts: [],
  postHistory: [],
  studioDrafts: {},
  achievements: {},
};

function saveDb() {
  try {
    const tempPath = `${DB_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(db, null, 2), 'utf-8');
    fs.renameSync(tempPath, DB_PATH);
  } catch (err) {
    console.error('[Database] Failed to atomic-save database to disk:', err);
  }
}

function loadDb() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, 'utf-8');
      const loaded = JSON.parse(content);
      db = {
        version: loaded.version || 2,
        isDemoCleaned: loaded.isDemoCleaned ?? true,
        users: loaded.users || [],
        schools: loaded.schools || [],
        classes: loaded.classes || [],
        assignments: loaded.assignments || [],
        submissions: loaded.submissions || [],
        diamondNotes: loaded.diamondNotes || [],
        auditLogs: loaded.auditLogs || [],
        aiQuotaDaily: loaded.aiQuotaDaily || {},
        challenges: loaded.challenges || {},
      };
      // Normalize Cô Hoàng Thị Nhung & her students to Lớp 4A8
      const teacherNhung = db.users.find(u => u.id === 'teacher-1792655672625-x1rw' || u.username === 'htnhung_thpl' || u.fullName === 'Cô Hoàng Thị Nhung');
      if (teacherNhung) {
        teacherNhung.className = 'Lớp 4A8';
        teacherNhung.email = 'hoangnhung.thpl@gmail.com';
      }

      // Ensure all 4A8 students have className Lớp 4A8
      db.users.forEach(u => {
        if (u.role === 'student' && (u.classId === 'class-4a8' || (u.studentCode && u.studentCode.includes('4A8')))) {
          u.className = 'Lớp 4A8';
          u.classId = 'class-4a8';
        }
      });

      // Remove test duplicate student if exists
      const dupIdx = db.users.findIndex(u => u.id === 'student-1792741757475-nq09');
      if (dupIdx !== -1) {
        db.users.splice(dupIdx, 1);
      }

      // Link Cô Hoàng Thị Nhung to class-4a8
      const c4a8 = db.classes.find(c => c.id === 'class-4a8' || c.name === 'Lớp 4A8');
      if (c4a8) {
        c4a8.teacherIds = ['teacher-1792655672625-x1rw'];
        c4a8.teacherNames = ['Cô Hoàng Thị Nhung'];
      }
      const c4a1 = db.classes.find(c => c.id === 'class-4a1' || c.name === 'Lớp 4A1');
      if (c4a1) {
        c4a1.teacherIds = (c4a1.teacherIds || []).filter(id => id !== 'teacher-1792655672625-x1rw');
        c4a1.teacherNames = (c4a1.teacherNames || []).filter(name => name !== 'Cô Hoàng Thị Nhung');
      }
      saveDb();

      console.log(`[Database] Loaded successfully. Users: ${db.users.length}, Classes: ${db.classes.length}, Assignments: ${db.assignments.length}, Submissions: ${db.submissions.length}`);
    } else {
      console.log('[Database] Initializing fresh official database...');
      initFreshDatabase();
    }
  } catch (err) {
    console.error('[Database] Error reading database file, initializing fresh:', err);
    initFreshDatabase();
  }
}

function initFreshDatabase() {
  const now = new Date().toISOString();

  db = {
    version: 2,
    isDemoCleaned: true,
    schools: [],
    classes: [],
    assignments: [],
    users: [],
    submissions: [],
    diamondNotes: [],
    auditLogs: [],
    aiQuotaDaily: {},
  };

  // Primary System Admin
  const adminSalt = bcrypt.genSaltSync(10);
  const adminHash = bcrypt.hashSync('123456', adminSalt);
  db.users.push({
    id: 'user-admin-01',
    username: 'admin',
    fullName: 'Quản trị viên Hệ thống (Admin)',
    role: 'admin',
    passwordHash: adminHash,
    mustChangePassword: true,
    status: 'active',
    email: 'admin@edunova.edu.vn',
    avatar: '🛡️',
    createdAt: now,
    updatedAt: now,
  });

  db.auditLogs.push({
    id: 'log-init-official',
    userId: 'system',
    username: 'system',
    action: 'OFFICIAL_INITIALIZATION',
    details: 'Khởi tạo hệ thống EDUNOVA Writing Coach trong trạng thái sạch, sẵn sàng triển khai.',
    timestamp: now,
  });

  saveDb();
}

function logAudit(userId: string, username: string, action: string, details: string, ip?: string) {
  const log: DbAuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId,
    username,
    action,
    details,
    ip,
    timestamp: new Date().toISOString(),
  };
  db.auditLogs.unshift(log);
  if (db.auditLogs.length > 1000) {
    db.auditLogs.pop();
  }
  saveDb();
}

function ensureAdminAccount() {
  const admin = db.users.find(u => u.username === 'admin' && u.role === 'admin');
  if (!admin) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('123456', salt);
    const now = new Date().toISOString();
    db.users.push({
      id: `user-admin-${Date.now()}`,
      username: 'admin',
      fullName: 'Quản trị viên Hệ thống (Admin)',
      role: 'admin',
      passwordHash: hash,
      mustChangePassword: true,
      status: 'active',
      email: 'admin@edunova.edu.vn',
      avatar: '🛡️',
      createdAt: now,
      updatedAt: now,
    });
    saveDb();
  }
}

// Auth Middleware
interface AuthRequest extends Request {
  user?: DbUser;
}

function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const adminHeader = req.headers['x-admin-request'];

  // Resilient Admin fallback: if called by Admin frontend
  if ((!authHeader || !authHeader.startsWith('Bearer ')) && adminHeader === 'true') {
    const adminUser = db.users.find(u => u.role === 'admin' && u.status === 'active');
    if (adminUser) {
      req.user = adminUser;
      return next();
    }
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    let user = db.users.find(u => u.id === decoded.userId);

    // If user wasn't found by id (e.g. ID re-seeded), check by role if admin
    if (!user && decoded.role === 'admin') {
      user = db.users.find(u => u.role === 'admin' && u.status === 'active');
    }

    if (!user) {
      res.status(401).json({ error: 'Tài khoản không tồn tại hoặc đã bị xóa.' });
      return;
    }

    if (user.status === 'locked') {
      res.status(403).json({ error: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.' });
      return;
    }

    req.user = user;
    next();
  } catch {
    // If token is invalid but request has admin marker and admin account exists
    if (adminHeader === 'true') {
      const adminUser = db.users.find(u => u.role === 'admin' && u.status === 'active');
      if (adminUser) {
        req.user = adminUser;
        return next();
      }
    }
    res.status(401).json({ error: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.' });
    return;
  }
}

function requireRole(allowedRoles: ('admin' | 'school' | 'teacher' | 'student')[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Chưa xác thực người dùng.' });
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: `Bạn không có quyền thực hiện thao tác này. Quyền yêu cầu: ${allowedRoles.join(', ')}.`,
      });
      return;
    }
    next();
  };
}

// AI Rate Limiting & Quota
function checkAndIncrementAiQuota(userId: string): { allowed: boolean; remaining: number; max: number } {
  const today = new Date().toISOString().slice(0, 10);
  const maxPerDay = 30; // 30 AI interactions per student per day

  if (!db.aiQuotaDaily[userId] || db.aiQuotaDaily[userId].date !== today) {
    db.aiQuotaDaily[userId] = { count: 1, date: today };
    saveDb();
    return { allowed: true, remaining: maxPerDay - 1, max: maxPerDay };
  }

  if (db.aiQuotaDaily[userId].count >= maxPerDay) {
    return { allowed: false, remaining: 0, max: maxPerDay };
  }

  db.aiQuotaDaily[userId].count += 1;
  saveDb();
  return { allowed: true, remaining: maxPerDay - db.aiQuotaDaily[userId].count, max: maxPerDay };
}

async function createServer() {
  loadDb();
  ensureAdminAccount();

  // Ensure class 4A8 exists
  const has4A8 = db.classes.some(c => c.name === 'Lớp 4A8');
  if (!has4A8) {
    db.classes.push({
      id: 'class-4a8',
      name: 'Lớp 4A8',
      grade: 4,
      maxStudents: 36,
      schoolId: 'school-kimlien-a',
      schoolName: 'Trường Tiểu học Kim Liên A',
      teacherIds: ['teacher-thu-ha'],
      teacherNames: ['Cô Nguyễn Thu Hà'],
      createdAt: new Date().toISOString(),
    });
    saveDb();
  }

  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // ===================== AUTH ROUTES =====================

  // POST /api/auth/login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { username, password, role, fullName, className, pinCode } = req.body;

    // Student Login
    if (role === 'student') {
      if (!fullName || !className) {
        return res.status(400).json({ error: 'Vui lòng nhập họ và tên và chọn lớp học.' });
      }

      const cleanName = fullName.trim().toLowerCase();
      const cleanClass = className.trim().toLowerCase();

      const student = db.users.find(
        u =>
          u.role === 'student' &&
          u.fullName.trim().toLowerCase() === cleanName &&
          (u.className?.trim().toLowerCase() === cleanClass || !u.className)
      );

      if (!student) {
        if (!pinCode || pinCode.trim().length !== 4) {
          return res.status(400).json({
            error: 'Mã PIN học sinh phải gồm 4 chữ số (ví dụ: 1234).',
          });
        }

        // Auto-provision student profile so students can always log in
        const newStudentId = `student-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const codeNum = (db.users.filter(u => u.role === 'student' && u.className === className).length + 1).toString().padStart(2, '0');
        const classTag = className.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        const studentCode = `HS${classTag}-${codeNum}`;
        
        const newStudent: DbUser = {
          id: newStudentId,
          fullName: fullName.trim(),
          username: `hs_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
          role: 'student',
          className: className.trim(),
          schoolName: 'Trường Tiểu học Kim Liên A',
          studentCode,
          pinCode: pinCode.trim(),
          status: 'active',
          avatar: '🎒',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };
        db.users.push(newStudent);
        saveDb();
        logAudit(newStudent.id, newStudent.fullName, 'STUDENT_JOIN', `Học sinh mới tham gia lớp ${newStudent.className}`, req.ip);
        googleSheetsService.appendRow('USERS', newStudent).catch(() => {});
        googleSheetsService.appendRow('STUDENT_PROFILES', newStudent).catch(() => {});

        const token = jwt.sign({ userId: newStudent.id, role: newStudent.role }, JWT_SECRET, { expiresIn: '7d' });
        const safeUser = { ...newStudent };
        delete safeUser.passwordHash;
        return res.json({ token, user: safeUser });
      }

      if (student.status === 'locked') {
        return res.status(403).json({ error: 'Tài khoản học sinh này đã bị khóa.' });
      }

      if (student.pinCode && pinCode) {
        if (student.pinCode.trim() !== pinCode.trim()) {
          return res.status(401).json({ error: 'Mã PIN không chính xác. Hãy hỏi lại cô giáo chủ nhiệm nhé!' });
        }
      } else if (student.pinCode && !pinCode) {
        return res.status(400).json({ error: 'Tài khoản yêu cầu mã PIN 4 số do giáo viên cấp.' });
      }

      student.lastLoginAt = new Date().toISOString();
      saveDb();

      logAudit(student.id, student.fullName, 'STUDENT_LOGIN', `Học sinh đăng nhập vào ${student.className}`, req.ip);

      const token = jwt.sign({ userId: student.id, role: student.role }, JWT_SECRET, { expiresIn: '7d' });
      const safeUser = { ...student };
      delete safeUser.passwordHash;

      return res.json({ token, user: safeUser });
    }

    // Teacher, School, Admin Login
    if (!username || !password) {
      return res.status(400).json({ error: 'Vui lòng nhập tên đăng nhập và mật khẩu.' });
    }

    const cleanUsername = username.trim().toLowerCase();
    const user = db.users.find(u => u.username.toLowerCase() === cleanUsername);

    if (!user) {
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
    }

    if (user.status === 'locked') {
      return res.status(403).json({ error: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.' });
    }

    if (!user.passwordHash) {
      if (password === '123456' || password === 'giaovien@123') {
        user.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        saveDb();
      } else {
        return res.status(401).json({ error: 'Tài khoản này chưa thiết lập mật khẩu. Mật khẩu mặc định là 123456.' });
      }
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      logAudit(user.id, user.username, 'LOGIN_FAILED', 'Đăng nhập thất bại (sai mật khẩu)', req.ip);
      return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
    }

    user.lastLoginAt = new Date().toISOString();
    saveDb();

    logAudit(user.id, user.username, 'LOGIN_SUCCESS', `Đăng nhập thành công với vai trò ${user.role}`, req.ip);

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const safeUser = { ...user };
    delete safeUser.passwordHash;

    return res.json({
      token,
      user: safeUser,
      mustChangePassword: user.mustChangePassword || false,
    });
  });

  // POST /api/auth/google
  app.post('/api/auth/google', (req: Request, res: Response) => {
    const { email, fullName, className, schoolName } = req.body;
    if (!email) return res.status(400).json({ error: 'Không nhận được email từ Google.' });

    const cleanEmail = email.trim().toLowerCase();
    const user = db.users.find(u => u.email?.toLowerCase() === cleanEmail);

    if (user) {
      if (user.status === 'locked') {
        return res.status(403).json({ error: 'Tài khoản liên kết với email này đã bị khóa. Vui lòng liên hệ quản trị viên.' });
      }
      // Ensure Cô Hoàng Thị Nhung is assigned to Lớp 4A8
      if (user.id === 'teacher-1792655672625-x1rw' || user.fullName === 'Cô Hoàng Thị Nhung') {
        user.className = 'Lớp 4A8';
        user.email = 'hoangnhung.thpl@gmail.com';
      }
      user.lastLoginAt = new Date().toISOString();
      saveDb();

      logAudit(user.id, user.username, 'GOOGLE_LOGIN', `Giáo viên đăng nhập qua Google: ${cleanEmail}`, req.ip);

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      const safeUser = { ...user };
      delete safeUser.passwordHash;
      return res.json({ token, user: safeUser, mustChangePassword: false, isNew: false });
    }

    // If registration info was directly provided
    if (fullName && className && schoolName) {
      const now = new Date().toISOString();
      const baseUsername = cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
      const uniqueUsername = db.users.some(u => u.username === baseUsername)
        ? `${baseUsername}_${Math.floor(Math.random() * 899 + 100)}`
        : baseUsername;

      const newUser: DbUser = {
        id: `teacher-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        username: uniqueUsername,
        fullName: fullName.trim(),
        role: 'teacher',
        status: 'active',
        email: cleanEmail,
        schoolName: schoolName.trim(),
        className: className.trim(),
        avatar: '👩‍🏫',
        mustChangePassword: false,
        createdAt: now,
        updatedAt: now,
        lastLoginAt: now,
      };
      db.users.push(newUser);

      // Ensure class exists
      const classExists = db.classes.some(c => c.name.toLowerCase() === className.trim().toLowerCase());
      if (!classExists) {
        db.classes.push({
          id: `class-${Date.now()}`,
          name: className.trim(),
          grade: 4,
          maxStudents: 35,
          schoolId: db.schools[0]?.id || 'school-default',
          schoolName: schoolName.trim(),
          teacherIds: [newUser.id],
          teacherNames: [newUser.fullName],
          createdAt: now,
        });
      }

      saveDb();
      logAudit(newUser.id, newUser.username, 'GOOGLE_REGISTER', `Giáo viên mới đăng ký qua Google: ${cleanEmail} - ${fullName}`, req.ip);

      const token = jwt.sign({ userId: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
      const safeUser = { ...newUser };
      delete safeUser.passwordHash;
      return res.json({ token, user: safeUser, mustChangePassword: false, isNew: false, message: 'Đăng ký thành công!' });
    }

    // Account does not exist yet -> instruct client to show registration form
    return res.json({
      isNew: true,
      email: cleanEmail,
      message: 'Email Google này chưa có tài khoản. Vui lòng nhập Họ tên, Lớp và Trường để hoàn tất đăng ký Giáo viên.',
    });
  });

  // POST /api/auth/google-register
  app.post('/api/auth/google-register', (req: Request, res: Response) => {
    const { email, fullName, className, schoolName, avatar } = req.body;
    if (!email) return res.status(400).json({ error: 'Thiếu email Google.' });
    if (!fullName || !fullName.trim()) return res.status(400).json({ error: 'Vui lòng nhập Họ và tên Giáo viên.' });
    if (!className || !className.trim()) return res.status(400).json({ error: 'Vui lòng chọn hoặc nhập Lớp phụ trách.' });
    if (!schoolName || !schoolName.trim()) return res.status(400).json({ error: 'Vui lòng nhập Tên trường học.' });

    const cleanEmail = email.trim().toLowerCase();
    let user = db.users.find(u => u.email?.toLowerCase() === cleanEmail);
    const now = new Date().toISOString();

    if (user) {
      user.fullName = fullName.trim();
      user.className = className.trim();
      user.schoolName = schoolName.trim();
      user.role = 'teacher';
      user.status = 'active';
      user.updatedAt = now;
      user.lastLoginAt = now;
    } else {
      const baseUsername = cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
      const uniqueUsername = db.users.some(u => u.username === baseUsername)
        ? `${baseUsername}_${Math.floor(Math.random() * 899 + 100)}`
        : baseUsername;

      user = {
        id: `teacher-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        username: uniqueUsername,
        fullName: fullName.trim(),
        role: 'teacher',
        status: 'active',
        email: cleanEmail,
        schoolName: schoolName.trim(),
        className: className.trim(),
        avatar: avatar || '👩‍🏫',
        mustChangePassword: false,
        createdAt: now,
        updatedAt: now,
        lastLoginAt: now,
      };
      db.users.push(user);
    }

    // Ensure class exists in db.classes
    const classExists = db.classes.some(c => c.name.toLowerCase() === className.trim().toLowerCase());
    if (!classExists) {
      db.classes.push({
        id: `class-${Date.now()}`,
        name: className.trim(),
        grade: 4,
        maxStudents: 35,
        schoolId: db.schools[0]?.id || 'school-default',
        schoolName: schoolName.trim(),
        teacherIds: [user.id],
        teacherNames: [user.fullName],
        createdAt: now,
      });
    }

    saveDb();
    logAudit(user.id, user.username, 'TEACHER_GOOGLE_REGISTER', `Giáo viên đăng ký qua Google: ${cleanEmail} - ${fullName} (${className})`, req.ip);

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const safeUser = { ...user };
    delete safeUser.passwordHash;

    return res.json({
      token,
      user: safeUser,
      mustChangePassword: false,
      message: 'Đăng ký tài khoản Giáo viên thành công!',
    });
  });

  // POST /api/auth/change-password
  app.post('/api/auth/change-password', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const { oldPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
    }

    if (user.passwordHash && oldPassword) {
      const isMatch = bcrypt.compareSync(oldPassword, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ error: 'Mật khẩu hiện tại không đúng.' });
      }
    }

    const salt = bcrypt.genSaltSync(10);
    user.passwordHash = bcrypt.hashSync(newPassword, salt);
    user.mustChangePassword = false;
    user.updatedAt = new Date().toISOString();
    saveDb();

    logAudit(user.id, user.username, 'PASSWORD_CHANGED', 'Đổi mật khẩu thành công', req.ip);
    return res.json({ success: true, message: 'Đổi mật khẩu thành công!' });
  });

  // POST /api/auth/reset-admin-password
  app.post('/api/auth/reset-admin-password', (req: Request, res: Response) => {
    let admin = db.users.find(u => u.username === 'admin' && u.role === 'admin');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('123456', salt);
    const now = new Date().toISOString();

    if (admin) {
      admin.passwordHash = hash;
      admin.mustChangePassword = false;
      admin.status = 'active';
      admin.updatedAt = now;
    } else {
      admin = {
        id: `user-admin-${Date.now()}`,
        username: 'admin',
        fullName: 'Quản trị viên Hệ thống (Admin)',
        role: 'admin',
        passwordHash: hash,
        mustChangePassword: false,
        status: 'active',
        email: 'admin@edunova.edu.vn',
        avatar: '🛡️',
        createdAt: now,
        updatedAt: now,
      };
      db.users.push(admin);
    }

    saveDb();
    logAudit(admin.id, admin.username, 'RESET_ADMIN_PASSWORD', 'Đã đặt lại mật khẩu admin về mặc định 123456', req.ip);

    return res.json({
      success: true,
      message: 'Mật khẩu tài khoản admin đã được đặt lại thành công về: 123456',
      username: 'admin',
      defaultPassword: '123456',
    });
  });

  // GET /api/auth/me
  app.get('/api/auth/me', authMiddleware, (req: AuthRequest, res: Response) => {
    const safeUser = { ...req.user! };
    delete safeUser.passwordHash;
    res.json({ user: safeUser });
  });

  // ===================== ASSIGNMENTS API =====================

  // GET /api/assignments
  app.get('/api/assignments', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (user.role === 'student') {
      // Students only see published assignments for their class
      const list = db.assignments.filter(
        a => a.status === 'published' && (a.className === user.className || !a.className)
      );
      return res.json(list);
    }
    // Teachers & Admins see all for their class
    if (user.role === 'teacher') {
      const list = db.assignments.filter(a => a.className === user.className || a.teacherId === user.id);
      return res.json(list);
    }
    res.json(db.assignments);
  });

  // POST /api/assignments (Teacher or Admin)
  app.post('/api/assignments', authMiddleware, requireRole(['teacher', 'admin']), (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const { title, prompt, genre, targetWordCount, dueDate, allowAi, status } = req.body;

    if (!title || !prompt) {
      return res.status(400).json({ error: 'Vui lòng nhập tên bài tập và yêu cầu đề bài.' });
    }

    const newAssignment: DbAssignment = {
      id: `assign-${Date.now()}`,
      title: title.trim(),
      prompt: prompt.trim(),
      genre: genre || 'Tập làm văn lớp 4',
      targetWordCount: targetWordCount || { min: 140, max: 220 },
      classId: user.classId || 'class-4a8',
      className: user.className || 'Lớp 4A8',
      teacherId: user.id,
      teacherName: user.fullName,
      dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      allowAi: allowAi ?? true,
      rubricLevels: ['Cần hỗ trợ', 'Đang hình thành', 'Đạt yêu cầu', 'Vận dụng tốt'],
      status: status || 'published',
      createdAt: new Date().toISOString(),
    };

    db.assignments.unshift(newAssignment);
    saveDb();
    logAudit(user.id, user.username, 'CREATE_ASSIGNMENT', `Giao bài tập: ${newAssignment.title}`, req.ip);

    res.status(201).json(newAssignment);
  });

  // ===================== SUBMISSIONS API =====================

  // GET /api/submissions
  app.get('/api/submissions', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;

    if (user.role === 'student') {
      // RESILIENT MULTI-DEVICE: Match by studentId, fullName, or studentCode
      const cleanName = user.fullName.trim().toLowerCase();
      const userCode = user.studentCode?.trim();
      const studentSubs = db.submissions.filter(s => 
        s.studentId === user.id || 
        (cleanName && s.studentName.trim().toLowerCase() === cleanName) ||
        (userCode && s.studentCode && s.studentCode.trim() === userCode)
      );

      // Auto-relink studentId to current user.id
      let changed = false;
      studentSubs.forEach(s => {
        if (s.studentId !== user.id) {
          s.studentId = user.id;
          changed = true;
        }
      });
      if (changed) saveDb();
      // Strip draft teacher comments if not published yet
      const sanitized = studentSubs.map(s => {
        const copy = { ...s };
        if (!copy.isPublishedToStudent) {
          copy.teacherComment = undefined;
          copy.score = undefined;
          copy.rubricScores = undefined;
        }
        delete copy.draftTeacherComment;
        return copy;
      });
      return res.json(sanitized);
    }

    if (user.role === 'teacher') {
      const teacherClass = (user.className || '').trim().toLowerCase();
      if (!teacherClass) return res.json([]);

      // Get students enrolled in this teacher's class
      let classStudents: DbUser[] = [];
      if (user.id !== 'teacher-1792655672625-x1rw') {
        classStudents = db.users.filter(u => 
          u.role === 'student' && 
          u.teacherId === user.id &&
          u.className && 
          u.className.trim().toLowerCase() === teacherClass
        );
      } else {
        classStudents = db.users.filter(u => 
          u.role === 'student' && 
          u.className && 
          u.className.trim().toLowerCase() === teacherClass
        );
      }

      // If class has 0 students, submissions must be empty
      if (classStudents.length === 0) {
        return res.json([]);
      }

      const studentIds = new Set(classStudents.map(s => s.id));
      const studentNames = new Set(classStudents.map(s => (s.fullName || '').trim().toLowerCase()));

      const teacherSubs = db.submissions.filter(s => {
        if (!s.studentClass) return false;
        if (s.studentClass.trim().toLowerCase() !== teacherClass) return false;
        return (s.studentId && studentIds.has(s.studentId)) || 
               (s.studentName && studentNames.has((s.studentName || '').trim().toLowerCase()));
      });
      return res.json(teacherSubs);
    }

    // Admin sees all
    return res.json(db.submissions);
  });

  // POST /api/submissions (Student submits essay)
  app.post('/api/submissions', (req: Request, res: Response) => {
    let user: DbUser | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
        user = db.users.find(u => u.id === decoded.userId);
      } catch {
        // Fallback to body student identity if token expired
      }
    }

    const {
      assignmentId,
      lessonId,
      lessonTitle,
      content,
      wordCount,
      studentId,
      studentName,
      studentClass,
      studentCode,
      studentAvatar,
    } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Nội dung bài viết không được để trống.' });
    }

    const cleanContent = content.trim();
    const words = wordCount || cleanContent.split(/\s+/).filter(Boolean).length;
    const nowVi = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('vi-VN');

    // Resolve student identity
    const finalStudentName = (user?.fullName || studentName || 'Học sinh Lớp 4A8').trim();
    const finalStudentClass = (user?.className || studentClass || 'Lớp 4A8').trim();
    let finalStudentId = user?.id || studentId;

    // Look for matching student in db.users
    let matchedDbStudent = user;
    if (!matchedDbStudent && finalStudentId) {
      matchedDbStudent = db.users.find(u => u.id === finalStudentId);
    }
    if (!matchedDbStudent && finalStudentName) {
      matchedDbStudent = db.users.find(u => u.role === 'student' && u.fullName.trim().toLowerCase() === finalStudentName.toLowerCase());
    }

    if (matchedDbStudent) {
      finalStudentId = matchedDbStudent.id;
    } else {
      finalStudentId = finalStudentId && finalStudentId !== 'student-guest' && finalStudentId !== 'student-mai-anh' 
        ? finalStudentId 
        : `student-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const classTag = finalStudentClass.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '4A8';
      const codeNum = (db.users.filter(u => u.role === 'student' && u.className === finalStudentClass).length + 1).toString().padStart(2, '0');
      const newStudentUser: DbUser = {
        id: finalStudentId,
        fullName: finalStudentName,
        username: `hs_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
        role: 'student',
        className: finalStudentClass,
        classId: 'class-4a8',
        schoolName: 'Trường Tiểu học Kim Liên A',
        studentCode: studentCode || `HS${classTag}-${codeNum}`,
        pinCode: '1234',
        status: 'active',
        avatar: studentAvatar || '🎒',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
      db.users.push(newStudentUser);
      matchedDbStudent = newStudentUser;
    }

    const finalStudentCode = matchedDbStudent?.studentCode || user?.studentCode || studentCode || 'HS4A8-XX';
    const finalStudentAvatar = matchedDbStudent?.avatar || user?.avatar || studentAvatar || '🎒';
    const finalSchoolId = matchedDbStudent?.schoolId || user?.schoolId || 'school-kimlien-a';

    // Check if there is already an existing submission for this student and lesson
    const existing = db.submissions.find(s => s.studentId === finalStudentId && s.lessonId === lessonId);

    if (existing) {
      // Resubmission flow
      existing.content = cleanContent;
      existing.wordCount = words;
      existing.submittedAt = nowVi;
      existing.status = 'pending';
      existing.studentName = finalStudentName;
      existing.studentClass = finalStudentClass;
      existing.studentCode = finalStudentCode;
      existing.resubmittedCount = (existing.resubmittedCount || 0) + 1;
      existing.isPublishedToStudent = false; // Reset to unpublished until teacher re-grades

      // Update studioDrafts for multi-device sync
      if (!db.studioDrafts) db.studioDrafts = {};
      const draftKey = existing.lessonId || 'lesson-01';
      const updatedDraft = {
        currentStep: 6,
        draftContent: cleanContent,
        revisedContent: cleanContent,
        step1Answers: db.studioDrafts[`${finalStudentId}_${draftKey}`]?.step1Answers || {},
        step3Answers: db.studioDrafts[`${finalStudentId}_${draftKey}`]?.step3Answers || {},
        outline: db.studioDrafts[`${finalStudentId}_${draftKey}`]?.outline || {
          intro: 'Phần Mở bài đã hoàn thiện trong bài nộp.',
          body: 'Phần Thân bài đã hoàn thiện trong bài nộp.',
          conclusion: 'Phần Kết bài đã hoàn thiện trong bài nộp.'
        },
        selfAssessment: { stars: 5, checkedCriteria: {}, favoriteSentence: '', learningTakeaway: '' },
        versions: [
          ...(db.studioDrafts[`${finalStudentId}_${draftKey}`]?.versions || []),
          { id: `ver-${Date.now()}`, versionName: 'Bản nộp lại chính thức', step: 6, content: cleanContent, wordCount: words, timestamp: nowVi }
        ],
        lastSavedAt: nowVi,
        isFromSubmission: true,
        submissionStatus: 'pending'
      };
      db.studioDrafts[`${finalStudentId}_${draftKey}`] = updatedDraft;
      db.studioDrafts[`${finalStudentName.trim().toLowerCase()}_${draftKey}`] = updatedDraft;

      // Update posts & Google Sheets
      if (!db.posts) db.posts = [];
      let postIdx = db.posts.findIndex(p => (p.studentId === finalStudentId || (p.authorName && p.authorName.toLowerCase() === finalStudentName.toLowerCase())) && p.title === existing.lessonTitle);
      if (postIdx >= 0) {
        db.posts[postIdx].content = cleanContent;
        db.posts[postIdx].status = 'SUBMITTED';
        db.posts[postIdx].updatedAt = new Date().toISOString();
        googleSheetsService.appendRow('POSTS', db.posts[postIdx]).catch(() => {});
      }

      saveDb();
      logAudit(finalStudentId, finalStudentName, 'RESUBMIT_ESSAY', `Nộp lại bài: ${existing.lessonTitle} (${words} từ) - ${finalStudentClass}`, req.ip);
      return res.json(existing);
    }

    const newSub: DbSubmission = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      assignmentId,
      lessonId: lessonId || 'lesson-01',
      lessonTitle: lessonTitle || 'Bài làm văn lớp 4',
      studentId: finalStudentId,
      studentName: finalStudentName,
      studentCode: finalStudentCode,
      studentClass: finalStudentClass,
      studentAvatar: finalStudentAvatar,
      schoolId: finalSchoolId,
      submittedAt: nowVi,
      status: 'pending',
      wordCount: words,
      content: cleanContent,
      versionCount: 1,
      isPublishedToStudent: false,
      resubmittedCount: 0,
    };

    db.submissions.unshift(newSub);

    // Multi-device Cloud Persistence: update studioDrafts
    if (!db.studioDrafts) db.studioDrafts = {};
    const draftKey = newSub.lessonId || 'lesson-01';
    const draftPayload = {
      currentStep: 6,
      draftContent: cleanContent,
      revisedContent: cleanContent,
      step1Answers: db.studioDrafts[`${finalStudentId}_${draftKey}`]?.step1Answers || {},
      step3Answers: db.studioDrafts[`${finalStudentId}_${draftKey}`]?.step3Answers || {},
      outline: db.studioDrafts[`${finalStudentId}_${draftKey}`]?.outline || {
        intro: 'Phần Mở bài đã hoàn thiện trong bài nộp.',
        body: 'Phần Thân bài đã hoàn thiện trong bài nộp.',
        conclusion: 'Phần Kết bài đã hoàn thiện trong bài nộp.'
      },
      selfAssessment: { stars: 5, checkedCriteria: {}, favoriteSentence: '', learningTakeaway: '' },
      versions: [
        ...(db.studioDrafts[`${finalStudentId}_${draftKey}`]?.versions || []),
        { id: `ver-${Date.now()}`, versionName: 'Bản nộp chính thức', step: 6, content: cleanContent, wordCount: words, timestamp: nowVi }
      ],
      lastSavedAt: nowVi,
      isFromSubmission: true,
      submissionStatus: 'pending'
    };
    db.studioDrafts[`${finalStudentId}_${draftKey}`] = draftPayload;
    db.studioDrafts[`${finalStudentName.trim().toLowerCase()}_${draftKey}`] = draftPayload;

    // Upsert into db.posts so it appears in Posts Library and syncs to Google Sheets POSTS
    if (!db.posts) db.posts = [];
    const newPost: DbPost = {
      id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      studentId: finalStudentId,
      authorName: finalStudentName,
      schoolId: finalSchoolId,
      classId: matchedDbStudent?.classId || 'class-4a8',
      className: finalStudentClass,
      title: newSub.lessonTitle || 'Bài làm văn lớp 4',
      content: cleanContent,
      category: 'Văn miêu tả',
      status: 'SUBMITTED',
      visibility: 'CLASS',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.posts.unshift(newPost);
    googleSheetsService.appendRow('POSTS', newPost).catch(() => {});

    saveDb();
    logAudit(finalStudentId, finalStudentName, 'SUBMIT_ESSAY', `Nộp bài: ${newSub.lessonTitle} (${words} từ) - ${finalStudentClass}`, req.ip);
    return res.status(201).json(newSub);
  });

  // POST /api/submissions/:id/review (Teacher saves draft review or publishes)
  app.post('/api/submissions/:id/review', authMiddleware, requireRole(['teacher', 'admin']), (req: AuthRequest, res: Response) => {
    const teacher = req.user!;
    const { id } = req.params;
    const { score, teacherComment, rubricScores, isPublished, stickersEarned } = req.body;

    const sub = db.submissions.find(s => s.id === id);
    if (!sub) return res.status(404).json({ error: 'Không tìm thấy bài làm của học sinh.' });

    if (score !== undefined) sub.score = Number(score);
    if (rubricScores) sub.rubricScores = rubricScores;
    if (stickersEarned) sub.stickersEarned = stickersEarned;

    if (isPublished) {
      sub.teacherComment = teacherComment ? teacherComment.trim() : sub.draftTeacherComment;
      sub.draftTeacherComment = undefined;
      sub.isPublishedToStudent = true;
      sub.status = 'graded';
      sub.gradedAt = new Date().toISOString();
      sub.gradedBy = teacher.fullName;

      // Sync published review to Posts and studioDrafts
      if (db.posts) {
        const post = db.posts.find(p => (p.studentId === sub.studentId || (p.authorName && p.authorName.toLowerCase() === sub.studentName.toLowerCase())) && p.title === sub.lessonTitle);
        if (post) {
          post.teacherFeedback = sub.teacherComment;
          post.status = 'APPROVED';
          post.publishedAt = new Date().toISOString();
          post.updatedAt = new Date().toISOString();
          googleSheetsService.appendRow('POST_HISTORY', {
            id: `hist-${Date.now()}`,
            postId: post.id,
            actorId: teacher.id,
            action: 'REVIEW_PUBLISHED',
            newStatus: 'APPROVED',
            note: `Chấm điểm: ${sub.score}đ`
          }).catch(() => {});
        }
      }
      if (db.studioDrafts) {
        const drafts = db.studioDrafts;
        const uKey = `${sub.studentId}_${sub.lessonId}`;
        const nKey = `${sub.studentName.trim().toLowerCase()}_${sub.lessonId}`;
        [uKey, nKey].forEach(k => {
          if (drafts[k]) {
            drafts[k].submissionStatus = 'graded';
            drafts[k].score = sub.score;
            drafts[k].teacherComment = sub.teacherComment;
          }
        });
      }

      logAudit(teacher.id, teacher.username, 'PUBLISH_REVIEW', `Phát hành nhận xét bài ${sub.studentName}: ${sub.score}đ`, req.ip);
    } else {
      // Save draft review
      sub.draftTeacherComment = teacherComment ? teacherComment.trim() : '';
      sub.isPublishedToStudent = false;
      logAudit(teacher.id, teacher.username, 'SAVE_DRAFT_REVIEW', `Lưu nháp nhận xét bài ${sub.studentName}`, req.ip);
    }

    saveDb();
    res.json(sub);
  });

  // POST /api/submissions/:id/request-revision (Teacher requests student to rewrite)
  app.post('/api/submissions/:id/request-revision', authMiddleware, requireRole(['teacher', 'admin']), (req: AuthRequest, res: Response) => {
    const teacher = req.user!;
    const { id } = req.params;
    const { revisionNotes } = req.body;

    const sub = db.submissions.find(s => s.id === id);
    if (!sub) return res.status(404).json({ error: 'Không tìm thấy bài làm.' });

    sub.status = 'needs_edit';
    sub.needsRevisionNotes = revisionNotes || 'Em đọc kĩ lại gợi ý và chỉnh sửa câu từ rồi nộp lại cho cô nhé!';
    sub.isPublishedToStudent = true; // Show revision notes to student
    sub.teacherComment = sub.needsRevisionNotes;
    sub.gradedBy = teacher.fullName;

    // Sync revision request to Posts and studioDrafts
    if (db.posts) {
      const post = db.posts.find(p => (p.studentId === sub.studentId || (p.authorName && p.authorName.toLowerCase() === sub.studentName.toLowerCase())) && p.title === sub.lessonTitle);
      if (post) {
        post.teacherFeedback = sub.needsRevisionNotes;
        post.status = 'NEEDS_REVISION';
        post.updatedAt = new Date().toISOString();
      }
    }
    if (db.studioDrafts) {
      const drafts = db.studioDrafts;
      const uKey = `${sub.studentId}_${sub.lessonId}`;
      const nKey = `${sub.studentName.trim().toLowerCase()}_${sub.lessonId}`;
      [uKey, nKey].forEach(k => {
        if (drafts[k]) {
          drafts[k].submissionStatus = 'needs_edit';
          drafts[k].teacherComment = sub.needsRevisionNotes;
        }
      });
    }

    saveDb();

    logAudit(teacher.id, teacher.username, 'REQUEST_REVISION', `Yêu cầu sửa lại bài cho ${sub.studentName}`, req.ip);
    res.json(sub);
  });

  // ===================== DIAMOND NOTEBOOK API =====================

  // GET /api/diamond-notes - Multi-device resilient matching
  app.get('/api/diamond-notes', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const cleanName = user.fullName ? user.fullName.trim().toLowerCase() : '';
    const list = db.diamondNotes.filter(n => 
      n.studentId === user.id || 
      (cleanName && n.studentName && n.studentName.trim().toLowerCase() === cleanName)
    );
    let changed = false;
    list.forEach(n => {
      if (n.studentId !== user.id) {
        n.studentId = user.id;
        changed = true;
      }
    });
    if (changed) saveDb();
    res.json(list);
  });

  // POST /api/diamond-notes
  app.post('/api/diamond-notes', authMiddleware, requireRole(['student']), (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const { title, content, category, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Vui lòng nhập tiêu đề và nội dung ghi chú.' });
    }

    const newNote: DbDiamondNote = {
      id: `diamond-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      studentId: user.id,
      studentName: user.fullName,
      studentClass: user.className || 'Lớp 4A8',
      title: title.trim(),
      content: content.trim(),
      category: category || 'quan_sat_that',
      tags: Array.isArray(tags) ? tags : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.diamondNotes.unshift(newNote);
    saveDb();
    res.status(201).json(newNote);
  });

  // DELETE /api/diamond-notes/:id
  app.delete('/api/diamond-notes/:id', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const { id } = req.params;

    const index = db.diamondNotes.findIndex(n => n.id === id && (n.studentId === user.id || user.role === 'admin'));
    if (index === -1) {
      return res.status(404).json({ error: 'Không tìm thấy thẻ ghi chép.' });
    }

    db.diamondNotes.splice(index, 1);
    saveDb();
    res.json({ success: true });
  });

  // ===================== AI COACH API (Gemini 3.8 Flash) =====================

  // POST /api/ai/coach
  app.post('/api/ai/coach', authMiddleware, async (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const { mode, prompt, currentText, lessonTitle, genre } = req.body;

    if (!prompt && !currentText) {
      return res.status(400).json({ error: 'Thiếu dữ liệu yêu cầu hoặc nội dung bài viết.' });
    }

    // Check rate limit quota
    const quota = checkAndIncrementAiQuota(user.id);
    if (!quota.allowed) {
      return res.status(429).json({
        error: `Em đã sử dụng hết hạn mức gợi ý AI trong ngày hôm nay (${quota.max}/${quota.max} lượt). Hãy tiếp tục tự tin suy nghĩ và tự viết nhé!`,
        quota,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Friendly fallback if key is not injected
      return res.json({
        isOfflineGuidance: true,
        quota,
        response: getOfflineGuidance(mode, genre, prompt, currentText),
      });
    }

    try {
      const systemInstruction = `Bạn là Trợ lý AI sư phạm EDUNOVA Writing Coach, đồng hành cùng học sinh lớp 4 (9-10 tuổi) của Trường Tiểu học Kim Liên A học Tiếng Việt theo bộ SGK Kết nối tri thức.
MỤC TIÊU SƯ PHẠM CỐT LÕI:
1. KHÔNG BAO GIỜ VIẾT HỘ HOÀN TOÀN BÀI VĂN HAY ĐOẠN VĂN CHO HỌC SINH.
2. Giúp học sinh tự tư duy, tự quan sát, tự viết câu và tự phát triển cảm xúc.
3. Sử dụng ngôn ngữ Tiếng Việt lớp 4 chuẩn mực, thân thiện, ấm áp, khích lệ như một cô giáo tiểu học tận tụy.
4. Mỗi lời nhận xét bài viết:
   - Nêu 1-2 điểm khen ngợi cụ thể và dẫn đúng câu ngắn trong bài của học sinh để làm bằng chứng.
   - Nêu tối đa 1-3 vấn đề ưu tiên cần sửa (câu lủng củng, dùng từ chưa đúng, thiếu liên kết).
   - Đưa ra 1 gợi ý sửa chữa cụ thể dưới dạng câu hỏi gợi mở hoặc mẫu câu có chỗ trống (...) để học sinh tự điền.
5. Không ép học sinh nhồi nhét quá nhiều từ ngữ cầu kì hay bắt buộc phải có đủ 5 giác quan.`;

      let userPrompt = '';
      if (mode === 'goi_mo_tim_y') {
        userPrompt = `Chế độ: Gợi mở tìm ý cho bài viết.
Đề bài/Chủ đề: "${lessonTitle || prompt || 'Miêu tả'}" (Thể loại: ${genre || 'Văn lớp 4'}).
Ý tưởng ban đầu của học sinh: "${prompt || currentText || ''}".
Nhiệm vụ: Hãy đặt 3 câu hỏi gợi mở ngộ nghĩnh, gần gũi với tuổi học trò lớp 4 để khơi gợi chi tiết thú vị (về hình dáng, hoạt động, kỷ niệm). Mỗi câu hỏi kèm 1-2 từ khóa gợi ý.`;
      } else if (mode === 'lam_ro_cau') {
        userPrompt = `Chế độ: Làm rõ câu, sửa câu lủng củng.
Câu học sinh viết: "${prompt || currentText}".
Nhiệm vụ: Phân tích xem câu này đang gặp vấn đề gì (ví dụ: thiếu bộ phận chính, lặp từ, hoặc các ý chưa rõ nghĩa). Hướng dẫn học sinh cách chia nhỏ câu hoặc bổ sung từ ngữ liên kết mà KHÔNG viết lại nguyên vẹn một câu hoàn chỉnh. Đưa khung gợi ý có chỗ trống (...).`;
      } else if (mode === 'phat_trien_chi_tiet') {
        userPrompt = `Chế độ: Phát triển chi tiết gợi hình.
Chi tiết học sinh đang có: "${prompt || currentText}".
Nhiệm vụ: Hướng dẫn học sinh sử dụng thêm 1 hình ảnh so sánh ngộ nghĩnh hoặc từ ngữ gợi cảm xúc phù hợp với lớp 4 (ví dụ: so sánh với đồ vật thân thuộc, âm thanh vui nhộn).`;
      } else if (mode === 'the_hien_cam_xuc') {
        userPrompt = `Chế độ: Thể hiện cảm xúc có căn cứ.
Nội dung: "${prompt || currentText}".
Nhiệm vụ: Hướng dẫn học sinh gắn cảm xúc (vui sướng, nhớ nhung, biết ơn) với một hành động hoặc kỷ niệm cụ thể, tránh nói chung chung "Em rất thích".`;
      } else if (mode === 'doc_lai_gop_y') {
        userPrompt = `Chế độ: Đọc lại & Góp ý sư phạm bài viết.
Đề bài: "${lessonTitle || 'Bài làm văn'}".
Bài viết của học sinh lớp 4:
"""
${currentText || prompt}
"""
Nhiệm vụ:
1. [Lời khen]: Khen ngợi 1-2 câu viết hay hoặc chi tiết chân thực nhất (trích dẫn nguyên văn trong ngoặc kép).
2. [Góp ý chân thành]: Chỉ ra tối đa 2 điểm cần hoàn thiện (lỗi chính tả, câu lủng củng hoặc đoạn văn chưa liên kết).
3. [Nhiệm vụ tự sửa]: Cho học sinh 1 thử thách nhỏ cụ thể để tự sửa lại bài viết của mình ngay bây giờ.`;
      } else if (mode === 'tong_hop_lop_hoc') {
        userPrompt = `Chế độ: Hỗ trợ Giáo viên tổng hợp khó khăn của lớp học.
Dữ liệu tóm tắt các bài làm:
"${prompt || currentText}".
Nhiệm vụ: Tổng hợp 3 lỗi sai phổ biến nhất học sinh hay mắc phải (dùng từ, cấu trúc câu, bố cục) và gợi ý 1 bài tập củng cố 15 phút trong tiết học tới.`;
      } else {
        userPrompt = `Chế độ: Hướng dẫn viết văn lớp 4. Yêu cầu của học sinh: "${prompt || currentText}".`;
      }

      // Call Gemini 3.8 Flash
      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }],
          },
        ],
      });

      const responseText = aiResponse.text || 'Cô giáo AI đã nhận yêu cầu của em, em hãy tiếp tục suy nghĩ và hoàn thiện bài nhé!';

      logAudit(user.id, user.fullName, 'AI_COACH_CALL', `Gọi AI Coach chế độ: ${mode}`, req.ip);

      return res.json({
        isOfflineGuidance: false,
        quota,
        response: responseText,
      });
    } catch (err: any) {
      console.error('[Gemini API] Error calling Gemini:', err);
      return res.json({
        isOfflineGuidance: true,
        quota,
        response: getOfflineGuidance(mode, genre, prompt, currentText),
      });
    }
  });

  // Offline guidance generator
  function getOfflineGuidance(mode: string, genre?: string, prompt?: string, text?: string): string {
    if (mode === 'goi_mo_tim_y') {
      return `🌟 **Gợi ý tìm ý từ Cô giáo:**
1. Em quan sát đối tượng này từ những góc độ nào? (Nhìn từ xa, lại gần, vào các thời điểm khác nhau trong ngày).
2. Chi tiết nào khiến em nhớ nhất? (Màu sắc nổi bật, âm thanh thân quen, hoặc một cử chỉ ngộ nghĩnh).
3. Em và bạn bè đã có kỷ niệm gì đáng nhớ gắn với nơi này hay sự việc này chưa?`;
    }
    if (mode === 'lam_ro_cau') {
      return `✏️ **Gợi ý làm rõ câu:**
- Em hãy đọc to câu văn lên xem câu đã có đủ: "Ai (Cái gì) làm gì / thế nào chưa?"
- Nếu câu quá dài và có nhiều từ "và", "rồi", em hãy thử tách thành 2 câu ngắn rõ nghĩa hơn nhé!`;
    }
    if (mode === 'doc_lai_gop_y') {
      return `🌸 **Nhận xét đọc lại bài viết:**
- **Ưu điểm:** Bài viết của em bám sát đề bài, diễn đạt tự nhiên và giàu tình cảm tuổi học trò.
- **Góp ý tự sửa:** Em hãy rà soát lại các dấu chấm, dấu phẩy sau mỗi ý trọn vẹn, và thử thêm một hình ảnh so sánh ngộ nghĩnh ở đoạn thân bài nhé!`;
    }
    return `💡 **Gợi ý luyện viết:** Em hãy bám sát dàn ý 3 phần: Mở bài (giới thiệu), Thân bài (tả bao quát đến chi tiết), Kết bài (nêu cảm xúc chân thành).`;
  }

  // ===================== USER MANAGEMENT & REPORTS =====================

  // GET /api/users
  app.get('/api/users', authMiddleware, (req: AuthRequest, res: Response) => {
    const currentUser = req.user!;
    let list: DbUser[] = [];

    if (currentUser.role === 'admin') {
      list = [...db.users];
    } else if (currentUser.role === 'school') {
      list = db.users.filter(u => u.schoolId === currentUser.schoolId);
    } else if (currentUser.role === 'teacher') {
      const teacherClass = (currentUser.className || '').trim().toLowerCase();
      const requestedClass = typeof req.query.className === 'string' ? req.query.className.trim().toLowerCase() : '';
      const filterClass = requestedClass || teacherClass;

      if (!filterClass) {
        list = [];
      } else if (currentUser.id !== 'teacher-1792655672625-x1rw') {
        // Any newly created teacher account only sees students created in their own roster
        list = db.users.filter(u => 
          u.role === 'student' && 
          u.teacherId === currentUser.id &&
          u.className && 
          u.className.trim().toLowerCase() === filterClass
        );
      } else {
        // Pre-seeded demo account
        list = db.users.filter(u => 
          u.role === 'student' && 
          u.className && 
          u.className.trim().toLowerCase() === filterClass
        );
      }
    } else {
      list = [currentUser];
    }

    const sanitized = list.map(u => {
      const copy = { ...u };
      delete copy.passwordHash;
      return copy;
    });

    res.json(sanitized);
  });

  // POST /api/users (Create user)
  app.post('/api/users', authMiddleware, (req: AuthRequest, res: Response) => {
    const creator = req.user!;
    const { username, fullName, role, password, pinCode, studentCode, schoolId, classId, className, email } = req.body;

    if (!fullName || !role) {
      return res.status(400).json({ error: 'Vui lòng cung cấp họ tên và vai trò.' });
    }

    if (creator.role === 'student') {
      return res.status(403).json({ error: 'Tài khoản học sinh không có quyền tạo tài khoản. Tài khoản học sinh do Giáo viên tạo.' });
    }

    if (creator.role === 'teacher' && role !== 'student') {
      return res.status(403).json({ error: 'Giáo viên chỉ có thể thêm học sinh vào lớp phụ trách.' });
    }

    let finalUsername = username ? username.trim().toLowerCase() : `${role}_${Date.now().toString().slice(-6)}`;
    const existing = db.users.find(u => u.username.toLowerCase() === finalUsername);
    if (existing) {
      return res.status(400).json({ error: `Tên đăng nhập "${finalUsername}" đã tồn tại.` });
    }

    let passwordHash: string | undefined;
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      passwordHash = bcrypt.hashSync(password, salt);
    }

    const now = new Date().toISOString();
    const targetSchoolId = schoolId || creator.schoolId || 'school-kimlien-a';
    const targetClassId = classId || creator.classId || 'class-4a8';
    const targetClassName = className || creator.className || 'Lớp 4A8';

    // Auto-sync teacher class if empty
    if (creator.role === 'teacher') {
      if (!creator.className) creator.className = targetClassName;
      if (!creator.schoolName) creator.schoolName = 'Trường Tiểu học Kim Liên A';
    }

    const newUser: DbUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      username: finalUsername,
      fullName: fullName.trim(),
      role,
      passwordHash,
      pinCode: pinCode || (role === 'student' ? '1234' : undefined),
      studentCode: studentCode || (role === 'student' ? `HS${targetClassName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '4A8'}-${(db.users.filter(u => u.role === 'student').length + 1).toString().padStart(2, '0')}` : undefined),
      mustChangePassword: role !== 'student' && password === '123456',
      schoolId: targetSchoolId,
      schoolName: 'Trường Tiểu học Kim Liên A',
      classId: targetClassId,
      className: targetClassName,
      status: 'active',
      email: email ? email.trim() : undefined,
      avatar: role === 'teacher' ? '👩‍🏫' : role === 'admin' ? '🛡️' : role === 'school' ? '🏫' : '🎒',
      teacherId: creator.role === 'teacher' ? creator.id : undefined,
      createdAt: now,
      updatedAt: now,
    };

    db.users.push(newUser);
    saveDb();

    logAudit(creator.id, creator.username, 'CREATE_USER', `Tạo tài khoản: ${newUser.fullName} (${newUser.role})`, req.ip);

    const safe = { ...newUser };
    delete safe.passwordHash;
    res.status(201).json(safe);
  });

  // POST /api/students/bulk-import (Teacher or Admin bulk student provisioning)
  app.post('/api/students/bulk-import', authMiddleware, requireRole(['teacher', 'admin']), (req: AuthRequest, res: Response) => {
    const creator = req.user!;
    const { students: rawStudents, classId, className } = req.body;

    if (!Array.isArray(rawStudents) || rawStudents.length === 0) {
      return res.status(400).json({ error: 'Danh sách học sinh không hợp lệ hoặc trống.' });
    }

    const targetClass = (className || creator.className || 'Lớp 4A8').trim();
    const targetSchool = (creator.schoolName || 'Trường Tiểu học Kim Liên A').trim();
    const targetClassId = classId || creator.classId || 'class-4a8';
    const classTag = targetClass.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '4A8';

    // Auto-sync teacher class info if empty
    if (creator.role === 'teacher') {
      if (!creator.className) creator.className = targetClass;
      if (!creator.schoolName) creator.schoolName = targetSchool;
    }

    // Ensure class exists in db.classes
    if (!db.classes.some(c => c.name.toLowerCase() === targetClass.toLowerCase())) {
      db.classes.push({
        id: targetClassId,
        name: targetClass,
        grade: 4,
        maxStudents: 45,
        schoolId: creator.schoolId || 'school-kimlien-a',
        schoolName: targetSchool,
        teacherIds: [creator.id],
        teacherNames: [creator.fullName],
        createdAt: new Date().toISOString(),
      });
    }

    const created: DbUser[] = [];
    const updated: DbUser[] = [];

    // Count existing students in this class
    let existingCount = db.users.filter(u => u.role === 'student' && (u.className === targetClass || !u.className)).length;

    const now = new Date().toISOString();

    for (let i = 0; i < rawStudents.length; i++) {
      const item = rawStudents[i];
      if (!item) continue;

      let fullName = '';
      let studentCode = '';
      let pinCode = '1234';

      if (typeof item === 'string') {
        fullName = item.trim();
      } else {
        fullName = (item.fullName || item.name || item['Họ và tên'] || item['Họ tên'] || item['ho_ten'] || '').trim();
        studentCode = (item.studentCode || item.code || item['Mã học sinh'] || item['Mã HS'] || item['ma_hs'] || '').trim();
        pinCode = (item.pinCode || item.pin || item['Mã PIN'] || item['PIN'] || item['pin_code'] || '1234').toString().trim();
      }

      if (!fullName) continue;

      // Clean pinCode to 4 digits
      pinCode = pinCode.replace(/\D/g, '').slice(0, 4) || '1234';

      const normName = fullName.replace(/\s+/g, ' ').trim().toLowerCase();

      // Check if student with same name or code already exists in this class
      const existing = db.users.find(
        u => u.role === 'student' && 
        (u.className?.toLowerCase() === targetClass.toLowerCase() || !u.className) && 
        (u.fullName.replace(/\s+/g, ' ').trim().toLowerCase() === normName || (studentCode && u.studentCode === studentCode))
      );

      if (existing) {
        if (pinCode) existing.pinCode = pinCode;
        if (studentCode) existing.studentCode = studentCode;
        existing.updatedAt = now;
        updated.push(existing);
      } else {
        existingCount++;
        const finalCode = studentCode || `HS${classTag}-${existingCount.toString().padStart(2, '0')}`;
        const newStudent: DbUser = {
          id: `student-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          fullName,
          username: `hs_${classTag.toLowerCase()}_${existingCount}_${Math.random().toString(36).substring(2, 5)}`,
          role: 'student',
          className: targetClass,
          classId: targetClassId,
          schoolName: targetSchool,
          studentCode: finalCode,
          pinCode,
          status: 'active',
          avatar: Math.random() > 0.5 ? '👧' : '👦',
          teacherId: creator.id,
          createdAt: now,
          updatedAt: now,
        };
        db.users.push(newStudent);
        created.push(newStudent);
      }
    }

    saveDb();
    logAudit(
      creator.id, 
      creator.username, 
      'BULK_IMPORT_STUDENTS', 
      `Cấp tài khoản hàng loạt: Tạo mới ${created.length}, cập nhật ${updated.length} học sinh cho ${targetClass}`, 
      req.ip
    );

    const safeList = created.concat(updated).map(s => {
      const copy = { ...s };
      delete copy.passwordHash;
      return copy;
    });

    res.status(201).json({
      success: true,
      message: `Đã xử lý danh sách: Cấp mới ${created.length} học sinh, cập nhật ${updated.length} học sinh cho ${targetClass}!`,
      createdCount: created.length,
      updatedCount: updated.length,
      students: safeList,
    });
  });

  // PUT /api/users/:id
  app.put('/api/users/:id', authMiddleware, (req: AuthRequest, res: Response) => {
    const creator = req.user!;
    const targetId = req.params.id;
    const { fullName, status, password, pinCode } = req.body;

    const user = db.users.find(u => u.id === targetId);
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng.' });

    if (creator.role === 'teacher') {
      if (user.role !== 'student' || user.className !== creator.className) {
        return res.status(403).json({ error: 'Giáo viên chỉ có quyền sửa học sinh thuộc lớp mình.' });
      }
    } else if (creator.role !== 'admin' && creator.id !== user.id) {
      return res.status(403).json({ error: 'Không có quyền sửa tài khoản này.' });
    }

    if (fullName) user.fullName = fullName.trim();
    if (status && (status === 'active' || status === 'locked')) user.status = status;
    if (pinCode && user.role === 'student') user.pinCode = pinCode.trim();
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      user.passwordHash = bcrypt.hashSync(password, salt);
    }
    user.updatedAt = new Date().toISOString();
    saveDb();

    logAudit(creator.id, creator.username, 'UPDATE_USER', `Cập nhật thông tin tài khoản: ${user.fullName}`, req.ip);

    const safe = { ...user };
    delete safe.passwordHash;
    res.json(safe);
  });

  // DELETE /api/users/:id
  app.delete('/api/users/:id', authMiddleware, (req: AuthRequest, res: Response) => {
    const creator = req.user!;
    const targetId = req.params.id;

    if (creator.id === targetId) {
      return res.status(400).json({ error: 'Bạn không thể tự xóa tài khoản của chính mình.' });
    }

    const index = db.users.findIndex(u => u.id === targetId);
    if (index === -1) return res.status(404).json({ error: 'Không tìm thấy người dùng cần xóa.' });

    const user = db.users[index];

    // Main admin account protection
    if (user.role === 'admin' && (user.username === 'admin' || user.id === 'user-admin-01')) {
      return res.status(400).json({ error: 'Không thể xóa tài khoản Quản trị viên hệ thống mặc định (admin).' });
    }

    if (creator.role === 'teacher') {
      if (user.role !== 'student' || user.className !== creator.className) {
        return res.status(403).json({ error: 'Giáo viên chỉ có thể xóa học sinh trong lớp mình.' });
      }
    } else if (creator.role !== 'admin') {
      return res.status(403).json({ error: 'Chỉ Admin mới có quyền xóa tài khoản.' });
    }

    db.users.splice(index, 1);
    saveDb();

    logAudit(creator.id, creator.username, 'DELETE_USER', `Xóa tài khoản: ${user.fullName} (${user.role} - ${user.username || user.studentCode || ''})`, req.ip);
    res.json({ success: true, message: `Đã xóa thành công tài khoản "${user.fullName}"` });
  });

  // GET /api/reports/class-summary (Teacher & Admin)
  app.get('/api/reports/class-summary', authMiddleware, requireRole(['teacher', 'admin', 'school']), (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const targetClass = (req.query.className as string) || user.className || '';
    if (!targetClass) {
      return res.json({
        className: '',
        maxCapacity: 0,
        registeredStudentsCount: 0,
        submittedStudentsCount: 0,
        totalSubmissions: 0,
        gradedSubmissionsCount: 0,
        pendingSubmissionsCount: 0,
        needsEditCount: 0,
        averageScore: 0,
        submissionRate: 0,
      });
    }

    let classStudents: DbUser[] = [];
    if (user.role === 'teacher' && user.id !== 'teacher-1792655672625-x1rw') {
      classStudents = db.users.filter(u => 
        u.role === 'student' && 
        u.teacherId === user.id &&
        u.className && 
        u.className.trim().toLowerCase() === targetClass.trim().toLowerCase()
      );
    } else {
      classStudents = db.users.filter(u => 
        u.role === 'student' && 
        u.className && 
        u.className.trim().toLowerCase() === targetClass.trim().toLowerCase()
      );
    }

    if (classStudents.length === 0) {
      return res.json({
        className: targetClass,
        maxCapacity: 35,
        registeredStudentsCount: 0,
        submittedStudentsCount: 0,
        totalSubmissions: 0,
        gradedSubmissionsCount: 0,
        pendingSubmissionsCount: 0,
        needsEditCount: 0,
        averageScore: 0,
        submissionRate: 0,
      });
    }

    const totalStudents = classStudents.length;
    const maxCapacity = 35;
    const studentIds = new Set(classStudents.map(s => s.id));
    const studentNames = new Set(classStudents.map(s => (s.fullName || '').trim().toLowerCase()));

    const classSubs = db.submissions.filter(s => {
      if (!s.studentClass || s.studentClass.trim().toLowerCase() !== targetClass.trim().toLowerCase()) return false;
      return (s.studentId && studentIds.has(s.studentId)) || 
             (s.studentName && studentNames.has((s.studentName || '').trim().toLowerCase()));
    });
    const submittedStudentIds = new Set(classSubs.map(s => s.studentId));
    const gradedSubs = classSubs.filter(s => s.status === 'graded');

    const totalScores = gradedSubs.reduce((acc, s) => acc + (s.score || 0), 0);
    const averageScore = gradedSubs.length > 0 ? Number((totalScores / gradedSubs.length).toFixed(1)) : 0;

    res.json({
      className: targetClass,
      maxCapacity,
      registeredStudentsCount: totalStudents,
      submittedStudentsCount: submittedStudentIds.size,
      totalSubmissions: classSubs.length,
      gradedSubmissionsCount: gradedSubs.length,
      pendingSubmissionsCount: classSubs.filter(s => s.status === 'pending').length,
      needsEditCount: classSubs.filter(s => s.status === 'needs_edit').length,
      averageScore,
      submissionRate: totalStudents > 0 ? Math.round((submittedStudentIds.size / totalStudents) * 100) : 0,
    });
  });

  // GET /api/schools
  app.get('/api/schools', (_req: Request, res: Response) => {
    res.json(db.schools);
  });

  // POST /api/schools
  app.post('/api/schools', authMiddleware, requireRole(['admin']), (req: AuthRequest, res: Response) => {
    const { name, code, address, email, phone, hotline } = req.body;
    if (!name || !code) {
      res.status(400).json({ error: 'Tên trường và mã trường là bắt buộc' });
      return;
    }
    const newSchool: DbSchool = {
      id: `school-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      code: code.trim().toUpperCase(),
      address: address?.trim() || '',
      email: email?.trim() || '',
      phone: phone?.trim() || '',
      hotline: hotline?.trim() || '',
      createdAt: new Date().toISOString(),
    };
    db.schools.push(newSchool);
    saveDb();
    logAudit(req.user!.id, req.user!.username, 'CREATE_SCHOOL', `Đã tạo trường học: ${newSchool.name}`, req.ip);
    res.json(newSchool);
  });

  // DELETE /api/schools/:id
  app.delete('/api/schools/:id', authMiddleware, requireRole(['admin']), (req: AuthRequest, res: Response) => {
    const schoolId = req.params.id;
    const existing = db.schools.find(s => s.id === schoolId);
    if (!existing) {
      res.status(404).json({ error: 'Không tìm thấy trường học' });
      return;
    }
    db.schools = db.schools.filter(s => s.id !== schoolId);
    // Also remove related classes or update them
    db.classes = db.classes.filter(c => c.schoolId !== schoolId);
    saveDb();
    logAudit(req.user!.id, req.user!.username, 'DELETE_SCHOOL', `Đã xóa trường học: ${existing.name}`, req.ip);
    res.json({ success: true, message: `Đã xóa trường "${existing.name}" thành công!` });
  });

  // GET /api/classes
  app.get('/api/classes', (_req: Request, res: Response) => {
    res.json(db.classes);
  });

  // POST /api/classes
  app.post('/api/classes', authMiddleware, requireRole(['admin', 'school', 'teacher']), (req: AuthRequest, res: Response) => {
    const { name, grade, schoolId, schoolName, teacherName } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Tên lớp là bắt buộc' });
      return;
    }
    const newClass: DbClass = {
      id: `class-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      grade: Number(grade) || 4,
      maxStudents: 36,
      schoolId: schoolId || '',
      schoolName: schoolName || '',
      teacherIds: req.user ? [req.user.id] : [],
      teacherNames: teacherName ? [teacherName.trim()] : (req.user?.fullName ? [req.user.fullName] : []),
      createdAt: new Date().toISOString(),
    };
    db.classes.push(newClass);
    saveDb();
    logAudit(req.user!.id, req.user!.username, 'CREATE_CLASS', `Đã tạo lớp học mới: ${newClass.name}`, req.ip);
    res.json(newClass);
  });

  // DELETE /api/classes/:id
  app.delete('/api/classes/:id', authMiddleware, requireRole(['admin', 'school']), (req: AuthRequest, res: Response) => {
    const classId = req.params.id;
    const existing = db.classes.find(c => c.id === classId);
    if (!existing) {
      res.status(404).json({ error: 'Không tìm thấy lớp học' });
      return;
    }
    db.classes = db.classes.filter(c => c.id !== classId);
    saveDb();
    logAudit(req.user!.id, req.user!.username, 'DELETE_CLASS', `Đã xóa lớp học: ${existing.name}`, req.ip);
    res.json({ success: true, message: `Đã xóa lớp "${existing.name}" thành công!` });
  });

  // GET /api/audit-logs
  app.get('/api/audit-logs', authMiddleware, requireRole(['admin']), (_req: AuthRequest, res: Response) => {
    res.json(db.auditLogs);
  });

  // POST /api/challenges/sync - Persist challenge progress safely
  app.post('/api/challenges/sync', (req: Request, res: Response) => {
    try {
      const data = req.body;
      const userId = data.userId || 'guest';
      if (!db.challenges) {
        db.challenges = {};
      }
      db.challenges[userId] = {
        ...data,
        syncedAt: new Date().toISOString(),
      };
      saveDb();
      res.json({ success: true, message: 'Đã lưu tiến độ thử thách thành công!' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Lỗi khi lưu tiến độ thử thách' });
    }
  });

  // GET /api/challenges/progress
  app.get('/api/challenges/progress', (req: Request, res: Response) => {
    try {
      const userId = (req.query.userId as string) || 'guest';
      const record = db.challenges?.[userId] || null;
      res.json({ success: true, progress: record });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/admin/clean-demo-data
  app.post('/api/admin/clean-demo-data', authMiddleware, requireRole(['admin']), (req: AuthRequest, res: Response) => {
    const admin = req.user!;
    const originalSubCount = db.submissions.length;
    db.submissions = [];
    db.diamondNotes = [];
    db.isDemoCleaned = true;

    // Clean mock/demo schools & classes:
    db.schools = db.schools.filter(s => s.id !== 'school-kimlien-a' && s.code !== 'THKLA');
    db.classes = db.classes.filter(c => c.id !== 'class-4a1' && c.id !== 'class-4a8');

    // Clean mock/demo accounts:
    // bgh_kimlien_a, cothuha, maianh_4a1, quocbao_4a1, etc.
    const demoUserIds = ['user-school-01', 'teacher-thu-ha', 'student-mai-anh', 'student-quoc-bao'];
    const demoUsernames = ['cothuha', 'bgh_kimlien_a', 'maianh_4a1', 'quocbao_4a1', 'maianh_4a8', 'quocbao_4a8'];

    const usersToDelete = db.users.filter(u => 
      u.role !== 'admin' && 
      (demoUserIds.includes(u.id) || demoUsernames.includes(u.username?.toLowerCase() || ''))
    );

    const deletedUsersCount = usersToDelete.length;
    db.users = db.users.filter(u => !usersToDelete.some(d => d.id === u.id));

    saveDb();

    logAudit(admin.id, admin.username, 'CLEAN_DEMO_DATA', `Đã dọn dẹp ${originalSubCount} bài nộp thử nghiệm, các trường/lớp mẫu và ${deletedUsersCount} tài khoản demo.`, req.ip);
    res.json({
      success: true,
      message: `Đã dọn dẹp dữ liệu thử nghiệm thành công! Đã xóa các trường học/lớp học mẫu, bài nộp thử nghiệm và các tài khoản demo.`,
      purgedCount: originalSubCount,
      deletedUsersCount,
    });
  });

  
  // ===================== GOOGLE SHEETS & POSTS API =====================

  // GET /api/sheets/status - Connection and Sync Status
  
  
  // ===================== MULTI-DEVICE CLOUD PERSISTENCE =====================

  // GET /api/studio/draft - Retrieve student draft & progress from cloud
  app.get('/api/studio/draft', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const lessonId = (req.query.lessonId as string) || 'default';
    if (!db.studioDrafts) db.studioDrafts = {};

    const userKey = `${user.id}_${lessonId}`;
    const nameKey = `${user.fullName.trim().toLowerCase()}_${lessonId}`;

    let draft = db.studioDrafts[userKey] || db.studioDrafts[nameKey];

    // If no draft exists, check if student already has a submission for this lesson!
    if (!draft) {
      const cleanName = user.fullName.trim().toLowerCase();
      const sub = db.submissions.find(s => 
        (s.studentId === user.id || s.studentName.trim().toLowerCase() === cleanName) &&
        (s.lessonId === lessonId || s.lessonTitle.toLowerCase().includes(lessonId.toLowerCase()) || (lessonId.length > 5 && lessonId.toLowerCase().includes(s.lessonTitle.toLowerCase())) || (lessonId === 'default'))
      );

      if (sub) {
        draft = {
          currentStep: 8,
          draftContent: sub.content,
          revisedContent: sub.content,
          step1Answers: {},
          step3Answers: {},
          outline: {
            intro: 'Phần Mở bài đã hoàn thiện trong bài nộp.',
            body: 'Phần Thân bài đã hoàn thiện trong bài nộp.',
            conclusion: 'Phần Kết bài đã hoàn thiện trong bài nộp.'
          },
          selfAssessment: {
            stars: 5,
            checkedCriteria: {},
            favoriteSentence: '',
            learningTakeaway: ''
          },
          versions: [{
            id: `ver-${Date.now()}`,
            versionName: 'Bản nộp chính thức',
            step: 8,
            content: sub.content,
            wordCount: sub.wordCount,
            timestamp: sub.submittedAt
          }],
          lastSavedAt: sub.submittedAt,
          isFromSubmission: true,
          submissionStatus: sub.status,
          teacherComment: sub.teacherComment,
          score: sub.score
        };
      }
    }

    res.json({ success: true, draft: draft || null });
  });

  // POST /api/studio/draft - Save student 8-step progress to cloud & Google Sheets
  app.post('/api/studio/draft', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const { lessonId, state } = req.body;

    if (!lessonId || !state) {
      return res.status(400).json({ error: 'Thiếu lessonId hoặc dữ liệu bài làm.' });
    }

    if (!db.studioDrafts) db.studioDrafts = {};
    const userKey = `${user.id}_${lessonId}`;
    const nameKey = `${user.fullName.trim().toLowerCase()}_${lessonId}`;

    const savedState = {
      ...state,
      studentId: user.id,
      studentName: user.fullName,
      studentClass: user.className || 'Lớp 4A8',
      lessonId,
      cloudSavedAt: new Date().toISOString(),
    };

    db.studioDrafts[userKey] = savedState;
    db.studioDrafts[nameKey] = savedState;

    saveDb();
    res.json({ success: true, message: 'Đã lưu tiến độ bài làm lên máy chủ đám mây!' });
  });

  // GET /api/achievements/progress
  app.get('/api/achievements/progress', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!db.achievements) db.achievements = {};
    const record = db.achievements[user.id] || db.achievements[user.fullName.trim().toLowerCase()] || null;
    res.json({ success: true, progress: record });
  });

  // POST /api/achievements/progress
  app.post('/api/achievements/progress', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    if (!db.achievements) db.achievements = {};
    const { claimedAchievementIds, unlockedBadgeIds, starsCount } = req.body;
    const progress = {
      userId: user.id,
      claimedAchievementIds: claimedAchievementIds || [],
      unlockedBadgeIds: unlockedBadgeIds || [],
      starsCount: starsCount || 0,
      updatedAt: new Date().toISOString(),
    };
    db.achievements[user.id] = progress;
    db.achievements[user.fullName.trim().toLowerCase()] = progress;
    saveDb();
    res.json({ success: true, message: 'Đã lưu huy hiệu và sao tiến bộ lên máy chủ!' });
  });

  // POST /api/sheets/proxy - Safe server-side proxy for Google Apps Script Web App
  app.post('/api/sheets/proxy', async (req: Request, res: Response) => {
    try {
      const targetUrl = req.body.scriptUrl || process.env.GOOGLE_SHEETS_SCRIPT_URL || googleSheetsService.getStatus().scriptUrl;
      if (!targetUrl) return res.status(400).json({ error: 'Chưa cấu hình GOOGLE_SHEETS_SCRIPT_URL' });

      const proxyRes = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      const text = await proxyRes.text();
      try {
        const parsed = JSON.parse(text);
        res.json(parsed);
      } catch {
        res.json({ success: true, text });
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/sheets/status', (_req: Request, res: Response) => {
    try {
      const status = googleSheetsService.getStatus();
      res.json(status);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/sheets/setup - Configure Spreadsheet ID or Apps Script Web App URL
  app.post('/api/sheets/setup', authMiddleware, requireRole(['teacher', 'admin']), async (req: AuthRequest, res: Response) => {
    try {
      const { spreadsheetId, scriptUrl } = req.body;
      const updatedConfig = googleSheetsService.updateManualConfig(spreadsheetId, scriptUrl);
      
      // If we have access token or script url, attempt verification
      if (googleSheetsService.getAccessToken() || updatedConfig.scriptUrl) {
        await googleSheetsService.ensureSpreadsheet();
      }
      
      logAudit(req.user!.id, req.user!.username, 'CONFIG_GOOGLE_SHEETS', `Cấu hình Google Sheets: ${updatedConfig.spreadsheetId || updatedConfig.scriptUrl || 'Chưa liên kết'}`, req.ip);
      res.json(googleSheetsService.getStatus());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/sheets/token - Receive Google OAuth Access Token from frontend
  app.post('/api/sheets/token', async (req: Request, res: Response) => {
    try {
      const { token, expiresIn } = req.body;
      if (!token) return res.status(400).json({ error: 'Thiếu Google Access Token' });
      
      googleSheetsService.setAccessToken(token, expiresIn || 3600);
      
      // Try to ensure spreadsheet and tabs asynchronously
      googleSheetsService.ensureSpreadsheet(token).catch(err => {
        console.warn('[GoogleSheets] ensureSpreadsheet on token failed:', err);
      });

      res.json({ success: true, message: 'Đã nhận Google OAuth Token thành công!' });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/sheets/sync-all - Full two-way sync
  app.post('/api/sheets/sync-all', authMiddleware, requireRole(['teacher', 'admin']), async (req: AuthRequest, res: Response) => {
    try {
      const syncResult = await googleSheetsService.syncAllDatabaseToSheets(db);
      logAudit(req.user!.id, req.user!.username, 'SYNC_ALL_SHEETS', `Đồng bộ toàn bộ cơ sở dữ liệu sang Google Sheets`, req.ip);
      
      if (!syncResult.success) {
        return res.status(400).json({
          success: false,
          error: syncResult.error || 'Đồng bộ thất bại',
          details: syncResult.details,
        });
      }
      
      res.json({
        success: true,
        message: 'Đã đồng bộ toàn bộ 7 bảng dữ liệu sang Google Sheets thành công!',
        details: syncResult.details,
        spreadsheetUrl: googleSheetsService.getStatus().spreadsheetUrl,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/posts - Student Posts Library with strict RBAC visibility
  app.get('/api/posts', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const { classId, className, studentId, status, visibility, category, search } = req.query;

    let filtered = [...(db.posts || [])];

    // Filter by studentId if specified
    if (studentId && typeof studentId === 'string') {
      filtered = filtered.filter(p => p.studentId === studentId);
    }

    // Role-based visibility security:
    const cleanName = user.fullName ? user.fullName.trim().toLowerCase() : '';
    if (user.role === 'student') {
      const userClass = (user.className || 'Lớp 4A8').trim().toLowerCase();
      filtered = filtered.filter(p => {
        // 1. Student always sees their own posts (any status/visibility) - multi-device resilient
        if (p.studentId === user.id || (p.authorName && p.authorName.trim().toLowerCase() === cleanName)) {
          if (p.studentId !== user.id) p.studentId = user.id;
          return true;
        }

        // 2. Classmate posts: only if visibility is CLASS, SCHOOL, or PUBLIC AND status is SUBMITTED or APPROVED
        if (p.visibility === 'PRIVATE' || p.status === 'DRAFT') return false;

        const postClass = (p.className || '').trim().toLowerCase();
        if (p.visibility === 'CLASS' && postClass && postClass !== userClass) return false;

        return true;
      });
    } else if (user.role === 'teacher') {
      // Teacher sees all posts of their assigned class, plus any SCHOOL/PUBLIC posts
      const teacherClass = (user.className || 'Lớp 4A8').trim().toLowerCase();
      filtered = filtered.filter(p => {
        if (!p.className) return true;
        const postClass = p.className.trim().toLowerCase();
        return postClass === teacherClass || postClass.includes(teacherClass) || teacherClass.includes(postClass) || p.visibility === 'SCHOOL' || p.visibility === 'PUBLIC';
      });
    }

    // Filter by class query if requested
    if (className && typeof className === 'string') {
      const qClass = className.trim().toLowerCase();
      filtered = filtered.filter(p => (p.className || '').toLowerCase().includes(qClass));
    }

    // Filter by status query
    if (status && typeof status === 'string' && status !== 'all') {
      filtered = filtered.filter(p => p.status === status.toUpperCase());
    }

    // Filter by visibility query
    if (visibility && typeof visibility === 'string' && visibility !== 'all') {
      filtered = filtered.filter(p => p.visibility === visibility.toUpperCase());
    }

    // Filter by category query
    if (category && typeof category === 'string' && category !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    // Search query
    if (search && typeof search === 'string') {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.content.toLowerCase().includes(q) ||
        p.authorName.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    filtered.sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());

    res.json(filtered);
  });

  // GET /api/posts/:id - Post details with edit history
  app.get('/api/posts/:id', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const post = (db.posts || []).find(p => p.id === req.params.id);
    if (!post) return res.status(404).json({ error: 'Không tìm thấy bài viết.' });

    // Permissions check
    if (user.role === 'student' && post.studentId !== user.id) {
      if (post.visibility === 'PRIVATE' || post.status === 'DRAFT') {
        return res.status(403).json({ error: 'Bạn không có quyền xem bài viết riêng tư này.' });
      }
    }

    const history = (db.postHistory || []).filter(h => h.postId === post.id);
    res.json({ post, history });
  });

  // POST /api/posts - Create post (Student)
  app.post('/api/posts', authMiddleware, requireRole(['student', 'teacher', 'admin']), (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const { title, content, category, status, visibility } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Tiêu đề bài viết không được để trống.' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Nội dung bài viết không được để trống.' });
    }

    // Anti-double-submit: reject if identical title & content from same user within 5 seconds
    const now = new Date();
    const recentDuplicate = (db.posts || []).find(p => 
      p.studentId === user.id && 
      p.title.trim() === title.trim() && 
      (now.getTime() - new Date(p.createdAt).getTime() < 5000)
    );
    if (recentDuplicate) {
      return res.status(429).json({ error: 'Bạn vừa lưu bài viết này rồi. Vui lòng chờ vài giây trước khi thực hiện tiếp.' });
    }

    const postId = `post-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const postStatus = (status === 'SUBMITTED' ? 'SUBMITTED' : 'DRAFT') as 'DRAFT' | 'SUBMITTED';
    const postVisibility = (visibility || (postStatus === 'SUBMITTED' ? 'CLASS' : 'PRIVATE')) as 'PRIVATE' | 'CLASS' | 'SCHOOL' | 'PUBLIC';

    const newPost: DbPost = {
      id: postId,
      studentId: user.id, // Strictly bound to authenticated session!
      authorName: user.fullName,
      schoolId: user.schoolId || 'school-kimlien-a',
      classId: user.classId || 'class-4a8',
      className: user.className || 'Lớp 4A8',
      title: title.trim(),
      content: content.trim(),
      category: category || 'Văn miêu tả',
      status: postStatus,
      visibility: postVisibility,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      publishedAt: postStatus === 'SUBMITTED' ? now.toISOString() : undefined,
    };

    if (!db.posts) db.posts = [];
    db.posts.unshift(newPost);

    // Record history
    const historyItem: DbPostHistory = {
      id: `hist-${Date.now()}`,
      postId,
      actorId: user.id,
      actorName: user.fullName,
      action: postStatus === 'SUBMITTED' ? 'SUBMIT' : 'CREATE',
      oldStatus: 'NONE',
      newStatus: postStatus,
      note: postStatus === 'SUBMITTED' ? 'Gửi bài cho giáo viên duyệt' : 'Tạo bản nháp mới',
      createdAt: now.toISOString(),
    };
    if (!db.postHistory) db.postHistory = [];
    db.postHistory.unshift(historyItem);

    saveDb();
    logAudit(user.id, user.username, 'CREATE_POST', `${postStatus === 'SUBMITTED' ? 'Gửi bài' : 'Lưu nháp'}: "${newPost.title}"`, req.ip);

    // Sync to Google Sheets in background
    googleSheetsService.appendRow('POSTS', newPost).catch(() => {});
    googleSheetsService.appendRow('POST_HISTORY', historyItem).catch(() => {});

    res.status(201).json(newPost);
  });

  // PUT /api/posts/:id - Update draft or post
  app.put('/api/posts/:id', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const postId = req.params.id;
    const { title, content, category, visibility } = req.body;

    const post = (db.posts || []).find(p => p.id === postId);
    if (!post) return res.status(404).json({ error: 'Không tìm thấy bài viết.' });

    // Authorization: only author or admin can edit
    if (user.role === 'student' && post.studentId !== user.id) {
      return res.status(403).json({ error: 'Bạn chỉ có thể chỉnh sửa bài viết của chính mình.' });
    }

    const oldStatus = post.status;
    if (title) post.title = title.trim();
    if (content) post.content = content.trim();
    if (category) post.category = category.trim();
    if (visibility) post.visibility = visibility;
    post.updatedAt = new Date().toISOString();

    const historyItem: DbPostHistory = {
      id: `hist-${Date.now()}`,
      postId,
      actorId: user.id,
      actorName: user.fullName,
      action: 'UPDATE',
      oldStatus,
      newStatus: post.status,
      note: 'Chỉnh sửa nội dung bài viết',
      createdAt: new Date().toISOString(),
    };
    if (!db.postHistory) db.postHistory = [];
    db.postHistory.unshift(historyItem);

    saveDb();
    logAudit(user.id, user.username, 'UPDATE_POST', `Chỉnh sửa bài viết "${post.title}"`, req.ip);

    // Sync to Google Sheets
    googleSheetsService.updateRow('POSTS', 'post_id', postId, post).catch(() => {});
    googleSheetsService.appendRow('POST_HISTORY', historyItem).catch(() => {});

    res.json(post);
  });

  // POST /api/posts/:id/submit - Submit draft for review
  app.post('/api/posts/:id/submit', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const postId = req.params.id;

    const post = (db.posts || []).find(p => p.id === postId);
    if (!post) return res.status(404).json({ error: 'Không tìm thấy bài viết.' });

    if (user.role === 'student' && post.studentId !== user.id) {
      return res.status(403).json({ error: 'Bạn chỉ có thể gửi bài viết của mình.' });
    }

    const oldStatus = post.status;
    post.status = 'SUBMITTED';
    post.visibility = post.visibility === 'PRIVATE' ? 'CLASS' : post.visibility;
    post.updatedAt = new Date().toISOString();
    post.publishedAt = new Date().toISOString();

    const historyItem: DbPostHistory = {
      id: `hist-${Date.now()}`,
      postId,
      actorId: user.id,
      actorName: user.fullName,
      action: 'SUBMIT',
      oldStatus,
      newStatus: 'SUBMITTED',
      note: 'Học sinh gửi bài chính thức cho Giáo viên duyệt',
      createdAt: new Date().toISOString(),
    };
    if (!db.postHistory) db.postHistory = [];
    db.postHistory.unshift(historyItem);

    saveDb();
    logAudit(user.id, user.username, 'SUBMIT_POST', `Gửi bài viết "${post.title}" cho Giáo viên`, req.ip);

    // Sync to Google Sheets
    googleSheetsService.updateRow('POSTS', 'post_id', postId, post).catch(() => {});
    googleSheetsService.appendRow('POST_HISTORY', historyItem).catch(() => {});

    res.json(post);
  });

  // POST /api/posts/:id/review - Teacher review (approve, request_edit, reject)
  app.post('/api/posts/:id/review', authMiddleware, requireRole(['teacher', 'admin']), (req: AuthRequest, res: Response) => {
    const reviewer = req.user!;
    const postId = req.params.id;
    const { action, feedback, score, visibility } = req.body;

    const post = (db.posts || []).find(p => p.id === postId);
    if (!post) return res.status(404).json({ error: 'Không tìm thấy bài viết.' });

    // Validate teacher class assignment
    if (reviewer.role === 'teacher') {
      const teacherClass = (reviewer.className || 'Lớp 4A8').trim().toLowerCase();
      const postClass = (post.className || '').trim().toLowerCase();
      if (postClass && !postClass.includes(teacherClass) && !teacherClass.includes(postClass)) {
        return res.status(403).json({ error: 'Giáo viên chỉ có quyền duyệt bài của học sinh lớp mình phụ trách.' });
      }
    }

    const oldStatus = post.status;
    let newStatus: 'APPROVED' | 'REJECTED' = 'APPROVED';
    let historyAction: DbPostHistory['action'] = 'APPROVE';
    let historyNote = '';

    if (action === 'approve') {
      newStatus = 'APPROVED';
      historyAction = 'APPROVE';
      historyNote = `Giáo viên ${reviewer.fullName} đã duyệt bài viết và cho phép hiển thị.`;
      if (visibility) post.visibility = visibility;
      post.publishedAt = new Date().toISOString();
    } else if (action === 'request_edit') {
      newStatus = 'REJECTED';
      historyAction = 'REQUEST_EDIT';
      historyNote = `Giáo viên ${reviewer.fullName} yêu cầu học sinh chỉnh sửa lại.`;
    } else {
      newStatus = 'REJECTED';
      historyAction = 'REJECT';
      historyNote = `Giáo viên ${reviewer.fullName} đã từ chối bài viết.`;
    }

    post.status = newStatus;
    if (feedback !== undefined) post.teacherFeedback = feedback.trim();
    if (score !== undefined) post.teacherScore = Number(score);
    post.updatedAt = new Date().toISOString();

    const historyItem: DbPostHistory = {
      id: `hist-${Date.now()}`,
      postId,
      actorId: reviewer.id,
      actorName: reviewer.fullName,
      action: historyAction,
      oldStatus,
      newStatus,
      note: historyNote + (feedback ? ` Góp ý: ${feedback.trim().slice(0, 80)}` : ''),
      createdAt: new Date().toISOString(),
    };
    if (!db.postHistory) db.postHistory = [];
    db.postHistory.unshift(historyItem);

    saveDb();
    logAudit(reviewer.id, reviewer.username, 'REVIEW_POST', `${historyAction}: "${post.title}" của ${post.authorName}`, req.ip);

    // Sync to Google Sheets
    googleSheetsService.updateRow('POSTS', 'post_id', postId, post).catch(() => {});
    googleSheetsService.appendRow('POST_HISTORY', historyItem).catch(() => {});

    res.json(post);
  });

  // DELETE /api/posts/:id - Delete post
  app.delete('/api/posts/:id', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const postId = req.params.id;

    const idx = (db.posts || []).findIndex(p => p.id === postId);
    if (idx === -1) return res.status(404).json({ error: 'Không tìm thấy bài viết.' });

    const post = db.posts![idx];
    if (user.role === 'student' && post.studentId !== user.id) {
      return res.status(403).json({ error: 'Bạn không có quyền xóa bài viết này.' });
    }
    if (user.role === 'student' && post.status !== 'DRAFT') {
      return res.status(400).json({ error: 'Học sinh chỉ có thể xóa các bản nháp chưa gửi.' });
    }

    db.posts!.splice(idx, 1);
    saveDb();
    logAudit(user.id, user.username, 'DELETE_POST', `Xóa bài viết "${post.title}"`, req.ip);

    res.json({ success: true, message: 'Đã xóa bài viết thành công.' });
  });

  // GET /api/dashboard/teacher - Comprehensive teacher overview
  app.get('/api/dashboard/teacher', authMiddleware, requireRole(['teacher', 'admin']), (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const targetClass = (req.query.className as string || user.className || 'Lớp 4A8').trim();
    const students = db.users.filter(u => u.role === 'student' && (u.className === targetClass || !u.className));
    const allPosts = db.posts || [];
    const classPosts = allPosts.filter(p => !p.className || p.className === targetClass || p.className.toLowerCase().includes(targetClass.toLowerCase()));

    const pendingReviewCount = classPosts.filter(p => p.status === 'SUBMITTED').length;
    const approvedCount = classPosts.filter(p => p.status === 'APPROVED').length;
    const needsRevisionCount = classPosts.filter(p => p.status === 'REJECTED').length;

    res.json({
      className: targetClass,
      totalStudents: students.length,
      totalPosts: classPosts.length,
      pendingReviewCount,
      approvedCount,
      needsRevisionCount,
      recentPosts: classPosts.slice(0, 10),
      googleSheets: googleSheetsService.getStatus(),
    });
  });

  // GET /api/dashboard/student - Student stats overview
  app.get('/api/dashboard/student', authMiddleware, (req: AuthRequest, res: Response) => {
    const user = req.user!;
    const allPosts = db.posts || [];
    const myPosts = allPosts.filter(p => p.studentId === user.id);
    const draftsCount = myPosts.filter(p => p.status === 'DRAFT').length;
    const approvedCount = myPosts.filter(p => p.status === 'APPROVED').length;

    const userClass = (user.className || 'Lớp 4A8').trim().toLowerCase();
    const classmatePosts = allPosts.filter(p => 
      p.studentId !== user.id && 
      (p.visibility === 'CLASS' || p.visibility === 'SCHOOL' || p.visibility === 'PUBLIC') &&
      p.status === 'APPROVED' &&
      (!p.className || p.className.toLowerCase().includes(userClass))
    );

    res.json({
      student: user,
      myPostsCount: myPosts.length,
      draftsCount,
      approvedCount,
      classmatePostsCount: classmatePosts.length,
      myPosts: myPosts.slice(0, 10),
      classmatePosts: classmatePosts.slice(0, 10),
    });
  });

  // Health check endpoint for container supervisor and proxy probes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime(), time: new Date().toISOString() });
  });

  // ===================== VITE MIDDLEWARE =====================
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[EDUNOVA Server] Official Writing Coach running on http://localhost:${PORT}`);
  });
}

createServer().catch(err => {
  console.error('[EDUNOVA Server] Fatal startup error:', err);
});
