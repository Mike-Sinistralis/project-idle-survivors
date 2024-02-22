import { useApp } from '@pixi/react';
import { Texture, BaseTexture, Rectangle } from 'pixi.js';
import {
  useEffect, useState, useRef, useMemo,
} from 'react';
import { RENDER_ID_TO_SPRITE_DATA } from '../const/renderCache';

export const RENDER_IDS = {
  PLAYER: 'player',
  SLIME: 'slime',
};

// TODO: Maybe at some point in the future this will need expiration times
const RENDER_CACHE = {};

// const baseTexture = BaseTexture.from(PlayerSprite);
// const frames = [];
// frames.push(new Texture(baseTexture));

function useRenderable({
  renderId,
}) {
  const app = useApp();

  const [textures, setTextures] = useState([]);
  const spriteRef = useRef(null);
  const {
    numberOfFrames,
    sprite,
    scale,
    loop,
    animationSpeed,
  } = useMemo(() => RENDER_ID_TO_SPRITE_DATA[renderId], [renderId]);

  // On mount, check render cache for frame data. If it's missing, initialize it.
  useEffect(() => {
    if (RENDER_CACHE[renderId]) {
      setTextures(RENDER_CACHE[renderId]);
    } else {
      const baseTexture = BaseTexture.from(sprite);
      const frames = [];

      if (numberOfFrames === 1) {
        frames.push(new Texture(baseTexture));
      } else {
        for (let i = 0; i < 8; i += 1) {
          const frame = new Rectangle(i * 128, 0, 128, 128);
          frames.push(new Texture(baseTexture, frame));
        }
      }

      RENDER_CACHE[renderId] = frames;
      setTextures(frames);
    }
  }, [app, renderId]);

  useEffect(() => {
    // Once textures are loaded, start the animation
    if (textures.length > 0 && spriteRef.current) {
      spriteRef.current.play();
    }
  }, [textures]);

  return {
    textures,
    spriteRef,
    scale,
    loop,
    animationSpeed,
  };
}

export default useRenderable;