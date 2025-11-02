import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext(null);

const STORAGE_KEY = '@e_budgetmo_user';

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: null,
    email: null,
    password: null,
    profilePicture: null, // uri string
  });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (mounted && parsed && typeof parsed === 'object') setUser((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.warn('Failed to load user from storage', e);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user || {}));
      } catch (e) {
        console.warn('Failed to save user to storage', e);
      }
    }
    save();
  }, [user]);

  function signup({ name, email, password, profilePicture = null }) {
    setUser({ name, email, password, profilePicture });
  }

  function login(email, password) {
    // simple local-check: compare with stored user
    if (!user || !user.email) return false;
    return user.email === email && user.password === password;
  }

  function updateName(name) {
    setUser((prev) => ({ ...prev, name }));
  }

  function updateEmail(email) {
    setUser((prev) => ({ ...prev, email }));
  }

  function updatePassword(password) {
    setUser((prev) => ({ ...prev, password }));
  }

  function updateProfilePicture(uri) {
    setUser((prev) => ({ ...prev, profilePicture: uri }));
  }

  const value = { user, signup, login, updateName, updateEmail, updatePassword, updateProfilePicture };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}

export default UserContext;
