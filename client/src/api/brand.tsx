import { http } from './http';

async function getBrands(page?: number) {
  return http.get(`/brands?page=${page}`);
}

export { getBrands };
