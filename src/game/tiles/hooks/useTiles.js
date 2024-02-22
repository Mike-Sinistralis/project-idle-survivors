import { Texture, BaseTexture } from 'pixi.js';
import { useEffect } from 'react';
import { TILE_ID_TO_TILE_DATA } from '../const/tileCache';

export const TILE_IDS = {
  BRICK: 'brick',
  GRID: 'grid',
  GRASS: 'grass',
};

const TILE_CACHE = {};

function useTiles() {
  useEffect(() => {
    const keys = Object.keys(TILE_ID_TO_TILE_DATA);
    keys.forEach((key) => {
      const baseTexture = BaseTexture.from(TILE_ID_TO_TILE_DATA[key]);
      const texture = Texture.from(baseTexture);
      TILE_CACHE[key] = texture;
    });
  }, []);

  return TILE_CACHE;
}

export default useTiles;
