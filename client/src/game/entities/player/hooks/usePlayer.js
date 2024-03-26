/* eslint-disable no-param-reassign */
import { useEffect } from 'react';
import { create } from 'zustand';

const playerStore = create(() => ({
  baseSpeed: 10,
  handleEntityCollide: (entity, player) => {
    const { id: entityId, type } = entity;

    // console.log(`Player collided with entity ${entityId} of type ${type} at position ${player.position.x}, ${player.position.y}!`);
  },
}));

const usePlayer = (getPlayer) => {
  const { baseSpeed, handleEntityCollide } = playerStore();
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
  }, [baseSpeed, collisionRadius, handleEntityCollide, onCollide, playerEntity, speed]);
};

export { usePlayer };
