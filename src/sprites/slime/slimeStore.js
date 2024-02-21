import { create } from 'zustand';

const useSlimeStore = create((set) => ({
  baseSpeed: 5,
  getSpeedModifier: Math.floor(Math.random() * 4),
  setBaseSpeed: (speed) => {
    set({ slimeSpeed: speed });
  },
}));

// If we need to combine things together, you can put this store into a hook which can import other stores and compose them.

export { useSlimeStore };
