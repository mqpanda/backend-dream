import express from 'express';
import session from 'express-session';
import pkg from 'express-openid-connect';
const { auth } = pkg;
import authRouter from './routes/authRouter.js';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.AUTH0_CALLBACK_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
};

//AuthConfig connection
app.use(auth(authConfig));

//Routers connections
app.use(authRouter);

app.use((req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    // Получить информацию о пользователе
    const userInfo = req.oidc.user;
    console.log('User info:', userInfo);

    // Получить токен доступа
    const accessToken = req.oidc.accessToken;
    console.log('Access Token:', accessToken);
  }
  next();
});

//DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('DB has error', err);
  });

// Start server
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started on port ${PORT}`);
});
