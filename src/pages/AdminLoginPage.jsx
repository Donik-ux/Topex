import { useState } from 'react';
import { Lock, Mail, Loader } from 'lucide-react';

const ADMIN_CREDENTIALS = {
  email: 'admin@topex.uz',
  password: 'Admin@123456',
};

export default function AdminLoginPage({ onNavigate, onAdminLogin }) {
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
      newErrors.email = 'Введите email';
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    // Имитируем задержку запроса
    setTimeout(() => {
      if (
        formData.email === ADMIN_CREDENTIALS.email &&
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        onAdminLogin({
          email: formData.email,
          isAdmin: true,
        });
        onNavigate('admin');
      } else {
        setErrors({ submit: 'Неверный email или пароль администратора' });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block bg-red-600 p-4 rounded-2xl mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Админ Вход</h1>
          <p className="text-slate-400">Доступ только для администраторов</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl">
          {errors.submit && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Email администратора
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@topex.uz"
                  className={`w-full pl-12 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                    errors.email
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-slate-600/50 focus:border-cyan-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Пароль администратора
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-300 ${
                    errors.password
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-slate-600/50 focus:border-cyan-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                'Войти в админ панель'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-sm text-center mb-3">
              Тестовые учетные данные:
            </p>
            <div className="bg-slate-900/50 rounded-lg p-3 space-y-2 text-xs text-slate-300">
              <p><strong>Email:</strong> admin@topex.uz</p>
              <p><strong>Пароль:</strong> Admin@123456</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            ← Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
}
