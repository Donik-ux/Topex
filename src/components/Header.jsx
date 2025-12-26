import { Menu, X, GraduationCap, LogOut, User, Globe, Moon, Sun, Shield, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Header({ currentPage, onNavigate, user, profile, onLogout, canAccessAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, changeLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const userMenuRef = useRef(null);
  const langMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { name: t('header.home'), page: 'home' },
    { name: t('header.about'), page: 'about' },
    { name: t('header.programs'), page: 'programs' },
    { name: t('header.teachers'), page: 'teachers' },
    { name: t('header.news'), page: 'news' },
    { name: t('header.contact'), page: 'contact' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
    setUserMenuOpen(false);
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? isDark 
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-dark-800/50 shadow-lg shadow-dark-950/50' 
          : 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-accent-500 p-2.5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black gradient-text-static">
                Topex School
              </h1>
              <p className={`text-[10px] font-medium tracking-wider uppercase ${isDark ? 'text-dark-500' : 'text-gray-400'}`}>
                {language === 'ru' ? 'Лицей' : language === 'uz' ? 'Litsey' : 'Lyceum'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`nav-link ${currentPage === item.page ? 'nav-link-active' : ''} ${
                  isDark ? 'text-dark-300' : 'text-gray-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                isDark 
                  ? 'bg-dark-800/50 text-yellow-400 hover:bg-dark-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isDark 
                    ? 'bg-dark-800/50 hover:bg-dark-800' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{languages.find(l => l.code === language)?.flag}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${langMenuOpen ? 'rotate-180' : ''} ${isDark ? 'text-dark-400' : 'text-gray-500'}`} />
              </button>
              
              {langMenuOpen && (
                <div className={`absolute right-0 mt-2 w-44 rounded-2xl shadow-xl border overflow-hidden animate-scale-in ${
                  isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'
                }`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                        language === lang.code
                          ? 'bg-primary-500/10 text-primary-400'
                          : isDark 
                            ? 'text-dark-300 hover:bg-dark-800' 
                            : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-3 pl-3 pr-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isDark 
                      ? 'bg-dark-800/50 hover:bg-dark-800' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className={`text-sm font-medium max-w-[80px] truncate hidden sm:inline ${isDark ? 'text-dark-200' : 'text-gray-700'}`}>
                    {profile?.full_name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''} ${isDark ? 'text-dark-400' : 'text-gray-500'}`} />
                </button>
                
                {userMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border overflow-hidden animate-scale-in ${
                    isDark ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'
                  }`}>
                    {/* User Info */}
                    <div className={`px-4 py-4 border-b ${isDark ? 'border-dark-800' : 'border-gray-100'}`}>
                      <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {profile?.full_name || 'User'}
                      </p>
                      <p className={`text-xs truncate ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>
                        {user.email}
                      </p>
                      {profile?.role && (
                        <span className="badge-primary mt-2">
                          {t(`roles.${profile.role}`)}
                        </span>
                      )}
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      {canAccessAdmin && (
                        <button
                          onClick={() => {
                            onNavigate('admin');
                            setUserMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                            isDark ? 'text-dark-300 hover:bg-dark-800' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Shield className="w-5 h-5 text-accent-400" />
                          <span className="font-medium">{t('header.adminPanel')}</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          onNavigate('profile');
                          setUserMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                          isDark ? 'text-dark-300 hover:bg-dark-800' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">{t('header.myProfile')}</span>
                      </button>
                    </div>
                    
                    {/* Logout */}
                    <div className={`border-t ${isDark ? 'border-dark-800' : 'border-gray-100'}`}>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-all duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">{t('header.logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => onNavigate('login')}
                  className={`px-4 py-2.5 font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isDark ? 'text-dark-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('header.login')}
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="btn-primary text-sm py-2.5 px-5"
                >
                  {t('header.register')}
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                isDark ? 'hover:bg-dark-800' : 'hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className={`lg:hidden pb-6 pt-4 border-t animate-fade-in ${isDark ? 'border-dark-800' : 'border-gray-200'}`}>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === item.page
                      ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/10 text-primary-400'
                      : isDark 
                        ? 'text-dark-300 hover:bg-dark-800' 
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {canAccessAdmin && user && (
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-xl font-medium bg-gradient-to-r from-accent-500/20 to-primary-500/10 text-accent-400"
                >
                  <Shield className="w-4 h-4 inline mr-2" />
                  {t('header.adminPanel')}
                </button>
              )}
              
              {!user && (
                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => {
                      onNavigate('login');
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-center px-4 py-3 rounded-xl font-medium ${
                      isDark ? 'text-dark-300 bg-dark-800' : 'text-gray-700 bg-gray-100'
                    }`}
                  >
                    {t('header.login')}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('register');
                      setMobileMenuOpen(false);
                    }}
                    className="btn-primary w-full"
                  >
                    {t('header.register')}
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
