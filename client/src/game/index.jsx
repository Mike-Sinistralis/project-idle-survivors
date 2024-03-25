import { Stage } from '@pixi/react';
import { useMemo, useState, useEffect } from 'react';
import styled from '@emotion/styled';

import SlimeWalk from 'game/sprites/slime/SlimeWalk';
import Grassland from 'game/sprites/settings/Grassland';
import Desert from 'game/sprites/settings/Desert';
import UserInputManager from 'game/managers/UserInputManager';
import { useSessionKey } from 'auth/hooks/useSessionKey';
import Player from './player/Player';
import 'game/websocket';
import 'game/test';

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
        <UserInputManager />
        <Grassland />
        <Desert />
        {Array.from({ length: 10 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <SlimeWalk key={i} stageWidth={stageProps.width} stageHeight={stageProps.height} />
        ))}
        <Player stageWidth={stageProps.width} stageHeight={stageProps.height} />
      </Stage>
    </FullScreenWrapper>
  );
}

function Model() {
  const { setSessionKey } = useSessionKey();

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

  const logout = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/game/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await response.json();

    setSessionKey(null);

    return data;
  };

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
