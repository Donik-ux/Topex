import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const ROLES = {
  DIRECTOR: 'director',
  VICE_DIRECTOR: 'vice_director',
  TEACHER: 'teacher',
  STUDENT: 'student',
};

export const ROLE_LABELS = {
  ru: {
    director: 'Директор',
    vice_director: 'Завуч',
    teacher: 'Учитель',
    student: 'Ученик',
  },
  uz: {
    director: 'Direktor',
    vice_director: 'O\'quv ishlari bo\'yicha direktor o\'rinbosari',
    teacher: 'O\'qituvchi',
    student: 'O\'quvchi',
  },
  en: {
    director: 'Director',
    vice_director: 'Vice Director',
    teacher: 'Teacher',
    student: 'Student',
  },
};

export const SUBJECTS = [
  { id: 'programming', name: { ru: 'Программирование', uz: 'Dasturlash', en: 'Programming' } },
  { id: 'design', name: { ru: 'Дизайн', uz: 'Dizayn', en: 'Design' } },
  { id: 'business', name: { ru: 'Бизнес', uz: 'Biznes', en: 'Business' } },
  { id: 'hotel_business', name: { ru: 'Отельный бизнес', uz: 'Mehmonxona biznesi', en: 'Hotel Business' } },
  { id: 'marketing', name: { ru: 'Маркетинг', uz: 'Marketing', en: 'Marketing' } },
  { id: 'laboratory', name: { ru: 'Лаборант', uz: 'Laboratoriya', en: 'Laboratory' } },
  { id: 'english', name: { ru: 'Английский язык', uz: 'Ingliz tili', en: 'English' } },
  { id: 'mathematics', name: { ru: 'Математика', uz: 'Matematika', en: 'Mathematics' } },
  { id: 'russian', name: { ru: 'Русский язык', uz: 'Rus tili', en: 'Russian' } },
  { id: 'history', name: { ru: 'История', uz: 'Tarix', en: 'History' } },
];

export const ROLE_PERMISSIONS = {
  director: {
    canManageUsers: true,
    canManageTeachers: true,
    canManageStudents: true,
    canManageNews: true,
    canViewAllStats: true,
    canViewIncome: true,
    canViewRatings: true,
    canManageRatings: true,
    canManageSubjects: true,
    canAccessAdmin: true,
  },
  vice_director: {
    canManageUsers: false,
    canManageTeachers: true,
    canManageStudents: true,
    canManageNews: true,
    canViewAllStats: true,
    canViewIncome: true,
    canViewRatings: true,
    canManageRatings: true,
    canManageSubjects: false,
    canAccessAdmin: true,
  },
  teacher: {
    canManageUsers: false,
    canManageTeachers: false,
    canManageStudents: false,
    canManageNews: false,
    canViewAllStats: false,
    canViewIncome: true,
    canViewRatings: true,
    canManageRatings: false,
    canManageSubjects: false,
    canAccessAdmin: true,
  },
  student: {
    canManageUsers: false,
    canManageTeachers: false,
    canManageStudents: false,
    canManageNews: false,
    canViewAllStats: false,
    canViewIncome: false,
    canViewRatings: false,
    canManageRatings: false,
    canManageSubjects: false,
    canAccessAdmin: false,
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          setUser(data.session.user);
          await fetchProfile(data.session.user.id);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Profile fetch error:', error);
      setProfile(null);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const register = async (userData) => {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        user_id: data.user.id,
        full_name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        role: userData.role || ROLES.STUDENT,
        subject: userData.subject || null,
        rating: userData.role === ROLES.TEACHER ? 0 : null,
        income: 0,
      });

      if (profileError) throw profileError;
    }

    return data;
  };

  const hasPermission = (permission) => {
    if (!profile?.role) return false;
    return ROLE_PERMISSIONS[profile.role]?.[permission] || false;
  };

  const canAccessAdmin = () => {
    return hasPermission('canAccessAdmin');
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      login,
      logout,
      register,
      hasPermission,
      canAccessAdmin,
      fetchProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
