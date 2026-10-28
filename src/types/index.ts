export type UserRole = 'admin' | 'school' | 'teacher' | 'student';

export interface UserProfile {
  id: string;
  name: string;
  username?: string;
  role: UserRole;
  school: string;
  schoolId?: string;
  className: string;
  classId?: string;
  avatar: string;
  email?: string;
  studentCode?: string;
  pinCode?: string;
  teacherId?: string;
  mustChangePassword?: boolean;
  status?: 'active' | 'locked';
  starsCount?: number;
  streakDays?: number;
  completedEssays?: number;
}

export interface DbSchool {
  id: string;
  name: string;
  code: string;
  address: string;
  email?: string;
  phone?: string;
  hotline?: string;
  createdAt: string;
}

export interface DbClass {
  id: string;
  name: string;
  grade: number;
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

export type Semester = 'Học kì I' | 'Học kì II';
export type BookVolume = 'Tập một' | 'Tập hai';
export type VerificationStatus = 'verified' | 'needs_verification';

export interface PracticeSteps {
  step1Explore: string;      // Tìm hiểu / khám phá
  step2GatherIdeas: string;  // Tìm ý / thu thập thông tin
  step3Outline: string;      // Lập dàn ý / sắp xếp
  step4Draft: string;        // Viết / thực hành
  step5Revise: string;       // Tự sửa / hoàn thiện
}

export interface LessonResources {
  textExcerpt?: string;          // Đoạn văn mẫu / bài đọc ngữ liệu SGK
  guideNotes?: string;           // Ghi nhớ trong SGK
  suggestedQuestions?: string[]; // Câu hỏi khai thác SGK
  vocabAndPatterns?: string[];   // Từ ngữ và mẫu câu gợi ý
  sampleTemplate?: string;       // Khung cấu trúc / sơ đồ mẫu
}

export interface Grade4LessonItem {
  id: string;
  semester: Semester;
  bookVolume: BookVolume;
  week: number;
  lessonNumber: number;
  lessonTitle: string;            // Tên bài Viết theo SGK
  page: number;                   // Trang SGK
  theme: string;                  // Chủ điểm (Mỗi người một vẻ, Trải nghiệm và khám phá...)
  readingLesson: string;          // Bài đọc tương ứng trong tuần
  genre: string;                  // Kiểu bài (Đoạn văn nêu ý kiến, Miêu tả con vật...)
  stage: string;                  // Dạng bài / Chặng (Tìm hiểu nền tảng, Tìm hiểu kiểu bài, Tìm ý, Lập dàn ý, Viết bài, Trả bài...)
  writingPrompt: string;          // Yêu cầu viết / Đề bài
  learningObjective: string;      // Nhiệm vụ học tập (thiết kế cho app)
  practiceSteps: PracticeSteps;   // 5 bước luyện viết chuẩn
  evaluationRubric: string[];     // Tiêu chí đánh giá gợi ý
  resources: LessonResources;     // Tài nguyên bài học
  verificationStatus: VerificationStatus; // Đối chiếu SGK với Excel
  verificationNotes?: string;     // Ghi chú đối chiếu
  sourceLabel: string;            // Nguồn / trạng thái
  isSampleData: boolean;          // Đánh dấu dữ liệu mẫu
}

// Writing Studio 8-Step System Types
export interface WritingVersion {
  id: string;
  versionName: string;
  step: number;
  content: string;
  wordCount: number;
  timestamp: string;
  notes?: string;
}

export interface StudentOutline {
  intro: string;
  body: string;
  conclusion: string;
  notes?: string;
}

export interface SelfAssessmentData {
  stars: number;
  checkedCriteria: Record<string, boolean>;
  favoriteSentence: string;
  learningTakeaway: string;
}

// Writing Studio 6-Step System Types
export interface WritingStudioState {
  lessonId: string;
  currentStep: number; // 1 to 6
  step1Answers: Record<string, string>; // Bước 1: Tìm ý
  outline: StudentOutline; // Bước 2: Lập dàn ý
  draftContent: string; // Bước 3: Tự viết
  feedbackChecklist?: Record<string, boolean>; // Bước 4: Nhận gợi ý
  revisedContent: string; // Bước 5: Tự sửa
  selfAssessment: SelfAssessmentData; // Bước 6: Hoàn thiện
  versions: WritingVersion[];
  lastSavedAt: string | null;
}

// Legacy Lesson interface for compatibility
export interface Lesson {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  curriculum: string;
  curriculumName: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Thử thách';
  estimatedTime: string;
  targetWordCount: { min: number; max: number };
  shortDescription: string;
  prompt: string;
  outline: {
    intro: string[];
    body: string[];
    conclusion: string[];
  };
  suggestedVocab: {
    words: string[];
    rhetoric: string[];
  };
  sampleEssay: {
    title: string;
    content: string;
    highlights: { phrase: string; note: string }[];
  };
  sampleTag: boolean;
  lessonItemRef?: Grade4LessonItem;
}

export interface StudentSubmission {
  id: string;
  assignmentId?: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  studentAvatar: string;
  lessonId: string;
  lessonTitle: string;
  submittedAt: string;
  status: 'pending' | 'graded' | 'needs_edit';
  score?: number;
  wordCount: number;
  content: string;
  rubricScores?: RubricScoreItem[];
  draftTeacherComment?: string;
  teacherComment?: string;
  isPublishedToStudent?: boolean;
  needsRevisionNotes?: string;
  resubmittedCount?: number;
  aiFeedbackSummary?: {
    stars: number;
    positives: string[];
    improvements: string[];
  };
  stickersEarned?: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  category: 'effort' | 'creativity' | 'mastery';
}

export interface AIFeedbackResult {
  stars: number;
  overallPraise: string;
  detectedTechniques: string[];
  grammarChecks: {
    type: 'praise' | 'warning' | 'tip';
    message: string;
  }[];
  scoreBreakdown: {
    structure: number;
    vocabulary: number;
    emotion: number;
  };
  suggestions: string[];
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

export interface GoogleSheetsStatus {
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
  scriptUrl: string | null;
  connected: boolean;
  lastSyncTime: string | null;
  syncError: string | null;
  mode: 'oauth' | 'apps_script' | 'unconfigured';
  hasToken: boolean;
}

export * from './challenges';
