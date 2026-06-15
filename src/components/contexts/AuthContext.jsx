import { createContext, useContext, useState } from 'react';
import {
  getUsers, saveUsers, getCurrentUser, saveCurrentUser,
  getLevelInfo, hashPassword,
} from '../libs/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  const login = (username, password) => {
    const users = getUsers();
    const u = users[username];
    if (!u) return { success: false, error: 'User not found.' };
    if (u.banned) return { success: false, error: 'This account has been banned.' };
    if (u.password !== hashPassword(password)) return { success: false, error: 'Incorrect password.' };
    saveCurrentUser(u);
    setUser(u);
    return { success: true };
  };

  const register = (username, email, password, confirmPassword) => {
    if (!username || !password) return { success: false, error: 'Please fill all required fields.' };
    if (username.length < 3) return { success: false, error: 'Username must be at least 3 characters.' };
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
    if (password !== confirmPassword) return { success: false, error: 'Passwords do not match.' };
    const users = getUsers();
    if (users[username]) return { success: false, error: 'Username already taken.' };
    const newUser = {
      username,
      email,
      password: hashPassword(password),
      points: 0,
      totalPoints: 0,
      xp: 0,
      tier: 'Bronze',
      streak: 0,
      orders: 0,
      tasksCompleted: 0,
      taskPoints: 0,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastSpin: 0,
      weeklyPoints: 0,
      dailyPoints: 0,
    };
    users[username] = newUser;
    saveUsers(users);
    saveCurrentUser(newUser);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    saveCurrentUser(null);
    setUser(null);
  };

  const updateUser = (updates) => {
    if (!user) return;
    const users = getUsers();
    const updated = { ...user, ...updates };
    if (updates.xp !== undefined) {
      const { current } = getLevelInfo(updated.xp);
      updated.tier = current.tier;
    }
    users[updated.username] = updated;
    saveUsers(users);
    saveCurrentUser(updated);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isAdmin: user?.username === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
