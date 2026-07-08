import type { Brand, BrandDto } from '../types/brand';
import { http } from './http';

async function getBrands(page?: number, limit?: number, search?: string) {
  const params = new URLSearchParams();

  if (page !== undefined) {
    params.append('page', page.toString());
  }

  if (limit !== undefined) {
    params.append('limit', limit.toString());
  }

  if (search !== undefined) {
    params.append('search', search.toString());
  }

  return http.get(`/brands${params.toString() ? `?${params.toString()}` : ''}`);
}

async function getBrand(brand: Brand) {
  return http.get(`/brands/${brand.id}`);
}

async function createBrand(brand: BrandDto) {
  return http.post('/brands', brand);
}

async function updateBrand(brand: BrandDto, id: number) {
  return http.patch(`/brands/${id}`, brand);
}

async function deleteBrand(brand: Brand) {
  return http.delete(`/brands/${brand.id}`);
}

export { getBrands, createBrand, getBrand, updateBrand, deleteBrand };
