import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Field, FieldGroup } from '../ui/field';

import { Button } from '../ui/button';

import type { Car } from '../../types/car';
import { deleteCar, getCar } from '../../api/car';
import { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';

type Props = {
  data: Car;
  refreshCars: () => void;
};

export function DeleteDialog({ data, refreshCars }: Props) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>();

  useEffect(() => {
    getCar(data).then((res) => {
      setCar(res.data);
    });
  }, []);

  async function deleteData(data: Car) {
    await deleteCar(data);
    await refreshCars();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon">
            <Trash />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="pb-3">
          <DialogTitle>ยืนยันการลบ</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            ยืนยันการลบระทะเบียน {car?.licensePlate} {car?.province} ใช่หรือไม่
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            className="bg-red-400 hover:bg-red-600"
            onClick={() => deleteData(data)}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
