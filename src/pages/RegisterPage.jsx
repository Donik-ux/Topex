import { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, Loader, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { ROLES } from '../contexts/AuthContext';

export default function RegisterPage({ onNavigate, onLogin }) {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('register.nameError');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('register.emailError');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('register.emailInvalid');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('register.phoneError');
    }
    if (!formData.password) {
      newErrors.password = t('register.passwordError');
    } else if (formData.password.length < 6) {
      newErrors.password = t('register.passwordShort');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('register.passwordMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setErrors({ submit: authError.message });
        setLoading(false);
        return;
      }

      if (data.user) {
        const profileData = {
          user_id: data.user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: ROLES.STUDENT,
          subject: null,
          rating: null,
          income: null,
          activity_points: null,
          attendance_points: null,
        };

        await supabase.from('profiles').insert(profileData);

        setSuccessMessage(t('register.success'));
        
        if (onLogin) onLogin(data.user);
        
        setTimeout(() => {
          onNavigate('home');
        }, 1500);
      }
    } catch (error) {
      setErrors({ submit: t('register.error') });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full pl-14 pr-5 py-4 rounded-2xl border-2 bg-transparent transition-all duration-300 outline-none ${
    isDark 
      ? 'border-dark-700 text-white placeholder-dark-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20' 
      : 'border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20'
  }`;

  const inputErrorClass = 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20';

  return (
    <div className={`min-h-screen py-12 relative overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className={`absolute inset-0 ${isDark ? 'bg-grid' : ''}`}></div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('register.title')}
          </h1>
          <p className={isDark ? 'text-dark-400' : 'text-gray-600'}>
            {language === 'ru' ? 'Присоединяйтесь к Topex School' : 
             language === 'uz' ? "Topex School ga qo'shiling" : 
             'Join Topex School'}
          </p>
        </div>

        {/* Form Card */}
        <div className={`rounded-3xl p-8 ${
          isDark 
            ? 'bg-dark-900/50 border border-dark-800 backdrop-blur-xl' 
            : 'bg-white border border-gray-200 shadow-xl'
        }`}>
          {errors.submit && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
              {errors.submit}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-primary-500/10 border border-primary-500/30 text-primary-400 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5" />
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-dark-200' : 'text-gray-700'}`}>
                {t('register.fullName')}
              </label>
              <div className="relative">
                <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-dark-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={language === 'ru' ? 'Иван Петров' : language === 'uz' ? 'Ism Familiya' : 'John Doe'}
                  className={`${inputClass} ${errors.fullName ? inputErrorClass : ''}`}
                />
              </div>
              {errors.fullName && <p className="text-red-400 text-sm mt-2">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-dark-200' : 'text-gray-700'}`}>
                {t('register.email')}
              </label>
              <div className="relative">
                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-dark-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`${inputClass} ${errors.email ? inputErrorClass : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-dark-200' : 'text-gray-700'}`}>
                {t('register.phone')}
              </label>
              <div className="relative">
                <Phone className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-dark-500' : 'text-gray-400'}`} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 99 123 45 67"
                  className={`${inputClass} ${errors.phone ? inputErrorClass : ''}`}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-dark-200' : 'text-gray-700'}`}>
                {t('register.password')}
              </label>
              <div className="relative">
                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-dark-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${inputClass} pr-14 ${errors.password ? inputErrorClass : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-5 top-1/2 -translate-y-1/2 ${isDark ? 'text-dark-500 hover:text-dark-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-dark-200' : 'text-gray-700'}`}>
                {t('register.confirmPassword')}
              </label>
              <div className="relative">
                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-dark-500' : 'text-gray-400'}`} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${inputClass} pr-14 ${errors.confirmPassword ? inputErrorClass : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={`absolute right-5 top-1/2 -translate-y-1/2 ${isDark ? 'text-dark-500 hover:text-dark-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {language === 'ru' ? 'Регистрация...' : language === 'uz' ? "Ro'yxatdan o'tmoqda..." : 'Registering...'}
                </>
              ) : (
                <>
                  {t('register.register')}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className={`mt-8 pt-8 border-t text-center ${isDark ? 'border-dark-800' : 'border-gray-200'}`}>
            <p className={isDark ? 'text-dark-400' : 'text-gray-600'}>
              {language === 'ru' ? 'Уже есть аккаунт?' : language === 'uz' ? 'Akkaunt bormi?' : 'Already have an account?'}{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
              >
                {t('header.login')}
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
