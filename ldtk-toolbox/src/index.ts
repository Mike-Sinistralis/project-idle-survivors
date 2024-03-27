import { World as WorldLoader } from 'ldtk';

/* 
  world.levels.layerInstances
  - __gridSize contains the size of the grid. (Seems to always be a square so this will work for both dimentions)
  - __cWid is the size of the level horizontally
  - __cHei is the size of the level vertically
  - If autolayer, .autoLayerTiles
  - If tiles, .gridTiles
  - If entities, .entityInstances
    - px is an array of [x, y] coordinates
    - src is the tile that occupies this coordinate [x, y]
    - You can get the grid size from 
  
  So a builder would
    - For a level
      - determine grid size, total width, total height
      - Iterate over layerInstances from length to 0
      - Fill in a 2D Array with the tiles (px/__GridSize to get the index)
        - Overwrite the element as you move up the layers
        - If the element being inserted is a collision layer (this seems to be arbitrary so we need a naming convention), tag it as collidable
        - I don't think we will use this for entities, but we can place entities or other things randomly once the "map" is built
*/
WorldLoader.loadRaw('./src/tilemaps/dungeoun/dungeon.ldtk').then(async (world) => {
  if (!world) {
    console.error('Failed to load the world');
    return;
  }

  debugger;
  console.log(world);
});

/*
  How to access Zutand data outside of a component

  useTileEntityManager.getState().entityList
*/