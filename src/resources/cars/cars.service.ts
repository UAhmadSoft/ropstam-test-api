import CarsModel from '@/resources/cars/car.model';

class CarsService {
  private car = CarsModel;

  public async getAllCars(): Promise<any> {
    try {
      const cars = await this.car.find().populate('category');
      return cars;
    } catch (error) {
      throw new Error('Unable to fetch cars');
    }
  }

  public async createCar(body: Object): Promise<any> {
    const car = await this.car.create({ ...body });
    await this.car.populate(car, 'category');
    return car;
  }

  public async getCar(id: string): Promise<any> {
    const car = await this.car.findById(id).populate('category');
    return car;
  }

  public async updateCar(id: string, body: Body): Promise<any> {
    const car = await this.car.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      {
        new: true,
      }
    );
    await this.car.populate(car, 'category');

    return car;
  }

  public async deleteCar(id: string): Promise<any> {
    const car = await this.car.findByIdAndDelete(id).populate('category');
    return car;
  }
}

export default CarsService;
