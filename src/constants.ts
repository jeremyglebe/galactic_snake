export const SCREEN_WIDTH = window.innerWidth;
export const SCREEN_HEIGHT = window.innerHeight;
export const SCREEN_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
export const SCREEN_WIDE = SCREEN_WIDTH > SCREEN_HEIGHT;
export const BASE_SIZE = 800;
// Theme variables
export const UIBTN = 0x759FBC;
export const UITXT = '#E2DBBE';

import { ScreenScale } from './utils/screen-scale';

// Variables/objects related to game scaling
const GAME_BASE_SIZE = 800;
export const REAL_SZ = ScreenScale(GAME_BASE_SIZE);
export const GAME_SZ = REAL_SZ.scaled;
// Set some CSS properties, in case we need the game size in our styles
document.documentElement.style.setProperty('--game-height', `${GAME_SZ.height}px`);
document.documentElement.style.setProperty('--game-width', `${GAME_SZ.width}px`);
