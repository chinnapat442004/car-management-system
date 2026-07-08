import { useEffect, useState } from 'react';

import { getCars } from '../api/car';
import type { CarResponse } from '../types/car';
import CardTable from '../components/car/CardTable';
import { CreateDialog } from '../components/car/CreateDialog';
import { SearchInput } from '../components/SearchInput';

export const CarPage = () => {
  const [cars, setCars] = useState<CarResponse>();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  async function fetchCars() {
    const res = await getCars(page, search);
    setCars(res.data);
  }

  useEffect(() => {
    fetchCars();
  }, [page, search]);

  function prevPage() {
    if (page > 1) setPage((currentPage) => currentPage - 1);
  }

  function nextPage() {
    if (cars?.page_size) {
      if (page < cars.total_page) setPage((currentPage) => currentPage + 1);
    }
  }
  return (
    <>
      <div className="flex justify-between pb-2">
        <span className="text-xl font-bold">Cars Management</span>
        <div className="flex gap-2">
          <SearchInput
            value={searchInput}
            onChange={setSearchInput}
            onSearch={() => setSearch(searchInput)}
            placeholder="ค้นหารถ"
          />
          <CreateDialog refreshCars={fetchCars} />
        </div>
      </div>

      <CardTable
        data={cars}
        nextPage={nextPage}
        prevPage={prevPage}
        refreshCars={fetchCars}
      ></CardTable>
    </>
  );
};
