import { 
  GraduationCap, Users, Award, BookOpen, TrendingUp, Globe, Zap, 
  Lightbulb, ArrowRight, Play, Star, CheckCircle2, Sparkles,
  Code, Palette, Briefcase, Hotel, BarChart3, FlaskConical, Languages, Calculator, BookText, Clock
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function HomePage({ onNavigate }) {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const stats = [
    { icon: Users, value: '5000+', label: t('home.students'), color: 'from-primary-400 to-primary-600' },
    { icon: Award, value: '150+', label: t('home.teachers'), color: 'from-accent-400 to-accent-600' },
    { icon: BookOpen, value: '50+', label: t('home.programs'), color: 'from-blue-400 to-blue-600' },
    { icon: TrendingUp, value: '98%', label: t('home.successRate'), color: 'from-emerald-400 to-emerald-600' },
  ];

  const features = [
    {
      icon: GraduationCap,
      title: t('home.innovativeEdu'),
      description: t('home.innovativeDesc'),
      gradient: 'from-primary-500 to-emerald-500',
    },
    {
      icon: Users,
      title: t('home.bestTeachers'),
      description: t('home.bestTeachersDesc'),
      gradient: 'from-accent-500 to-pink-500',
    },
    {
      icon: Globe,
      title: t('home.worldStandards'),
      description: t('home.worldStandardsDesc'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: t('home.talentDev'),
      description: t('home.talentDevDesc'),
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const programs = [
    { icon: Code, name: language === 'ru' ? 'Программирование' : language === 'uz' ? 'Dasturlash' : 'Programming', color: 'text-primary-400' },
    { icon: Palette, name: language === 'ru' ? 'Дизайн' : language === 'uz' ? 'Dizayn' : 'Design', color: 'text-pink-400' },
    { icon: Briefcase, name: language === 'ru' ? 'Бизнес' : language === 'uz' ? 'Biznes' : 'Business', color: 'text-blue-400' },
    { icon: Hotel, name: language === 'ru' ? 'Отельный бизнес' : language === 'uz' ? 'Mehmonxona biznesi' : 'Hotel Business', color: 'text-amber-400' },
    { icon: BarChart3, name: language === 'ru' ? 'Маркетинг' : language === 'uz' ? 'Marketing' : 'Marketing', color: 'text-purple-400' },
    { icon: FlaskConical, name: language === 'ru' ? 'Лаборант' : language === 'uz' ? 'Laboratoriya' : 'Laboratory', color: 'text-teal-400' },
    { icon: Languages, name: language === 'ru' ? 'Английский' : language === 'uz' ? 'Ingliz tili' : 'English', color: 'text-red-400' },
    { icon: Calculator, name: language === 'ru' ? 'Математика' : language === 'uz' ? 'Matematika' : 'Mathematics', color: 'text-cyan-400' },
    { icon: BookText, name: language === 'ru' ? 'Русский язык' : language === 'uz' ? 'Rus tili' : 'Russian', color: 'text-indigo-400' },
    { icon: Clock, name: language === 'ru' ? 'История' : language === 'uz' ? 'Tarix' : 'History', color: 'text-orange-400' },
  ];

  const testimonials = [
    {
      name: 'Алексей Петров',
      role: language === 'ru' ? 'Выпускник 2023' : language === 'uz' ? '2023 yil bitiruvchisi' : 'Graduate 2023',
      text: language === 'ru' ? 'Topex School изменил мою жизнь. Теперь я работаю в крупной IT-компании.' : 
            language === 'uz' ? "Topex School mening hayotimni o'zgartirdi. Endi men yirik IT-kompaniyada ishlayman." :
            'Topex School changed my life. Now I work at a major IT company.',
      rating: 5,
    },
    {
      name: 'Мария Иванова',
      role: language === 'ru' ? 'Студентка' : language === 'uz' ? 'Talaba' : 'Student',
      text: language === 'ru' ? 'Лучшие преподаватели и современные методы обучения!' :
            language === 'uz' ? "Eng yaxshi o'qituvchilar va zamonaviy o'qitish usullari!" :
            'Best teachers and modern teaching methods!',
      rating: 5,
    },
    {
      name: 'Дмитрий Ким',
      role: language === 'ru' ? 'Родитель' : language === 'uz' ? 'Ota-ona' : 'Parent',
      text: language === 'ru' ? 'Мой сын в восторге от школы. Рекомендую всем!' :
            language === 'uz' ? "O'g'lim maktabdan hayratda. Hammaga tavsiya qilaman!" :
            'My son loves the school. I recommend it to everyone!',
      rating: 5,
    },
  ];

  return (
    <div className={`min-h-screen overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className={`absolute inset-0 ${isDark ? 'bg-grid' : ''}`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-400">
                {language === 'ru' ? 'Лицей нового поколения' : language === 'uz' ? 'Yangi avlod litseyi' : 'New Generation Lyceum'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 animate-fade-up ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('home.welcome')}
              <br />
              <span className="gradient-text">Topex School</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-up animate-delay-100 ${isDark ? 'text-dark-300' : 'text-gray-600'}`}>
              {t('home.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animate-delay-200">
              <button
                onClick={() => onNavigate('programs')}
                className="btn-primary group flex items-center justify-center gap-3"
              >
                {t('home.explorePrograms')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="btn-secondary flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5" />
                {language === 'ru' ? 'О нас' : language === 'uz' ? 'Biz haqimizda' : 'About Us'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-up animate-delay-300">
              {[
                { value: '14+', label: language === 'ru' ? 'лет опыта' : language === 'uz' ? 'yillik tajriba' : 'years experience' },
                { value: '98%', label: language === 'ru' ? 'успеваемость' : language === 'uz' ? 'muvaffaqiyat' : 'success rate' },
                { value: '#1', label: language === 'ru' ? 'в регионе' : language === 'uz' ? 'mintaqada' : 'in region' },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-black gradient-text-static">{item.value}</div>
                  <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className={`w-6 h-10 rounded-full border-2 flex justify-center pt-2 ${isDark ? 'border-dark-600' : 'border-gray-300'}`}>
            <div className="w-1.5 h-3 rounded-full bg-primary-500 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`stat-card ${isDark ? 'glass-card-dark' : 'glass-card-light'} p-8`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black gradient-text-static mb-2">
                  {stat.value}
                </div>
                <div className={`text-sm font-medium ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'ru' ? 'Наши направления' : language === 'uz' ? 'Bizning yo\'nalishlarimiz' : 'Our Programs'}
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
              {language === 'ru' ? '10 профессиональных направлений для вашего будущего' : 
               language === 'uz' ? "Kelajagingiz uchun 10 ta professional yo'nalish" :
               '10 professional directions for your future'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {programs.map((program, index) => (
              <button
                key={index}
                onClick={() => onNavigate('programs')}
                className={`group p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  isDark 
                    ? 'bg-dark-900/50 border border-dark-800 hover:border-primary-500/50 hover:bg-dark-900' 
                    : 'bg-white border border-gray-200 hover:border-primary-500/50 shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${
                  isDark ? '' : 'from-gray-100 to-gray-200'
                }`}>
                  <program.icon className={`w-6 h-6 ${program.color}`} />
                </div>
                <span className={`text-sm font-medium ${isDark ? 'text-dark-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                  {program.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'ru' ? 'Почему выбирают нас' : language === 'uz' ? 'Nima uchun bizni tanlashadi' : 'Why Choose Us'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'ru' ? 'Отзывы' : language === 'uz' ? 'Fikrlar' : 'Testimonials'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 ${
                  isDark 
                    ? 'bg-dark-900/50 border border-dark-800 hover:border-primary-500/30' 
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className={`mb-6 leading-relaxed ${isDark ? 'text-dark-300' : 'text-gray-600'}`}>
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</div>
                    <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative rounded-[2rem] overflow-hidden p-12 md:p-16 text-center ${
            isDark 
              ? 'bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 border border-dark-700' 
              : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          }`}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-accent-500/20"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-8">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                {language === 'ru' ? 'Готовы начать?' : language === 'uz' ? 'Boshlashga tayyormisiz?' : 'Ready to Start?'}
              </h2>
              <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
                {language === 'ru' ? 'Присоединяйтесь к тысячам успешных студентов' : 
                 language === 'uz' ? "Minglab muvaffaqiyatli talabalarga qo'shiling" :
                 'Join thousands of successful students'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('register')}
                  className="btn-primary"
                >
                  {t('register.register')}
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="btn-secondary border-white/20 text-white hover:bg-white/10"
                >
                  {t('home.contactUs')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
