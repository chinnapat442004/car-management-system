export interface Brand {
  id: number;
  name: string;
}

export interface BrandResponse {
  data: Brand[];
  total: number;
  page: number;
  page_size: number;
  total_page: number;
}

export interface BrandDto {
  name: string;
}
