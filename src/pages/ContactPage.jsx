import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Loader } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-b border-slate-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-white mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t('contact.title')}</span>
          </h1>
          <p className="text-xl text-slate-400 text-center max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: t('contact.phone'),
                items: ['+998 71 123 45 67', '+998 71 123 45 68'],
              },
              {
                icon: Mail,
                title: t('contact.email'),
                items: ['info@topex.uz', 'admissions@topex.uz'],
              },
              {
                icon: MapPin,
                title: t('contact.address'),
                items: ['г. Ташкент, Узбекистан', 'ул. Университетская, 15'],
              },
            ].map((contact, idx) => {
              const IconComponent = contact.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-cyan-500/50 p-8 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{contact.title}</h3>
                  <div className="space-y-2">
                    {contact.items.map((item, i) => (
                      <p key={i} className="text-slate-300 font-semibold">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-black text-white mb-8">
                {t('contact.sendMessage')}
              </h2>

              {submitted && (
                <div className="mb-6 p-6 rounded-2xl bg-green-500/20 border border-green-500/50 text-green-300 font-semibold flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>{t('contact.thankYou')}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-3">
                    {t('contact.yourName')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Иван Петров"
                    className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-3">
                      {t('contact.emailLabel')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-200 mb-3">
                      {t('contact.phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+998 99 123 45 67"
                      className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-3">
                    {t('contact.subject')}
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-all duration-300"
                  >
                    <option value="">Выберите тему</option>
                    <option value="admission">Поступление</option>
                    <option value="programs">Программы</option>
                    <option value="general">Общие вопросы</option>
                    <option value="partnership">Партнерство</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-200 mb-3">
                    {t('contact.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Ваше сообщение..."
                    className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 disabled:opacity-50 flex items-center justify-center text-lg"
                >
                  {loading ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      {t('contact.send')}
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MessageSquare className="h-6 w-6 mr-3 text-cyan-400" />
                  Время работы
                </h3>
                <div className="space-y-6">
                  {[
                    { day: 'Пн-Пт', time: '8:00 - 18:00' },
                    { day: 'Сб', time: '9:00 - 14:00' },
                    { day: 'Вс', time: 'Выходной' },
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-slate-300 font-semibold">{schedule.day}</span>
                      <span className="text-cyan-400 font-bold">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Запишитесь на экскурсию
                </h3>
                <p className="text-slate-300 mb-6">
                  Посетите школу и познакомьтесь с нашей инфраструктурой
                </p>
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105">
                  Записаться
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-12 text-center">
            Найдите нас на карте
          </h2>
          <div className="rounded-3xl overflow-hidden shadow-2xl h-96 border border-slate-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.548573975!2d69.2401!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjAiTiA2OcKwMTQnMjQuNCJF!5e0!3m2!1sru!2s!4v1234567890!5m2!1sru!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
