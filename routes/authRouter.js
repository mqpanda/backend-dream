import express from 'express';
import {
  homeHandler,
  profileHandler,
  logoutHandler,
} from '../middlewares/auth.js';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;

const router = express.Router();

router.get('/', homeHandler);
router.get('/profile', requiresAuth(), profileHandler);
router.get('/logout', logoutHandler);

export default router;
