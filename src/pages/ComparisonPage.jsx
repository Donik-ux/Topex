import { CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ComparisonPage() {
  const { language } = useLanguage();

  const advantages = [
    {
      titleUz: 'Амалиётга йўналтирилган таълим',
      descriptionUz: 'ТОПЕКСда фанларни фақат назарий эмас, балки амалиёт асосида ўргатишади. Бу талабаларни ишга тезроқ мослаштиради.',
      titleRu: 'Практически ориентированное обучение',
      descriptionRu: 'В ТОПЕКСе предметы преподаются не только теоретически, но и на основе практики. Это помогает студентам быстрее адаптироваться к работе.',
      titleEn: 'Practical-oriented education',
      descriptionEn: 'At TOPEX, subjects are taught not only theoretically but also based on practice. This helps students adapt to work faster.',
      icon: '🔧',
    },
    {
      titleUz: 'Техник йўналишлар кенглиги',
      descriptionUz: 'Электромеханика, автомеханика, IT, сервис, электротехника каби соҳалар бўйича мутахассисликлар бор.',
      titleRu: 'Широкий спектр технических направлений',
      descriptionRu: 'Есть специальности в области электромеханики, автомеханики, IT, сервиса, электротехники и других областей.',
      titleEn: 'Wide range of technical directions',
      descriptionEn: 'Specialties are available in electromechanics, automechanics, IT, service, electrical engineering, and other fields.',
      icon: '⚙️',
    },
    {
      titleUz: 'Арзонроқ ўқиш нархи',
      descriptionUz: 'Хусусий университетларга нисбатан анча ҳамёнбоп. Ота-оналар учун қулай вариант.',
      titleRu: 'Более доступная стоимость обучения',
      descriptionRu: 'Намного дешевле, чем частные университеты. Удобный вариант для родителей.',
      titleEn: 'More affordable cost of education',
      descriptionEn: 'Much cheaper than private universities. A convenient option for parents.',
      icon: '💰',
    },
    {
      titleUz: 'Коллеж даражасида тез касб эгаллаш имкони',
      descriptionUz: '2–3 йилда амалий касб эгаллаб ишга кириш мумкин. Вақт тежайди.',
      titleRu: 'Возможность быстро получить специальность',
      descriptionRu: 'За 2-3 года можно получить практическую специальность и приступить к работе. Экономия времени.',
      titleEn: 'Quick acquisition of profession',
      descriptionEn: 'In 2-3 years you can get a practical specialty and start working. Saves time.',
      icon: '⏱️',
    },
    {
      titleUz: 'Ишчи касбларга талаб юқори',
      descriptionUz: 'Автомеханик, электрик, сервис мутахассиси, монтажчи — бозорда доим иш бор. Жой топиш осон.',
      titleRu: 'Высокий спрос на рабочие специальности',
      descriptionRu: 'Автомеханики, электрики, специалисты сервиса, монтажники — на рынке всегда есть работа. Легко найти место.',
      titleEn: 'High demand for working professions',
      descriptionEn: 'Auto mechanics, electricians, service specialists, installers — there is always work on the market. Easy to find a job.',
      icon: '📈',
    },
  ];

  const disadvantages = [
    {
      titleUz: 'Замонавий ускуналар ҳамма жойда етарли эмас',
      descriptionUz: 'Айрим фанларда лаборатория ёки техника эскироқ бўлиши мумкин. Бу амалиёт сифатини пасайтиради.',
      titleRu: 'Недостаточно современного оборудования',
      descriptionRu: 'В некоторых предметах лаборатория или техника могут быть устаревшими. Это снижает качество практики.',
      titleEn: 'Lack of modern equipment',
      descriptionEn: 'In some subjects, laboratory or equipment may be outdated. This reduces the quality of practice.',
      icon: '🔨',
    },
    {
      titleUz: 'Диплом даражаси — техникум даражаси',
      descriptionUz: 'Университетдаги бакалавр каби юқори эмас. Баъзи иш жойларида талаб паст.',
      titleRu: 'Уровень диплома — техникум уровня',
      descriptionRu: 'Не такой высокий, как степень бакалавра в университете. На некоторых рабочих местах требование ниже.',
      titleEn: 'Diploma level — technical school level',
      descriptionEn: 'Not as high as a bachelor\'s degree at a university. Some employers have lower requirements.',
      icon: '📜',
    },
    {
      titleUz: 'Талабалар сифати турлича',
      descriptionUz: 'Баъзи талабалар ўқишга жиддий қарамаслиги сабабли ўқув муҳитида шовқин ва интизом муаммолари пайдо бўлиши мумкин.',
      titleRu: 'Качество студентов неоднородно',
      descriptionRu: 'Некоторые студенты относятся к учебе несерьезно, что может привести к проблемам с дисциплиной и шумом в учебной среде.',
      titleEn: 'Uneven quality of students',
      descriptionEn: 'Some students do not take their studies seriously, which may lead to discipline and noise problems in the learning environment.',
      icon: '👥',
    },
    {
      titleUz: 'Олийгоҳга ўтиш учун қўшимча тайёргарлик талаб этилади',
      descriptionUz: 'Техникум дипломи билан университетга кираман деганлар яна тайёргарлик курсларига боради.',
      titleRu: 'Требуется дополнительная подготовка для перехода в ВУЗ',
      descriptionRu: 'Те, кто хочет поступить в университет с дипломом техникума, проходят дополнительные подготовительные курсы.',
      titleEn: 'Additional preparation required for university transition',
      descriptionEn: 'Those who want to enter a university with a technical school diploma go through additional preparation courses.',
      icon: '📚',
    },
    {
      titleUz: 'Иш амалиёти ҳамма жойда кучли ташкил этилмаган',
      descriptionUz: 'Амалиёт жойларини топишда баъзан талабаларнинг ўзи овора бўлади.',
      titleRu: 'Практика организована не везде должным образом',
      descriptionRu: 'При поиске мест практики студентам иногда приходится справляться самостоятельно.',
      titleEn: 'Internship not organized properly everywhere',
      descriptionEn: 'When looking for internship places, students sometimes have to deal with it on their own.',
      icon: '🏢',
    },
  ];

  const getTitle = (item) => {
    if (language === 'uz') return item.titleUz;
    if (language === 'ru') return item.titleRu;
    return item.titleEn;
  };

  const getDescription = (item) => {
    if (language === 'uz') return item.descriptionUz;
    if (language === 'ru') return item.descriptionRu;
    return item.descriptionEn;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-b border-slate-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-white mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {language === 'uz' && 'Таълимнинг плюс ва минусларни'}
              {language === 'ru' && 'Плюсы и минусы образования'}
              {language === 'en' && 'Advantages and Disadvantages of Education'}
            </span>
          </h1>
          <p className="text-xl text-slate-400 text-center max-w-3xl mx-auto">
            {language === 'uz' && 'Техникум таълимини танлашдан олдин ҳамма жабҳани аниқ билиб олинг'}
            {language === 'ru' && 'Узнайте все аспекты перед выбором образования в техникуме'}
            {language === 'en' && 'Learn all aspects before choosing technical school education'}
          </p>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center mb-12">
              <CheckCircle className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-4xl font-black text-white">
                {language === 'uz' && 'Плюслари'}
                {language === 'ru' && 'Преимущества'}
                {language === 'en' && 'Advantages'}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500"> ✨</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-3xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 hover:border-green-500/50 p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {getTitle(item)}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{getDescription(item)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disadvantages */}
      <section className="py-20 relative bg-gradient-to-b from-transparent to-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center mb-12">
              <AlertCircle className="h-8 w-8 text-orange-400 mr-3" />
              <h2 className="text-4xl font-black text-white">
                {language === 'uz' && 'Минусларни'}
                {language === 'ru' && 'Недостатки'}
                {language === 'en' && 'Disadvantages'}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500"> ⚠️</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disadvantages.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-3xl bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-700/50 hover:border-orange-500/50 p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {getTitle(item)}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{getDescription(item)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-6">
                {language === 'uz' && 'Сизнинг қарори нима?'}
                {language === 'ru' && 'Какой ваш выбор?'}
                {language === 'en' && 'What is your choice?'}
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                {language === 'uz' && 'Техникумни танла ёки университетни танла — икки йўл ҳам муввофақий карьера учун мўлаён.'}
                {language === 'ru' && 'Выберите техникум или университет — оба пути подходят для успешной карьеры.'}
                {language === 'en' && 'Choose technical school or university — both paths are suitable for a successful career.'}
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105">
                {language === 'uz' && 'Консультация олиш'}
                {language === 'ru' && 'Получить консультацию'}
                {language === 'en' && 'Get consultation'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
