/* eslint-disable no-param-reassign */
import Player from 'game/entities/player/Player';
import Slime from 'game/entities/slime/Slime';
import { create } from 'zustand';

// Function that generates sequential ID's that loop back around after reaching 100k
function* generateId(limit = 1000000) {
  let id = 0;
  while (true) {
    yield id;
    id = (id + 1) % limit;
  }
}

const idGenerator = generateId();

/*
  React is heavily dependent on immutable data patterns, but we need the performance, so we use an incremental number to force
  updates when certain things happen
*/
const entityListVersion = generateId(1000);
const playerDataVersion = generateId(64);
const entityDataVersion = generateId(64);

const ENTITY_TYPES = {
  SLIME: 'slime',
  PLAYER: 'player',
};

const ENTITY_COMPONENTS = {
  slime: Slime,
  player: Player,
};

const useEntityManager = create((set, get) => ({
  player: null,
  entityList: new Map([]),
  entityIds: new Set([]),
  // This is used to force updates to components when entity lists change.
  entityListVersion: 0,
  playerDataVersion: 0,
  entityDataVersion: 0,
  registerPlayer: (entity = {}) => {
    entity.type = ENTITY_TYPES.PLAYER;
    entity.id = 'player';

    set({ version: entityListVersion.next().value, player: entity });
  },
  registerEntity: (entityType, entity = {}) => {
    /*
    * Get's an ID from generateId, ensures it isn't currently used, then registers the entity with that ID and returns the ID back to the caller
    */
    let id = idGenerator.next().value;
    const { entityList, entityIds } = get();

    while (entityList.has(id)) {
      id = idGenerator.next().value;
    }

    entity.type = entityType;
    entity.id = id;

    entityList.set(id, entity);
    entityIds.add(id);

    set({ version: entityListVersion.next().value });
    return id;
  },
  registerEntities: (entities = []) => {
    const { entityList, entityIds } = get();
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

    set({ version: entityListVersion.next().value });
    return entityIdList;
  },
  getEntity: (id) => {
    const { entityList } = get();

    return entityList.get(id) || {};
  },
  getPlayer: () => {
    const { player } = get();

    return player;
  },
  unregisterPlayer: () => {
    set({ version: entityListVersion.next().value, player: null });
  },
  unregisterEntity: (id) => {
    const { entityList, entityIds } = get();

    entityList.delete(id);
    entityIds.delete(id);

    set({ version: entityListVersion.next().value });
  },
  unregisterEntities: (ids) => {
    const { entityList, entityIds } = get();

    ids.forEach((id) => {
      entityList.delete(id);
      entityIds.delete(id);
    });

    set({ version: entityListVersion.next().value });
  },
  incrementPlayerDataVersion: () => {
    set({ playerDataVersion: playerDataVersion.next().value });
  },
  incrementEntityDataVersion: () => {
    set({ entityDataVersion: entityDataVersion.next().value });
  },
}));

export { useEntityManager, ENTITY_TYPES, ENTITY_COMPONENTS };
