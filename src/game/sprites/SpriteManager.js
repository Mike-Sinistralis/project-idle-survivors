import { usePrevious } from 'common/hooks/usePrevious';
import { useCallback, useEffect } from 'react';
import { create } from 'zustand';

// Global Context - Changes here affect all slimes
const keyStore = create((set, get) => ({
  pressed: [],
  setPressed: (key) => {
    set((state) => {
      if (!state.pressed.includes(key)) {
        return { pressed: [...state.pressed, key] };
      }
      return state;
    });
  },
}));

const useUserInput = () => {
  const { pressed } = keyStore();
  const previousPressed = usePrevious(pressed);
  const isPressed = useCallback((key) => pressed.includes(key), [pressed]);

  const handleKey = useCallback((event, value) => {
    const key = event.key.toLowerCase();
  }, []);

  const handleKeyDown = useCallback((event) => {
    handleKey(event, true);
  }, [handleKey]);

  const handleKeyUp = useCallback((event) => {
    handleKey(event, false);
  }, [handleKey]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if (pressed !== previousPressed) {
      // a new key has been pressed or let go of!
    }
  }, [pressed, previousPressed]);
};

export { useUserInput };
