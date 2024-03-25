import express from 'express';
import {
  getUserDetails,
} from '#root/controllers/user.js';

const router = express.Router();

router.get('/getUserDetails', getUserDetails);

export default router;
