import { useState, useEffect } from 'react';
import { 
  LogOut, Users, TrendingUp, Calendar, BarChart3, 
  Home, Newspaper, Star, DollarSign, Settings, User, Menu, X,
  Plus, Trash2, Edit, Search, Award, Trophy, Moon, Sun,
  ChevronRight, Bell, BookOpen, ArrowUpRight, Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { ROLES, ROLE_PERMISSIONS, SUBJECTS } from '../contexts/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AdminPage({ onLogout, profile }) {
  const { t, language } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersThisMonth: 0,
    newUsersThisWeek: 0,
    activeUsers: 0,
  });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [news, setNews] = useState([]);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newsForm, setNewsForm] = useState({ title: '', content: '', image: '', category: 'events' });
  
  const [teachers, setTeachers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const userRole = profile?.role || ROLES.STUDENT;
  const permissions = ROLE_PERMISSIONS[userRole] || {};

  useEffect(() => {
    fetchStats();
    fetchNews();
    if (permissions.canManageTeachers || permissions.canViewRatings) {
      fetchTeachers();
    }
    if (permissions.canManageUsers) {
      fetchUsers();
    }
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      const { data: users } = await supabase.from('profiles').select('*', { count: 'exact' });
      const totalUsers = users?.length || 0;
      const now = new Date();
      const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const { data: monthlyUsers } = await supabase.from('profiles').select('*').gte('created_at', monthAgo.toISOString());
      const newUsersThisMonth = monthlyUsers?.length || 0;

      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const { data: weeklyUsers } = await supabase.from('profiles').select('*').gte('created_at', weekAgo.toISOString());
      const newUsersThisWeek = weeklyUsers?.length || 0;

      setStats({
        totalUsers,
        newUsersThisMonth,
        newUsersThisWeek,
        activeUsers: Math.floor(totalUsers * 0.7),
      });

      const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
      const userData = months.map(() => Math.floor(Math.random() * 50) + 10);

      setChartData({
        lineChart: {
          labels: months,
          datasets: [{
            label: t('admin.monthlyRegistrations'),
            data: userData,
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#22c55e',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
          }],
        },
        barChart: {
          labels: ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'],
          datasets: [{
            label: t('admin.newThisWeek'),
            data: [12, 19, 8, 15],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(168, 85, 247, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(251, 146, 60, 0.8)',
            ],
            borderRadius: 12,
          }],
        },
        doughnutChart: {
          labels: [t('admin.active'), t('admin.inactive'), t('admin.banned')],
          datasets: [{
            data: [Math.floor(totalUsers * 0.7), Math.floor(totalUsers * 0.25), Math.floor(totalUsers * 0.05)],
            backgroundColor: ['#22c55e', '#64748b', '#ef4444'],
            borderWidth: 0,
            cutout: '75%',
          }],
        },
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    try {
      const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
      setNews(data || []);
    } catch (err) {
      console.error('Error fetching news:', err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('role', ROLES.TEACHER).order('rating', { ascending: false });
      setTeachers(data || []);
    } catch (err) {
      console.error('Error fetching teachers:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      setUsers(data || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleAddNews = async () => {
    try {
      await supabase.from('news').insert(newsForm);
      setShowNewsModal(false);
      setNewsForm({ title: '', content: '', image: '', category: 'events' });
      fetchNews();
    } catch (err) {
      console.error('Error adding news:', err);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm(t('admin.confirmDelete'))) return;
    try {
      await supabase.from('news').delete().eq('id', id);
      fetchNews();
    } catch (err) {
      console.error('Error deleting news:', err);
    }
  };

  const getSubjectName = (subjectId) => {
    const subject = SUBJECTS.find(s => s.id === subjectId);
    return subject ? subject.name[language] || subject.name.ru : subjectId;
  };

  const getRoleName = (role) => t(`roles.${role}`) || role;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const menuItems = [
    { id: 'dashboard', icon: Home, label: t('admin.dashboard'), show: true },
    { id: 'profile', icon: User, label: t('admin.profile'), show: true },
    { id: 'users', icon: Users, label: t('admin.users'), show: permissions.canManageUsers },
    { id: 'teachers', icon: BookOpen, label: t('admin.teachers'), show: permissions.canManageTeachers },
    { id: 'news', icon: Newspaper, label: t('admin.news'), show: permissions.canManageNews },
    { id: 'ratings', icon: Star, label: t('admin.ratings'), show: permissions.canViewRatings },
    { id: 'income', icon: DollarSign, label: t('admin.income'), show: permissions.canViewIncome },
    { id: 'settings', icon: Settings, label: t('admin.settings'), show: true },
  ];

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className={`stat-card ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        {trend && (
          <span className="badge-success">
            <TrendingUp className="w-3 h-3 mr-1" />
            {trend}
          </span>
        )}
      </div>
      <p className={`text-sm font-medium mb-1 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{label}</p>
      <p className="text-3xl font-black gradient-text-static">{value}</p>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label={t('admin.totalUsers')} value={stats.totalUsers} color="from-primary-500 to-emerald-600" trend="+12%" />
        <StatCard icon={TrendingUp} label={t('admin.activeUsers')} value={stats.activeUsers} color="from-accent-500 to-pink-600" trend="+8%" />
        <StatCard icon={Calendar} label={t('admin.newThisWeek')} value={stats.newUsersThisWeek} color="from-blue-500 to-cyan-600" />
        <StatCard icon={BarChart3} label={t('admin.newThisMonth')} value={stats.newUsersThisMonth} color="from-orange-500 to-red-600" />
      </div>

      {chartData && permissions.canViewAllStats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={`p-6 rounded-3xl ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
            <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('admin.monthlyRegistrations')}
            </h3>
            <Line
              data={chartData.lineChart}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { 
                    grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
                    ticks: { color: isDark ? '#64748b' : '#6b7280' }
                  },
                  x: { 
                    grid: { display: false },
                    ticks: { color: isDark ? '#64748b' : '#6b7280' }
                  },
                },
              }}
            />
          </div>

          <div className={`p-6 rounded-3xl ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
            <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('admin.weeklyRegistrations')}
            </h3>
            <Bar
              data={chartData.barChart}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { 
                    grid: { color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
                    ticks: { color: isDark ? '#64748b' : '#6b7280' }
                  },
                  x: { 
                    grid: { display: false },
                    ticks: { color: isDark ? '#64748b' : '#6b7280' }
                  },
                },
              }}
            />
          </div>

          <div className={`p-6 rounded-3xl ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
            <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('admin.userStatus')}
            </h3>
            <div className="max-w-[200px] mx-auto">
              <Doughnut
                data={chartData.doughnutChart}
                options={{
                  responsive: true,
                  plugins: { legend: { position: 'bottom', labels: { color: isDark ? '#94a3b8' : '#6b7280', padding: 20 } } },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-2xl mx-auto">
      <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-xl'}`}>
        <div className="h-32 bg-gradient-to-br from-primary-500 via-accent-500 to-pink-500 relative">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="px-8 pb-8 -mt-16 relative">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-dark-900 mb-6">
            {profile?.full_name?.charAt(0) || 'U'}
          </div>
          <h2 className={`text-2xl font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {profile?.full_name || 'Unknown User'}
          </h2>
          <div className="flex items-center gap-3 mb-6">
            <span className="badge-primary">{getRoleName(profile?.role)}</span>
            {profile?.subject && <span className="badge-accent">{getSubjectName(profile.subject)}</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Email', value: profile?.email },
              { label: t('admin.phone'), value: profile?.phone || '-' },
              ...(profile?.role === ROLES.TEACHER ? [
                { label: t('admin.myRating'), value: `${profile?.rating || 0} ${t('admin.totalPoints')}`, highlight: true },
                { label: t('admin.activityPoints'), value: profile?.activity_points || 0 },
              ] : []),
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-2xl ${isDark ? 'bg-dark-800/50' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{item.label}</p>
                <p className={`font-semibold ${item.highlight ? 'text-yellow-500' : isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.highlight && <Star className="w-4 h-4 inline mr-1 fill-current" />}
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRatings = () => (
    <div className="space-y-6">
      {profile?.role === ROLES.TEACHER && (
        <div className={`p-8 rounded-3xl ${isDark ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20' : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('admin.myRating')}
              </h3>
              <p className={isDark ? 'text-dark-400' : 'text-gray-500'}>
                {t('admin.position')}: #{teachers.findIndex(t => t.user_id === profile?.user_id) + 1} / {teachers.length}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: t('admin.activityPoints'), value: profile?.activity_points || 0 },
              { label: t('admin.attendancePoints'), value: profile?.attendance_points || 0 },
              { label: t('admin.totalPoints'), value: profile?.rating || 0, highlight: true },
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-2xl text-center ${item.highlight ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20' : isDark ? 'bg-dark-800/50' : 'bg-white/80'}`}>
                <p className={`text-3xl font-black ${item.highlight ? 'text-yellow-500' : isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
                <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
        <div className="p-6 border-b border-dark-800">
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('admin.teacherRankings')}
          </h3>
        </div>
        <div className="divide-y divide-dark-800/50">
          {teachers.map((teacher, idx) => (
            <div key={teacher.id} className={`flex items-center gap-4 p-5 transition-all duration-300 hover:bg-primary-500/5 ${teacher.user_id === profile?.user_id ? 'bg-primary-500/10' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
                idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
                idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' : 
                idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-800' : 
                'bg-dark-700'
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{teacher.full_name}</p>
                <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{getSubjectName(teacher.subject)}</p>
              </div>
              <div className="flex items-center gap-2 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold">{teacher.rating || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIncome = () => (
    <div className="max-w-3xl mx-auto">
      <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-xl'}`}>
        <div className="p-8 border-b border-dark-800 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('admin.myIncome')}</h3>
            <p className={isDark ? 'text-dark-400' : 'text-gray-500'}>{profile?.full_name}</p>
          </div>
        </div>
        <div className="p-8 grid grid-cols-2 gap-6">
          {[
            { label: t('admin.monthlyIncome'), value: `${(profile?.income || 0).toLocaleString()} UZS` },
            { label: t('admin.yearlyIncome'), value: `${((profile?.income || 0) * 12).toLocaleString()} UZS` },
            { label: t('admin.bonuses'), value: '+500,000 UZS', color: 'text-green-500' },
            { label: t('admin.netIncome'), value: `${((profile?.income || 0) + 500000).toLocaleString()} UZS`, color: 'text-primary-500' },
          ].map((item, idx) => (
            <div key={idx} className={`p-6 rounded-2xl ${isDark ? 'bg-dark-800/50' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{item.label}</p>
              <p className={`text-2xl font-black mt-2 ${item.color || (isDark ? 'text-white' : 'text-gray-900')}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="space-y-6">
      {permissions.canManageNews && (
        <div className="flex justify-end">
          <button onClick={() => setShowNewsModal(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {t('admin.addNews')}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div key={item.id} className={`group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
            {item.image && (
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            )}
            <div className="p-6">
              <span className="badge-primary mb-3">{item.category}</span>
              <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
              <p className={`text-sm line-clamp-3 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{item.content}</p>
              
              {permissions.canManageNews && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-dark-800/50">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteNews(item.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showNewsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-lg rounded-3xl p-8 ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
            <h3 className={`text-2xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('admin.addNews')}</h3>
            <div className="space-y-4">
              <input type="text" placeholder={t('admin.newsTitle')} value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} className={`input-modern ${isDark ? 'input-modern-dark' : 'input-modern-light'}`} />
              <textarea placeholder={t('admin.newsContent')} value={newsForm.content} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} rows={4} className={`input-modern ${isDark ? 'input-modern-dark' : 'input-modern-light'}`} />
              <input type="text" placeholder={t('admin.newsImage')} value={newsForm.image} onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })} className={`input-modern ${isDark ? 'input-modern-dark' : 'input-modern-light'}`} />
              <select value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })} className={`input-modern ${isDark ? 'input-modern-dark' : 'input-modern-light'}`}>
                <option value="events">{t('news.events')}</option>
                <option value="achievements">{t('news.achievements')}</option>
                <option value="partnerships">{t('news.partnerships')}</option>
              </select>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setShowNewsModal(false)} className={`flex-1 py-4 rounded-2xl font-bold transition-colors ${isDark ? 'bg-dark-800 text-white hover:bg-dark-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{t('admin.cancel')}</button>
              <button onClick={handleAddNews} className="flex-1 btn-primary">{t('admin.save')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-dark-500' : 'text-gray-400'}`} />
          <input type="text" placeholder={t('admin.search')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full pl-14 pr-5 py-4 rounded-2xl border-2 ${isDark ? 'bg-dark-900/50 border-dark-800 text-white' : 'bg-white border-gray-200 text-gray-900'}`} />
        </div>
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className={`px-5 py-4 rounded-2xl border-2 ${isDark ? 'bg-dark-900/50 border-dark-800 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
          <option value="all">{t('admin.all')}</option>
          <option value={ROLES.DIRECTOR}>{t('admin.director')}</option>
          <option value={ROLES.VICE_DIRECTOR}>{t('admin.viceDirector')}</option>
          <option value={ROLES.TEACHER}>{t('admin.teacher')}</option>
          <option value={ROLES.STUDENT}>{t('admin.student')}</option>
        </select>
      </div>

      <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-dark-800/50' : 'bg-gray-50'}>
              <tr>
                {[t('admin.name'), t('admin.email'), t('admin.role'), t('admin.subject'), t('admin.actions')].map((header, idx) => (
                  <th key={idx} className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-dark-300' : 'text-gray-600'}`}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800/50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`transition-colors ${isDark ? 'hover:bg-dark-800/30' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                        {user.full_name?.charAt(0) || 'U'}
                      </div>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.full_name}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${user.role === ROLES.DIRECTOR ? 'badge-accent' : user.role === ROLES.VICE_DIRECTOR ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : user.role === ROLES.TEACHER ? 'badge-primary' : 'bg-dark-500/20 text-dark-400 border border-dark-500/30'}`}>
                      {getRoleName(user.role)}
                    </span>
                  </td>
                  <td className={`px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{user.subject ? getSubjectName(user.subject) : '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl mx-auto">
      <div className={`rounded-3xl overflow-hidden ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-xl'}`}>
        <div className="p-6 border-b border-dark-800">
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('admin.settings')}</h3>
        </div>
        <div className="p-6">
          <div className={`flex items-center justify-between p-5 rounded-2xl ${isDark ? 'bg-dark-800/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              {isDark ? <Moon className="w-6 h-6 text-accent-400" /> : <Sun className="w-6 h-6 text-yellow-500" />}
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {isDark ? t('common.darkMode') : t('common.lightMode')}
                </p>
                <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>
                  {language === 'ru' ? 'Переключить тему' : language === 'uz' ? 'Mavzuni almashtirish' : 'Toggle theme'}
                </p>
              </div>
            </div>
            <button onClick={toggleTheme} className={`relative w-16 h-9 rounded-full transition-colors ${isDark ? 'bg-primary-500' : 'bg-gray-300'}`}>
              <div className={`absolute top-1 w-7 h-7 rounded-full bg-white shadow-lg transition-transform ${isDark ? 'left-8' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AccessDenied = () => (
    <div className={`rounded-3xl p-16 text-center ${isDark ? 'bg-dark-900/50 border border-dark-800' : 'bg-white border border-gray-200 shadow-xl'}`}>
      <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
        <X className="w-10 h-10 text-red-400" />
      </div>
      <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('admin.accessDenied')}</h3>
      <p className={`mt-2 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{t('admin.noPermission')}</p>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'profile': return renderProfile();
      case 'users': return permissions.canManageUsers ? renderUsers() : <AccessDenied />;
      case 'teachers': return permissions.canManageTeachers ? renderRatings() : <AccessDenied />;
      case 'news': return renderNews();
      case 'ratings': return permissions.canViewRatings ? renderRatings() : <AccessDenied />;
      case 'income': return permissions.canViewIncome ? renderIncome() : <AccessDenied />;
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className={isDark ? 'text-dark-400' : 'text-gray-500'}>{t('admin.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}>
      {/* Mobile Header */}
      <div className={`lg:hidden flex items-center justify-between p-4 border-b ${isDark ? 'bg-dark-900/90 border-dark-800' : 'bg-white border-gray-200'}`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={isDark ? 'text-white' : 'text-gray-900'}>
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-black gradient-text-static">{t('admin.title')}</h1>
        <button onClick={toggleTheme} className={isDark ? 'text-white' : 'text-gray-900'}>
          {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          ${isDark ? 'bg-dark-900/95 border-r border-dark-800' : 'bg-white border-r border-gray-200'}`}>
          <div className="flex flex-col h-full">
            <div className={`p-6 border-b ${isDark ? 'border-dark-800' : 'border-gray-200'}`}>
              <h1 className="text-2xl font-black">
                <span className="gradient-text-static">Topex</span>
                <span className={isDark ? 'text-white' : 'text-gray-900'}> Admin</span>
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{getRoleName(profile?.role)}</p>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
              {menuItems.filter(item => item.show).map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                  className={`sidebar-item w-full ${activeSection === item.id ? 'sidebar-item-active' : ''}`}
                >
                  <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-primary-400' : ''}`} />
                  {item.label}
                  {activeSection === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </nav>

            <div className={`p-4 border-t ${isDark ? 'border-dark-800' : 'border-gray-200'}`}>
              <button onClick={onLogout} className="sidebar-item w-full text-red-400 hover:bg-red-500/10">
                <LogOut className="w-5 h-5" />
                {t('admin.logout')}
              </button>
            </div>
          </div>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Main Content */}
        <main className="flex-1 min-h-screen p-4 lg:p-8">
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {menuItems.find(m => m.id === activeSection)?.label}
              </h1>
              <p className={`mt-1 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>
                {language === 'ru' ? 'Добро пожаловать,' : language === 'uz' ? 'Xush kelibsiz,' : 'Welcome,'} {profile?.full_name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${isDark ? 'bg-dark-800 text-yellow-400 hover:bg-dark-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className={`p-3 rounded-2xl relative ${isDark ? 'bg-dark-800 text-dark-400 hover:bg-dark-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
}
