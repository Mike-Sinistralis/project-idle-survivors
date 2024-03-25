import { Container, useTick } from '@pixi/react';
import { useEffect, useMemo } from 'react';

import { useEntityManager, ENTITY_TYPES, ENTITY_COMPONENTS } from './hooks/useTileEntityManager';

function TileEntityManager({ width, height }) {
  const {
    entityList, registerEntity, unregisterEntity, updateEntity, getEntity,
  } = useEntityManager();

  // For testing
  useEffect(() => {
    window.entityList = entityList;
    window.registerEntity = registerEntity;
    window.unregisterEntity = unregisterEntity;
    window.updateEntity = updateEntity;
    window.getEntity = getEntity;
  }, [entityList, getEntity, registerEntity, unregisterEntity, updateEntity]);

  useEffect(() => {
    const initialIds = [];
    // In the future, the Scene or Biome or Level will be responsible for registering entities
    const { id: playerId } = registerEntity(ENTITY_TYPES.PLAYER, {
      position: { x: 0, y: 0 },
      screenPosition: { x: width / 2, y: height / 2 },
      direction: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
    });

    initialIds.push(playerId);

    Array.from({ length: 1 }).forEach(() => {
      const { id: slimeId } = registerEntity(ENTITY_TYPES.SLIME, {
        position: { x: 0, y: 0 },
        screenPosition: { x: 0, y: 0 },
        direction: { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 },
      });

      initialIds.push(slimeId);
    });

    return () => {
      initialIds.forEach((id) => {
        unregisterEntity(id);
      });
    };
  }, [height, registerEntity, unregisterEntity, width]);

  useTick((delta) => {

  });

  const entityComponents = useMemo(() => {
    const entitiesArray = Array.from(entityList.values());

    return entitiesArray.map(({ type, id }) => {
      const Component = ENTITY_COMPONENTS[type];
      return <Component key={id} stageWidth={width} stageHeight={height} id={id} />;
    });
  }, [entityList, width, height]);

  return (
    <Container>
      {entityComponents}
    </Container>
  );
}

export default TileEntityManager;
