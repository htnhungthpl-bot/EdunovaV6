import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { LessonsView } from './components/LessonsView';
import { WritingStudioView } from './components/WritingStudioView';
import { TeacherView } from './components/TeacherView';
import { ProgressView } from './components/ProgressView';
import { AdminManagementView } from './components/AdminManagementView';
import { StudentPostsLibraryView } from './components/StudentPostsLibraryView';
import { ChallengesView } from './components/challenges/ChallengesView';
import { AuthModal } from './components/AuthModal';
import { 
  Grade4LessonItem, 
  UserProfile 
} from './types';
import { 
  RAW_CURRICULUM_DATA, 
  getInitialCurriculumData, 
  saveCurriculumData 
} from './data/grade4CurriculumData';
import { SAMPLE_USERS } from './data/mockData';
import { api, getStoredUser } from './utils/api';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('lessons');
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    return getStoredUser() || SAMPLE_USERS.student1;
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [curriculumData, setCurriculumData] = useState<Grade4LessonItem[]>(getInitialCurriculumData);
  const [selectedLesson, setSelectedLesson] = useState<Grade4LessonItem | null>(null);

  // Sync session on mount
  useEffect(() => {
    api.getMe().then((user) => {
      if (user) {
        setCurrentUser(user);
      } else if (currentUser?.role === 'student' && !api.hasToken()) {
        // Ensure student has a live session token so submissions succeed immediately
        api.login({
          role: 'student',
          fullName: currentUser.name,
          className: currentUser.className || 'Lớp 4A8',
          pinCode: currentUser.pinCode || '1234',
        }).catch(() => {});
      }
    }).catch(() => {
      // Fallback to offline/cached user
    });
  }, []);

  // Initialize selected lesson
  useEffect(() => {
    if (!selectedLesson && curriculumData.length > 0) {
      setSelectedLesson(curriculumData[0]);
    }
  }, [curriculumData, selectedLesson]);

  // Handle updating curriculum data
  const handleUpdateCurriculumData = (updatedList: Grade4LessonItem[]) => {
    setCurriculumData(updatedList);
    saveCurriculumData(updatedList);
  };

  // Handle reset to default
  const handleResetToDefault = () => {
    setCurriculumData(RAW_CURRICULUM_DATA);
    saveCurriculumData(RAW_CURRICULUM_DATA);
    setSelectedLesson(RAW_CURRICULUM_DATA[0]);
  };

  // Handle selecting a lesson for writing studio
  const handleSelectLessonForWriting = (lesson: Grade4LessonItem) => {
    setSelectedLesson(lesson);
    setActiveTab('writing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUserSelected = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveTab('admin');
    } else if (user.role === 'teacher') {
      setActiveTab('teacher');
    } else if (user.role === 'student') {
      // If student was on a restricted tab, redirect them to a student-safe space
      if (activeTab === 'admin' || activeTab === 'teacher') {
        setActiveTab('lessons');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Role Guard: strictly prevent students from accessing teacher or admin spaces
  useEffect(() => {
    if (currentUser.role === 'student') {
      if (activeTab === 'teacher' || activeTab === 'admin') {
        setActiveTab('lessons');
      }
    } else if (currentUser.role === 'teacher') {
      if (activeTab === 'admin') {
        setActiveTab('teacher');
      }
    }
  }, [currentUser.role, activeTab]);

  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-800 selection:bg-amber-200 selection:text-amber-900">
      {/* Vertical Sidebar on the Left */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area positioned to the right of fixed sidebar on desktop */}
      <div className="lg:pl-64 xl:pl-72 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          onOpenAuth={() => setAuthModalOpen(true)}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
        />

        {/* Main Content Area */}
        <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
          {activeTab === 'home' && (
            <HomeView
              onNavigate={(tab) => {
                // Prevent students from navigating to teacher or admin via home cards
                if (currentUser.role === 'student' && (tab === 'teacher' || tab === 'admin')) {
                  setActiveTab('progress');
                  return;
                }
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'lessons' && (
            <LessonsView
              curriculumData={curriculumData}
              onUpdateLessons={handleUpdateCurriculumData}
              onResetToDefault={handleResetToDefault}
              onSelectLessonForWriting={handleSelectLessonForWriting}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'writing' && (
            <WritingStudioView
              currentLesson={selectedLesson}
              currentUser={currentUser}
              onOpenLessonPicker={() => {
                setActiveTab('lessons');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          
          
          {activeTab === 'posts' && (
            <StudentPostsLibraryView
              currentUser={currentUser}
              onNavigateToWriting={() => {
                setActiveTab('writing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'challenges' && (
            <ChallengesView
              currentUser={currentUser}
            />
          )}

          {activeTab === 'teacher' && (
            currentUser.role === 'teacher' || currentUser.role === 'admin' ? (
              <TeacherView
                currentUser={currentUser}
                onNavigateToLessons={() => {
                  setActiveTab('lessons');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : (
              <div className="p-8 my-8 text-center bg-white rounded-3xl border border-rose-200 space-y-4 max-w-lg mx-auto shadow-sm">
                <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center text-3xl font-bold">
                  🛡️
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-800">
                  Khu vực dành riêng cho Giáo viên
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tài khoản học sinh không có quyền truy cập vào Góc quản lý Giáo viên. Em hãy vào Phòng luyện viết hoặc Kho bài học nhé!
                </p>
                <button
                  onClick={() => setActiveTab('writing')}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm cursor-pointer transition-colors"
                >
                  Quay về Phòng Luyện Viết
                </button>
              </div>
            )
          )}

          {activeTab === 'progress' && (
            <ProgressView
              currentUser={currentUser}
              onNavigateToWriting={() => {
                setActiveTab('writing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToChallenges={() => {
                setActiveTab('challenges');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'admin' && (
            currentUser.role === 'admin' ? (
              <AdminManagementView
                currentUser={currentUser}
              />
            ) : (
              <div className="p-8 my-8 text-center bg-white rounded-3xl border border-rose-200 space-y-4 max-w-lg mx-auto shadow-sm">
                <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center text-3xl font-bold">
                  🔒
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-800">
                  Khu vực Quản trị Hệ thống
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chỉ Quản trị viên (Admin) mới có quyền truy cập vào mục Quản trị hệ thống.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-sm cursor-pointer transition-colors"
                >
                  Quay về Trang chủ
                </button>
              </div>
            )
          )}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-amber-200/80 bg-white/80 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 space-y-1.5">
            <div className="flex items-center justify-center gap-2 font-bold text-slate-700">
              <span>EDUNOVA – Nền tảng giáo dục thông minh</span>
              <span>•</span>
              <span className="text-amber-600">Đổi mới cách học – Bứt phá tri thức</span>
            </div>
            <p>
              Hệ thống trợ lý học tập thông minh EDUNOVA | Hotline hỗ trợ: 0973793366
            </p>
          </div>
        </footer>
      </div>

      {/* Role / User Switcher Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onSelectUser={handleUserSelected}
      />
    </div>
  );
}
