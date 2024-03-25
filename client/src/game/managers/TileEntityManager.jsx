import { Container, useTick } from '@pixi/react';
import { useEffect, useMemo } from 'react';

import { useEntityManager, ENTITY_TYPES, ENTITY_COMPONENTS } from './hooks/useTileEntityManager';

function isColliding(entityA, entityB) {
  const dx = entityA.position.x - entityB.position.x;
  const dy = entityA.position.y - entityB.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < (entityA.collisionRadius + entityB.collisionRadius);
}

function TileEntityManager({ width, height }) {
  const {
    entityList, entityIds, registerEntity, registerEntities, unregisterEntity, unregisterEntities, getEntity, version,
  } = useEntityManager();

  // For testing
  useEffect(() => {
    window.entityList = entityList;
    window.registerEntity = registerEntity;
    window.unregisterEntity = unregisterEntity;
    window.getEntity = getEntity;
    window.registerEntities = registerEntities;
    window.unregisterEntities = unregisterEntities;

    window.ENTITY_TYPES = ENTITY_TYPES;
  }, [entityList, getEntity, registerEntities, registerEntity, unregisterEntities, unregisterEntity]);

  useEffect(() => {
    // In the future, the Scene or Biome or Level will be responsible for registering entities
    const playerId = registerEntity(ENTITY_TYPES.PLAYER, {
      position: { x: 0, y: 0 },
      screenPosition: { x: width / 2, y: height / 2 },
      direction: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
    });

    const slimeIds = registerEntities(Array.from({ length: 10 }).map(() => ({
      entityType: ENTITY_TYPES.SLIME,
      entity: {
        position: { x: 0, y: 0 },
        screenPosition: { x: 0, y: 0 },
        direction: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
      },
    })));

    return () => {
      unregisterEntities([playerId, ...slimeIds]);
    };
  }, [height, registerEntities, registerEntity, unregisterEntities, width]);

  // I'm sure Delta will be useful later for things like rapid damage applications
  useTick((delta) => {
    const processed = new Set();

    entityIds.forEach((idA) => {
      const entityA = getEntity(idA);
      processed.add(idA); // Mark this ID as processed

      entityIds.forEach((idB) => {
        if (!processed.has(idB)) {
          const entityB = getEntity(idB);
          if (isColliding(entityA, entityB)) {
            console.log(`Entity ${idA} of type ${entityA.type} is colliding with ${idB} of type ${entityB.type}!`);
          }
        }
      });
    });
  });

  const entityComponents = useMemo(() => {
    const entitiesArray = Array.from(entityList.values());

    return entitiesArray.map(({ type, id }) => {
      const Component = ENTITY_COMPONENTS[type];
      return <Component key={id} stageWidth={width} stageHeight={height} id={id} version={version} />;
    });
  }, [entityList, version, width, height]);

  return (
    <Container>
      {entityComponents}
    </Container>
  );
}

export default TileEntityManager;
