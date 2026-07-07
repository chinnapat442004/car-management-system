import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { PaginationDto } from 'common/dto/pagination.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    return await this.brandRepository.save(createBrandDto);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;

    const [brands, total] = await this.brandRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: { name: 'ASC' },
    });

    return {
      data: brands,
      total: total,
      page: Number(page),
      page_size: Number(limit),
      total_page: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    return await this.brandRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.brandRepository.update(id, updateBrandDto);
  }

  async remove(id: number) {
    return this.brandRepository.delete(id);
  }
}
