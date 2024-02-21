import { AnimatedSprite, useApp, useTick } from '@pixi/react';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Texture, BaseTexture, Rectangle } from 'pixi.js';
import SlimeWalkSheet from 'assets/slime-walk.png';
import { useSlime } from 'sprites/slime/useSlime';

const offScreenMax = -80;

// TODO: Should live in a texture manager with cleanup
const baseTexture = BaseTexture.from(SlimeWalkSheet);
const frames = [];

for (let i = 0; i < 8; i += 1) {
  const frame = new Rectangle(i * 128, 0, 128, 128);
  frames.push(new Texture(baseTexture, frame));
}

function SlimeWalk({ stageWidth, stageHeight, ...props }) {
  const app = useApp();
  const [textures, setTextures] = useState([]);
  const spriteRef = useRef(null);
  const [position, setPosition] = useState({ x: stageWidth / 2, y: stageHeight / 2 });
  const [direction, setDirection] = useState({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 });

  const { stats, onSlow } = useSlime();
  const { speed } = stats;

  useEffect(() => {
    setTextures(frames);
  }, [app]);

  useEffect(() => {
    // Once textures are loaded, start the animation
    if (textures.length > 0 && spriteRef.current) {
      spriteRef.current.play();
    }
  }, [textures]);

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
  }, [handleSlimeClick, textures]);

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
      animationSpeed={0.5}
      loop
      scale={{ x: 0.75, y: 0.75 }}
      position={position}
      interactive // Make the sprite interactive
      buttonMode // Changes the cursor on hover
      pointerdown={handleSlimeClick} // Add the click event listener
      {...props}
    />
  );
}

export default SlimeWalk;
