import { Sprite, useApp } from '@pixi/react';
import { useEffect, useState } from 'react';
import { Texture } from 'pixi.js';
import Background from 'assets/tilemaps/desert-example/desert.png';
import { useViewportOffset } from 'game/managers/hooks/useViewportOffset';

function Desert({ ...props }) {
  const app = useApp();
  const [texture, setTexture] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const viewport = useViewportOffset();
  const [origin] = useState({ x: 400, y: 400 });

  useEffect(() => {
    const newTexture = Texture.from(Background);
    newTexture.baseTexture.on('loaded', () => {
      setTexture(newTexture);
    });
    return () => {
      newTexture.baseTexture.off('loaded');
    };
  }, []);

  useEffect(() => {
    if (texture && texture.baseTexture.valid) {
      setScale(4);
    }
  }, [app.screen.height, app.screen.width, texture]);

  useEffect(() => {
    const x = -origin.x - viewport.offset.x;
    const y = -origin.y - viewport.offset.y;
    setPosition({ x, y });
  }, [viewport.offset, origin]);

  if (!texture) {
    return null;
  }

  return <Sprite scale={{ x: scale, y: scale }} position={{ x: position.x, y: position.y }} texture={texture} {...props} />;
}

export default Desert;
