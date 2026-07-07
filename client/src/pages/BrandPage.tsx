import { useEffect, useState } from 'react';

import { getBrands } from '../api/brand';
import type { BrandResponse } from '../types/brand';
import CardTable from '../components/brand/CardTable';

export const BrandPage = () => {
  const [brands, setBrands] = useState<BrandResponse>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getBrands(page).then((res) => {
      setBrands(res.data);
    });
  }, [page]);

  function prevPage() {
    if (page > 1) setPage((currentPage) => currentPage - 1);
  }

  function nextPage() {
    if (brands?.page_size) {
      if (page < brands.total_page) setPage((currentPage) => currentPage + 1);
    }
  }
  return (
    <>
      <div> Brand</div>
      <CardTable
        data={brands}
        nextPage={nextPage}
        prevPage={prevPage}
      ></CardTable>
    </>
  );
};
