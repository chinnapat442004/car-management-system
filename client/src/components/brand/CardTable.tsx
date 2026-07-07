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
import type { BrandResponse } from '../../types/brand';
import { UpdateDialog } from './UpdateDialog';
import { DeleteDialog } from './DeleteDialog';

type Props = {
  data?: BrandResponse;
  prevPage: () => void;
  nextPage: () => void;
  refreshBrands: () => void;
};

const CardTable = ({ data, prevPage, nextPage, refreshBrands }: Props) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ยี่ห้อรถ</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{brand.name}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* <Button variant="outline" size="icon">
                      <Pencil />
                    </Button> */}
                    <UpdateDialog data={brand} refreshBrands={refreshBrands} />
                    <DeleteDialog
                      data={brand}
                      refreshBrands={refreshBrands}
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
