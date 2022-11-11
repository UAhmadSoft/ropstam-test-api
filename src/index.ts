import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import UserController from '@/resources/user/user.controller';
import AuthController from './resources/auth/auth.controller';
import CategoryController from './resources/category/category.controller';
import CarsController from './resources/cars/cars.controller';

validateEnv();

const app = new App(
  [
    new UserController(),
    new AuthController(),
    new CategoryController(),
    new CarsController(),
  ],
  Number(process.env.PORT || 5000)
);

app.listen();
