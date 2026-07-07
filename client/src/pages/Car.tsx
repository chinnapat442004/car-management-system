import { useEffect, useState } from 'react';

import { getCars } from '../api/car';
import type { CarResponse } from '../types/car';
import CardTable from '../components/car/CardTable';
import { CreateDialog } from '../components/car/CreateDialog';

export const CarPage = () => {
  const [cars, setCars] = useState<CarResponse>();
  const [page, setPage] = useState(1);

  async function fetchCars() {
    const res = await getCars(page);
    setCars(res.data);
  }

  useEffect(() => {
    fetchCars();
  }, [page]);

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
      <div className="flex justify-between">
        <span>Cars Management</span> <CreateDialog refreshCars={fetchCars} />
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
