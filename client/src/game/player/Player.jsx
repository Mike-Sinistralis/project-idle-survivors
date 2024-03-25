import { AnimatedSprite, useTick } from '@pixi/react';
import { Texture, BaseTexture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { keyStore } from 'game/managers/hooks/useUserInput';
import { usePrevious } from 'common/hooks/usePrevious';
import PlayerSprite from 'assets/player.png';
import useRenderable, { RENDER_IDS } from 'game/sprites/hooks/useRenderable';
import { useViewportOffset } from 'game/managers/hooks/useViewportOffset';
import { useEntityManager } from 'game/managers/hooks/useTileEntityManager';
import { usePlayer } from './hooks/usePlayer';

const baseTexture = BaseTexture.from(PlayerSprite);
const frames = [];
frames.push(new Texture(baseTexture));

function Player({
  id, stageWidth, stageHeight, ...props
}) {
  const { getEntity, updateEntity } = useEntityManager();
  usePlayer(id);

  const { pressed, isPressed } = keyStore();
  const previousPressed = usePrevious(pressed);

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
  } = getEntity(id);

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

    // allow for flipping the sprite
    const updateScale = (newDirection) => {
      if ((newDirection.x < 0 && customScale.x > 0) || (newDirection.x > 0 && customScale.x < 0)) {
        setCustomScale({ x: -customScale.x, y: customScale.y });
      }
    };

    updateScale(normalDirection);

    updateEntity(id, { direction: normalDirection });
  }, [isPressed, pressed, previousPressed, customScale, updateEntity, id]);

  useTick((delta) => {
    if (!speed) return;
    // Update position based on direction and delta time
    const newPos = {
      x: position.x + direction.x * speed * delta,
      y: position.y + direction.y * speed * delta,
    };

    updateEntity(id, { position: newPos });
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
