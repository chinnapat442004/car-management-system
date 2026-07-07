import { Brand } from 'brand/entities/brand.entity';

export class CreateCarDto {
  licensePlate: string;
  province: string;
  model: string;
  color: string;
  year: number;
  remarks: string;
  brand: Brand;
}
