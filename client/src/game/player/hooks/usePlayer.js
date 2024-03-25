import { useEntityManager } from 'game/managers/hooks/useTileEntityManager';
import { useEffect } from 'react';
import { create } from 'zustand';

const playerStore = create(() => ({
  baseSpeed: 10,
}));

const usePlayer = (id) => {
  const { baseSpeed } = playerStore();
  const { getEntity, updateEntity } = useEntityManager();

  const playerData = getEntity(id);
  const { speed } = playerData;

  /*
    If the component this data is tied to mounts, initialize the entity data.
    Keep in mind this entity might have already been registered, but was culled, so check if it exists.
  */
  useEffect(() => {
    updateEntity(id, {
      speed: speed || (baseSpeed),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { usePlayer };
