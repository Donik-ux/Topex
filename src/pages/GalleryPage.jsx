import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function GalleryPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', name: t('gallery.all') },
    { id: 'campus', name: t('gallery.campus') },
    { id: 'classes', name: t('gallery.classes') },
    { id: 'events', name: t('gallery.events') },
    { id: 'sports', name: t('gallery.sports') },
  ];

  const images = [
    { id: '1', url: 'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Главное здание', category: 'campus' },
    { id: '2', url: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Библиотека', category: 'campus' },
    { id: '3', url: 'https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Программирование', category: 'classes' },
    { id: '4', url: 'https://images.pexels.com/photos/8926547/pexels-photo-8926547.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Лаборатория', category: 'classes' },
    { id: '5', url: 'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Групповая работа', category: 'classes' },
    { id: '6', url: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Выпускной', category: 'events' },
    { id: '7', url: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Выставка', category: 'events' },
    { id: '8', url: 'https://images.pexels.com/photos/1415268/pexels-photo-1415268.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Мероприятие', category: 'events' },
    { id: '9', url: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Спортзал', category: 'sports' },
    { id: '10', url: 'https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Футбол', category: 'sports' },
    { id: '11', url: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Компьютерный класс', category: 'classes' },
    { id: '12', url: 'https://images.pexels.com/photos/267491/pexels-photo-267491.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Корпус', category: 'campus' },
  ];

  const filteredImages = selectedCategory === 'all' ? images : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-b border-slate-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-white mb-6 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t('gallery.title')}</span>
          </h1>
          <p className="text-xl text-slate-400 text-center max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gradient-to-b from-slate-800/30 to-transparent sticky top-16 z-40 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 transform scale-105'
                    : 'bg-slate-700/50 text-slate-200 hover:bg-slate-700 border border-slate-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 transition-all duration-300 aspect-video cursor-pointer"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-bold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-4xl w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <p className="text-white text-center mt-4 text-xl font-semibold">{selectedImage.title}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-6">
                Хотите посетить нашу школу?
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Запишитесь на экскурсию и увидите все своими глазами
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105">
                Записаться на экскурсию
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
