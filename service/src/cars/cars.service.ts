import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PaginationDto } from 'common/dto/pagination.dto';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  create(createCarDto: CreateCarDto) {
    return this.carRepository.save(createCarDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;

    const [cars, total] = await this.carRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: {
        brand: true,
      },
      where: [
        { licensePlate: ILike(`%${paginationDto.search}%`) },
        { brand: { name: ILike(`%${paginationDto.search}%`) } },
        { model: ILike(`%${paginationDto.search}%`) },
        { color: ILike(`%${paginationDto.search}%`) },
      ],
    });

    return {
      data: cars,
      total: total,
      page: Number(page),
      page_size: Number(limit),
      total_page: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.carRepository.findOne({
      where: { id: id },
      relations: { brand: true },
    });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.carRepository.update(id, updateCarDto);
  }

  remove(id: number) {
    return this.carRepository.delete(id);
  }
}
