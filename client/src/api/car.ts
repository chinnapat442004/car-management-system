import type { Car, CarDto } from '../types/car';
import { http } from './http';

async function getCars(page?: number, search?: string) {
  const params = new URLSearchParams();

  if (page !== undefined) {
    params.append('page', page.toString());
  }

  if (search !== undefined) {
    params.append('search', search.toString());
  }

  return http.get(`/cars${params.toString() ? `?${params.toString()}` : ''}`);
}

async function getCar(car: Car) {
  return http.get(`/cars/${car.id}`);
}

async function createCar(car: CarDto) {
  return http.post('/cars', car);
}

async function updateCar(car: CarDto, id: number) {
  return http.patch(`/cars/${id}`, car);
}

async function deleteCar(car: Car) {
  return http.delete(`/cars/${car.id}`);
}

export { getCars, createCar, getCar, updateCar, deleteCar };
