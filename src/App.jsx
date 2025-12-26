import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ROLES, ROLE_PERMISSIONS } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import TeachersPage from './pages/TeachersPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ComparisonPage from './pages/ComparisonPage';
import AdminPage from './pages/AdminPage';

function AppContent() {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState('home');
  const [newsId, setNewsId] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInAdminPanel, setIsInAdminPanel] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          setUser(data.session.user);
          await fetchProfile(data.session.user.id);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setIsInAdminPanel(false);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Profile fetch error:', error);
      setProfile(null);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsInAdminPanel(false);
    setCurrentPage('home');
  };

  const handleLogin = async (userData) => {
    setUser(userData);
    if (userData?.id) {
      await fetchProfile(userData.id);
    }
  };

  const canAccessAdmin = () => {
    if (!profile?.role) return false;
    return ROLE_PERMISSIONS[profile.role]?.canAccessAdmin || false;
  };

  const handleNavigate = (page, id = null) => {
    if (page === 'admin') {
      if (canAccessAdmin()) {
        setIsInAdminPanel(true);
        setCurrentPage('admin');
      }
      return;
    }

    if (page === 'news-detail' && id) {
      setNewsId(id);
      setCurrentPage('news-detail');
    } else {
      setCurrentPage(page);
      setNewsId(null);
    }
    setIsInAdminPanel(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsInAdminPanel(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (isInAdminPanel && canAccessAdmin()) {
      return <AdminPage onLogout={handleAdminLogout} profile={profile} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'programs':
        return <ProgramsPage />;
      case 'teachers':
        return <TeachersPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'news':
        return <NewsPage onNavigate={handleNavigate} />;
      case 'news-detail':
        return <NewsDetailPage newsId={newsId} onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'comparison':
        return <ComparisonPage />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-primary-500/30 border-t-primary-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
          </div>
          <p className={`mt-4 font-medium ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>
            Загрузка...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}>
      {!isInAdminPanel && (
        <Header 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          user={user} 
          profile={profile}
          onLogout={handleLogout}
          canAccessAdmin={canAccessAdmin()}
        />
      )}
      <main className={`flex-grow ${!isInAdminPanel ? 'pt-20' : ''}`}>
        {renderPage()}
      </main>
      {!isInAdminPanel && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
