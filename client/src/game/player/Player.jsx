import { AnimatedSprite, useTick } from '@pixi/react';
import { Texture, BaseTexture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { keyStore } from 'game/managers/hooks/useUserInput';
import { usePrevious } from 'common/hooks/usePrevious';
import PlayerSprite from 'assets/player.png';
import useRenderable, { RENDER_IDS } from 'game/sprites/hooks/useRenderable';
import { useViewportOffset } from 'game/managers/hooks/useViewportOffset';
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
    scale,
    ...renderableProps
  } = useRenderable({
    renderId: RENDER_IDS.PLAYER,
  });

  const viewport = useViewportOffset();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [screenPosition] = useState({ x: stageWidth / 2, y: stageHeight / 2 });
  const [customScale, setCustomScale] = useState({ x: scale.x, y: scale.y });
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

    // allow for flipping the sprite
    const updateScale = (newDirection) => {
      if ((newDirection.x < 0 && customScale.x > 0) || (newDirection.x > 0 && customScale.x < 0)) {
        setCustomScale({ x: -customScale.x, y: customScale.y });
      }
    };

    updateScale(normalDirection);
    setDirection(normalDirection);
  }, [isPressed, pressed, previousPressed, customScale]);

  useTick((delta) => {
    // Update position based on direction and delta time
    const newPos = {
      x: position.x + direction.x * speed * delta,
      y: position.y + direction.y * speed * delta,
    };

    setPosition(newPos);
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
