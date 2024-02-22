import PlayerSprite from 'assets/player.png';
import SlimeWalkSheet from 'assets/slime-walk.png';

// MAYBE: Consider having the Sprite component push data to this on first mount instead of having this all seperate from the component?
export const RENDER_ID_TO_SPRITE_DATA = {
  player: {
    sprite: PlayerSprite,
    numberOfFrames: 1,
    scale: { x: 0.5, y: 0.5 },
    loop: true,
    animationSpeed: 0.5,
    anchor: 0.5,
  },
  slime: {
    sprite: SlimeWalkSheet,
    numberOfFrames: 8,
    scale: { x: 2.0, y: 2.0 },
    loop: true,
    animationSpeed: 0.5,
    anchor: 0.5,
  },
};
