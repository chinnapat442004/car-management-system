import { Card, CardContent, CardFooter } from '../ui/card';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import type { CarResponse } from '../../types/car';
import { UpdateDialog } from './UpdateDialog';
import { DeleteDialog } from './DeleteDialog';

type Props = {
  data?: CarResponse;
  prevPage: () => void;
  nextPage: () => void;
  refreshCars: () => void;
};

const CardTable = ({ data, prevPage, nextPage, refreshCars }: Props) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ทะเบียนรถ</TableHead>
              <TableHead>ยี่ห้อรถ</TableHead>
              <TableHead>รุ่นรถ</TableHead>
              <TableHead>สีรถ</TableHead>
              <TableHead>ปี</TableHead>
              <TableHead>หมายเหตุ</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium ">
                  <div> {car.licensePlate}</div>
                  <div> {car.province}</div>
                </TableCell>
                <TableCell className="font-medium">{car.brand.name}</TableCell>
                <TableCell className="font-medium">{car.model}</TableCell>
                <TableCell className="font-medium">{car.color}</TableCell>
                <TableCell className="font-medium">{car.year}</TableCell>
                <TableCell className="font-medium">{car.remarks}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <UpdateDialog data={car} refreshCars={refreshCars} />
                    <DeleteDialog
                      data={car}
                      refreshCars={refreshCars}
                    ></DeleteDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end items-center gap-2 w-full">
          <Button variant="outline" size="icon" onClick={prevPage}>
            <ChevronLeft />
          </Button>
          {data?.page} / {data?.total_page}
          <Button variant="outline" size="icon" onClick={nextPage}>
            <ChevronRight />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default CardTable;
