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

import type { Brand } from '../../types/brand';
import { deleteBrand, getBrand } from '../../api/brand';
import { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';

type Props = {
  data: Brand;
  refreshBrands: () => void;
};

export function DeleteDialog({ data, refreshBrands }: Props) {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState<Brand>();

  useEffect(() => {
    getBrand(data).then((res) => {
      setBrand(res.data);
    });
  }, [data]);

  async function deleteData(data: Brand) {
    await deleteBrand(data);
    await refreshBrands();
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
          <Field>ยืนยันการลบ {brand?.name} ใช่หรือไม่</Field>
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
