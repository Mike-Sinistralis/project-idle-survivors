import { AnimatedSprite, useTick } from '@pixi/react';
import {
  useCallback, useEffect, useState,
} from 'react';
import { useSlime } from 'game/sprites/slime/useSlime';
import { useViewportOffset } from 'game/managers/hooks/useViewportOffset';
import useRenderable, { RENDER_IDS } from '../hooks/useRenderable';

const offScreenMax = -80;

function SlimeWalk({ stageWidth, stageHeight, ...props }) {
  const { textures, spriteRef, ...renderableProps } = useRenderable({
    renderId: RENDER_IDS.SLIME,
  });

  const viewport = useViewportOffset();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [screenPosition, setScreenPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 });
  const { stats, onSlow } = useSlime();
  const { speed } = stats;

  const handleSlimeClick = useCallback(() => {
    onSlow(1);
  }, [onSlow]);

  useEffect(() => {
    const sprite = spriteRef.current;

    if (sprite && textures.length > 0) {
      sprite.interactive = true; // Make the sprite interactive
      sprite.buttonMode = true; // Change the cursor on hover
      sprite.on('pointertap', handleSlimeClick); // Add an event listener
    }

    return () => {
      // Cleanup function
      if (sprite) {
        sprite.off('pointertap', handleSlimeClick); // Remove the event listener
      }
    };
  }, [handleSlimeClick, spriteRef, textures]);

  useTick((delta) => {
    // Update position based on direction and delta time
    const newPos = {
      x: position.x + direction.x * speed * delta,
      y: position.y + direction.y * speed * delta,
    };

    const newScreenPos = {
      x: (stageWidth / 2) - viewport.offset.x + position.x,
      y: (stageHeight / 2) - viewport.offset.y + position.y,
    };

    // Boundary checks and update direction if out of bounds
    if ((newScreenPos.x < offScreenMax && direction.x < 0) || (newScreenPos.x > stageWidth && direction.x > 0)) {
      setDirection((prev) => ({ ...prev, x: -prev.x }));
    }
    if ((newScreenPos.y < offScreenMax && direction.y < 0) || (newScreenPos.y > stageHeight && direction.y > 0)) {
      setDirection((prev) => ({ ...prev, y: -prev.y }));
    }

    setPosition(newPos);
    setScreenPosition(newScreenPos);
  });

  if (textures.length === 0) {
    return null;
  }

  return (
    <AnimatedSprite
      ref={spriteRef}
      textures={textures}
      position={screenPosition}
      interactive // Make the sprite interactive
      buttonMode // Changes the cursor on hover
      pointerdown={handleSlimeClick} // Add the click event listener
      {...renderableProps}
      {...props}
    />
  );
}

export default SlimeWalk;
