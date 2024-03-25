import { AnimatedSprite, useTick } from '@pixi/react';
import {
  useCallback, useEffect,
} from 'react';

import { useSlime } from 'game/entities/slime/useSlime';
import { useViewportOffset } from 'game/managers/hooks/useViewportOffset';
import { useEntityManager } from 'game/managers/hooks/useTileEntityManager';
import useRenderable, { RENDER_IDS } from '../../sprites/hooks/useRenderable';

const offScreenMax = -80;

function Slime({
  id, stageWidth, stageHeight, ...props
}) {
  const { getEntity } = useEntityManager();

  const { textures, spriteRef, ...renderableProps } = useRenderable({
    renderId: RENDER_IDS.SLIME,
  });

  const viewport = useViewportOffset();
  const { onSlow } = useSlime(id);
  const slimeEntity = getEntity(id);

  const {
    position,
    screenPosition,
    direction,
    speed,
  } = slimeEntity;

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
    if (!speed) return;

    // Update position based on direction and delta time
    const newPos = {
      x: position.x + direction.x * speed * delta,
      y: position.y + direction.y * speed * delta,
    };

    const newScreenPos = {
      x: (stageWidth / 2) - viewport.offset.x + position.x,
      y: (stageHeight / 2) - viewport.offset.y + position.y,
    };

    let newDirection;

    // Boundary checks and update direction if out of bounds
    if ((newScreenPos.x < offScreenMax && direction.x < 0) || (newScreenPos.x > stageWidth && direction.x > 0)) {
      newDirection = { x: -direction.x, y: direction.y };
    }

    if ((newScreenPos.y < offScreenMax && direction.y < 0) || (newScreenPos.y > stageHeight && direction.y > 0)) {
      newDirection = { x: direction.x, y: -direction.y };
    }

    slimeEntity.position = newPos;
    slimeEntity.screenPosition = newScreenPos;
    slimeEntity.direction = newDirection || direction;
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

export default Slime;
