import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Layers, 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  History, 
  Send, 
  Copy, 
  Download, 
  Eye, 
  FileText, 
  Star, 
  Clock, 
  Info,
  Check,
  RotateCcw,
  BookMarked,
  Trash2,
  Printer,
  CloudCheck,
  CloudOff,
  RefreshCw,
  X
} from 'lucide-react';
import { Grade4LessonItem, UserProfile, WritingVersion, StudentOutline, SelfAssessmentData, DbDiamondNote } from '../types';
import { VOCABULARY_TOOLBOX } from '../data/mockData';
import { getGenreGuidance, generateRuleBasedFeedback } from '../utils/writingCoachGuidance';
import { VersionHistoryModal } from './VersionHistoryModal';
import { api } from '../utils/api';
import { dataService } from '../services/dataService';
import confetti from 'canvas-confetti';

interface WritingStudioViewProps {
  currentLesson: Grade4LessonItem | null;
  currentUser: UserProfile;
  onOpenLessonPicker: () => void;
}

const STEP_DEFINITIONS = [
  { step: 1, name: 'Tìm ý', icon: HelpCircle, desc: 'Khám phá đề & gợi mở ý tưởng' },
  { step: 2, name: 'Lập dàn ý', icon: BookMarked, desc: 'Sắp xếp 3 phần bài văn' },
  { step: 3, name: 'Tự viết', icon: PenTool, desc: 'Tự tay viết bài bằng lời của em' },
  { step: 4, name: 'Nhận gợi ý', icon: Sparkles, desc: 'Xem góp ý sư phạm từ Cô giáo AI' },
  { step: 5, name: 'Tự sửa', icon: RotateCcw, desc: 'Trau chuốt câu từ & gọt giũa bài' },
  { step: 6, name: 'Hoàn thiện', icon: Star, desc: 'Tự đánh giá & nộp bài' },
];

