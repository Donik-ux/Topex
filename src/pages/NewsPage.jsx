import { Calendar, Tag, Search, Filter, Share2, Eye } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function NewsPage({ onNavigate }) {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const newsData = {
    en: [
      {
        id: '1',
        title: 'Students Win International Mathematics Olympiad',
        date: 'November 15, 2024',
        excerpt: 'Topex team takes first place at International Mathematics Olympiad with participation of 50+ countries.',
        image: 'https://images.pexels.com/photos/8923170/pexels-photo-8923170.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'achievements',
        views: 2451,
      },
      {
        id: '2',
        title: 'Opening of New IT Innovation Center',
        date: 'November 10, 2024',
        excerpt: 'State-of-the-art IT center with equipment for programming, robotics, and AI development.',
        image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'events',
        views: 1823,
      },
      {
        id: '3',
        title: 'International Science Festival',
        date: 'November 5, 2024',
        excerpt: 'Science festival with participation of renowned scientists and researchers from different countries.',
        image: 'https://images.pexels.com/photos/8926571/pexels-photo-8926571.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'events',
        views: 1645,
      },
      {
        id: '4',
        title: 'Partnership with Leading Universities',
        date: 'November 1, 2024',
        excerpt: 'Agreements signed with prestigious universities in USA, UK, and Germany for student exchanges.',
        image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'partnerships',
        views: 2089,
      },
      {
        id: '5',
        title: 'Students at International Robotics Competition',
        date: 'October 25, 2024',
        excerpt: 'Team presented innovative project at international robotics competition in Singapore.',
        image: 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'achievements',
        views: 1932,
      },
      {
        id: '6',
        title: 'Scholarship Program Launch',
        date: 'October 20, 2024',
        excerpt: 'Launch of full scholarship program for talented children from different regions.',
        image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'events',
        views: 1567,
      },
    ],
    ru: [
      {
        id: '1',
        title: 'Студенты победили в международной олимпиаде по математике',
        date: '15 ноября 2024',
        excerpt: 'Команда Topex заняла первое место на международной математической олимпиаде с участием 50+ стран.',
        image: 'https://images.pexels.com/photos/8923170/pexels-photo-8923170.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'достижения',
        views: 2451,
      },
      {
        id: '2',
        title: 'Открытие нового IT-центра инноваций',
        date: '10 ноября 2024',
        excerpt: 'Современный IT-центр с оборудованием для программирования, робототехники и разработки AI.',
        image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'мероприятия',
        views: 1823,
      },
      {
        id: '3',
        title: 'Международный день науки и техники',
        date: '5 ноября 2024',
        excerpt: 'Научный фестиваль с участием известных ученых и исследователей из разных стран.',
        image: 'https://images.pexels.com/photos/8926571/pexels-photo-8926571.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'мероприятия',
        views: 1645,
      },
      {
        id: '4',
        title: 'Партнерство с ведущими мировыми университетами',
        date: '1 ноября 2024',
        excerpt: 'Подписаны соглашения с престижными университетами США, Великобритании и Германии об обмене студентами.',
        image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'партнерство',
        views: 2089,
      },
      {
        id: '5',
        title: 'Студенты на международном конкурсе робототехники',
        date: '25 октября 2024',
        excerpt: 'Команда представила инновационный проект на международном конкурсе в Сингапуре.',
        image: 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'достижения',
        views: 1932,
      },
      {
        id: '6',
        title: 'Запуск программы стипендий для талантов',
        date: '20 октября 2024',
        excerpt: 'Новая программа полных стипендий для одаренных детей из разных регионов страны.',
        image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'мероприятия',
        views: 1567,
      },
    ],
    uz: [
      {
        id: '1',
        title: 'O\'quvchilar xalqaro matematika olimpiadasida g\'alaba qozondi',
        date: '15 noyabr 2024',
        excerpt: 'Topex jamoasi 50+ mamlakatlarning ishtirokiga bilan xalqaro matematika olimpiadasida birinchi o\'rin oldi.',
        image: 'https://images.pexels.com/photos/8923170/pexels-photo-8923170.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'yutuqlar',
        views: 2451,
      },
      {
        id: '2',
        title: 'Yangi IT innovatsiya markazining ochilishi',
        date: '10 noyabr 2024',
        excerpt: 'Dasturlash, robototehnika va AI ishlab chiqarish uchun uskunalar bilan zamonaviy IT markazi.',
        image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'tadbirlar',
        views: 1823,
      },
      {
        id: '3',
        title: 'Xalqaro fan va texnika kuni',
        date: '5 noyabr 2024',
        excerpt: 'Turli mamlakatlardan mashhur olimlar va tadqiqotchilar ishtirokiga bilan ilm festivali.',
        image: 'https://images.pexels.com/photos/8926571/pexels-photo-8926571.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'tadbirlar',
        views: 1645,
      },
      {
        id: '4',
        title: 'Etakchi xalqaro universitetlar bilan hamkorlik',
        date: '1 noyabr 2024',
        excerpt: 'AQSh, Britaniya va Germaniya universitetlari bilan talaba almashuvi to\'g\'risida shartnomalar imzolandi.',
        image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'hamkorlik',
        views: 2089,
      },
      {
        id: '5',
        title: 'O\'quvchilar xalqaro robototexnika musobaqasida',
        date: '25 oktyabr 2024',
        excerpt: 'Jamoa Singapur shahridagi xalqaro musobaqada innovatsion loyihani taqdim etdi.',
        image: 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'yutuqlar',
        views: 1932,
      },
      {
        id: '6',
        title: 'Iste\'dod uchun stipendiya dasturining boshlanishi',
        date: '20 oktyabr 2024',
        excerpt: 'Mamlakatning turli hududlaridan istedodli bolalar uchun to\'liq stipendiya dasturi.',
        image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'tadbirlar',
        views: 1567,
      },
    ],
  };

  const news = newsData[language] || newsData.ru;

  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-b border-slate-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-black text-white mb-4">{t('news.title')}</h1>
          <p className="text-xl text-slate-400">{t('news.subtitle')}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="space-y-6 mb-12">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Поиск статей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            <Filter className="h-5 w-5 text-slate-400 self-center" />
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t('gallery.all')}
            </button>
            <button
              onClick={() => setSelectedCategory('достижения')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === 'достижения'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t('news.achievements')}
            </button>
            <button
              onClick={() => setSelectedCategory('мероприятия')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === 'мероприятия'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t('news.events')}
            </button>
            <button
              onClick={() => setSelectedCategory('партнерство')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === 'партнерство'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t('news.partnerships')}
            </button>
          </div>

          {/* Results count */}
          <p className="text-slate-400 text-sm">
            {filteredNews.length} статей найдено
          </p>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <article
                key={article.id}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col group cursor-pointer"
                onClick={() => onNavigate('news-detail', article.id)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="bg-cyan-500/80 text-white text-xs px-3 py-1 rounded-full font-medium capitalize">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4 flex-1 line-clamp-2">{article.excerpt}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-700 pt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <button className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors flex items-center space-x-2">
                      <span>{t('news.readFull')}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-300 mb-2">Нет результатов</h3>
            <p className="text-slate-400">Попробуйте изменить поиск или фильтр</p>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="border-t border-slate-700 bg-gradient-to-r from-slate-800/30 to-cyan-900/10 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('news.subscribeNews')}</h2>
          <p className="text-slate-400 mb-8">{t('news.getUpdates')}</p>

          <div className="flex gap-3">
            <input
              type="email"
              placeholder={t('news.youremail')}
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200">
              {t('news.subscribe')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
