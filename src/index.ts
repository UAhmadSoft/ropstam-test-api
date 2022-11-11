import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import UserController from '@/resources/user/user.controller';
import AuthController from './resources/auth/auth.controller';

validateEnv();

const app = new App(
  [new UserController(), new AuthController()],
  Number(process.env.PORT || 5000)
);

app.listen();