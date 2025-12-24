import { BookOpen, Code, Languages, Calculator, Palette, Music, Users, Clock, Star, Target, Award, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProgramsPage() {
  const { t, language } = useLanguage();

  const programsData = {
    en: [
      {
        id: '1',
        title: t('programs.primarySchool'),
        description: 'Comprehensive program for children with emphasis on creativity and foundational skills',
        details: 'Interactive learning methods, play-based education, development of critical thinking and social skills',
        duration: '4 years',
        level: 'Grades 1-4',
        icon: BookOpen,
        students: '1200+',
        features: ['Small class sizes', 'Personalized attention', 'STEM focus', 'Arts integration'],
      },
      {
        id: '2',
        title: t('programs.middleSchool'),
        description: 'In-depth study with individual learning trajectories and specialized subjects',
        details: 'Subject-specific teachers, elective courses, competition preparation, leadership development',
        duration: '5 years',
        level: 'Grades 5-9',
        icon: Users,
        students: '1500+',
        features: ['Multiple electives', 'Project-based learning', 'Competitions', 'Social projects'],
      },
      {
        id: '3',
        title: t('programs.highSchool'),
        description: 'Advanced preparation for leading universities worldwide with AP and IB programs',
        details: 'University-level courses, research projects, international programs, college counseling',
        duration: '2 years',
        level: 'Grades 10-11',
        icon: Target,
        students: '800+',
        features: ['AP/IB courses', 'University prep', 'Research labs', 'Career guidance'],
      },
      {
        id: '4',
        title: t('programs.programming'),
        description: 'Modern programming languages, web development, mobile apps and AI fundamentals',
        details: 'Python, JavaScript, C++, Web development, Mobile apps, AI/ML basics',
        duration: '2 years',
        level: 'All levels',
        icon: Code,
        students: '400+',
        features: ['Hands-on projects', 'Industry experts', 'Hackathons', 'Internships'],
      },
      {
        id: '5',
        title: t('programs.languages'),
        description: 'English, German, French, Chinese with native speakers and immersion methods',
        details: 'Conversational classes, grammar, cultural studies, TOEFL/IELTS preparation',
        duration: 'Flexible',
        level: 'All levels',
        icon: Globe,
        students: '600+',
        features: ['Native speakers', 'Immersion', 'Certifications', 'Conversations'],
      },
      {
        id: '6',
        title: t('programs.mathematics'),
        description: 'In-depth study of calculus, algebra, geometry and mathematical olympiads',
        details: 'Advanced calculus, linear algebra, number theory, competition preparation',
        duration: '3 years',
        level: 'Advanced',
        icon: Calculator,
        students: '300+',
        features: ['Olympiad prep', 'Advanced topics', 'Problem solving', 'Research'],
      },
      {
        id: '7',
        title: t('programs.arts'),
        description: 'Painting, graphic design, sculpture, digital art and contemporary creative practices',
        details: 'Various mediums, design thinking, digital tools, exhibition opportunities',
        duration: '2 years',
        level: 'All levels',
        icon: Palette,
        students: '250+',
        features: ['Multiple mediums', 'Digital design', 'Exhibitions', 'Portfolio building'],
      },
      {
        id: '8',
        title: t('programs.music'),
        description: 'Piano, guitar, violin, vocals, music theory and ensemble performance',
        details: 'Individual lessons, music theory, ensemble, performance opportunities',
        duration: '3 years',
        level: 'All levels',
        icon: Music,
        students: '200+',
        features: ['Instruments', 'Theory', 'Ensemble', 'Performances'],
      },
    ],
    ru: [
      {
        id: '1',
        title: t('programs.primarySchool'),
        description: 'Комплексная программа для детей с акцентом на креативность и развитие навыков',
        details: 'Интерактивные методы обучения, игровая педагогика, развитие критического мышления',
        duration: '4 года',
        level: '1-4 классы',
        icon: BookOpen,
        students: '1200+',
        features: ['Небольшие классы', 'Индивидуальный подход', 'STEM фокус', 'Интеграция искусств'],
      },
      {
        id: '2',
        title: t('programs.middleSchool'),
        description: 'Углубленное изучение с индивидуальными траекториями и специализированными предметами',
        details: 'Учителя-предметники, факультативные курсы, подготовка к олимпиадам',
        duration: '5 лет',
        level: '5-9 классы',
        icon: Users,
        students: '1500+',
        features: ['Множество факультативов', 'Проектное обучение', 'Олимпиады', 'Социальные проекты'],
      },
      {
        id: '3',
        title: t('programs.highSchool'),
        description: 'Подготовка к лучшим университетам мира с программами AP и IB',
        details: 'Университетские курсы, научные проекты, международные программы',
        duration: '2 года',
        level: '10-11 классы',
        icon: Target,
        students: '800+',
        features: ['Курсы AP/IB', 'Подготовка в ВУЗ', 'Научные лабы', 'Карьерное консультирование'],
      },
      {
        id: '4',
        title: t('programs.programming'),
        description: 'Современные языки программирования, веб-разработка, мобильные приложения и AI',
        details: 'Python, JavaScript, C++, Веб-разработка, Мобильные приложения, основы ИИ',
        duration: '2 года',
        level: 'Все уровни',
        icon: Code,
        students: '400+',
        features: ['Практические проекты', 'Эксперты из индустрии', 'Хакатоны', 'Стажировки'],
      },
      {
        id: '5',
        title: t('programs.languages'),
        description: 'Английский, немецкий, французский, китайский с носителями и методом погружения',
        details: 'Разговорные классы, грамматика, культурные исследования, подготовка к TOEFL/IELTS',
        duration: 'Гибкий график',
        level: 'Все уровни',
        icon: Globe,
        students: '600+',
        features: ['Носители языка', 'Метод погружения', 'Сертификаты', 'Разговорные клубы'],
      },
      {
        id: '6',
        title: t('programs.mathematics'),
        description: 'Углубленное изучение анализа, алгебры, геометрии и математических олимпиад',
        details: 'Высший анализ, линейная алгебра, теория чисел, подготовка к олимпиадам',
        duration: '3 года',
        level: 'Продвинутый уровень',
        icon: Calculator,
        students: '300+',
        features: ['Олимпиадная подготовка', 'Продвинутые темы', 'Решение задач', 'Исследования'],
      },
      {
        id: '7',
        title: t('programs.arts'),
        description: 'Живопись, графический дизайн, скульптура, цифровое искусство и творчество',
        details: 'Различные материалы, дизайн-мышление, цифровые инструменты, выставки',
        duration: '2 года',
        level: 'Все уровни',
        icon: Palette,
        students: '250+',
        features: ['Разные материалы', 'Цифровой дизайн', 'Выставки', 'Портфолио'],
      },
      {
        id: '8',
        title: t('programs.music'),
        description: 'Фортепиано, гитара, скрипка, вокал, музыкальная теория и ансамбль',
        details: 'Индивидуальные уроки, музыкальная теория, ансамбль, концерты',
        duration: '3 года',
        level: 'Все уровни',
        icon: Music,
        students: '200+',
        features: ['Инструменты', 'Теория', 'Ансамбль', 'Концерты'],
      },
    ],
    uz: [
      {
        id: '1',
        title: t('programs.primarySchool'),
        description: 'Kreativlikka va asosiy ko\'nikmalarga aktsent qo\'ygan bolalar uchun kompleks dastur',
        details: 'Interaktiv o\'qitish usullari, o\'yin asosida pedagogika, kritik fikrlashni rivojlantirish',
        duration: '4 yil',
        level: '1-4 sinf',
        icon: BookOpen,
        students: '1200+',
        features: ['Kichik sinflar', 'Shaxsiy yondashuv', 'STEM fokus', 'San\'at integratsiyasi'],
      },
      {
        id: '2',
        title: t('programs.middleSchool'),
        description: 'Individual ta\'lim yo\'li va ixtisoslashtirilgan fakulitetlar bilan chuqur o\'rganish',
        details: 'Fanni o\'qituvchilar, fakulitetlar, olimpiada tayyorligi, raqobat',
        duration: '5 yil',
        level: '5-9 sinf',
        icon: Users,
        students: '1500+',
        features: ['Ko\'p fakulitetlar', 'Proyektga asoslangan', 'Olimpiadalar', 'Ijtimoiy proyektlar'],
      },
      {
        id: '3',
        title: t('programs.highSchool'),
        description: 'AP va IB dasturlari bilan dunyadagi eng yaxshi universitetlar uchun tayyorlash',
        details: 'Universitet darajasidagi kurslar, ilmiy proyektlar, xalqaro dasturlar',
        duration: '2 yil',
        level: '10-11 sinf',
        icon: Target,
        students: '800+',
        features: ['AP/IB kurslar', 'VUZ tayyorligi', 'Ilmiy laboratoriyalar', 'Karera boshlangi'],
      },
      {
        id: '4',
        title: t('programs.programming'),
        description: 'Zamonaviy dasturlash tillari, veb-ishlab chiqarish, mobil ilovalar va AI',
        details: 'Python, JavaScript, C++, Veb-ishlab chiqarish, Mobil ilovalar, AI asoslari',
        duration: '2 yil',
        level: 'Barcha darajalar',
        icon: Code,
        students: '400+',
        features: ['Amaliy proyektlar', 'Sanoat mutaxassislari', 'Xakaton', 'Stajirovka'],
      },
      {
        id: '5',
        title: t('programs.languages'),
        description: 'Ingliz, nemis, frantsuz, xuanzu ona tilida suhbatdoshlar va immersion usuli',
        details: 'Suhbat sinflari, grammatika, madaniyat, TOEFL/IELTS tayyorligi',
        duration: 'Flexible jadval',
        level: 'Barcha darajalar',
        icon: Globe,
        students: '600+',
        features: ['Ona tilida suhbatdoshlar', 'Immersion usuli', 'Sertifikatlar', 'Suhbat klublari'],
      },
      {
        id: '6',
        title: t('programs.mathematics'),
        description: 'Analiz, algebra, geometriya va matematik olimpiadalarning chuqur o\'rganishi',
        details: 'Yuqori analiz, chiziqli algebra, sonlar nazariyasi, olimpiada tayyorligi',
        duration: '3 yil',
        level: 'Pishgan daraja',
        icon: Calculator,
        students: '300+',
        features: ['Olimpiada tayyorligi', 'Pishgan mavzular', 'Masala yechish', 'Tadqiqot'],
      },
      {
        id: '7',
        title: t('programs.arts'),
        description: 'Rasm, grafik dizayn, haykaltaroshlik, raqamli san\'at va ijodiy amaliyotlar',
        details: 'Turli materiallar, dizayn-fikrlash, raqamli vositalar, ko\'rgazmalar',
        duration: '2 yil',
        level: 'Barcha darajalar',
        icon: Palette,
        students: '250+',
        features: ['Turli materiallar', 'Raqamli dizayn', 'Ko\'rgazmalar', 'Portfolio'],
      },
      {
        id: '8',
        title: t('programs.music'),
        description: 'Fortepiano, gitara, skripka, vokal, musiqa nazariyasi va ansambli',
        details: 'Alohida darslar, musiqa nazariyasi, ansambli, kontsertlar',
        duration: '3 yil',
        level: 'Barcha darajalar',
        icon: Music,
        students: '200+',
        features: ['Asboblar', 'Nazariya', 'Ansambli', 'Kontsertlar'],
      },
    ],
  };

  const programs = programsData[language] || programsData.ru;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-b border-slate-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-white mb-6 text-center">
            {t('programs.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"></span>
          </h1>
          <p className="text-xl text-slate-400 text-center max-w-3xl mx-auto">
            {t('programs.subtitle')}
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const IconComponent = program.icon;
              return (
                <div
                  key={program.id}
                  className="group relative rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-cyan-400" />
                      </div>
                      <Star className="h-5 w-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">{program.description}</p>

                    <div className="space-y-3 mb-6 pb-6 border-b border-slate-700">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">{t('programs.duration')}</span>
                        <span className="text-cyan-400 font-semibold">{program.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">{t('programs.level')}</span>
                        <span className="text-cyan-400 font-semibold">{program.level}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">{t('programs.students')}</span>
                        <span className="text-cyan-400 font-semibold">{program.students}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105">
                      Узнать больше
                    </button>
                  </div>
                </div>
              );
            })}
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
                Не нашли нужную программу?
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Мы создаем индивидуальные образовательные траектории
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105">
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
