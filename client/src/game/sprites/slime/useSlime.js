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
  const { getEntity, updateEntity } = useEntityManager();
  const slimeEntityData = getEntity(id);
  const { health, speed } = slimeEntityData;

  /*
    If the component this data is tied to mounts, initialize the entity data.
    Keep in mind this entity might have already been registered, but was culled, so check if it exists.
  */
  useEffect(() => {
    updateEntity(id, {
      health: health || baseHealth,
      speed: speed || (baseSpeed + getSpeedModifier()),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSlow = useCallback((slowAmount = 1) => {
    const newSpeed = speed - slowAmount;
    updateEntity(id, { speed: newSpeed });
  }, [id, speed, updateEntity]);

  return { onSlow };
};

export { useSlime };
