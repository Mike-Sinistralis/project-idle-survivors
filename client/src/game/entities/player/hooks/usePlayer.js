/* eslint-disable no-param-reassign */
import { useEntityManager } from 'game/managers/hooks/useTileEntityManager';
import { useEffect } from 'react';
import { create } from 'zustand';

const playerStore = create(() => ({
  baseSpeed: 10,
  handleEntityCollide: (entity, player) => {
    const { id: entityId, type } = entity;

    console.log(`Player collided with entity ${entityId} of type ${type} at position ${player.position.x}, ${player.position.y}!`);
  },
}));

const usePlayer = () => {
  const { baseSpeed, handleEntityCollide } = playerStore();
  const { getPlayer, incrementPlayerDataVersion } = useEntityManager();

  const playerEntity = getPlayer();

  const { speed, collisionRadius, onCollide } = playerEntity;

  /*
    If the component this data is tied to mounts, initialize the entity data.
    Keep in mind this entity might have already been registered, but was culled, so check if it exists.
  */
  useEffect(() => {
    playerEntity.speed = speed || baseSpeed;
    playerEntity.collisionRadius = collisionRadius || 20;
    playerEntity.onCollide = onCollide || handleEntityCollide;

    incrementPlayerDataVersion();
  }, [baseSpeed, collisionRadius, handleEntityCollide, incrementPlayerDataVersion, onCollide, playerEntity, speed]);
};

export { usePlayer };
