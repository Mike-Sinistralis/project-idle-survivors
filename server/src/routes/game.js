import express from 'express';
import {
  saveGame, getSavedGame, register, login, getUserDetails, logout,
} from '#root/controllers/game.js';

const router = express.Router();

router.get('/getSavedGame', getSavedGame);
router.get('/getUserDetails', getUserDetails);
router.post('/saveGame', saveGame);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
