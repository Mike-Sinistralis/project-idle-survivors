import { Stage, Container } from '@pixi/react';
import { useMemo, useState, useEffect } from 'react';
import styled from '@emotion/styled';

import SlimeWalk from 'sprites/slime/SlimeWalk';

const FullScreenWrapper = styled.div`
  width: 100%;
  height: 100%;

  & canvas {
    display: block;
  }
`;

function View({ stageProps }) {
  return (
    <FullScreenWrapper>
      <Stage {...stageProps}>
        <Container x={400} y={330}>
          <SlimeWalk x={100} y={100} />
        </Container>
      </Stage>
    </FullScreenWrapper>
  );
}

function Model() {
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
