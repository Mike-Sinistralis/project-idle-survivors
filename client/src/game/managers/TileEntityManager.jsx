import { Container } from '@pixi/react';
import { useEffect, useMemo } from 'react';

import { useEntityManager, ENTITY_TYPES, ENTITY_COMPONENTS } from './hooks/useTileEntityManager';

function TileEntityManager({ width, height }) {
  const {
    entityList, registerEntity, registerEntities, unregisterEntity, unregisterEntities, getEntity, version,
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