export const WritingStudioView: React.FC<WritingStudioViewProps> = ({
  currentLesson,
  currentUser,
  onOpenLessonPicker,
}) => {
  const guidance = getGenreGuidance(currentLesson);
  const storageKey = `edunova_studio_${currentUser.id}_${currentLesson?.id || 'default'}`;

  // State for 6 steps
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [step1Answers, setStep1Answers] = useState<Record<string, string>>({});
  const [step3Answers, setStep3Answers] = useState<Record<string, string>>({});
  const [outline, setOutline] = useState<StudentOutline>({
    intro: guidance.step4OutlineTemplate.introDefault,
    body: guidance.step4OutlineTemplate.bodyDefault,
    conclusion: guidance.step4OutlineTemplate.conclusionDefault,
  });
  const [draftContent, setDraftContent] = useState<string>('');
  const [revisedContent, setRevisedContent] = useState<string>('');
  const [selfAssessment, setSelfAssessment] = useState<SelfAssessmentData>({
    stars: 5,
    checkedCriteria: {},
    favoriteSentence: '',
    learningTakeaway: '',
  });
  const [versions, setVersions] = useState<WritingVersion[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showOutlineHelper, setShowOutlineHelper] = useState<boolean>(true);
  const [showDiamondDrawer, setShowDiamondDrawer] = useState<boolean>(false);
  const [diamondNotes, setDiamondNotes] = useState<DbDiamondNote[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-save & Status
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved' | 'offline'>('saved');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);
  const [cloudSubmissionInfo, setCloudSubmissionInfo] = useState<{
    isSubmitted: boolean;
    status?: string;
    score?: number;
    teacherComment?: string;
  }>({ isSubmitted: false });

  // AI Assistant States
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiFeedbackText, setAiFeedbackText] = useState<string | null>(null);
  const [aiIdeaSuggestions, setAiIdeaSuggestions] = useState<string | null>(null);
  const [aiRemainingQuota, setAiRemainingQuota] = useState<number>(30);

  // Multi-device Cloud Sync: Load local cache immediately, then fetch from Cloud/Server
  const loadStudioState = async (forceToast: boolean = false) => {
    let hasLocal = false;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
        if (parsed.step1Answers) setStep1Answers(parsed.step1Answers);
        if (parsed.step3Answers) setStep3Answers(parsed.step3Answers);
        if (parsed.outline) setOutline(parsed.outline);
        if (parsed.draftContent !== undefined) setDraftContent(parsed.draftContent);
        if (parsed.revisedContent !== undefined) setRevisedContent(parsed.revisedContent);
        if (parsed.selfAssessment) setSelfAssessment(parsed.selfAssessment);
        if (parsed.versions) setVersions(parsed.versions);
        if (parsed.isFromSubmission || parsed.submissionStatus) {
          setCloudSubmissionInfo({
            isSubmitted: true,
            status: parsed.submissionStatus,
            score: parsed.score,
            teacherComment: parsed.teacherComment,
          });
        }
        hasLocal = !!(parsed.draftContent || parsed.revisedContent || (parsed.outline && parsed.outline.body && parsed.outline.body !== guidance.step4OutlineTemplate.bodyDefault));
      } else {
        setOutline({
          intro: guidance.step4OutlineTemplate.introDefault,
          body: guidance.step4OutlineTemplate.bodyDefault,
          conclusion: guidance.step4OutlineTemplate.conclusionDefault,
        });
      }
    } catch (e) {
      console.warn('Error reading local studio state:', e);
    }

    // Always fetch from Cloud Server to ensure work done on other devices is loaded
    try {
      setIsCloudSyncing(true);
      const lessonKey = currentLesson?.id || 'default';
      const res = await api.getStudioDraft(lessonKey);
      if (res && res.draft) {
        const d = res.draft;
        const hasCloudContent = !!(d.draftContent || d.revisedContent || d.isFromSubmission);
        
        // Populate if no local content, or cloud has submission, or cloud was updated
        if (!hasLocal || d.isFromSubmission || hasCloudContent) {
          if (d.currentStep) setCurrentStep(d.currentStep);
          if (d.step1Answers) setStep1Answers(d.step1Answers);
          if (d.step3Answers) setStep3Answers(d.step3Answers);
          if (d.outline) setOutline(d.outline);
          if (d.draftContent !== undefined) setDraftContent(d.draftContent);
          if (d.revisedContent !== undefined) setRevisedContent(d.revisedContent);
          if (d.selfAssessment) setSelfAssessment(d.selfAssessment);
          if (d.versions) setVersions(d.versions);
          
          if (d.isFromSubmission || d.submissionStatus) {
            setCloudSubmissionInfo({
              isSubmitted: true,
              status: d.submissionStatus,
              score: d.score,
              teacherComment: d.teacherComment,
            });
          }

          // Sync back to localStorage
          try {
            localStorage.setItem(storageKey, JSON.stringify(d));
          } catch {}

          if (d.isFromSubmission) {
            showToast(`☁️ Đã nạp bài làm đã nộp từ máy chủ đám mây (${d.submissionStatus === 'graded' ? 'Điểm: ' + d.score : 'Đang chờ cô chấm'})`);
          } else if (!hasLocal && hasCloudContent) {
            showToast('☁️ Đã đồng bộ bài làm từ máy chủ (tiếp tục làm bài trên thiết bị mới)!');
          } else if (forceToast) {
            showToast('✅ Đã đồng bộ dữ liệu mới nhất từ máy chủ!');
          }
        }
      } else if (forceToast) {
        showToast('✅ Dữ liệu trên thiết bị đã là mới nhất.');
      }
    } catch (err) {
      console.warn('Could not sync draft from cloud:', err);
      if (forceToast) showToast('⚠️ Không thể kết nối máy chủ để đồng bộ.');
    } finally {
      setIsCloudSyncing(false);
    }
  };

  useEffect(() => {
    loadStudioState();
  }, [storageKey, currentLesson?.id]);

  // Load Diamond notes for reference
  useEffect(() => {
    api.getDiamondNotes().then(setDiamondNotes).catch(() => []);
  }, []);

  // When revisedContent is empty, initialize with draftContent
  useEffect(() => {
    if (!revisedContent && draftContent) {
      setRevisedContent(draftContent);
    }
  }, [draftContent, revisedContent]);

  // Word count helper
  const activeContent = currentStep >= 5 ? (revisedContent || draftContent) : draftContent;
  const words = activeContent.trim() ? activeContent.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Save current draft & state with Server and Multi-device Cloud Persistence
  const handleSaveDraft = async (createVersion: boolean = false, versionName?: string) => {
    setSaveStatus('saving');
    const nowVi = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('vi-VN');

    let updatedVersions = [...versions];
    if (createVersion || versions.length === 0) {
      const newVersion: WritingVersion = {
        id: `ver-${Date.now()}`,
        versionName: versionName || `Bản lưu Bước ${currentStep}`,
        step: currentStep,
        content: activeContent,
        wordCount: wordCount,
        timestamp: nowVi,
      };
      updatedVersions.push(newVersion);
      setVersions(updatedVersions);
    }

    const stateToSave = {
      currentStep,
      step1Answers,
      step3Answers,
      outline,
      draftContent,
      revisedContent,
      selfAssessment,
      versions: updatedVersions,
      lastSavedAt: nowVi,
      submissionStatus: cloudSubmissionInfo.status,
      score: cloudSubmissionInfo.score,
      teacherComment: cloudSubmissionInfo.teacherComment,
      isFromSubmission: cloudSubmissionInfo.isSubmitted,
    };

    // Save to local cache
    try {
      localStorage.setItem(storageKey, JSON.stringify(stateToSave));
    } catch {}

    // Save to Cloud Server & Google Sheets (Multi-device persistence)
    try {
      const lessonKey = currentLesson?.id || 'default';
      await api.saveStudioDraft(lessonKey, stateToSave);

      // Async sync draft to database library
      if (activeContent.trim()) {
        dataService.createPost({
          title: currentLesson?.lessonTitle || 'Bài làm văn lớp 4',
          content: activeContent,
          category: currentLesson?.genre || 'Văn miêu tả',
          status: 'DRAFT',
          visibility: 'CLASS',
        }).catch(() => {});
      }

      setSaveStatus('saved');
      showToast(createVersion ? '✅ Đã lưu phiên bản mới lên máy chủ!' : '💾 Đã lưu bài an toàn lên đám mây (đăng nhập máy nào cũng còn)!');
    } catch {
      setSaveStatus('offline');
      showToast('⚠️ Đã lưu tạm trên máy, đang kết nối máy chủ để đồng bộ...');
    }
  };

  // Auto-save in background every 15s to Cloud Server
  useEffect(() => {
    if (!draftContent && !revisedContent) return;
    const timer = setTimeout(() => {
      const lessonKey = currentLesson?.id || 'default';
      const stateToSave = {
        currentStep,
        step1Answers,
        step3Answers,
        outline,
        draftContent,
        revisedContent,
        selfAssessment,
        versions,
        lastSavedAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(stateToSave));
      } catch {}
      api.saveStudioDraft(lessonKey, stateToSave).catch(() => {});
    }, 15000);
    return () => clearTimeout(timer);
  }, [draftContent, revisedContent, outline, currentStep]);

  // Navigation between steps
  const handleNextStep = () => {
    if (currentStep < 6) {
      if (currentStep === 3) {
        handleSaveDraft(true, 'Bản tự viết ban đầu (Bước 3)');
        if (!revisedContent) setRevisedContent(draftContent);
      } else if (currentStep === 5) {
        handleSaveDraft(true, 'Bản tự sửa (Bước 5)');
      } else {
        handleSaveDraft(false);
      }
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      handleSaveDraft(false);
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInsertWord = (word: string) => {
    if (currentStep >= 5) {
      setRevisedContent((prev) => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + word + ' ');
    } else {
      setDraftContent((prev) => prev + (prev.endsWith(' ') || prev === '' ? '' : ' ') + word + ' ');
    }
    showToast(`Đã chèn cụm từ "${word}" vào bài viết!`);
  };

  // Submit final essay with double-click protection
  const handleFinalSubmit = async () => {
    if (isSubmitting) return;

    if (!activeContent.trim()) {
      showToast('⚠️ Bài viết chưa có nội dung. Em hãy tự viết bài ở Bước 3 trước khi nộp nhé!');
      return;
    }

    setIsSubmitting(true);
    handleSaveDraft(true, 'Bản hoàn thiện chính thức (Bước 6)');

    try {
      await api.submitEssay({
        lessonId: currentLesson?.id || 'lesson-01',
        lessonTitle: currentLesson?.lessonTitle || 'Bài làm văn lớp 4',
        content: activeContent,
        wordCount: wordCount,
        studentId: currentUser.id,
        studentName: currentUser.name,
        studentClass: currentUser.className || 'Lớp 4A8',
        studentCode: currentUser.studentCode,
        studentAvatar: currentUser.avatar,
      });

      
      // Also sync to database library
      await dataService.createPost({
        title: currentLesson?.lessonTitle || 'Bài làm văn lớp 4',
        content: activeContent,
        category: currentLesson?.genre || 'Văn miêu tả',
        status: 'SUBMITTED',
        visibility: 'CLASS',
      }).catch(e => console.warn('Sync post to database error:', e));

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
      });
      showToast(`🎉 Chúc mừng em ${currentUser.name}! Bài văn đã được gửi thành công đến Cô giáo chủ nhiệm (${currentUser.className || 'Lớp 4A8'}).`);
    } catch (err: any) {
      showToast(err.message || 'Lỗi gửi bài lên máy chủ, bản nháp vẫn được giữ an toàn trên máy.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Call Server-side Gemini AI for Step 3 (Idea prompts)
  const handleCallAiIdeas = async () => {
    setAiLoading(true);
    try {
      const res = await api.callAiCoach({
        mode: 'goi_mo_tim_y',
        lessonTitle: currentLesson?.lessonTitle,
        genre: currentLesson?.genre,
        prompt: currentLesson?.writingPrompt,
      });
      setAiIdeaSuggestions(res.response);
      if (res.quota?.remaining !== undefined) {
        setAiRemainingQuota(res.quota.remaining);
      }
      showToast('💡 Cô giáo AI đã gửi các câu hỏi gợi mở cho em!');
    } catch (err: any) {
      showToast('Không thể kết nối AI, em hãy dùng gợi ý mẫu bên dưới nhé.');
    } finally {
      setAiLoading(false);
    }
  };

  // Call Server-side Gemini AI for Step 6 (Pedagogical essay review)
  const handleCallAiReview = async () => {
    if (!draftContent.trim() || wordCount < 30) {
      showToast('⚠️ Bài viết của em còn ngắn (cần ít nhất 30 từ) để Cô giáo AI có thể đọc và góp ý cụ thể.');
      return;
    }

    setAiLoading(true);
    try {
      const res = await api.callAiCoach({
        mode: 'doc_lai_gop_y',
        currentText: draftContent,
        lessonTitle: currentLesson?.lessonTitle,
        genre: currentLesson?.genre,
      });
      setAiFeedbackText(res.response);
      if (res.quota?.remaining !== undefined) {
        setAiRemainingQuota(res.quota.remaining);
      }
      showToast('🌟 Cô giáo AI đã đọc và gửi góp ý chi tiết cho bài của em!');
    } catch (err: any) {
      showToast('Không thể kết nối AI, hệ thống chuyển sang chế độ quy tắc sư phạm ngoại tuyến.');
    } finally {
      setAiLoading(false);
    }
  };

  // Print Formatted Essay
  const handlePrintEssay = () => {
    window.print();
  };

  // Export Text File
  const handleExportText = () => {
    const textData = `EDUNOVA WRITING COACH - BÀI LÀM VĂN LỚP 4\n` +
      `Trường: Trường Tiểu học Kim Liên A\n` +
      `Lớp: ${currentUser.className || 'Lớp 4A8'} | Học sinh: ${currentUser.name}\n` +
      `Tên bài: ${currentLesson?.lessonTitle || 'Bài làm văn'}\n` +
      `Đề bài: ${currentLesson?.writingPrompt || ''}\n` +
      `Số từ: ${wordCount} từ\n` +
      `----------------------------------------\n\n` +
      `${activeContent}\n\n` +
      `----------------------------------------\n` +
      `Tự đánh giá: ${selfAssessment.stars} sao\n` +
      `Câu văn yêu thích nhất: "${selfAssessment.favoriteSentence}"\n` +
      `Điều em học được: "${selfAssessment.learningTakeaway}"\n`;

    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bai_van_${currentUser.name.replace(/\s+/g, '_')}_${currentLesson?.id || 'bai_lam'}.txt`;
    a.click();
    showToast('Đã tải xuống bài viết dạng tệp văn bản!');
  };

  // Rule-based feedback for Step 6
  const feedbackResult = generateRuleBasedFeedback(draftContent, currentLesson);

  return (
    <div className="space-y-6 pb-20 print:p-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Status Bar: Persistent state & Auto-save indicator */}
      <div className="px-4 py-2.5 rounded-2xl bg-white border border-amber-200 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          {saveStatus === 'saving' ? (
            <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Đang lưu lên máy chủ...</span>
            </span>
          ) : saveStatus === 'saved' ? (
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              <span>Đã lưu đồng bộ an toàn (Máy chủ & Thiết bị)</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-slate-500">
              <CloudOff className="w-3.5 h-3.5 text-slate-400" />
              <span>Bản nháp tạm được bảo vệ trên thiết bị</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Diamond Drawer Trigger */}
          <button
            onClick={() => setShowDiamondDrawer(!showDiamondDrawer)}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-xl border border-purple-200 cursor-pointer transition-colors"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Sổ kim cương ({diamondNotes.length})</span>
          </button>

          {/* History Versions Modal */}
          <button
            onClick={() => setShowHistoryModal(true)}
            className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-300"
          >
            <History className="w-3.5 h-3.5" />
            <span>Lịch sử phiên bản ({versions.length})</span>
          </button>
        </div>
      </div>

      {/* Header Topic Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {currentLesson ? `${currentLesson.semester} • Tuần ${currentLesson.week}` : 'Luyện tập'}
            </span>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {currentLesson?.genre || 'Tập làm văn lớp 4'}
            </span>
            {currentLesson?.page && (
              <span className="text-xs text-amber-100">Trang {currentLesson.page} SGK</span>
            )}
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold">
            {currentLesson?.lessonTitle || 'Bài luyện viết Tiếng Việt 4'}
          </h2>
          <p className="text-xs text-amber-100 italic line-clamp-2">
            Đề bài: "{currentLesson?.writingPrompt || 'Em hãy viết một bài văn ngắn theo yêu cầu của bài học.'}"
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={onOpenLessonPicker}
            className="px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-amber-900 text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Đổi đề bài khác</span>
          </button>
        </div>
      </div>

      {/* 6-Step Interactive Progress Stepper */}
      <div className="bg-white p-4 rounded-3xl border border-amber-200/90 shadow-xs print:hidden">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Quy trình 6 bước luyện viết
            </span>
            <span className="text-xs text-slate-400">
              (Bước {currentStep}/6: {STEP_DEFINITIONS[currentStep - 1]?.name})
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Học sinh: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.className || 'Lớp 4A8'})
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {STEP_DEFINITIONS.map((s) => {
            const Icon = s.icon;
            const isCurrent = s.step === currentStep;
            const isCompleted = s.step < currentStep;

            return (
              <button
                key={s.step}
                onClick={() => {
                  handleSaveDraft(false);
                  setCurrentStep(s.step);
                }}
                className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 scale-102 ring-2 ring-amber-300'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1 ${isCurrent ? 'text-white' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-[11px] font-bold line-clamp-1">{s.name}</span>
                <span className="text-[9px] opacity-75">Bước {s.step}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* ================= BƯỚC 1: TÌM Ý ================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                Bước 1: Tìm ý
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                Khám phá đề bài và tìm kiếm ý tưởng phong phú
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Đọc kỹ yêu cầu đề bài, nắm chắc cấu trúc kiểu bài và trả lời các câu hỏi gợi mở để tích lũy ý tưởng trước khi lập dàn ý.
              </p>
            </div>

            {/* Official Writing Prompt Box */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">Đề bài chính thức:</div>
              <div className="font-heading text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
                "{currentLesson?.writingPrompt || 'Em hãy viết một bài văn ngắn miêu tả theo yêu cầu của bài học.'}"
              </div>
            </div>

            {/* Genre Structure & Key Standards */}
            <div className="space-y-3">
              <div className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Cấu trúc chuẩn của kiểu bài: <strong>{guidance.genreTitle}</strong></span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                  <div className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs">1</span>
                    <span>{guidance.step2StructureInfo.introTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {guidance.step2StructureInfo.introDesc}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-1.5">
                  <div className="font-bold text-orange-900 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-lg bg-orange-500 text-white flex items-center justify-center text-xs">2</span>
                    <span>{guidance.step2StructureInfo.bodyTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {guidance.step2StructureInfo.bodyDesc}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                  <div className="font-bold text-emerald-900 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs">3</span>
                    <span>{guidance.step2StructureInfo.conclusionTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {guidance.step2StructureInfo.conclusionDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Questions to Brainstorm Ideas & AI Suggestion Button */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <span>Trả lời câu hỏi gợi mở để tích lũy ý tưởng:</span>
                </div>

                <button
                  type="button"
                  onClick={handleCallAiIdeas}
                  disabled={aiLoading}
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {aiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Cô giáo AI gợi ý thêm ý tưởng</span>
                </button>
              </div>

              {/* AI Idea Response Box if available */}
              {aiIdeaSuggestions && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <span>💡</span> Gợi mở từ Trợ lý AI EDUNOVA:
                    </span>
                    <span className="text-[10px] text-amber-700">Còn {aiRemainingQuota}/30 lượt hôm nay</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium bg-white p-4 rounded-xl border border-amber-200">
                    {aiIdeaSuggestions}
                  </div>
                </div>
              )}

              {/* Idea Questions List */}
              <div className="space-y-3">
                {guidance.step3IdeaQuestions.map((q, idx) => (
                  <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <label className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{q.question}</span>
                    </label>

                    <textarea
                      value={step3Answers[q.id] || ''}
                      onChange={(e) => setStep3Answers({ ...step3Answers, [q.id]: e.target.value })}
                      rows={2}
                      placeholder="Nhập câu trả lời của em vào đây..."
                      className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 gap-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <div>
                        <span className="font-semibold text-amber-800">Gợi ý suy nghĩ:</span> {q.hint}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep3Answers({ ...step3Answers, [q.id]: q.exampleAnswer })}
                        className="text-amber-700 font-semibold hover:underline shrink-0 text-left cursor-pointer"
                      >
                        Thử câu mẫu gợi ý
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= BƯỚC 2: LẬP DÀN Ý ================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                Bước 2: Lập dàn ý
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                Sắp xếp các ý vào 3 phần: Mở bài – Thân bài – Kết bài
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Lập dàn ý như xây khung nhà, giúp bài văn của em không bị bỏ sót ý và diễn đạt mạch lạc.
              </p>
            </div>

            <div className="space-y-4">
              {/* Intro Outline */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <label className="font-bold text-xs sm:text-sm text-amber-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs">1</span>
                  <span>Mở bài: Giới thiệu đối tượng</span>
                </label>
                <p className="text-[11px] text-slate-500">{guidance.step4OutlineTemplate.introGuide}</p>
                <textarea
                  value={outline.intro}
                  onChange={(e) => setOutline({ ...outline, intro: e.target.value })}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  placeholder="Ghi ý mở bài của em..."
                />
              </div>

              {/* Body Outline */}
              <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-2">
                <label className="font-bold text-xs sm:text-sm text-orange-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center text-xs">2</span>
                  <span>Thân bài: Tả bao quát & Tả chi tiết đặc sắc</span>
                </label>
                <p className="text-[11px] text-slate-500">{guidance.step4OutlineTemplate.bodyGuide}</p>
                <textarea
                  value={outline.body}
                  onChange={(e) => setOutline({ ...outline, body: e.target.value })}
                  rows={4}
                  className="w-full p-3 rounded-xl border border-orange-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  placeholder="Ghi các ý thân bài của em..."
                />
              </div>

              {/* Conclusion Outline */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <label className="font-bold text-xs sm:text-sm text-emerald-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs">3</span>
                  <span>Kết bài: Cảm nghĩ & Kỉ niệm</span>
                </label>
                <p className="text-[11px] text-slate-500">{guidance.step4OutlineTemplate.conclusionGuide}</p>
                <textarea
                  value={outline.conclusion}
                  onChange={(e) => setOutline({ ...outline, conclusion: e.target.value })}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-emerald-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  placeholder="Ghi ý kết bài của em..."
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= BƯỚC 3: TỰ VIẾT ================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                  Bước 3: Tự viết
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                  Tự tay viết bài văn bằng lời của chính em
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowOutlineHelper(!showOutlineHelper)}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showOutlineHelper ? 'Thu gọn dàn ý' : 'Xem lại dàn ý'}</span>
                </button>
              </div>
            </div>

            {showOutlineHelper && (
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 text-xs text-slate-700 space-y-2">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-amber-600" />
                  <span>Dàn ý em vừa lập (đọc để tham khảo khi viết):</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                    <strong className="text-amber-800 block mb-0.5">Mở bài:</strong>
                    <p className="line-clamp-3 text-slate-600">{outline.intro}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-orange-200">
                    <strong className="text-orange-800 block mb-0.5">Thân bài:</strong>
                    <p className="line-clamp-3 text-slate-600">{outline.body}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                    <strong className="text-emerald-800 block mb-0.5">Kết bài:</strong>
                    <p className="line-clamp-3 text-slate-600">{outline.conclusion}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Spacious White Writing Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="font-semibold">Vùng viết văn bản nháp (khoảng trắng sạch, không dòng kẻ, dễ nhìn):</span>
                <div className="flex items-center gap-3">
                  <span>
                    Số từ: <strong className={`text-sm ${wordCount >= 120 ? 'text-emerald-600' : 'text-amber-600'}`}>{wordCount} từ</strong> (Mục tiêu: 120 - 180 từ)
                  </span>
                  {draftContent && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Em có chắc chắn muốn xóa hết nội dung bản viết để bắt đầu lại không?')) {
                          setDraftContent('');
                          showToast('Đã xóa trắng vùng viết!');
                        }
                      }}
                      className="text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa trắng</span>
                    </button>
                  )}
                </div>
              </div>

              <textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                rows={14}
                placeholder="Bắt đầu tự tay viết bài văn của em vào đây. Nhớ chia bài thành các đoạn rõ ràng và dùng từ ngữ chân thực nhé..."
                className="w-full p-6 text-slate-800 text-sm sm:text-base leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-amber-400 rounded-3xl border border-amber-300 bg-white font-sans resize-none shadow-xs"
              />

              {/* Word Insertion Toolbox */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Chạm để chèn từ ngữ gợi cảm hoặc từ láy vào bài:</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Tự động thêm vào cuối bài</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {VOCABULARY_TOOLBOX.tuLay.slice(0, 8).map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleInsertWord(item.word)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-slate-200 hover:border-amber-300 transition-colors cursor-pointer"
                    >
                      + {item.word}
                    </button>
                  ))}
                  {VOCABULARY_TOOLBOX.phepSoSanh.slice(0, 3).map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleInsertWord(item.text)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-950 border border-orange-200 transition-colors cursor-pointer"
                    >
                      + {item.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= BƯỚC 4: NHẬN GỢI Ý ================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                  Bước 4: Nhận gợi ý
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                  Xem nhận xét sư phạm và lời khuyên từ Cô giáo AI
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Rà soát bài viết theo tiêu chuẩn: khen ngợi có dẫn chứng, chỉ ra điểm cần hoàn thiện và giao thử thách tự sửa.
                </p>
              </div>

              {/* Call Gemini AI Review */}
              <button
                type="button"
                onClick={handleCallAiReview}
                disabled={aiLoading}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
              >
                {aiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Cô giáo AI Edunova đọc & góp ý</span>
              </button>
            </div>

            {/* AI Real Feedback Box */}
            {aiFeedbackText && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between text-xs font-bold text-purple-900">
                  <span className="flex items-center gap-2 text-sm">
                    <span>👩‍🏫</span> Nhận xét sư phạm từ Trợ lý AI EDUNOVA (Gemini 3.8 Flash):
                  </span>
                  <span className="text-[11px] text-purple-700 bg-white px-2 py-0.5 rounded-full border border-purple-200">
                    Còn {aiRemainingQuota}/30 lượt hôm nay
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium bg-white p-5 rounded-2xl border border-purple-200 shadow-xs">
                  {aiFeedbackText}
                </div>
              </div>
            )}

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <div className="font-heading text-2xl font-extrabold text-amber-800">{feedbackResult.wordCount}</div>
                <div className="text-xs text-slate-600">tổng số từ</div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                <div className="font-heading text-2xl font-extrabold text-blue-800">{feedbackResult.paragraphCount}</div>
                <div className="text-xs text-slate-600">đoạn văn</div>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="font-heading text-2xl font-extrabold text-emerald-800">{feedbackResult.foundComparisons.length}</div>
                <div className="text-xs text-slate-600">hình ảnh so sánh</div>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center">
                <div className="font-heading text-2xl font-extrabold text-purple-800">{feedbackResult.foundSensory.length}</div>
                <div className="text-xs text-slate-600">từ ngữ gợi cảm</div>
              </div>
            </div>

            {/* Offline Rule-based Feedback Cards */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Tiêu chuẩn rà soát sư phạm:</span>
              </h4>

              {feedbackResult.feedbackItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-start gap-3 ${
                    item.type === 'praise'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50/80 border-amber-200 text-amber-950'
                  }`}
                >
                  <div className="text-lg shrink-0">
                    {item.type === 'praise' ? '🌟' : '💡'}
                  </div>
                  <div>
                    <div className="font-bold text-xs uppercase tracking-wider mb-0.5">
                      {item.type === 'praise' ? 'Điểm sáng đáng khen:' : 'Gợi ý cho bước tự sửa:'}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= BƯỚC 5: TỰ SỬA ================= */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                Bước 5: Tự sửa
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                Trau chuốt câu từ, sửa lỗi và gọt giũa bài viết
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Đọc lại bài viết và trực tiếp chỉnh sửa các câu văn chưa ưng ý theo các gợi ý ở Bước 4.
              </p>
            </div>

            {/* Comparative reference toggle with draft */}
            {draftContent && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <PenTool className="w-4 h-4 text-amber-600" />
                    <span>Bản tự viết ban đầu (Bước 3):</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Đối chiếu khi tự sửa</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-amber-200 text-slate-600 max-h-32 overflow-y-auto leading-relaxed whitespace-pre-line text-xs">
                  {draftContent}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="font-semibold text-emerald-800">Vùng tự sửa & hoàn thiện câu chữ:</span>
                <span>Số từ hiện tại: <strong>{wordCount} từ</strong></span>
              </div>
              <textarea
                value={revisedContent}
                onChange={(e) => setRevisedContent(e.target.value)}
                rows={14}
                className="w-full p-6 text-slate-800 text-sm sm:text-base leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-amber-400 rounded-3xl border border-emerald-300 bg-white font-sans resize-none shadow-xs"
              />
            </div>
          </div>
        )}

        {/* ================= BƯỚC 6: HOÀN THIỆN ================= */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                Bước 6: Hoàn thiện
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-800 mt-2">
                Tự đánh giá và nộp bài chính thức cho Thầy/Cô
              </h3>
            </div>

            {/* Final Clean Essay Preview */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#fffdf9] border-2 border-amber-200 shadow-sm space-y-4 print:border-none print:shadow-none">
              <div className="border-b border-amber-100 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-extrabold text-lg text-slate-900">
                    {currentLesson?.lessonTitle || 'Bài làm văn hoàn thiện'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Học sinh: {currentUser.name} • {currentUser.className || 'Lớp 4A8'} • {wordCount} từ
                  </p>
                </div>
                <div className="flex items-center gap-1.5 print:hidden">
                  <button
                    type="button"
                    onClick={handlePrintEssay}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    title="In bài viết"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In bài</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleExportText}
                    className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    title="Tải tệp văn bản"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải tệp TXT</span>
                  </button>
                </div>
              </div>

              <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                {activeContent}
              </div>
            </div>

            {/* Self-Assessment Form */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-4">
              <h4 className="font-heading font-bold text-sm text-amber-900 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Em tự đánh giá bài viết của mình:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Câu văn em tâm đắc và ưng ý nhất:
                  </label>
                  <input
                    type="text"
                    value={selfAssessment.favoriteSentence}
                    onChange={(e) => setSelfAssessment({ ...selfAssessment, favoriteSentence: e.target.value })}
                    placeholder="Chép lại một câu em thích nhất..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Bài học bổ ích em rút ra sau khi viết:
                  </label>
                  <input
                    type="text"
                    value={selfAssessment.learningTakeaway}
                    onChange={(e) => setSelfAssessment({ ...selfAssessment, learningTakeaway: e.target.value })}
                    placeholder="Ví dụ: Em biết thêm cách dùng từ so sánh..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2 flex items-center justify-end gap-3 print:hidden">
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 hover:scale-102"
              >
                {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Nộp bài hoàn thiện cho Cô giáo chủ nhiệm</span>
              </button>
            </div>
          </div>
        )}

        {/* Global Bottom Navigation Toolbar for 6 Steps */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-3 flex-wrap print:hidden">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại bước trước</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSaveDraft(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5 text-amber-600" />
              <span>Lưu bản nháp</span>
            </button>
          </div>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer transition-all"
            >
              <span>Tiếp tục Bước {currentStep + 1}: {STEP_DEFINITIONS[currentStep]?.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer transition-all disabled:opacity-50"
            >
              {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 stroke-[3]" />}
              <span>Hoàn tất & Nộp bài cho Cô giáo</span>
            </button>
          )}
        </div>
      </div>

      {/* Version History Modal */}
      {showHistoryModal && (
        <VersionHistoryModal
          versions={versions}
          onClose={() => setShowHistoryModal(false)}
          onRestoreVersion={(restoredText) => {
            if (currentStep >= 7) {
              setRevisedContent(restoredText);
            } else {
              setDraftContent(restoredText);
            }
            showToast('Đã khôi phục nội dung từ phiên bản đã chọn!');
          }}
        />
      )}

      {/* Diamond Notebook Quick Drawer Modal */}
      {showDiamondDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-white shadow-2xl border-l border-purple-200 p-6 flex flex-col space-y-4 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-purple-600" />
                <h4 className="font-heading font-bold text-slate-800 text-base">
                  Sổ tay kim cương của em
                </h4>
              </div>
              <button
                onClick={() => setShowDiamondDrawer(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Bấm "Chèn vào bài" để bổ sung chi tiết đắt giá vào vị trí con trỏ bài viết của em.
            </p>

            <div className="grow overflow-y-auto space-y-3 pr-1">
              {diamondNotes.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-400">
                  Chưa có thẻ kim cương nào được lưu trong sổ tay.
                </div>
              ) : (
                diamondNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{note.title}</span>
                      <span className="text-[10px] text-purple-700 bg-white px-1.5 py-0.2 rounded border border-purple-200">
                        {note.category === 'quan_sat_that' ? 'Quan sát thật' : note.category === 'tuong_tuong' ? 'Tưởng tượng' : 'Học liệu'}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed italic bg-white p-2.5 rounded-xl border border-purple-100">
                      "{note.content}"
                    </p>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          handleInsertWord(note.content);
                          setShowDiamondDrawer(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-bold text-[11px] cursor-pointer hover:bg-purple-700 transition-colors"
                      >
                        + Chèn vào bài viết
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
