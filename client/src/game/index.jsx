import { Stage } from '@pixi/react';
import {
  useMemo, useState, useEffect, useRef, useCallback,
} from 'react';
import styled from '@emotion/styled';

import Grassland from 'game/sprites/settings/Grassland';
import Desert from 'game/sprites/settings/Desert';
import UserInputManager from 'game/managers/UserInputManager';
import 'game/websocket';
import { useLogout } from 'auth/hooks/useLogout';
import { debounce } from 'util/debounce';
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
function View({ width, height, stageOptions }) {
  return (
    <FullScreenWrapper>
      <Stage
        width={width}
        height={height}
        options={stageOptions}
      >
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
          width={width}
          height={height}
          options={stageOptions}
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

  // Define a stable handleResize function using useCallback
  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const debouncedResize = useRef(debounce(handleResize, 50));

  useEffect(() => {
    window.addEventListener('resize', debouncedResize.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => window.removeEventListener('resize', debouncedResize.current);
  }, [debouncedResize]);

  useEffect(() => {
    const handleRightClick = (event) => {
      // Assuming you want to block right-clicks on the entire page
      event.preventDefault();
    };

    // Attach the event listener to the document
    document.addEventListener('contextmenu', handleRightClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
    };
  }, []);

  const stageOptions = useMemo(() => ({
    backgroundAlpha: 0,
    antialias: true,
  }), []);

  const logout = async () => doLogout();

  window.logout = logout;

  const hookProps = {
    width: windowSize.width,
    height: windowSize.height,
    stageOptions,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
