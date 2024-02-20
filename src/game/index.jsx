import { Stage, Container, Text } from '@pixi/react';
import { BlurFilter, TextStyle } from 'pixi.js';
import { useMemo, useState, useEffect } from 'react';
import styled from '@emotion/styled';

const FullScreenWrapper = styled.div`
  width: 100%;
  height: 100%;

  & canvas {
    display: block;
  }
`;

function View({ blurFilter, stageProps, textStyle }) {
  return (
    <FullScreenWrapper>
      <Stage {...stageProps}>
        <Container x={400} y={330}>
          <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} style={textStyle} filters={[blurFilter]} />
        </Container>
      </Stage>
    </FullScreenWrapper>
  );
}

function Model() {
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  const textStyle = useMemo(() => new TextStyle({
    fill: 'white', // Set the text color to black
  }), []);

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
    backgroundColor: 0x1099bb,
    antialias: true,
  }), [windowSize]);

  const hookProps = {
    blurFilter,
    stageProps,
    textStyle,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
