import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Award, 
  School, 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  MessageSquare,
  Sparkles,
  KeyRound,
  Plus,
  RefreshCw,
  AlertCircle,
  Calendar,
  Send,
  Save,
  RotateCcw,
  BarChart3,
  Upload,
  Download,
  FileSpreadsheet,
  FileUp,
  Trash2,
  ClipboardList,
  Check,
  HelpCircle,
  Info,
  UserPlus
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { StudentSubmission, UserProfile, DbAssignment, RubricScoreItem } from '../types';
import { api } from '../utils/api';

interface TeacherViewProps {
  currentUser: UserProfile;
  onNavigateToLessons: () => void;
}

const RUBRIC_CRITERIA = [
  { id: 'crit-1', name: 'Đáp ứng yêu cầu đề bài' },
  { id: 'crit-2', name: 'Bố cục 3 phần rõ ràng, mạch lạc' },
  { id: 'crit-3', name: 'Câu rõ nghĩa & dùng từ gợi cảm' },
  { id: 'crit-4', name: 'Chi tiết quan sát & cảm xúc chân thực' },
  { id: 'crit-5', name: 'Chính tả và ngắt dấu câu' },
  { id: 'crit-6', name: 'Tự đọc lại và hoàn thiện bài viết' },
];

export const TeacherView: React.FC<TeacherViewProps> = ({ currentUser, onNavigateToLessons }) => {
  const formatClassName = (name?: string) => {
    if (!name) return 'lớp';
    const clean = name.trim();
    return clean.toLowerCase().startsWith('lớp') ? clean : `Lớp ${clean}`;
  };
  const currentClassLabel = formatClassName(currentUser.className);

  const [activeTab, setActiveTab] = useState<'submissions' | 'assignments' | 'students' | 'reports'>('submissions');
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [assignments, setAssignments] = useState<DbAssignment[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [reportData, setReportData] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Review & Grading Modal
  const [selectedSub, setSelectedSub] = useState<StudentSubmission | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(9.0);
  const [teacherComment, setTeacherComment] = useState<string>('');
  const [rubricScores, setRubricScores] = useState<Record<string, string>>({});
  const [revisionNotes, setRevisionNotes] = useState<string>('');
  const [showRevisionModal, setShowRevisionModal] = useState<boolean>(false);

  // Create Assignment Modal
  const [showAddAssignment, setShowAddAssignment] = useState<boolean>(false);
  const [assignTitle, setAssignTitle] = useState<string>('');
  const [assignPrompt, setAssignPrompt] = useState<string>('');
  const [assignGenre, setAssignGenre] = useState<string>('Miêu tả cây cối');
  const [assignMinWords, setAssignMinWords] = useState<number>(140);
  const [assignMaxWords, setAssignMaxWords] = useState<number>(200);

  // Quick Add Student Modal
  const [showAddStudent, setShowAddStudent] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [newStudentPin, setNewStudentPin] = useState<string>('1234');

  // Bulk Student Upload Modal & States
  const [showBulkUploadModal, setShowBulkUploadModal] = useState<boolean>(false);
  const [uploadTab, setUploadTab] = useState<'file' | 'paste'>('file');
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [pastedText, setPastedText] = useState<string>('');
  const [selectedTargetClass, setSelectedTargetClass] = useState<string>(currentUser.className || 'Lớp 4A8');

  useEffect(() => {
    if (currentUser?.className) {
      setSelectedTargetClass(currentUser.className);
    }
  }, [currentUser?.className]);
  const [parsedStudents, setParsedStudents] = useState<Array<{
    tempId: string;
    fullName: string;
    studentCode: string;
    pinCode: string;
    isValid: boolean;
    note?: string;
  }>>([]);
  const [defaultBulkPin, setDefaultBulkPin] = useState<string>('1234');
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [studentSearchQuery, setStudentSearchQuery] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Teacher AI Synthesis
  const [aiSynthesizing, setAiSynthesizing] = useState<boolean>(false);
  const [aiSynthesisResult, setAiSynthesisResult] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const targetClass = currentUser.className || '';
      const [subs, assigns, users, rep] = await Promise.all([
        api.getSubmissions().catch(() => []),
        api.getAssignments().catch(() => []),
        api.getUsers(targetClass ? { className: targetClass } : undefined).catch(() => []),
        api.getClassSummaryReport(targetClass).catch(() => null),
      ]);
      const classStudents = targetClass
        ? users.filter(u => u.role === 'student' && u.className && u.className.trim().toLowerCase() === targetClass.trim().toLowerCase())
        : [];
      setStudents(classStudents);

      if (classStudents.length === 0) {
        setSubmissions([]);
      } else {
        const studentIds = new Set(classStudents.map(s => s.id));
        const studentNames = new Set(classStudents.map(s => (s.fullName || '').trim().toLowerCase()));
        const filteredSubs = subs.filter(s => 
          (s.studentId && studentIds.has(s.studentId)) || 
          (s.studentName && studentNames.has(s.studentName.trim().toLowerCase()))
        );
        setSubmissions(filteredSubs);
      }
      setAssignments(assigns);
      setReportData(rep);
    } catch (err) {
      console.error('Error loading teacher data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentUser?.className]);

  const filteredSubs = submissions.filter((s) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return s.status === 'pending';
    if (filterStatus === 'draft') return s.status === 'pending' && s.draftTeacherComment;
    if (filterStatus === 'graded') return s.status === 'graded';
    if (filterStatus === 'needs_edit') return s.status === 'needs_edit';
    return true;
  });

  const handleOpenReview = (sub: StudentSubmission) => {
    setSelectedSub(sub);
    setGradeScore(sub.score || 9.0);
    setTeacherComment(sub.teacherComment || sub.draftTeacherComment || 'Cô khen ngợi bài viết diễn đạt tự nhiên và giàu cảm xúc!');
    const initialRubric: Record<string, string> = {};
    RUBRIC_CRITERIA.forEach(c => {
      initialRubric[c.id] = 'proficient';
    });
    setRubricScores(initialRubric);
  };

  // Save Draft Review (Invisible to student until published)
  const handleSaveDraftReview = async () => {
    if (!selectedSub) return;
    try {
      await api.reviewSubmission(selectedSub.id, {
        score: gradeScore,
        teacherComment,
        rubricScores: Object.entries(rubricScores).map(([k, v]) => ({ criterionId: k, criterionName: k, level: v })),
        isPublished: false,
      });
      showToast('Đã lưu nháp nhận xét! (Học sinh chưa nhìn thấy cho đến khi cô bấm Phát hành)');
      setSelectedSub(null);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi lưu nháp');
    }
  };

  // Publish Review to Student
  const handlePublishReview = async () => {
    if (!selectedSub) return;
    try {
      await api.reviewSubmission(selectedSub.id, {
        score: gradeScore,
        teacherComment,
        rubricScores: Object.entries(rubricScores).map(([k, v]) => ({ criterionId: k, criterionName: k, level: v })),
        isPublished: true,
        stickersEarned: ['Bông hoa điểm 10', 'Họa sĩ ngôn từ'],
      });
      showToast(`Đã phát hành điểm số (${gradeScore}) và nhận xét chính thức cho ${selectedSub.studentName}!`);
      setSelectedSub(null);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi phát hành nhận xét');
    }
  };

  // Request Student Revision
  const handleSendRevisionRequest = async () => {
    if (!selectedSub) return;
    try {
      await api.requestRevision(selectedSub.id, revisionNotes || 'Em đọc kĩ lại gợi ý và chỉnh sửa câu từ rồi nộp lại cho cô nhé!');
      showToast(`Đã gửi yêu cầu sửa lại bài cho học sinh ${selectedSub.studentName}.`);
      setShowRevisionModal(false);
      setSelectedSub(null);
      loadData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi yêu cầu sửa bài');
    }
  };

  // Create Assignment
  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTitle.trim() || !assignPrompt.trim()) return;
    try {
      await api.createAssignment({
        title: assignTitle.trim(),
        prompt: assignPrompt.trim(),
        genre: assignGenre,
        targetWordCount: { min: assignMinWords, max: assignMaxWords },
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        allowAi: true,
      });
      showToast(`Đã giao bài tập mới cho ${currentClassLabel}!`);
      setShowAddAssignment(false);
      setAssignTitle('');
      setAssignPrompt('');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi tạo bài tập');
    }
  };

  // Quick Add Student (Teacher creates student account)
  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    try {
      const targetClass = currentUser.className || 'Lớp 4A8';
      const targetSchool = currentUser.school || 'Trường Tiểu học Kim Liên A';
      await api.createUser({
        fullName: newStudentName.trim(),
        role: 'student',
        pinCode: newStudentPin.trim() || '1234',
        className: targetClass,
        schoolName: targetSchool,
      });
      showToast(`Đã cấp tài khoản cho học sinh ${newStudentName.trim()} vào ${targetClass}!`);
      setShowAddStudent(false);
      setNewStudentName('');
      setNewStudentPin('1234');
      loadData();
    } catch (err: any) {
      alert(err.message || 'Lỗi tạo học sinh');
    }
  };

  // Helper to parse 2D array of rows (from Excel or CSV)
  const parseRawRowsData = (rows: any[][]) => {
    if (!rows || rows.length === 0) {
      setUploadError('Tệp rỗng hoặc không có dữ liệu học sinh.');
      setParsedStudents([]);
      return;
    }

    // Clean empty rows
    const nonEmptyRows = rows.filter(r => r && r.some(cell => cell !== null && cell !== undefined && String(cell).trim() !== ''));
    if (nonEmptyRows.length === 0) {
      setUploadError('Tệp không có dữ liệu văn bản hợp lệ.');
      setParsedStudents([]);
      return;
    }

    // Step 1: Detect True Header Row (scan up to 25 rows)
    let headerRowIndex = -1;
    let hoDemColIndex = -1;
    let tenColIndex = -1;
    let fullNameColIndex = -1;
    let codeColIndex = -1;
    let pinColIndex = -1;
    let bestScore = 0;

    for (let i = 0; i < Math.min(25, nonEmptyRows.length); i++) {
      const row = nonEmptyRows[i];
      let rowScore = 0;
      let tempHoDem = -1;
      let tempTen = -1;
      let tempFullName = -1;
      let tempCode = -1;
      let tempPin = -1;

      row.forEach((cell, colIdx) => {
        const c = String(cell || '').toLowerCase().trim();
        if (!c) return;

        // Check full name column
        if (/họ\s*(và|&)?\s*tên/i.test(c) || /họ\s*tên/i.test(c) || /tên\s*học\s*sinh/i.test(c) || c === 'full name' || c === 'fullname') {
          tempFullName = colIdx;
          rowScore += 10;
        } else if (/họ\s*(và\s*(tên\s*)?đệm|và\s*chữ\s*lót|đệm|lót)/i.test(c) || c === 'họ') {
          tempHoDem = colIdx;
          rowScore += 8;
        } else if (/^tên(\s*gọi)?$/i.test(c)) {
          tempTen = colIdx;
          rowScore += 8;
        } else if (/mã\s*(hs|học\s*sinh|định\s*danh|số)|student\s*code|^code$/i.test(c)) {
          tempCode = colIdx;
          rowScore += 5;
        } else if (/pin|mã\s*pin|mật\s*khẩu|password/i.test(c)) {
          tempPin = colIdx;
          rowScore += 5;
        } else if (/^stt$|^số\s*tt$|^số\s*thứ\s*tự$/i.test(c)) {
          rowScore += 4;
        } else if (/giới\s*tính|ngày\s*sinh|năm\s*sinh|lớp/i.test(c)) {
          rowScore += 2;
        }
      });

      if (rowScore > bestScore && rowScore >= 8) {
        bestScore = rowScore;
        headerRowIndex = i;
        hoDemColIndex = tempHoDem;
        tenColIndex = tempTen;
        fullNameColIndex = tempFullName;
        codeColIndex = tempCode;
        pinColIndex = tempPin;
      }
    }

    const dataRows = headerRowIndex >= 0 ? nonEmptyRows.slice(headerRowIndex + 1) : nonEmptyRows;
    const targetClass = selectedTargetClass || currentUser.className || 'Lớp 4A8';
    const classTag = targetClass.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '4A8';
    let baseCount = students.length;

    const parsed: Array<{
      tempId: string;
      fullName: string;
      studentCode: string;
      pinCode: string;
      isValid: boolean;
      note?: string;
    }> = [];

    dataRows.forEach((row, idx) => {
      let name = '';

      // Strategy 1: Separate "Họ và đệm" + "Tên"
      if (hoDemColIndex >= 0 && tenColIndex >= 0 && (row[hoDemColIndex] || row[tenColIndex])) {
        const ho = String(row[hoDemColIndex] || '').trim();
        const ten = String(row[tenColIndex] || '').trim();
        name = ho && ten ? `${ho} ${ten}` : (ho || ten);
      } 
      // Strategy 2: Single Full Name column
      else if (fullNameColIndex >= 0 && row[fullNameColIndex]) {
        name = String(row[fullNameColIndex]).trim();
      } 
      // Strategy 3: Heuristic scan across columns
      else {
        // Find text column with >= 2 words or Vietnamese letters that is not numbers/dates
        for (let c = 0; c < row.length; c++) {
          const val = String(row[c] || '').trim();
          // Skip if cell looks like index number, date, or empty
          if (!val || /^\d+$/.test(val) || /^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}$/.test(val)) {
            continue;
          }
          // If cell contains at least 2 chars and not gender
          if (val.length >= 2 && !/^(nam|nữ|male|female|đạt|chưa đạt)$/i.test(val)) {
            name = val;
            break;
          }
        }
      }

      // Ignore title/footer/summary lines
      if (!name) return;
      const lower = name.toLowerCase();
      if (
        lower.includes('tổng cộng') || 
        lower.includes('tổng số') || 
        lower.includes('danh sách') ||
        lower.includes('giáo viên') || 
        lower.includes('người lập') ||
        lower.includes('hiệu trưởng') ||
        lower.includes('ban giám hiệu') ||
        lower.includes('năm học') ||
        lower.includes('trường tiểu học') ||
        lower.startsWith('stt') ||
        lower.startsWith('họ và tên')
      ) {
        return;
      }

      // Clean name: remove leading numbers like "1. ", "01 - ", "1/ "
      name = name.replace(/^\d+[\.\-\/\s]+/, '').trim();
      // Remove trailing remarks like "(lớp trưởng)", "(chuyển trường)"
      name = name.replace(/\s*\([^)]*\)$/, '').trim();

      if (name.length < 2) return;

      // Extract code & pin
      let code = codeColIndex >= 0 && row[codeColIndex] ? String(row[codeColIndex]).trim() : '';
      let pin = pinColIndex >= 0 && row[pinColIndex] ? String(row[pinColIndex]).trim() : defaultBulkPin || '1234';

      // Clean pin to 4 digits
      pin = pin.replace(/\D/g, '').slice(0, 4) || defaultBulkPin || '1234';

      if (!code) {
        baseCount++;
        code = `HS${classTag}-${baseCount.toString().padStart(2, '0')}`;
      }

      // Check if already in current class roster
      const isDuplicate = students.some(s => s.fullName?.toLowerCase().trim() === name.toLowerCase().trim());

      parsed.push({
        tempId: `temp-${idx}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        fullName: name,
        studentCode: code,
        pinCode: pin,
        isValid: name.length >= 2,
        note: isDuplicate ? 'Đã có trong lớp (sẽ cập nhật PIN/mã)' : undefined,
      });
    });

    if (parsed.length === 0) {
      setUploadError('Không tìm thấy danh sách học sinh hợp lệ từ file. Vui lòng kiểm tra file có cột Họ tên hoặc STT.');
    } else {
      setUploadError(null);
    }

    setParsedStudents(parsed);
  };

  // Handle File Upload (.xlsx, .xls, .csv, .txt)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    setUploadError(null);

    const reader = new FileReader();
    const isCsvOrTxt = file.name.endsWith('.csv') || file.name.endsWith('.txt');

    if (isCsvOrTxt) {
      reader.onload = (evt) => {
        try {
          const text = evt.target?.result as string;
          // Parse CSV / TXT lines
          const lines = text.split(/\r\n|\n/).filter(line => line.trim());
          const rows = lines.map(line => {
            if (line.includes('\t')) return line.split('\t');
            if (line.includes(',')) return line.split(',');
            if (line.includes(';')) return line.split(';');
            return [line];
          });
          parseRawRowsData(rows);
        } catch (err: any) {
          setUploadError('Lỗi đọc file văn bản: ' + (err.message || 'Không xác định'));
        }
      };
      reader.readAsText(file, 'utf-8');
    } else {
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
            throw new Error('File Excel không có trang tính nào.');
          }
          // Pick sheet with most data rows
          let bestSheet = workbook.Sheets[workbook.SheetNames[0]];
          let maxRows = 0;
          for (const sName of workbook.SheetNames) {
            const s = workbook.Sheets[sName];
            if (s && s['!ref']) {
              const rows: any[][] = XLSX.utils.sheet_to_json(s, { header: 1, defval: '' });
              if (rows.length > maxRows) {
                maxRows = rows.length;
                bestSheet = s;
              }
            }
          }
          const jsonData: any[][] = XLSX.utils.sheet_to_json(bestSheet, { header: 1, defval: '' });
          parseRawRowsData(jsonData);
        } catch (err: any) {
          setUploadError('Lỗi đọc bảng tính Excel: ' + (err.message || 'Vui lòng kiểm tra định dạng .xlsx hoặc .xls'));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Parse clipboard / pasted text
  const handleParsePastedText = () => {
    if (!pastedText.trim()) {
      setUploadError('Vui lòng dán danh sách học sinh vào ô bên dưới.');
      return;
    }
    const lines = pastedText.split(/\r\n|\n/).filter((line: string) => line.trim());
    const rows = lines.map((line: string) => {
      if (line.includes('\t')) return line.split('\t');
      if (line.includes(',')) return line.split(',');
      if (line.includes(';')) return line.split(';');
      return [line];
    });
    parseRawRowsData(rows);
  };

  // Download Sample Excel Template
  const handleDownloadSampleExcel = () => {
    const targetClass = selectedTargetClass || currentUser.className || 'Lớp 4A8';
    const classTag = targetClass.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '4A8';
    const sampleData = [
      { 'STT': 1, 'Họ và đệm': 'Nguyễn Mai', 'Tên': 'Anh', 'Mã học sinh': `HS${classTag}-01`, 'Mã PIN': '1234' },
      { 'STT': 2, 'Họ và đệm': 'Trần Quốc', 'Tên': 'Bảo', 'Mã học sinh': `HS${classTag}-02`, 'Mã PIN': '1234' },
      { 'STT': 3, 'Họ và đệm': 'Lê Hoàng', 'Tên': 'Yến', 'Mã học sinh': `HS${classTag}-03`, 'Mã PIN': '1234' },
      { 'STT': 4, 'Họ và đệm': 'Phạm Minh', 'Tên': 'Khôi', 'Mã học sinh': `HS${classTag}-04`, 'Mã PIN': '1234' },
      { 'STT': 5, 'Họ và đệm': 'Vũ Thảo', 'Tên': 'Linh', 'Mã học sinh': `HS${classTag}-05`, 'Mã PIN': '1234' },
    ];
    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mau_DanhSach_HocSinh');
    XLSX.writeFile(wb, `Danh_sach_hoc_sinh_mau_${classTag}.xlsx`);
    showToast('Đã tải xuống file mẫu Excel!');
  };

  // Download Sample CSV
  const handleDownloadSampleCsv = () => {
    const targetClass = selectedTargetClass || currentUser.className || 'Lớp 4A8';
    const classTag = targetClass.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '4A8';
    const csvContent = `\uFEFFSTT,Họ và tên,Mã học sinh,Mã PIN\n1,Nguyễn Mai Anh,HS${classTag}-01,1234\n2,Trần Quốc Bảo,HS${classTag}-02,1234\n3,Lê Hoàng Yến,HS${classTag}-03,1234\n4,Phạm Minh Khôi,HS${classTag}-04,1234\n5,Vũ Thảo Linh,HS${classTag}-05,1234\n`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Danh_sach_hoc_sinh_mau_${classTag}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống file mẫu CSV!');
  };

  // Export current class students to Excel
  const handleExportClassStudents = () => {
    if (students.length === 0) {
      showToast('Lớp hiện chưa có học sinh nào để xuất file.');
      return;
    }
    const targetClass = currentUser.className || '';
    const classTag = targetClass.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || 'LOP';
    const exportData = students.map((st, idx) => ({
      'STT': idx + 1,
      'Họ và tên học sinh': st.fullName,
      'Mã học sinh': st.studentCode || `HS${classTag}-${(idx + 1).toString().padStart(2, '0')}`,
      'Mã PIN đăng nhập': st.pinCode || '1234',
      'Lớp': st.className || targetClass,
      'Trường học': st.schoolName || currentUser.school || 'Trường Tiểu học',
      'Trạng thái': st.status === 'locked' ? 'Tạm khóa' : 'Đang hoạt động',
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `HocSinh_${classTag}`);
    XLSX.writeFile(wb, `Danh_sach_hoc_sinh_${classTag}_${new Date().toISOString().slice(0, 10)}.xlsx`);
    showToast(`Đã xuất file Excel gồm ${students.length} học sinh!`);
  };

  // Update a single parsed row in table
  const handleUpdateParsedRow = (tempId: string, field: 'fullName' | 'studentCode' | 'pinCode', value: string) => {
    setParsedStudents(prev => prev.map(row => {
      if (row.tempId === tempId) {
        const updated = { ...row, [field]: value };
        if (field === 'fullName') {
          updated.isValid = value.trim().length >= 2;
        }
        return updated;
      }
      return row;
    }));
  };

  // Delete a parsed row from preview
  const handleDeleteParsedRow = (tempId: string) => {
    setParsedStudents(prev => prev.filter(r => r.tempId !== tempId));
  };

  // Apply default PIN to all parsed rows
  const handleApplyDefaultPinToAll = () => {
    const pin = defaultBulkPin.replace(/\D/g, '').slice(0, 4) || '1234';
    setParsedStudents(prev => prev.map(r => ({ ...r, pinCode: pin })));
    showToast(`Đã áp dụng mã PIN ${pin} cho toàn bộ danh sách!`);
  };

  // Auto regenerate student codes
  const handleRegenerateCodes = () => {
    const targetClass = selectedTargetClass || currentUser.className || '';
    const classTag = targetClass.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || 'LOP';
    let base = students.length;
    setParsedStudents(prev => prev.map(r => {
      base++;
      return {
        ...r,
        studentCode: `HS${classTag}-${base.toString().padStart(2, '0')}`,
      };
    }));
    showToast('Đã đánh lại mã học sinh liên tục!');
  };

  // Confirm and submit bulk import
  const handleConfirmBulkImport = async () => {
    const validRows = parsedStudents.filter(r => r.isValid && r.fullName.trim());
    if (validRows.length === 0) {
      setUploadError('Chưa có học sinh hợp lệ nào để tạo tài khoản.');
      return;
    }

    const targetClass = (selectedTargetClass || currentUser.className || '').trim();

    setIsImporting(true);
    setUploadError(null);
    try {
      const payload = validRows.map(r => ({
        fullName: r.fullName.trim(),
        studentCode: r.studentCode.trim(),
        pinCode: r.pinCode.trim() || defaultBulkPin || '1234',
      }));

      const res = await api.bulkImportStudents(
        payload, 
        currentUser.classId, 
        targetClass
      );

      showToast(res.message || `Đã cấp thành công ${res.createdCount || validRows.length} tài khoản học sinh cho ${targetClass}!`);
      setShowBulkUploadModal(false);
      setParsedStudents([]);
      setPastedText('');
      setUploadFileName('');
      await loadData();
    } catch (err: any) {
      setUploadError(err.message || 'Lỗi khi cấp tài khoản hàng loạt.');
    } finally {
      setIsImporting(false);
    }
  };

  // Teacher AI Synthesis
  const handleSynthesizeClassIssues = async () => {
    if (submissions.length === 0) {
      showToast('Chưa có bài nộp nào để tổng hợp khó khăn.');
      return;
    }
    setAiSynthesizing(true);
    try {
      const summaryText = submissions.map((s, idx) => `Bài ${idx + 1} (${s.wordCount} từ): ${s.content.slice(0, 150)}...`).join('\n');
      const res = await api.callAiCoach({
        mode: 'tong_hop_lop_hoc',
        prompt: summaryText,
      });
      setAiSynthesisResult(res.response);
      showToast('Đã tổng hợp khó khăn của học sinh qua AI!');
    } catch (err: any) {
      showToast('Lỗi khi gọi AI tổng hợp.');
    } finally {
      setAiSynthesizing(false);
    }
  };

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const gradedCount = submissions.filter(s => s.status === 'graded').length;
  const needsEditCount = submissions.filter(s => s.status === 'needs_edit').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Teacher Top Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              Không gian Quản lý Giáo viên
            </span>
            <span className="bg-purple-200 text-purple-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {currentClassLabel} • Sĩ số: {students.length} em
            </span>
          </div>
          <h2 className="font-heading text-2xl font-bold">
            Chào mừng {currentUser.name ? (currentUser.name.startsWith('Cô') || currentUser.name.startsWith('Thầy') ? currentUser.name : `Cô ${currentUser.name}`) : 'Thầy/Cô'}
          </h2>
          <p className="text-xs text-purple-100 flex items-center gap-1.5 font-medium">
            <School className="w-3.5 h-3.5" />
            <span>{currentUser.school ? `${currentUser.school} • ` : ''}Hotline hỗ trợ: 0973793366</span>
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 flex-wrap">
          <button
            onClick={loadData}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>
          <button
            onClick={onNavigateToLessons}
            className="px-4 py-2 rounded-xl bg-white text-purple-900 font-bold text-xs sm:text-sm hover:bg-purple-50 transition-colors shadow-xs cursor-pointer"
          >
            Kho bài học TV4 SGK
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'submissions'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white hover:bg-purple-50 text-slate-600 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Hàng chờ chấm bài ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'assignments'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white hover:bg-purple-50 text-slate-600 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Giao bài tập ({assignments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'students'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white hover:bg-purple-50 text-slate-600 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Sổ theo dõi học sinh & PIN ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'reports'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'bg-white hover:bg-purple-50 text-slate-600 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Báo cáo thực tế & AI Tổng hợp</span>
        </button>
      </div>

      {/* Real Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Sĩ số {currentClassLabel}</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="font-heading text-2xl font-bold text-slate-800">
            {students.length} <span className="text-sm font-normal text-slate-400">em</span>
          </div>
          <div className="text-[11px] text-slate-500">học sinh đã đăng ký hồ sơ</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Bài tập đã nộp</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-heading text-2xl font-bold text-slate-800">{submissions.length}</div>
          <div className="text-[11px] text-emerald-600 font-medium">Đã phát hành điểm: {gradedCount} bài</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Chờ cô chấm</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-heading text-2xl font-bold text-slate-800">{pendingCount}</div>
          <div className="text-[11px] text-amber-600 font-medium">bài cần đọc & duyệt</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Yêu cầu sửa lại</span>
            <RotateCcw className="w-4 h-4 text-orange-500" />
          </div>
          <div className="font-heading text-2xl font-bold text-slate-800">{needsEditCount}</div>
          <div className="text-[11px] text-orange-600 font-medium">bài đang hoàn thiện thêm</div>
        </div>
      </div>

      {/* TAB 1: SUBMISSIONS & GRADING */}
      {activeTab === 'submissions' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-800">
                Danh sách bài làm của học sinh {currentClassLabel}
              </h3>
              <p className="text-xs text-slate-500">
                Lưu nháp nhận xét để chỉnh sửa sau hoặc phát hành chính thức cho học sinh.
              </p>
            </div>

            {/* Refresh button & Filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  loadData();
                  showToast('Đã làm mới danh sách bài nộp!');
                }}
                disabled={loading}
                className="px-3 py-1.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                title="Làm mới để kiểm tra bài nộp mới nhất từ học sinh"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Làm mới</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs flex-wrap">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'pending', label: 'Chờ chấm' },
                  { id: 'draft', label: 'Nháp nhận xét' },
                  { id: 'graded', label: 'Đã phát hành' },
                  { id: 'needs_edit', label: 'Cần sửa lại' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterStatus(f.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      filterStatus === f.id
                        ? 'bg-purple-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredSubs.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 space-y-2">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-heading font-bold text-slate-700 text-sm">
                Không có bài nộp nào trong mục này
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Khi học sinh hoàn thành bài tại Bàn viết và bấm nộp bài, bài làm sẽ tự động hiển thị tại đây theo thời gian thực.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSubs.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-xl shrink-0">
                      {sub.studentAvatar || '🎒'}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-800 text-sm">{sub.studentName}</span>
                        <span className="text-[11px] font-medium text-slate-400">{sub.studentClass}</span>
                        {sub.status === 'graded' && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            Đã phát hành: {sub.score}đ
                          </span>
                        )}
                        {sub.status === 'pending' && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px]">
                            Chờ chấm
                          </span>
                        )}
                        {sub.status === 'needs_edit' && (
                          <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 font-bold text-[10px]">
                            Đã yêu cầu sửa lại
                          </span>
                        )}
                        {sub.draftTeacherComment && !sub.isPublishedToStudent && (
                          <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[10px]">
                            Có bản nháp nhận xét
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-700 font-semibold">
                        {sub.lessonTitle}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Nộp lúc: {sub.submittedAt} • Độ dài: {sub.wordCount} từ
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleOpenReview(sub)}
                      className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Đọc & Chấm bài</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ASSIGNMENTS MANAGEMENT */}
      {activeTab === 'assignments' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-800">
                Nhiệm vụ viết văn giao cho Lớp 4A8
              </h3>
              <p className="text-xs text-slate-500">
                Tạo đề bài, quy định độ dài từ và thời hạn nộp bài.
              </p>
            </div>

            <button
              onClick={() => setShowAddAssignment(true)}
              className="px-4 py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Giao bài tập mới</span>
            </button>
          </div>

          <div className="space-y-3">
            {assignments.map((assign) => (
              <div
                key={assign.id}
                className="p-5 rounded-2xl border border-purple-100 bg-purple-50/20 hover:border-purple-200 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    {assign.genre}
                  </span>
                  <span className="text-xs text-slate-500">
                    Hạn nộp: {new Date(assign.dueDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-slate-800 text-base">{assign.title}</h4>
                <p className="text-xs text-slate-600">"{assign.prompt}"</p>
                <div className="pt-2 border-t border-purple-100/60 flex items-center justify-between text-xs text-slate-500">
                  <span>Mục tiêu: {assign.targetWordCount.min} - {assign.targetWordCount.max} từ</span>
                  <span className="font-semibold text-emerald-700">Đã phát hành cho {assign.className || currentUser.className || 'lớp học'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STUDENTS ROSTER & PIN */}
      {activeTab === 'students' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          {/* Header & Main Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-800 flex items-center gap-2">
                <span>Sổ theo dõi học sinh {currentClassLabel} & Mã PIN</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold">
                  {students.length} học sinh
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tài khoản học sinh do Giáo viên tạo & cấp mã PIN 4 số bảo mật giúp học sinh tiểu học dễ dàng đăng nhập viết bài.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* PRIMARY: Upload Roster File */}
              <button
                onClick={() => {
                  setUploadError(null);
                  setShowBulkUploadModal(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-200 cursor-pointer transition-all transform hover:-translate-y-0.5"
                title="Tải lên danh sách học sinh từ file Excel hoặc CSV"
              >
                <Upload className="w-4 h-4" />
                <span>Tải file danh sách (Excel / CSV)</span>
              </button>

              {/* SECONDARY: Add Single Student */}
              <button
                onClick={() => setShowAddStudent(true)}
                className="px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Thêm từng học sinh thủ công"
              >
                <UserPlus className="w-4 h-4 text-purple-700" />
                <span>Cấp 1 tài khoản</span>
              </button>

              {/* TERTIARY: Export Roster to Excel */}
              <button
                onClick={handleExportClassStudents}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Xuất toàn bộ danh sách lớp ra file Excel để in hoặc gửi phụ huynh"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Xuất file Excel</span>
              </button>
            </div>
          </div>

          {/* Search & Quick Stats Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-purple-50/40 p-3 rounded-2xl border border-purple-100/60">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm theo tên học sinh hoặc mã HS..."
                value={studentSearchQuery}
                onChange={(e) => setStudentSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:border-purple-500 focus:ring-1 focus:ring-purple-200 outline-hidden"
              />
              {studentSearchQuery && (
                <button
                  onClick={() => setStudentSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="bg-white px-2.5 py-1 rounded-lg border border-purple-100 font-medium">
                Hiển thị: <strong>{students.filter(st => {
                  if (!studentSearchQuery.trim()) return true;
                  const q = studentSearchQuery.toLowerCase();
                  return st.fullName?.toLowerCase().includes(q) || st.studentCode?.toLowerCase().includes(q) || st.pinCode?.includes(q);
                }).length}</strong> / {students.length} em
              </span>
              <button
                onClick={handleDownloadSampleExcel}
                className="text-purple-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải mẫu file Excel</span>
              </button>
            </div>
          </div>

          {/* Student Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {students
              .filter((st) => {
                if (!studentSearchQuery.trim()) return true;
                const q = studentSearchQuery.toLowerCase();
                return (
                  st.fullName?.toLowerCase().includes(q) ||
                  st.studentCode?.toLowerCase().includes(q) ||
                  st.pinCode?.includes(q)
                );
              })
              .map((st) => (
                <div
                  key={st.id}
                  className="p-4 rounded-2xl border border-purple-100 bg-purple-50/30 hover:bg-purple-50/70 transition-all space-y-2 shadow-2xs hover:shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{st.avatar || '👧'}</span>
                    <span className="font-mono text-xs font-bold text-purple-900 bg-white px-2 py-0.5 rounded border border-purple-200">
                      {st.studentCode || 'HS-XX'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{st.fullName}</h4>
                    <p className="text-xs text-slate-500">{st.className || currentUser.className || ''}{st.schoolName || currentUser.school ? ` • ${st.schoolName || currentUser.school}` : ''}</p>
                  </div>
                  <div className="pt-2 border-t border-purple-200/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-500">Mã PIN:</span>
                      <span className="font-mono font-bold text-xs bg-purple-200 text-purple-900 px-2 py-0.5 rounded">
                        {st.pinCode || '1234'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={async () => {
                          const p = prompt(`Đổi mã PIN mới cho học sinh ${st.fullName} (4 số):`, st.pinCode || '1234');
                          if (p && p.trim()) {
                            await api.updateUser(st.id, { pinCode: p.trim() });
                            showToast(`Đã đổi PIN của ${st.fullName} thành ${p.trim()}`);
                            loadData();
                          }
                        }}
                        className="text-[11px] font-bold text-purple-700 hover:underline cursor-pointer"
                      >
                        Đổi PIN
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        onClick={async () => {
                          if (confirm(`Bạn có chắc chắn muốn xóa học sinh "${st.fullName}" khỏi danh sách lớp không?`)) {
                            try {
                              await api.deleteUser(st.id);
                              showToast(`Đã xóa học sinh ${st.fullName}`);
                              loadData();
                            } catch (err: any) {
                              alert(err.message || 'Lỗi khi xóa học sinh');
                            }
                          }
                        }}
                        className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Empty state for search */}
          {students.filter(st => {
            if (!studentSearchQuery.trim()) return true;
            const q = studentSearchQuery.toLowerCase();
            return st.fullName?.toLowerCase().includes(q) || st.studentCode?.toLowerCase().includes(q);
          }).length === 0 && (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
              <p className="text-xs text-slate-500 font-medium">
                {studentSearchQuery ? `Không tìm thấy học sinh nào khớp với "${studentSearchQuery}"` : 'Lớp chưa có học sinh nào.'}
              </p>
              {studentSearchQuery ? (
                <button
                  onClick={() => setStudentSearchQuery('')}
                  className="text-xs text-purple-700 font-bold hover:underline cursor-pointer"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              ) : (
                <button
                  onClick={() => setShowBulkUploadModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs cursor-pointer"
                >
                  Tải file danh sách lên ngay
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: REAL REPORTS & AI SYNTHESIS */}
      {activeTab === 'reports' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold text-slate-800">
              Báo cáo tiến độ học tập thực tế {currentClassLabel}
            </h3>
            <p className="text-xs text-slate-500">
              Số liệu tính toán trực tiếp từ cơ sở dữ liệu bài nộp (không dùng số liệu giả định).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Tỉ lệ học sinh đã nộp bài:</span>
              <div className="font-heading text-2xl font-bold text-purple-700">
                {reportData?.submittedStudentsCount || 0} / {students.length} em
              </div>
              <div className="text-xs text-slate-500">
                Đạt tỉ lệ {reportData?.submissionRate || 0}% sĩ số lớp
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Điểm trung bình lớp:</span>
              <div className="font-heading text-2xl font-bold text-emerald-700">
                {reportData?.averageScore || 0} / 10
              </div>
              <div className="text-xs text-slate-500">Tính trên {gradedCount} bài đã hoàn thành chấm</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Tổng số lượt bài nộp:</span>
              <div className="font-heading text-2xl font-bold text-slate-800">
                {submissions.length} lượt
              </div>
              <div className="text-xs text-slate-500">Gồm cả các lần nộp lại chỉnh sửa</div>
            </div>
          </div>

          {/* AI Teacher Synthesis Tool */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-indigo-950 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>Trợ lý AI hỗ trợ Giáo viên tổng hợp khó khăn của lớp</span>
                </h4>
                <p className="text-xs text-indigo-800">
                  AI quét các bài làm của {currentClassLabel}, chỉ ra các lỗi dùng từ, câu lủng củng và đề xuất bài tập củng cố 15 phút.
                </p>
              </div>

              <button
                onClick={handleSynthesizeClassIssues}
                disabled={aiSynthesizing}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              >
                {aiSynthesizing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Tổng hợp khó khăn ngay</span>
              </button>
            </div>

            {aiSynthesisResult && (
              <div className="p-5 rounded-2xl bg-white border border-indigo-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-medium shadow-xs">
                {aiSynthesisResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* REVIEW & GRADING MODAL (with 4-level rubric and draft save vs publish) */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-purple-700 to-indigo-700 text-white flex items-center justify-between">
              <div>
                <span className="text-xs bg-white/20 font-bold px-2 py-0.5 rounded-full">
                  Đánh giá bài viết theo Rubric chuẩn
                </span>
                <h3 className="font-heading text-lg font-bold mt-1">
                  {selectedSub.studentName} – {selectedSub.lessonTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
              {/* Essay Content */}
              <div>
                <div className="flex items-center justify-between mb-1.5 text-xs text-slate-500 font-semibold">
                  <span>Bài viết của học sinh ({selectedSub.wordCount} từ):</span>
                  <span>Thời gian nộp: {selectedSub.submittedAt}</span>
                </div>
                <div className="p-5 rounded-2xl bg-[#fffdf9] border border-amber-200 text-slate-800 leading-relaxed whitespace-pre-line font-medium text-sm sm:text-base">
                  {selectedSub.content}
                </div>
              </div>

              {/* 4-Level Rubric Table */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Đánh giá theo 4 mức Rubric chuẩn:
                </h4>
                <div className="space-y-2">
                  {RUBRIC_CRITERIA.map((crit) => (
                    <div key={crit.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <span className="font-medium text-slate-800">{crit.name}</span>
                      <select
                        value={rubricScores[crit.id] || 'proficient'}
                        onChange={(e) => setRubricScores({ ...rubricScores, [crit.id]: e.target.value })}
                        className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-medium text-xs text-slate-700"
                      >
                        <option value="support_needed">Cần hỗ trợ</option>
                        <option value="developing">Đang hình thành</option>
                        <option value="proficient">Đạt yêu cầu</option>
                        <option value="advanced">Vận dụng tốt</option>
                        <option value="not_applicable">Không áp dụng</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score & Teacher Feedback Input */}
              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-purple-900 text-xs">
                    Điểm số (Thang điểm 10):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    step={0.5}
                    value={gradeScore}
                    onChange={(e) => setGradeScore(Number(e.target.value))}
                    className="w-24 p-2 text-center rounded-xl bg-white border border-purple-300 font-bold text-base text-purple-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-purple-900 text-xs mb-1">
                    Lời nhận xét & Góp ý của cô giáo:
                  </label>
                  <textarea
                    value={teacherComment}
                    onChange={(e) => setTeacherComment(e.target.value)}
                    rows={4}
                    placeholder="Nhập lời khen cụ thể và hướng dẫn sửa đổi..."
                    className="w-full p-3 rounded-xl bg-white border border-purple-300 text-xs text-slate-800 leading-relaxed font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={() => setShowRevisionModal(true)}
                className="px-3.5 py-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Yêu cầu sửa lại bài</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveDraftReview}
                  className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-purple-600" />
                  <span>Lưu nháp nhận xét</span>
                </button>

                <button
                  onClick={handlePublishReview}
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Phát hành nhận xét cho học sinh</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REQUEST REVISION MODAL */}
      {showRevisionModal && selectedSub && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-orange-200 space-y-4">
            <h4 className="font-heading font-bold text-slate-800 text-base">
              Yêu cầu học sinh {selectedSub.studentName} viết lại
            </h4>
            <p className="text-xs text-slate-500">
              Ghi rõ phần câu từ hoặc đoạn văn em cần viết lại để hoàn thiện hơn:
            </p>
            <textarea
              rows={4}
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              placeholder="Ví dụ: Đoạn thân bài em cần quan sát thêm về rễ và tán lá, tránh lặp từ 'rất'..."
              className="w-full p-3 rounded-xl border border-orange-300 text-xs font-medium"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowRevisionModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 text-xs cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleSendRevisionRequest}
                className="flex-1 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Gửi yêu cầu sửa bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE ASSIGNMENT MODAL */}
      {showAddAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-purple-200 space-y-4">
            <h4 className="font-heading font-bold text-slate-800 text-base">
              Giao bài tập mới cho {currentClassLabel}
            </h4>
            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên bài tập:</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Tả một con vật nuôi trong nhà em"
                  value={assignTitle}
                  onChange={(e) => setAssignTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Thể loại bài viết:</label>
                <select
                  value={assignGenre}
                  onChange={(e) => setAssignGenre(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                >
                  <option value="Miêu tả cây cối">Miêu tả cây cối</option>
                  <option value="Miêu tả con vật">Miêu tả con vật</option>
                  <option value="Đoạn văn nêu ý kiến">Đoạn văn nêu ý kiến</option>
                  <option value="Đoạn văn tưởng tượng">Đoạn văn tưởng tượng</option>
                  <option value="Bài văn kể lại một câu chuyện">Bài văn kể lại một câu chuyện</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Yêu cầu đề bài:</label>
                <textarea
                  rows={3}
                  placeholder="Nhập chi tiết yêu cầu đề bài cho học sinh..."
                  value={assignPrompt}
                  onChange={(e) => setAssignPrompt(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số từ tối thiểu:</label>
                  <input
                    type="number"
                    value={assignMinWords}
                    onChange={(e) => setAssignMinWords(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số từ tối đa:</label>
                  <input
                    type="number"
                    value={assignMaxWords}
                    onChange={(e) => setAssignMaxWords(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddAssignment(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-purple-700 font-bold text-white cursor-pointer"
                >
                  Giao bài tập
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK ADD STUDENT MODAL (Teacher creates student account) */}
      {showAddStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                {currentUser.className || 'Lớp 4A8'} • {currentUser.school || 'Kim Liên A'}
              </span>
              <h4 className="font-heading font-bold text-slate-800 text-base">
                Cấp tài khoản mới cho học sinh
              </h4>
              <p className="text-[11px] text-slate-500">
                Tài khoản học sinh do Giáo viên tạo. Sau khi tạo, học sinh chỉ cần nhập Họ tên & mã PIN 4 số này để đăng nhập.
              </p>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Họ và tên học sinh: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hoàng Gia Hưng"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mã PIN đăng nhập (4 số): <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={newStudentPin}
                  onChange={(e) => setNewStudentPin(e.target.value)}
                  placeholder="1234"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-center font-bold text-sm tracking-widest focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden"
                  required
                />
                <p className="text-[10px] text-slate-400 mt-1">Mặc định là 1234. Giáo viên có thể đổi sau.</p>
              </div>

              {/* Quick switch to bulk upload */}
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-center space-y-1.5">
                <p className="text-[11px] text-purple-900 font-medium">Bạn có file danh sách cả lớp (Excel / CSV)?</p>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddStudent(false);
                    setShowBulkUploadModal(true);
                  }}
                  className="text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Chuyển sang tải file danh sách lên hàng loạt</span>
                </button>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudent(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 font-bold text-slate-700 hover:bg-slate-200 cursor-pointer transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 font-bold text-white shadow-xs cursor-pointer transition-colors"
                >
                  Cấp tài khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK UPLOAD MODAL (Teacher uploads student list file) */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white/20 font-bold px-2 py-0.5 rounded-full">
                    {currentUser.className || 'Lớp 4A8'}
                  </span>
                  <span className="text-xs text-purple-200">
                    {currentUser.school || 'Trường Tiểu học Kim Liên A'}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-200" />
                  <span>Tải file danh sách & Cấp tài khoản học sinh hàng loạt</span>
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowBulkUploadModal(false);
                  setParsedStudents([]);
                  setUploadError(null);
                  setUploadFileName('');
                }}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
              {/* Method Tabs */}
              <div className="flex border-b border-slate-200 gap-4">
                <button
                  onClick={() => setUploadTab('file')}
                  className={`pb-2 font-bold flex items-center gap-1.5 transition-colors cursor-pointer border-b-2 ${
                    uploadTab === 'file'
                      ? 'border-purple-600 text-purple-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <FileUp className="w-4 h-4" />
                  <span>Tải tệp bảng tính (.xlsx, .xls, .csv, .txt)</span>
                </button>
                <button
                  onClick={() => setUploadTab('paste')}
                  className={`pb-2 font-bold flex items-center gap-1.5 transition-colors cursor-pointer border-b-2 ${
                    uploadTab === 'paste'
                      ? 'border-purple-600 text-purple-700'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <ClipboardList className="w-4 h-4" />
                  <span>Dán danh sách văn bản (từ Word / Zalo / Excel)</span>
                </button>
              </div>

              {/* Class Selection & Quick Info */}
              <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-700">Lớp tiếp nhận tài khoản:</span>
                  <input
                    type="text"
                    value={selectedTargetClass}
                    onChange={(e) => setSelectedTargetClass(e.target.value)}
                    placeholder="Ví dụ: Lớp 4A8"
                    className="px-3 py-1.5 rounded-xl bg-white border border-purple-200 font-bold text-purple-900 text-xs focus:border-purple-500 focus:ring-1 focus:ring-purple-300 outline-hidden w-32"
                  />
                  <div className="flex gap-1">
                    {['Lớp 4A8', 'Lớp 4A1', 'Lớp 4A2'].map(cName => (
                      <button
                        key={cName}
                        type="button"
                        onClick={() => setSelectedTargetClass(cName)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                          selectedTargetClass === cName 
                            ? 'bg-purple-700 text-white shadow-xs' 
                            : 'bg-white text-slate-600 hover:bg-purple-100 border border-slate-200'
                        }`}
                      >
                        {cName}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-purple-800 font-medium">
                  Trường: <strong>{currentUser.school || 'Trường Tiểu học Kim Liên A'}</strong>
                </div>
              </div>

              {/* TAB 1: FILE UPLOAD */}
              {uploadTab === 'file' && (
                <div className="space-y-4">
                  {/* Hidden Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".xlsx,.xls,.csv,.tsv,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Dropzone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-purple-200 hover:border-purple-400 bg-purple-50/30 hover:bg-purple-50/70 p-6 rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        {uploadFileName ? `Đã chọn: ${uploadFileName}` : 'Bấm vào đây để chọn file Excel / CSV từ máy tính'}
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Hỗ trợ các định dạng .xlsx, .xls, .csv, .txt (tự động nhận diện cột Họ tên, Mã học sinh, Mã PIN)
                      </p>
                    </div>
                    {uploadFileName && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã tải file lên thành công • Bấm để chọn file khác</span>
                      </span>
                    )}
                  </div>

                  {/* Sample Template Downloads */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-slate-600 font-medium text-[11px] flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>Bạn chưa có file sẵn? Hãy tải mẫu chuẩn dưới đây để điền nhanh:</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadSampleExcel}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Mẫu Excel (.xlsx)</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadSampleCsv}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Mẫu CSV (.csv)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PASTE TEXT */}
              {uploadTab === 'paste' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="block font-bold text-slate-700">
                      Dán danh sách học sinh vào ô bên dưới:
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Mỗi dòng một học sinh. Bạn có thể copy cả danh sách từ file Word, Google Docs, hoặc tin nhắn Zalo của lớp.
                    </p>
                  </div>
                  <textarea
                    rows={6}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder={`Ví dụ:\nNguyễn Mai Anh\nTrần Quốc Bảo\nLê Hoàng Yến\nPhạm Minh Khôi\nVũ Thảo Linh\n\n(Hoặc có thể có mã học sinh và PIN cách nhau bởi dấu phẩy hoặc tab)`}
                    className="w-full p-3 rounded-2xl border border-slate-300 font-mono text-xs focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-hidden leading-relaxed"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleParsePastedText}
                      className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Phân tích danh sách đã dán</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {uploadError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* PREVIEW & EDITING TABLE */}
              {parsedStudents.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-heading font-bold text-slate-800 text-sm flex items-center gap-2">
                        <span>Danh sách xem trước: {parsedStudents.length} học sinh</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                          {parsedStudents.filter(r => r.isValid).length} hợp lệ
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Thầy/Cô có thể chỉnh sửa trực tiếp họ tên, mã số hoặc mã PIN ngay trên bảng này trước khi bấm tạo.
                      </p>
                    </div>

                    {/* Bulk Tools */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200">
                        <span className="text-[11px] text-slate-600 font-medium">Mã PIN chung:</span>
                        <input
                          type="text"
                          maxLength={4}
                          value={defaultBulkPin}
                          onChange={(e) => setDefaultBulkPin(e.target.value)}
                          className="w-12 px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-center font-bold text-[11px]"
                        />
                        <button
                          type="button"
                          onClick={handleApplyDefaultPinToAll}
                          className="text-[11px] font-bold text-purple-700 hover:underline cursor-pointer"
                        >
                          Áp dụng
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleRegenerateCodes}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer transition-colors"
                        title="Đánh lại mã số học sinh liên tục"
                      >
                        Đánh lại mã số
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Table */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-100 text-slate-700 sticky top-0 font-bold z-10">
                        <tr>
                          <th className="py-2.5 px-3 w-12 text-center">STT</th>
                          <th className="py-2.5 px-3">Họ và tên học sinh</th>
                          <th className="py-2.5 px-3 w-32">Mã học sinh</th>
                          <th className="py-2.5 px-3 w-28 text-center">Mã PIN (4 số)</th>
                          <th className="py-2.5 px-3 w-40">Ghi chú</th>
                          <th className="py-2.5 px-3 w-14 text-center">Xóa</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {parsedStudents.map((row, idx) => (
                          <tr key={row.tempId} className={`hover:bg-purple-50/30 ${!row.isValid ? 'bg-rose-50/40' : ''}`}>
                            <td className="py-2 px-3 text-center font-bold text-slate-500 text-[11px]">
                              {idx + 1}
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={row.fullName}
                                onChange={(e) => handleUpdateParsedRow(row.tempId, 'fullName', e.target.value)}
                                className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 focus:border-purple-500 focus:bg-white outline-hidden"
                              />
                            </td>
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={row.studentCode}
                                onChange={(e) => handleUpdateParsedRow(row.tempId, 'studentCode', e.target.value)}
                                className="w-full px-2 py-1 rounded-lg border border-slate-200 font-mono text-xs font-bold text-purple-900 focus:border-purple-500 focus:bg-white outline-hidden"
                              />
                            </td>
                            <td className="py-2 px-3 text-center">
                              <input
                                type="text"
                                maxLength={4}
                                value={row.pinCode}
                                onChange={(e) => handleUpdateParsedRow(row.tempId, 'pinCode', e.target.value)}
                                className="w-20 px-2 py-1 rounded-lg border border-slate-200 font-mono text-center text-xs font-bold text-purple-800 focus:border-purple-500 focus:bg-white outline-hidden"
                              />
                            </td>
                            <td className="py-2 px-3 text-[11px]">
                              {row.note ? (
                                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200">
                                  {row.note}
                                </span>
                              ) : row.isValid ? (
                                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                                  ✓ Hợp lệ
                                </span>
                              ) : (
                                <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold">
                                  ✕ Tên quá ngắn
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteParsedRow(row.tempId)}
                                className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"
                                title="Xóa dòng này"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <p className="text-[11px] text-slate-500">
                🔒 Học sinh sẽ dùng <strong>Họ tên</strong> và <strong>Mã PIN 4 số</strong> này để đăng nhập vào Edunova.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowBulkUploadModal(false);
                    setParsedStudents([]);
                    setUploadError(null);
                    setUploadFileName('');
                  }}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  disabled={parsedStudents.filter(r => r.isValid).length === 0 || isImporting}
                  onClick={handleConfirmBulkImport}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs shadow-md shadow-purple-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
                >
                  {isImporting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang tạo tài khoản...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Xác nhận tạo {parsedStudents.filter(r => r.isValid).length} tài khoản</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
