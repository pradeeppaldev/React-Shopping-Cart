import React, { createContext, useContext, FC, useState, useEffect, useCallback } from 'react';
import { IUserProfile, IOrder, INotification, IToast } from 'models';
import { defaultUserProfile, defaultOrders, defaultNotifications } from 'services/mockUser';

export interface IUserContext {
  profile: IUserProfile;
  updateProfile: (profile: Partial<IUserProfile>) => void;

  orders: IOrder[];
  addOrder: (order: IOrder) => void;

  notifications: INotification[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  addNotification: (notif: Omit<INotification, 'id' | 'timestamp' | 'read'>) => void;

  // Modals
  isProfileOpen: boolean;
  openProfile: (tab?: string) => void;
  closeProfile: () => void;
  activeProfileTab: string;
  setActiveProfileTab: (tab: string) => void;

  isNotificationsOpen: boolean;
  openNotifications: () => void;
  closeNotifications: () => void;

  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;

  // Feedback Toasts
  toasts: IToast[];
  showToast: (message: string, type?: 'success' | 'info' | 'reward', icon?: string) => void;
  removeToast: (id: string) => void;
}

const PROFILE_STORAGE_KEY = 'vibecart_user_profile_v1';
const ORDERS_STORAGE_KEY = 'vibecart_orders_history_v1';
const NOTIFS_STORAGE_KEY = 'vibecart_notifications_v1';

const defaultContextValue: IUserContext = {
  profile: defaultUserProfile,
  updateProfile: () => {},
  orders: defaultOrders,
  addOrder: () => {},
  notifications: defaultNotifications,
  unreadNotificationsCount: 3,
  markNotificationRead: () => {},
  markAllNotificationsRead: () => {},
  clearNotifications: () => {},
  addNotification: () => {},
  isProfileOpen: false,
  openProfile: () => {},
  closeProfile: () => {},
  activeProfileTab: 'profile',
  setActiveProfileTab: () => {},
  isNotificationsOpen: false,
  openNotifications: () => {},
  closeNotifications: () => {},
  isCheckoutOpen: false,
  openCheckout: () => {},
  closeCheckout: () => {},
  toasts: [],
  showToast: () => {},
  removeToast: () => {},
};

export const UserContext = createContext<IUserContext>(defaultContextValue);

export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);
  return context || defaultContextValue;
};

export const UserProvider: FC = ({ children }) => {
  // Profile State
  const [profile, setProfile] = useState<IUserProfile>(() => {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (stored) {
        return { ...defaultUserProfile, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed to load profile from localStorage', e);
    }
    return defaultUserProfile;
  });

  // Orders State
  const [orders, setOrders] = useState<IOrder[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load orders from localStorage', e);
    }
    return defaultOrders;
  });

  // Notifications State
  const [notifications, setNotifications] = useState<INotification[]>(() => {
    try {
      const stored = localStorage.getItem(NOTIFS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load notifications from localStorage', e);
    }
    return defaultNotifications;
  });

  // Modals State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState('profile');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState<IToast[]>([]);

  // Persist Profile
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  }, [profile]);

  // Persist Orders
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Persist Notifications
  useEffect(() => {
    try {
      localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save notifications to localStorage', e);
    }
  }, [notifications]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'info' | 'reward' = 'success', icon?: string) => {
      const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
      setToasts((prev) => [...prev, { id, message, type, icon }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateProfile = useCallback(
    (updates: Partial<IUserProfile>) => {
      setProfile((prev) => {
        const next = { ...prev, ...updates };
        return next;
      });
      showToast('Profile updated successfully!', 'success', '✨');
    },
    [showToast]
  );

  const addOrder = useCallback(
    (order: IOrder) => {
      setOrders((prev) => [order, ...prev]);
      showToast(`Order ${order.id} confirmed! Tracking link generated.`, 'success', '🎉');
    },
    [showToast]
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info', '✓');
  }, [showToast]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    showToast('Notification center cleared', 'info', '🗑️');
  }, [showToast]);

  const addNotification = useCallback(
    (notif: Omit<INotification, 'id' | 'timestamp' | 'read'>) => {
      const newNotif: INotification = {
        ...notif,
        id: 'notif-' + Date.now(),
        timestamp: 'Just now',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    []
  );

  const openProfile = useCallback((tab: string = 'profile') => {
    setActiveProfileTab(tab);
    setIsProfileOpen(true);
  }, []);

  const closeProfile = useCallback(() => {
    setIsProfileOpen(false);
  }, []);

  const openNotifications = useCallback(() => {
    setIsNotificationsOpen(true);
  }, []);

  const closeNotifications = useCallback(() => {
    setIsNotificationsOpen(false);
  }, []);

  const openCheckout = useCallback(() => {
    setIsCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
  }, []);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        orders,
        addOrder,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        addNotification,
        isProfileOpen,
        openProfile,
        closeProfile,
        activeProfileTab,
        setActiveProfileTab,
        isNotificationsOpen,
        openNotifications,
        closeNotifications,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
