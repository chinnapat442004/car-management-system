import type { Brand } from './brand';

export interface Car {
  id: number;
  licensePlate: string;
  province: string;
  model: string;
  color: string;
  year: number;
  remarks: string;
  brand: Brand;
}

export interface CarResponse {
  data: Car[];
  total: number;
  page: number;
  page_size: number;
  total_page: number;
}

export interface CarDto {
  licensePlate: string;
  province: string;
  model: string;
  color: string;
  year: number | null;
  remarks: string;
  brand: Brand;
}
