import type { Car, CarDto } from '../types/car';
import { http } from './http';

async function getCars(page?: number) {
  return http.get(`/cars?page=${page}`);
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
