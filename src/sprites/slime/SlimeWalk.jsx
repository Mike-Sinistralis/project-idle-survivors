import { AnimatedSprite, useApp } from '@pixi/react';
import { useEffect, useRef, useState } from 'react';
import { Texture, BaseTexture, Rectangle } from 'pixi.js';
import SlimeWalkSheet from 'assets/slime-walk.png';

function SlimeWalk({
  ...props
}) {
  const app = useApp();
  const [textures, setTextures] = useState([]);
  const spriteRef = useRef(null); // Reference to the AnimatedSprite

  useEffect(() => {
    const baseTexture = BaseTexture.from(SlimeWalkSheet);
    const frames = [];

    for (let i = 0; i < 8; i += 1) {
      const frame = new Rectangle(i * 128, 0, 128, 128);
      frames.push(new Texture(baseTexture, frame));
    }

    setTextures(frames);
  }, [app]);

  useEffect(() => {
    // Once textures are loaded, start the animation
    if (textures.length > 0 && spriteRef.current) {
      spriteRef.current.play();
    }
  }, [textures]);

  if (textures.length === 0) {
    return null;
  }

  return (
    <AnimatedSprite
      ref={spriteRef}
      textures={textures}
      animationSpeed={0.5}
      loop
      scale={{ x: 0.5, y: 0.5 }}
      {...props}
    />
  );
}

export default SlimeWalk;
