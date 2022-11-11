import CategoryModel from '@/resources/category/category.model';
import token from '@/utils/token';

class CategoryService {
  private category = CategoryModel;

  public async getAllCategories(): Promise<any> {
    try {
      const categories = await this.category.find();
      return categories;
    } catch (error) {
      throw new Error('Unable to fetch categories');
    }
  }

  public async createCategory(name: string): Promise<any> {
    const category = await this.category.create({ name });
    return category;
  }

  public async getCategory(id: string): Promise<any> {
    const category = await this.category.findById(id);
    return category;
  }

  public async updateCategory(id: string, body: Body): Promise<any> {
    const category = await this.category.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      {
        new: true,
      }
    );
    return category;
  }

  public async deleteCategory(id: string): Promise<any> {
    const category = await this.category.findByIdAndDelete(id);
    return category;
  }
}

export default CategoryService;
