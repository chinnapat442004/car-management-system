import { useEffect, useState } from 'react';

import { getBrands } from '../api/brand';
import type { BrandResponse } from '../types/brand';
import CardTable from '../components/brand/CardTable';
import { CreateDialog } from '../components/brand/CreateDialog';
import { SearchInput } from '../components/SearchInput';

export const BrandPage = () => {
  const [brands, setBrands] = useState<BrandResponse>();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  async function fetchBrands() {
    const res = await getBrands(page, 10, search);
    setBrands(res.data);
  }

  useEffect(() => {
    fetchBrands();
  }, [page, , search]);

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
      <div className="flex justify-between  pb-2">
        <span className="text-xl font-bold">Brands Management</span>
        <div className="flex gap-2">
          <SearchInput
            value={searchInput}
            onChange={setSearchInput}
            onSearch={() => setSearch(searchInput)}
            placeholder="ค้นหายี่ห้อรถ"
          />
          <CreateDialog refreshBrands={fetchBrands} />
        </div>
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
