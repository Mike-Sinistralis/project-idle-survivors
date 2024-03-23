import express from 'express';
import { saveGame } from '#root/controllers/game.js';

const router = express.Router();

router.post('/saveGame', saveGame);

export default router;
