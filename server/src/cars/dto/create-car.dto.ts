import { Brand } from 'brand/entities/brand.entity';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  licensePlate: string;

  @IsNotEmpty()
  province: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  color: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  remarks: string;

  @IsNotEmpty()
  brand: Brand;
}
