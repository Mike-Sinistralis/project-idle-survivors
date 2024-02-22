import { AnimatedSprite, useApp, useTick  } from '@pixi/react';
import { Texture, BaseTexture, Rectangle } from 'pixi.js';
import { useUserInput } from 'game/sprites/SpriteManager';
import { usePrevious } from 'common/hooks/usePrevious';
import { useEffect, useState, useRef } from 'react';
import PlayerSprite from 'assets/player.png';

const baseTexture = BaseTexture.from(PlayerSprite);
const frames = [];
frames.push(new Texture(baseTexture));

function Player({ stageWidth, stageHeight, ...props }) {
  const app = useApp();
  const { pressed, isPressed } = useUserInput();
  const previousPressed = usePrevious(pressed);
  
  const [textures, setTextures] = useState([]);
  const spriteRef = useRef(null);
  const [position, setPosition] = useState({ x: stageWidth / 2, y: stageHeight / 2 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTextures(frames);
  }, [app]);

  useEffect(() => {
    // Once textures are loaded, start the animation
    if (textures.length > 0 && spriteRef.current) {
      spriteRef.current.play();
    }
  }, [textures]);

  useEffect(() => {
    const direction = { x: 0, y: 0 };

    const inputMap = {
      'w': () => { direction.y -= 1; },
      'a': () => { direction.x -= 1; },
      's': () => { direction.y += 1; },
      'd': () => { direction.x += 1; }, 
    };

    for (const key in inputMap) {
      if (isPressed(key)) {
        inputMap[key]();
      }
    }
    setDirection(direction);
  }, [pressed, previousPressed]);

  useTick((delta) => {
    const speed = 10;
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
      animationSpeed={0.5}
      loop
      scale={{ x: 0.75, y: 0.75 }}
      position={position}
      {...props}
    />
  );
}

export default Player;
