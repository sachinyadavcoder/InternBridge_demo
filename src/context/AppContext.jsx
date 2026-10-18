import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

// Demo users for quick login
export const DEMO_USERS = {
  company: {
    id: 'u1', role: 'company', name: 'Priya Mehta', email: 'priya@techsolutions.in',
    avatar: 'PM', company: 'c1', companyName: 'TechSolutions', title: 'HR Manager',
  },
  supervisor: {
    id: 'u3', role: 'supervisor', name: 'Rahul Desai', email: 'rahul@techsolutions.in',
    avatar: 'RD', company: 'c1', companyName: 'TechSolutions', title: 'Senior Software Engineer',
  },
  guide: {
    id: 'u6', role: 'guide', name: 'Prof. Anjali Patil', email: 'anjali.patil@college.edu',
    avatar: 'AP', department: 'Information Technology', title: 'Assistant Professor',
  },
  admin: {
    id: 'u9', role: 'admin', name: 'Dr. Ramesh Kadam', email: 'admin@college.edu',
    avatar: 'RK', title: 'Training & Placement Officer',
  },
};

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('ib_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ib_user');
  };

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Restore from localStorage on first render
  React.useEffect(() => {
    const saved = localStorage.getItem('ib_user');
    if (saved) {
      try { setCurrentUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  return (
    <AppContext.Provider value={{ currentUser, login, logout, toasts, addToast, removeToast }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
