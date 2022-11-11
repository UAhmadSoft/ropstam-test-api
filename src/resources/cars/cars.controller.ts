import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/cars/cars.validation';
import CarsService from '@/resources/cars/cars.service';
import { HTTPCodes } from '@/utils/helpers/response';

class CarsController implements Controller {
  public path = '/cars';
  public router = Router();
  private CarsService = new CarsService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    // this.router.get(`${this.path}`, authenticated, this.getCars);

    this.router.get(`${this.path}`, this.getCars);

    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(validate.update),
      this.updateCar
    );

    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.createCar
    );

    this.router.get(`${this.path}/:id`, this.getCar);

    this.router.delete(`${this.path}/:id`, this.deleteCar);
  }

  private getCar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;

    const car = await this.CarsService.getCar(id);
    if (!car)
      return res.status(HTTPCodes.BAD_REQUEST).json({
        status: 'failed',
        messsage: `Cant find any car with id ${id}`,
      });

    res.status(HTTPCodes.OK).json({ status: 'success', car });
  };

  private deleteCar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;

    const car = await this.CarsService.deleteCar(id);
    if (!car)
      return res.status(HTTPCodes.BAD_REQUEST).json({
        status: 'failed',
        messsage: `Cant find any car with id ${id}`,
      });

    res.status(HTTPCodes.OK).json({ status: 'success', car });
  };

  private createCar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;

    const car = await this.CarsService.createCar(req.body);
    if (!car)
      return res.status(HTTPCodes.BAD_REQUEST).json({
        status: 'failed',
        messsage: `Cant find any car with id ${id}`,
      });

    res.status(HTTPCodes.OK).json({ status: 'success', car });
  };
  private updateCar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;

    const car = await this.CarsService.updateCar(id, req.body);
    if (!car)
      return res.status(HTTPCodes.BAD_REQUEST).json({
        status: 'failed',
        messsage: `Cant find any car with id ${id}`,
      });

    res.status(HTTPCodes.OK).json({ status: 'success', car });
  };

  private getCars = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const cars = await this.CarsService.getAllCars();

    res
      .status(HTTPCodes.OK)
      .json({ status: 'success', results: cars.length, cars });
  };
}

export default CarsController;
