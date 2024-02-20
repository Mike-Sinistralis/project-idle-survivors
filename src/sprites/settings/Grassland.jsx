import { Sprite, useApp } from '@pixi/react';
import { useEffect, useState } from 'react';
import { Texture } from 'pixi.js';
import GrasslandBackground from 'assets/grassland.png';

function Grassland({ ...props }) {
  const app = useApp();
  const [texture, setTexture] = useState(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Load the texture from the image URL
    const newTexture = Texture.from(GrasslandBackground);
    newTexture.baseTexture.on('loaded', () => {
      setTexture(newTexture);
    });
    return () => {
      newTexture.baseTexture.off('loaded');
    };
  }, []);

  useEffect(() => {
    if (texture && texture.baseTexture.valid) {
      // Scale the background texture to fill the stage
      const scaleX = app.screen.width / texture.baseTexture.width;
      const scaleY = app.screen.height / texture.baseTexture.height;
      const coverScale = Math.max(scaleX, scaleY); // This ensures that the background covers the whole stage

      setScale(coverScale);
    }
  }, [app, texture]);

  if (!texture) {
    return null;
  }

  return <Sprite scale={{ x: scale, y: scale }} texture={texture} {...props} />;
}

export default Grassland;
