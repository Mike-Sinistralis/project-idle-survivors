import Player from 'game/player/Player';
import SlimeWalk from 'game/sprites/slime/SlimeWalk';
import { create } from 'zustand';

// Function that generates sequential ID's that loop back around after reaching 1 million.
function* generateId() {
  let id = 0;
  while (true) {
    yield id;
    id = (id + 1) % 1000000;
  }
}

const idGenerator = generateId();

const ENTITY_TYPES = {
  SLIME: 'slime',
  PLAYER: 'player',
};

const ENTITY_COMPONENTS = {
  slime: SlimeWalk,
  player: Player,
};

// Global Context - Changes here affect all slimes
const useEntityManager = create((set, get) => ({
  entityList: new Map([]),
  registerEntity: (entityType, entity = {}) => {
    /*
    * Get's an ID from generateId, ensures it isn't currently used, then registers the entity with that ID and returns the ID back to the caller
    */
    let id = idGenerator.next().value;
    const { entityList } = get();

    while (entityList.has(id)) {
      id = idGenerator.next().value;
    }

    const entityData = { type: entityType, id, ...entity };

    const nextMap = new Map(entityList);
    nextMap.set(id, entityData);
    set({ entityList: nextMap });

    return entityData;
  },
  getEntity: (id) => {
    const { entityList } = get();
    return entityList.get(id) || {};
  },
  unregisterEntity: (id) => {
    const { entityList } = get();
    const nextMap = new Map(entityList);

    nextMap.delete(id);
    set({ entityList: nextMap });
  },
  updateEntity: (id, entity) => {
    const { entityList, getEntity } = get();
    const existingEntity = getEntity(id);
    entityList.set(id, { ...existingEntity, ...entity });
    set({ entityList });
  },
}));

export { useEntityManager, ENTITY_TYPES, ENTITY_COMPONENTS };
