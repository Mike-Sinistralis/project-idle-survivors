import { Container, useTick } from '@pixi/react';
import { useEffect, useMemo } from 'react';

import { useEntityManager, ENTITY_TYPES, ENTITY_COMPONENTS } from './hooks/useTileEntityManager';

function isColliding(entityA, entityB) {
  const dx = entityA.position.x - entityB.position.x;
  const dy = entityA.position.y - entityB.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < (entityA.collisionRadius + entityB.collisionRadius);
}

// For some reason saving this file kills everything, need to figure out why.

function TileEntityManager({ width, height }) {
  const {
    entityList,
    entityIds,
    registerEntity,
    registerEntities,
    unregisterEntity,
    unregisterEntities,
    getEntity,
    getPlayer,
    version,
    registerPlayer,
    unregisterPlayer,
  } = useEntityManager();

  // For testing
  useEffect(() => {
    window.entityList = entityList;
    window.registerEntity = registerEntity;
    window.unregisterEntity = unregisterEntity;
    window.getEntity = getEntity;
    window.registerEntities = registerEntities;
    window.unregisterEntities = unregisterEntities;
    window.getPlayer = getPlayer;
    window.registerPlayer = registerPlayer;
    window.unregisterPlayer = unregisterPlayer;

    window.ENTITY_TYPES = ENTITY_TYPES;
  }, [entityList, getEntity, getPlayer, registerEntities, registerEntity, registerPlayer, unregisterEntities, unregisterEntity, unregisterPlayer]);

  useEffect(() => {
    // In the future, the Scene or Biome or Level will be responsible for registering entities
    registerPlayer({
      position: { x: 0, y: 0 },
      screenPosition: { x: width / 2, y: height / 2 },
      direction: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
    });

    const slimeIds = registerEntities(Array.from({ length: 1 }).map(() => ({
      entityType: ENTITY_TYPES.SLIME,
      entity: {
        position: { x: 0, y: 0 },
        screenPosition: { x: 0, y: 0 },
        direction: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
      },
    })));

    return () => {
      unregisterPlayer();
      unregisterEntities(slimeIds);
    };
  }, [height, registerEntities, registerPlayer, unregisterEntities, unregisterPlayer, width]);

  /*
    Entities collide with the player by either running into them, or an effect owned by the enemy collides with the player

    The player collides with the entities specifically through effects only, though a mechanic like Thorns might be relevant
    and should be handled in the onCollide function.
  */
  useTick((delta) => {
    const player = getPlayer();

    if (!player) return;

    entityIds.forEach((idA) => {
      const entityA = getEntity(idA);

      if (isColliding(entityA, player)) {
        entityA?.onCollide(entityA, player);
        player?.onCollide(player, entityA);
      }
    });
  });

  const entityComponents = useMemo(() => {
    const entitiesArray = Array.from(entityList.values());
    const player = getPlayer();

    if (player) {
      entitiesArray.push(player);
    }

    if (!entitiesArray.length) return false;

    return entitiesArray.map(({ type, id }) => {
      const Component = ENTITY_COMPONENTS[type];
      return <Component key={id} stageWidth={width} stageHeight={height} id={id} version={version} />;
    });
  }, [entityList, getPlayer, width, height, version]);

  console.log(entityComponents);

  return (
    <Container>
      {entityComponents}
    </Container>
  );
}

export default TileEntityManager;
