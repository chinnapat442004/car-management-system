import { useEffect, useState } from 'react';

import { getBrands } from '../api/brand';
import type { BrandResponse } from '../types/brand';
import CardTable from '../components/brand/CardTable';
import { CreateDialog } from '../components/brand/CreateDialog';

export const BrandPage = () => {
  const [brands, setBrands] = useState<BrandResponse>();
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   getBrands(page).then((res) => {
  //     setBrands(res.data);
  //   });
  // }, [page]);

  async function fetchBrands() {
    const res = await getBrands(page);
    setBrands(res.data);
  }

  useEffect(() => {
    fetchBrands();
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
      <div className="flex justify-between">
        <span>Brands Management</span>{' '}
        <CreateDialog refreshBrands={fetchBrands} />
      </div>

      <CardTable
        data={brands}
        nextPage={nextPage}
        prevPage={prevPage}
        refreshBrands={fetchBrands}
      ></CardTable>
    </>
  );
};
