import express from 'express';
import {
  saveGame, getSavedGame, register, login,
} from '#root/controllers/game.js';

const router = express.Router();

router.get('/getSavedGame', getSavedGame);
router.post('/saveGame', saveGame);
router.post('/register', register);
router.post('/login', login);

export default router;
