import { Stage } from '@pixi/react';
import { useMemo, useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Grassland from 'game/sprites/settings/Grassland';
import Desert from 'game/sprites/settings/Desert';
import UserInputManager from 'game/managers/UserInputManager';
import { useSessionKey } from 'auth/hooks/useSessionKey';
import 'game/websocket';
import { useLogout } from 'auth/hooks/useLogout';
import TileEntityManager from './managers/TileEntityManager';

const FullScreenWrapper = styled.div`
  width: 100%;
  height: 100%;

  & canvas {
    display: block;
  }
`;

/*
  Figure out resolution scaling
*/
function View({ stageProps }) {
  return (
    <FullScreenWrapper>
      <Stage {...stageProps}>
        {/*
          <SceneManager /> - Handles Backgrounds, Tilemaps, anything visual that isn't a tile entity
          <NetworkManager /> - Player presence, etc. No collision detection. Maybe movement
          <UIManager /> - Chat, Inventory, etc.
          <SoundManager /> - Sound effects, music, etc.
          <ParticleManager /> - Particles, spell/skill effects etc.
        */}
        <UserInputManager />
        <Grassland />
        <Desert />
        <TileEntityManager
          {...stageProps}
        />
      </Stage>
    </FullScreenWrapper>
  );
}

function Model() {
  const doLogout = useLogout();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stageProps = useMemo(() => ({
    width: windowSize.width,
    height: windowSize.height,
    options: {
      backgroundAlpha: 0,
      antialias: true,
    },
  }), [windowSize]);

  const logout = async () => doLogout();

  window.logout = logout;

  const hookProps = {
    stageProps,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
