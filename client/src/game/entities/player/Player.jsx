import { AnimatedSprite, useTick } from '@pixi/react';
import { Texture, BaseTexture } from 'pixi.js';
import { useState } from 'react';

import { keyStore } from 'game/managers/hooks/useUserInput';
import PlayerSprite from 'assets/player.png';
import useRenderable, { RENDER_IDS } from 'game/sprites/hooks/useRenderable';
import { useViewportOffset } from 'game/managers/hooks/useViewportOffset';
import { useEntityManager } from 'game/managers/hooks/useTileEntityManager';
import { usePlayer } from './hooks/usePlayer';

const baseTexture = BaseTexture.from(PlayerSprite);
const frames = [];
frames.push(new Texture(baseTexture));

const inputKeys = ['w', 'a', 's', 'd'];

function Player({
  stageWidth, stageHeight, ...props
}) {
  const { getPlayer } = useEntityManager();
  const playerEntity = getPlayer();

  usePlayer();

  const { isPressed } = keyStore();

  const {
    textures,
    spriteRef,
    scale,
    ...renderableProps
  } = useRenderable({
    renderId: RENDER_IDS.PLAYER,
  });

  const viewport = useViewportOffset();
  const [customScale, setCustomScale] = useState({ x: scale.x, y: scale.y });

  const {
    position,
    screenPosition,
    direction,
    speed,
  } = playerEntity;

  useTick(() => {
    const normalDirection = { x: 0, y: 0 };

    const inputMap = {
      w: () => { normalDirection.y -= 1; },
      a: () => { normalDirection.x -= 1; },
      s: () => { normalDirection.y += 1; },
      d: () => { normalDirection.x += 1; },
    };

    inputKeys.forEach((key) => {
      if (isPressed(key)) {
        inputMap[key]();
      }
    });

    // allow for flipping the sprite
    const updateScale = (newDirection) => {
      if ((newDirection.x < 0 && customScale.x > 0) || (newDirection.x > 0 && customScale.x < 0)) {
        setCustomScale({ x: -customScale.x, y: customScale.y });
      }
    };

    updateScale(normalDirection);
    playerEntity.direction = normalDirection;
  });

  useTick((delta) => {
    if (!speed) return;

    // Update position based on direction and delta time
    const newPos = {
      x: position.x + direction.x * speed * delta,
      y: position.y + direction.y * speed * delta,
    };

    playerEntity.position = newPos;
    viewport.setOffset(newPos);
  });

  if (textures.length === 0) {
    return null;
  }

  return (
    <AnimatedSprite
      ref={spriteRef}
      textures={textures}
      position={screenPosition}
      scale={customScale}
      {...renderableProps}
      {...props}
    />
  );
}

export default Player;
