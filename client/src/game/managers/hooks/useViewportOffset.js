import { create } from 'zustand';

const viewport = create((set) => ({
  offset: { x: 0, y: 0 },
  setOffset: (state) => {
    set({ offset: state });
  },
}));

const useViewportOffset = () => {
  const { offset, setOffset } = viewport();

  return { offset, setOffset };
};

export { useViewportOffset };
