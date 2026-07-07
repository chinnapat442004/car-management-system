import type { Brand, BrandDto } from '../types/brand';
import { http } from './http';

async function getBrands(page?: number) {
  return http.get(`/brands?page=${page}`);
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
