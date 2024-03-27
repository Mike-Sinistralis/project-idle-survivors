import express from 'express';
import {
  saveGame, getSavedGame,
} from 'controllers/game.js';

const router = express.Router();

router.get('/getSavedGame', getSavedGame);
router.post('/saveGame', saveGame);

export default router;
