import { useCallback, useEffect } from 'react';
import { create } from 'zustand';

// Global Context - Changes here affect all slimes
const keyStore = create((set, get) => ({
  pressed: [],
  // 2 functions, one for pushing a key into pressed, and one for removing a key
  setPressed: (key) => {
    set((state) => {
      if (!state.pressed.includes(key)) {
        return { pressed: [...state.pressed, key] };
      }
      return state;
    });
  },
  removePressed: (key) => {
    set((state) => ({ pressed: state.pressed.filter((k) => k !== key) }));
  },
  isPressed: (key) => get().pressed.includes(key),
}));

// This is used by the UserInputManager only, if keys need consumed use the keyStore.
const useUserInput = () => {
  const { setPressed, removePressed } = keyStore();

  const handleKeyDown = useCallback((event) => {
    setPressed(event.key.toLowerCase());
    console.log('pressed', event.key.toLowerCase());
  }, [setPressed]);

  const handleKeyUp = useCallback((event) => {
    removePressed(event.key.toLowerCase());
    console.log('un-pressed', event.key.toLowerCase());
  }, [removePressed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
};

export { keyStore, useUserInput };
