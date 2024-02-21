import { useCallback, useEffect, useState } from 'react';
import { create } from 'zustand';

// Global Context - Changes here affect all slimes
const slimeStore = create(() => ({
  baseSpeed: 5,
  baseHealth: 100,
  getSpeedModifier: () => Math.floor(Math.random() * 4),
}));

// Instance Context - Changes here affect individual slimes
const useSlime = () => {
  // Get the base stats for a Slime
  const { baseSpeed, baseHealth, getSpeedModifier } = slimeStore();

  // Implement those stats for this Slime, plus any individual randomness.
  const [stats, setStats] = useState({
    health: baseHealth,
    speed: baseSpeed + getSpeedModifier(),
  });

  // This could probably live in a "useEntity" or "useDamagable" hook that had generic logic.
  const onDamaged = useCallback((damage) => {
    setStats((prev) => ({ ...prev, health: prev.health - damage }));
  }, []);

  const onSlow = useCallback((slowAmount = 1) => {
    setStats((prev) => {
      const newSpeed = prev.speed - slowAmount;
      return { ...prev, speed: newSpeed < 0 ? 0 : newSpeed };
    });
  }, []);

  useEffect(() => {
    if (stats.health <= 0) {
      console.log('Slime is dead');
    }
  }, [stats.health]);

  return { stats, onSlow, onDamaged };
};

export { useSlime };
