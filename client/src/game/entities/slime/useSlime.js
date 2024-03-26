/* eslint-disable no-param-reassign */
import { useEntityManager } from 'game/managers/hooks/useTileEntityManager';
import { useCallback, useEffect } from 'react';
import { create } from 'zustand';

// Global Context - Changes here affect all slimes
const slimeStore = create(() => ({
  baseSpeed: 5,
  baseHealth: 100,
  getSpeedModifier: () => Math.floor(Math.random() * 4),
  handleEntityCollide: (slime, entity) => {
    const { id: entityId, type } = entity;

    // console.log(`Slime collided with entity ${entityId || 'Player'} of type ${type} at position ${slime.position.x}, ${slime.position.y}!`);
  },
}));

// Instance Context - Changes here affect individual slimes
const useSlime = (id) => {
  // Get the base stats for a Slime
  const {
    baseSpeed, baseHealth, getSpeedModifier, handleEntityCollide,
  } = slimeStore();

  const { getEntity, incrementEntityDataVersion } = useEntityManager();

  const slimeEntity = getEntity(id);

  const {
    health, speed, collisionRadius, onCollide,
  } = slimeEntity;

  /*
    If the component this data is tied to mounts, initialize the entity data.
    Keep in mind this entity might have already been registered, but was culled, so check if it exists.
  */
  useEffect(() => {
    slimeEntity.speed = speed !== undefined ? speed : baseSpeed + getSpeedModifier();
    slimeEntity.health = health || baseHealth;
    slimeEntity.collisionRadius = collisionRadius || 10;
    slimeEntity.onCollide = onCollide || handleEntityCollide;

    incrementEntityDataVersion();
  }, [baseHealth, baseSpeed, collisionRadius, getSpeedModifier, handleEntityCollide, health, incrementEntityDataVersion, onCollide, slimeEntity, speed]);

  const onSlow = useCallback((slowAmount = 1) => {
    const newSpeed = Math.max(speed - slowAmount, 0);
    slimeEntity.speed = newSpeed;
  }, [slimeEntity, speed]);

  return { onSlow };
};

export { useSlime };
