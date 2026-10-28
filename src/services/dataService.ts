import { 
  UserProfile, 
  DbPost, 
  DbPostHistory, 
  GoogleSheetsStatus 
} from '../types';
import { api, getStoredUser } from '../utils/api';

export interface PostFilters {
  classId?: string;
  className?: string;
  studentId?: string;
  status?: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'all';
  visibility?: 'PRIVATE' | 'CLASS' | 'SCHOOL' | 'PUBLIC' | 'all';
  category?: string;
  search?: string;
}

export interface TeacherDashboardData {
  className: string;
  totalStudents: number;
  totalPosts: number;
  pendingReviewCount: number;
  approvedCount: number;
  needsRevisionCount: number;
  recentPosts: DbPost[];
  googleSheets: GoogleSheetsStatus;
}

export interface StudentDashboardData {
  student: UserProfile;
  myPostsCount: number;
  draftsCount: number;
  approvedCount: number;
  classmatePostsCount: number;
  myPosts: DbPost[];
  classmatePosts: DbPost[];
}

export const dataService = {
  /**
   * Get current authenticated user profile
   */
  async getCurrentUser(): Promise<UserProfile | null> {
    return api.getMe();
  },

  /**
   * Get students belonging to a class
   */
  async getStudentsByClass(classIdOrName: string): Promise<any[]> {
    const users = await api.getUsers();
    const cleanFilter = classIdOrName.trim().toLowerCase();
    return users.filter(u => 
      u.role === 'student' && 
      (u.classId?.toLowerCase() === cleanFilter || 
       u.className?.toLowerCase() === cleanFilter ||
       u.className?.toLowerCase().includes(cleanFilter) ||
       !cleanFilter)
    );
  },

  /**
   * Create a new student account
   */
  async createStudent(studentData: {
    fullName: string;
    studentCode?: string;
    pinCode?: string;
    classId?: string;
    className?: string;
    schoolId?: string;
  }): Promise<any> {
    return api.createUser({
      ...studentData,
      role: 'student',
    });
  },

  /**
   * Get posts with optional filters and strict role-based visibility
   */
  async getPosts(filters?: PostFilters): Promise<DbPost[]> {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.classId) params.append('classId', filters.classId);
      if (filters.className) params.append('className', filters.className);
      if (filters.studentId) params.append('studentId', filters.studentId);
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);
      if (filters.visibility && filters.visibility !== 'all') params.append('visibility', filters.visibility);
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return api.customGet<DbPost[]>(`/api/posts${query}`);
  },

  /**
   * Get single post by ID
   */
  async getPostById(postId: string): Promise<{ post: DbPost; history: DbPostHistory[] }> {
    return api.customGet<{ post: DbPost; history: DbPostHistory[] }>(`/api/posts/${postId}`);
  },

  /**
   * Create a new post (defaults to DRAFT, or SUBMITTED if specified)
   */
  async createPost(postData: {
    title: string;
    content: string;
    category?: string;
    status?: 'DRAFT' | 'SUBMITTED';
    visibility?: 'PRIVATE' | 'CLASS' | 'SCHOOL' | 'PUBLIC';
  }): Promise<DbPost> {
    return api.customPost<DbPost>('/api/posts', postData);
  },

  /**
   * Update an existing post draft
   */
  async updatePost(postId: string, postData: {
    title?: string;
    content?: string;
    category?: string;
    visibility?: 'PRIVATE' | 'CLASS' | 'SCHOOL' | 'PUBLIC';
  }): Promise<DbPost> {
    return api.customPut<DbPost>(`/api/posts/${postId}`, postData);
  },

  /**
   * Submit a draft post for teacher grading & publication
   */
  async submitPost(postId: string): Promise<DbPost> {
    return api.customPost<DbPost>(`/api/posts/${postId}/submit`, {});
  },

  /**
   * Review a post (Teacher or Admin)
   */
  async reviewPost(
    postId: string,
    action: 'approve' | 'request_edit' | 'reject',
    feedback: string,
    visibility?: 'CLASS' | 'SCHOOL' | 'PUBLIC'
  ): Promise<DbPost> {
    return api.customPost<DbPost>(`/api/posts/${postId}/review`, {
      action,
      feedback,
      visibility,
    });
  },

  /**
   * Delete a post draft
   */
  async deletePost(postId: string): Promise<{ success: boolean; message: string }> {
    return api.customDelete<{ success: boolean; message: string }>(`/api/posts/${postId}`);
  },

  /**
   * Get teacher dashboard overview with real Google Sheets sync status
   */
  async getTeacherDashboard(className?: string): Promise<TeacherDashboardData> {
    const q = className ? `?className=${encodeURIComponent(className)}` : '';
    return api.customGet<TeacherDashboardData>(`/api/dashboard/teacher${q}`);
  },

  /**
   * Get student dashboard overview
   */
  async getStudentDashboard(): Promise<StudentDashboardData> {
    return api.customGet<StudentDashboardData>('/api/dashboard/student');
  },

  /**
   * Google Sheets connection status
   */
  async getGoogleSheetsStatus(): Promise<GoogleSheetsStatus> {
    return api.customGet<GoogleSheetsStatus>('/api/sheets/status');
  },

  /**
   * Trigger full database sync to Google Sheets
   */
  async syncAllToGoogleSheets(): Promise<{ success: boolean; message: string; details?: any }> {
    return api.customPost<{ success: boolean; message: string; details?: any }>('/api/sheets/sync-all', {});
  },

  /**
   * Save Google OAuth Access Token to server
   */
  async sendGoogleToken(token: string): Promise<{ success: boolean }> {
    return api.customPost<{ success: boolean }>('/api/sheets/token', { token });
  },

  /**
   * Configure Google Spreadsheet ID or Apps Script Web App URL manually
   */
  async configureGoogleSheets(config: { spreadsheetId?: string; scriptUrl?: string }): Promise<GoogleSheetsStatus> {
    return api.customPost<GoogleSheetsStatus>('/api/sheets/setup', config);
  },
};
