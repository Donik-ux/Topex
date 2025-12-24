import { Target, Eye, Heart, TrendingUp, Users, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function AboutPage() {
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  const values = [
    { icon: Target, title: t('about.quality'), description: t('about.qualityDesc'), color: 'from-primary-500 to-emerald-600' },
    { icon: Heart, title: t('about.care'), description: t('about.careDesc'), color: 'from-pink-500 to-rose-600' },
    { icon: TrendingUp, title: t('about.development'), description: t('about.developmentDesc'), color: 'from-blue-500 to-cyan-600' },
    { icon: Users, title: t('about.team'), description: t('about.teamDesc'), color: 'from-accent-500 to-purple-600' },
  ];

  const achievements = [
    { year: '2010', event: language === 'ru' ? 'Основание школы Topex' : language === 'uz' ? 'Topex maktabining tashkil etilishi' : 'Topex School Founded' },
    { year: '2015', event: language === 'ru' ? 'Международная аккредитация' : language === 'uz' ? 'Xalqaro akkreditatsiya' : 'International Accreditation' },
    { year: '2018', event: language === 'ru' ? 'Новый учебный корпус' : language === 'uz' ? "Yangi o'quv binosi" : 'New Campus Building' },
    { year: '2020', event: language === 'ru' ? 'Внедрение AI в образование' : language === 'uz' ? "Ta'limda AI" : 'AI in Education' },
    { year: '2023', event: language === 'ru' ? 'Расширение программ' : language === 'uz' ? 'Dasturlar kengaytirildi' : 'Programs Expanded' },
    { year: '2024', event: language === 'ru' ? 'Партнерство с MIT' : language === 'uz' ? 'MIT bilan hamkorlik' : 'MIT Partnership' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className={`text-5xl md:text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('about.title')}
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-4xl font-black mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('about.ourStory')}
              </h2>
              <div className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-dark-300' : 'text-gray-600'}`}>
                <p>{t('about.storyText1')}</p>
                <p>{t('about.storyText2')}</p>
                <p>{t('about.storyText3')}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '14+', label: t('about.yearsExperience'), color: 'from-primary-500 to-emerald-600' },
                { value: '5000+', label: t('about.ofStudents'), color: 'from-blue-500 to-cyan-600' },
                { value: '150+', label: t('about.ofTeachers'), color: 'from-accent-500 to-purple-600' },
                { value: '98%', label: t('about.admissions'), color: 'from-pink-500 to-rose-600' },
              ].map((stat, idx) => (
                <div key={idx} className={`stat-card p-8 rounded-3xl text-center ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className={isDark ? 'text-dark-400' : 'text-gray-500'}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`feature-card p-12 rounded-3xl ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.ourMission')}</h3>
              </div>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-dark-300' : 'text-gray-600'}`}>
                {t('about.missionText')}
              </p>
            </div>

            <div className={`feature-card p-12 rounded-3xl ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('about.ourVision')}</h3>
              </div>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-dark-300' : 'text-gray-600'}`}>
                {t('about.visionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-black mb-16 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('about.ourValues')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className={`feature-card text-center p-8 rounded-3xl ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-6`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value.title}</h3>
                <p className={isDark ? 'text-dark-400' : 'text-gray-500'}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-black mb-16 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('about.achievements')}
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 rounded-full"></div>
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
                      <div className="text-2xl font-black gradient-text-static mb-2">{achievement.year}</div>
                      <div className={`font-medium ${isDark ? 'text-dark-300' : 'text-gray-600'}`}>{achievement.event}</div>
                    </div>
                  </div>
                  <div className="w-5 h-5 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-4 border-dark-950 shadow-lg z-10 flex-shrink-0"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
