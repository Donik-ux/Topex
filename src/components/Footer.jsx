import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Send, Heart, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer({ onNavigate }) {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const quickLinks = [
    { label: t('footer.about'), page: 'about' },
    { label: t('footer.programs'), page: 'programs' },
    { label: t('footer.teachers'), page: 'teachers' },
    { label: t('footer.admission'), page: 'register' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:bg-blue-600', label: 'Facebook' },
    { icon: Instagram, href: '#', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500', label: 'Instagram' },
    { icon: Youtube, href: '#', color: 'hover:bg-red-600', label: 'YouTube' },
  ];

  return (
    <footer className={`relative overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-gray-900'}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h3 className="text-xl font-black gradient-text-static">Topex School</h3>
                <p className="text-xs text-dark-500 uppercase tracking-wider">
                  {language === 'ru' ? 'Лицей' : language === 'uz' ? 'Litsey' : 'Lyceum'}
                </p>
              </div>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed mb-6">
              {t('footer.aboutSchool')}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-11 h-11 rounded-xl bg-dark-800/50 flex items-center justify-center text-dark-400 transition-all duration-300 hover:text-white hover:scale-110 active:scale-95 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="group flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-600 group-hover:bg-primary-500 transition-colors"></span>
                    {link.label}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">{t('footer.contacts')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-dark-500 mb-1">{t('footer.address')}</p>
                  <p className="text-dark-300">
                    {language === 'ru' ? 'г. Ташкент, Узбекистан' : 
                     language === 'uz' ? 'Toshkent sh., O\'zbekiston' : 
                     'Tashkent, Uzbekistan'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-dark-500 mb-1">{t('footer.phone')}</p>
                  <a href="tel:+998711234567" className="text-dark-300 hover:text-primary-400 transition-colors">
                    +998 71 123 45 67
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-dark-500 mb-1">{t('footer.email')}</p>
                  <a href="mailto:info@topex.uz" className="text-dark-300 hover:text-primary-400 transition-colors">
                    info@topex.uz
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">{t('footer.subscribeNews')}</h4>
            <p className="text-dark-400 text-sm mb-6">{t('footer.getUpdates')}</p>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder={t('footer.yourEmail')}
                  className="w-full px-5 py-4 pr-14 rounded-2xl bg-dark-800/50 border border-dark-700 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-300"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Topex School. {t('footer.allRights')}
            </p>
            <p className="text-dark-500 text-sm flex items-center gap-2">
              {language === 'ru' ? 'Сделано с' : language === 'uz' ? 'Bilan yaratilgan' : 'Made with'}
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              {language === 'ru' ? 'в Узбекистане' : language === 'uz' ? "O'zbekistonda" : 'in Uzbekistan'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
