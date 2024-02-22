import { AnimatedSprite, useTick } from '@pixi/react';
import {
  useCallback, useEffect, useState,
} from 'react';
import { useSlime } from 'game/sprites/slime/useSlime';
import useRenderable, { RENDER_IDS } from '../hooks/useRenderable';

const offScreenMax = -80;

function SlimeWalk({ stageWidth, stageHeight, ...props }) {
  const { textures, spriteRef, ...renderableProps } = useRenderable({
    renderId: RENDER_IDS.SLIME,
  });

  const [position, setPosition] = useState({ x: stageWidth / 2, y: stageHeight / 2 });
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

    // Boundary checks and update direction if out of bounds
    if (newPos.x < offScreenMax || newPos.x > stageWidth) {
      setDirection((prev) => ({ ...prev, x: -prev.x }));
      newPos.x = newPos.x < 0 ? offScreenMax : stageWidth;
    }
    if (newPos.y < offScreenMax || newPos.y > stageHeight) {
      setDirection((prev) => ({ ...prev, y: -prev.y }));
      newPos.y = newPos.y < 0 ? offScreenMax : stageHeight;
    }

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
      interactive // Make the sprite interactive
      buttonMode // Changes the cursor on hover
      pointerdown={handleSlimeClick} // Add the click event listener
      {...renderableProps}
      {...props}
    />
  );
}

export default SlimeWalk;
