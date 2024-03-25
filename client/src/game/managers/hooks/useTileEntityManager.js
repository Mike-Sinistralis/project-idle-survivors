/* eslint-disable no-param-reassign */
import Player from 'game/entities/player/Player';
import Slime from 'game/entities/slime/Slime';
import { create } from 'zustand';

// Function that generates sequential ID's that loop back around after reaching 100k
function* generateId() {
  let id = 0;
  while (true) {
    yield id;
    id = (id + 1) % 100000;
  }
}

const idGenerator = generateId();
const versionGenerator = generateId();

const ENTITY_TYPES = {
  SLIME: 'slime',
  PLAYER: 'player',
};

const ENTITY_COMPONENTS = {
  slime: Slime,
  player: Player,
};

// Global Context - Changes here affect all slimes
const useEntityManager = create((set, get) => ({
  entityList: new Map([]),
  entityIds: new Set([]),
  // This is used to force updates to components when entity lists change.
  version: 0,
  registerEntity: (entityType, entity = {}) => {
    /*
    * Get's an ID from generateId, ensures it isn't currently used, then registers the entity with that ID and returns the ID back to the caller
    */
    let id = idGenerator.next().value;
    const { version, entityList, entityIds } = get();

    while (entityList.has(id)) {
      id = idGenerator.next().value;
    }

    entity.type = entityType;
    entity.id = id;

    entityList.set(id, entity);
    entityIds.add(id);

    set({ version: version + versionGenerator.next().value });
    return id;
  },
  registerEntities: (entities = []) => {
    const { version, entityList, entityIds } = get();
    const entityIdList = [];

    entities.forEach(({ entityType, entity }) => {
      /*
      * Get's an ID from generateId, ensures it isn't currently used, then registers the entity with that ID and returns the ID back to the caller
      */
      let id = idGenerator.next().value;

      while (entityList.has(id)) {
        id = idGenerator.next().value;
      }

      entity.type = entityType;
      entity.id = id;

      entityIdList.push(id);
      entityIds.add(id);

      entityList.set(id, entity);
    });

    set({ version: version + versionGenerator.next().value });
    return entityIdList;
  },
  getEntity: (id) => {
    const { entityList } = get();

    return entityList.get(id) || {};
  },
  unregisterEntity: (id) => {
    const { version, entityList, entityIds } = get();

    entityList.delete(id);
    entityIds.delete(id);

    set({ version: version + versionGenerator.next().value });
  },
  unregisterEntities: (ids) => {
    const { version, entityList, entityIds } = get();

    ids.forEach((id) => {
      entityList.delete(id);
      entityIds.delete(id);
    });

    set({ version: version + versionGenerator.next().value });
  },
}));

export { useEntityManager, ENTITY_TYPES, ENTITY_COMPONENTS };
