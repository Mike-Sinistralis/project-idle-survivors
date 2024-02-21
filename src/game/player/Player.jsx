import { useUserInput } from 'game/sprites/SpriteManager';
import { usePrevious } from 'common/hooks/usePrevious';
import { useEffect } from 'react';

function Player() {
  const { pressed } = useUserInput();
  const previousPressed = usePrevious(pressed);

  useEffect(() => {
    // do something with the keypress!
  }, [pressed, previousPressed]);

  // Render stuff!
  return false;
}

export default Player;
