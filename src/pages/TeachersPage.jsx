import { Mail, Award, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TeachersPage() {
  const { t } = useLanguage();
  const teachers = [
    {
      id: '1',
      name: 'Алиева Нигора',
      position: 'Директор',
      subject: 'Педагогика',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: '20+ лет опыта в образовании',
    },
    {
      id: '2',
      name: 'Каримов Азиз',
      position: 'Старший преподаватель',
      subject: 'Математика и физика',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Кандидат физико-математических наук',
    },
    {
      id: '3',
      name: 'Иванова Елена',
      position: 'Преподаватель',
      subject: 'Иностранные языки',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Сертифицированный специалист CELTA',
    },
    {
      id: '4',
      name: 'Рахимов Шерзод',
      position: 'Преподаватель',
      subject: 'Программирование',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: '15 лет опыта в IT индустрии',
    },
    {
      id: '5',
      name: 'Петрова Анна',
      position: 'Преподаватель',
      subject: 'Литература и русский язык',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Магистр филологических наук',
    },
    {
      id: '6',
      name: 'Усманов Темур',
      position: 'Преподаватель',
      subject: 'Химия и биология',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Научный сотрудник НИИ',
    },
    {
      id: '7',
      name: 'Смирнова Мария',
      position: 'Преподаватель',
      subject: 'История и география',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Автор научных публикаций',
    },
    {
      id: '8',
      name: 'Абдуллаев Жасур',
      position: 'Преподаватель',
      subject: 'Физическая культура',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Мастер спорта международного класса',
    },
    {
      id: '9',
      name: 'Козлова Ольга',
      position: 'Преподаватель',
      subject: 'Искусство и дизайн',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Профессиональный художник',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-b border-slate-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-white mb-6 text-center">
            {t('teachers.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"></span>
          </h1>
          <p className="text-xl text-slate-400 text-center max-w-3xl mx-auto">
            150+ профессионалов с мировым признанием
          </p>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="group rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden bg-slate-800">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-2 rounded-lg backdrop-blur-sm">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {teacher.name}
                  </h3>
                  <div className="text-cyan-400 font-semibold mb-1">{teacher.position}</div>
                  <div className="text-slate-400 mb-4">{teacher.subject}</div>
                  <p className="text-slate-500 text-sm mb-6">{teacher.bio}</p>

                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="flex-1 flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/40 hover:to-blue-600/40 text-cyan-400 border border-cyan-500/50 py-2 rounded-lg transition-all">
                      <Mail className="h-4 w-4 mr-1" />
                      {t('contact.email')}
                    </button>
                    <button className="flex-1 flex items-center justify-center bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-slate-200 py-2 rounded-lg transition-all">
                      <Linkedin className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-6">
                Хотите присоединиться к команде?
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Мы ищем талантливых преподавателей
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105">
                Отправить резюме
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
