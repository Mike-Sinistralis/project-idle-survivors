import {
  useTick, Sprite, Container,
} from '@pixi/react';
import {
  useState,
} from 'react';
import { useViewportOffset } from 'game/managers/hooks/useViewportOffset';
import useTiles, { TILE_IDS } from 'game/tiles/hooks/useTiles';

const world = {};
const renderDistance = 64;
for (let i = -32; i < 32; i += 1) {
  for (let j = -32; j < 32; j += 1) {
    world[`${i}-${j}`] = TILE_IDS.GRASS;
  }
}

function TileWorld() {
  const viewport = useViewportOffset();
  const tiles = useTiles();
  const [children, setChildren] = useState([]);

  useTick(() => {
    const newChildren = [];
    const origin = { x: Math.round(viewport.offset.x / 32), y: Math.round(viewport.offset.y / 32) };

    for (let i = -renderDistance; i < renderDistance; i += 1) {
      for (let j = -renderDistance; j < renderDistance; j += 1) {
        const key = `${origin.x + i}-${origin.y + j}`;
        const tileId = world[key] || TILE_IDS.GRID;
        const { texture } = tiles[tileId];
        const tile = {
          texture,
          x: i * 32,
          y: j * 32,
        };

        newChildren.push(tile);
      }
    }

    setChildren(newChildren);
  }, [viewport]);

  return (
    <Container>
      {
        children.map((child) => (<Sprite texture={child.texture} x={child.x} y={child.y} anchor={0.5} />))
      }
    </Container>
  );
}

export default TileWorld;
