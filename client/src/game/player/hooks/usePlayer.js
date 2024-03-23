import { useState } from 'react';
import { create } from 'zustand';

// Global Context - Changes here affect all slimes
const playerStore = create(() => ({
  baseSpeed: 10,
}));

// Instance Context - Changes here affect individual slimes
const usePlayer = () => {
  // Get the base stats for a Slime
  const { baseSpeed } = playerStore();

  const [stats, setStats] = useState({
    speed: baseSpeed,
  });

  return { stats, setStats };
};

export { usePlayer };
