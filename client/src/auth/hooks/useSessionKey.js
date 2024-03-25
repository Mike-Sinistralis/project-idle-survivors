import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSessionKey = create(persist(
  (set) => ({
    sessionKey: null,
    setSessionKey: (nextSessionKey) => {
      set({ sessionKey: nextSessionKey });
    },
    reset: () => set({ sessionKey: null }),
  }),
  {
    name: 'idle-survivors-session-key',
    getStorage: () => localStorage,
  },
));

export { useSessionKey };
