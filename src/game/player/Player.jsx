import { AnimatedSprite, useTick } from '@pixi/react';
import { Texture, BaseTexture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { keyStore } from 'game/managers/hooks/useUserInput';
import { usePrevious } from 'common/hooks/usePrevious';
import PlayerSprite from 'assets/player.png';
import useRenderable, { RENDER_IDS } from 'game/sprites/hooks/useRenderable';
import { usePlayer } from './hooks/usePlayer';

const baseTexture = BaseTexture.from(PlayerSprite);
const frames = [];
frames.push(new Texture(baseTexture));

function Player({ stageWidth, stageHeight, ...props }) {
  const { pressed, isPressed } = keyStore();
  const previousPressed = usePrevious(pressed);

  const {
    textures,
    spriteRef,
    ...renderableProps
  } = useRenderable({
    renderId: RENDER_IDS.PLAYER,
  });

  const [position, setPosition] = useState({ x: stageWidth / 2, y: stageHeight / 2 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });

  const { stats } = usePlayer();
  const { speed } = stats;

  useEffect(() => {
    const normalDirection = { x: 0, y: 0 };

    const inputMap = {
      w: () => { normalDirection.y -= 1; },
      a: () => { normalDirection.x -= 1; },
      s: () => { normalDirection.y += 1; },
      d: () => { normalDirection.x += 1; },
    };

    Object.keys(inputMap).forEach((key) => {
      if (isPressed(key)) {
        inputMap[key]();
      }
    });

    setDirection(normalDirection);
  }, [isPressed, pressed, previousPressed]);

  useTick((delta) => {
    // Update position based on direction and delta time
    const newPos = {
      x: position.x + direction.x * speed * delta,
      y: position.y + direction.y * speed * delta,
    };

    setPosition(newPos);
  });

  if (textures.length === 0) {
    return null;
  }

  return (
    <AnimatedSprite
      ref={spriteRef}
      textures={textures}
      position={position}
      {...renderableProps}
      {...props}
    />
  );
}

export default Player;
