import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/category/category.validation';
import CategoryService from '@/resources/category/category.service';
import authenticated from '@/middleware/authenticated.middleware';
import { HTTPCodes } from '@/utils/helpers/response';

class CategoryController implements Controller {
  public path = '/categories';
  public router = Router();
  private CategoryService = new CategoryService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    // this.router.get(`${this.path}`, authenticated, this.getCategorys);

    this.router.get(`${this.path}`, this.getCategories);

    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(validate.validation),
      this.updateCategory
    );

    this.router.post(`${this.path}`, this.createCategory);

    this.router.get(`${this.path}/:id`, this.getCategory);

    this.router.delete(`${this.path}/:id`, this.deleteCategory);
  }

  private getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;

    const category = await this.CategoryService.getCategory(id);
    if (!category)
      return res.status(HTTPCodes.BAD_REQUEST).json({
        status: 'failed',
        messsage: `Cant find any category with id ${id}`,
      });

    res.status(HTTPCodes.OK).json({ status: 'success', category });
  };

  private deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;

    const category = await this.CategoryService.deleteCategory(id);
    if (!category)
      return res.status(HTTPCodes.BAD_REQUEST).json({
        status: 'failed',
        messsage: `Cant find any category with id ${id}`,
      });

    res.status(HTTPCodes.OK).json({ status: 'success', category });
  };

  private createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;

    const category = await this.CategoryService.createCategory(req.body.name);
    if (!category)
      return res.status(HTTPCodes.BAD_REQUEST).json({
        status: 'failed',
        messsage: `Cant find any category with id ${id}`,
      });

    res.status(HTTPCodes.OK).json({ status: 'success', category });
  };
  private updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;

    const category = await this.CategoryService.updateCategory(id, req.body);
    if (!category)
      return res.status(HTTPCodes.BAD_REQUEST).json({
        status: 'failed',
        messsage: `Cant find any category with id ${id}`,
      });

    res.status(HTTPCodes.OK).json({ status: 'success', category });
  };

  private getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const categories = await this.CategoryService.getAllCategories();

    res
      .status(HTTPCodes.OK)
      .json({ status: 'success', results: categories.length, categories });
  };
}

export default CategoryController;
