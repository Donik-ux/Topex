import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { ROLE_PERMISSIONS } from '../contexts/AuthContext';

export default function LoginPage({ onNavigate, onLogin }) {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t('register.emailError');
    }

    if (!formData.password) {
      newErrors.password = t('register.passwordError');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({ submit: t('login.error') });
        setLoading(false);
        return;
      }

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        onLogin(data.user);
        
        setTimeout(() => {
          if (profile?.role && ROLE_PERMISSIONS[profile.role]?.canAccessAdmin) {
            onNavigate('admin');
          } else {
            onNavigate('home');
          }
        }, 500);
      }
    } catch (error) {
      setErrors({ submit: t('register.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 relative overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className={`absolute inset-0 ${isDark ? 'bg-grid' : ''}`}></div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('login.title')}
          </h1>
          <p className={isDark ? 'text-dark-400' : 'text-gray-600'}>
            {language === 'ru' ? 'Добро пожаловать в Topex School' : 
             language === 'uz' ? 'Topex School ga xush kelibsiz' : 
             'Welcome to Topex School'}
          </p>
        </div>

        <div className={`rounded-3xl p-8 ${
          isDark 
            ? 'bg-dark-900/50 border border-dark-800 backdrop-blur-xl' 
            : 'bg-white border border-gray-200 shadow-xl'
        }`}>
          {errors.submit && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-dark-200' : 'text-gray-700'}`}>
                {t('login.email')}
              </label>
              <div className="relative">
                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-dark-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 bg-transparent transition-all duration-300 outline-none ${
                    errors.email
                      ? 'border-red-500/50 focus:border-red-500'
                      : isDark 
                        ? 'border-dark-700 text-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20' 
                        : 'border-gray-200 text-gray-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-red-400"></div>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-dark-200' : 'text-gray-700'}`}>
                {t('login.password')}
              </label>
              <div className="relative">
                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-dark-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-14 pr-14 py-4 rounded-2xl border-2 bg-transparent transition-all duration-300 outline-none ${
                    errors.password
                      ? 'border-red-500/50 focus:border-red-500'
                      : isDark 
                        ? 'border-dark-700 text-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20' 
                        : 'border-gray-200 text-gray-900 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-5 top-1/2 -translate-y-1/2 transition-colors ${
                    isDark ? 'text-dark-500 hover:text-dark-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-red-400"></div>
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {language === 'ru' ? 'Вход...' : language === 'uz' ? 'Kirilmoqda...' : 'Logging in...'}
                </>
              ) : (
                <>
                  {t('login.login')}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className={`mt-8 pt-8 border-t text-center ${isDark ? 'border-dark-800' : 'border-gray-200'}`}>
            <p className={isDark ? 'text-dark-400' : 'text-gray-600'}>
              {language === 'ru' ? 'Нет аккаунта?' : language === 'uz' ? 'Akkaunt yo\'qmi?' : 'No account?'}{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
              >
                {language === 'ru' ? 'Зарегистрируйтесь' : language === 'uz' ? "Ro'yxatdan o'ting" : 'Register'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('home')}
            className={`text-sm transition-colors ${isDark ? 'text-dark-500 hover:text-dark-300' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    </div>
  );
}
