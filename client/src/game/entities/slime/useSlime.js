import { useEntityManager } from 'game/managers/hooks/useTileEntityManager';
import { useCallback, useEffect } from 'react';
import { create } from 'zustand';

// Global Context - Changes here affect all slimes
const slimeStore = create(() => ({
  baseSpeed: 5,
  baseHealth: 100,
  getSpeedModifier: () => Math.floor(Math.random() * 4),
}));

// Instance Context - Changes here affect individual slimes
const useSlime = (id) => {
  // Get the base stats for a Slime
  const { baseSpeed, baseHealth, getSpeedModifier } = slimeStore();
  const { getEntity } = useEntityManager();
  const slimeEntity = getEntity(id);
  const { health, speed, collisionRadius } = slimeEntity;

  /*
    If the component this data is tied to mounts, initialize the entity data.
    Keep in mind this entity might have already been registered, but was culled, so check if it exists.
  */
  useEffect(() => {
    slimeEntity.speed = speed || baseSpeed + getSpeedModifier();
    slimeEntity.health = health || baseHealth;
    slimeEntity.collisionRadius = collisionRadius || 20;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSlow = useCallback((slowAmount = 1) => {
    const newSpeed = Math.max(speed - slowAmount, 0);
    slimeEntity.speed = newSpeed;
  }, [slimeEntity, speed]);

  return { onSlow };
};

export { useSlime };
