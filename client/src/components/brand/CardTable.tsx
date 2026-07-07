import { Card, CardContent, CardFooter } from '../ui/card';

import { ChevronLeft, ChevronRight, Pencil, Trash } from 'lucide-react';
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

type Props = {
  data?: BrandResponse;
  prevPage: () => void;
  nextPage: () => void;
};

const CardTable = ({ data, prevPage, nextPage }: Props) => {
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
                    <Button variant="outline" size="icon" aria-label="Submit">
                      <Pencil />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Submit">
                      <Trash />
                    </Button>
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
