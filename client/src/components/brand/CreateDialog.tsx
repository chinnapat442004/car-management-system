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
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { BrandDto } from '../../types/brand';
import { createBrand } from '../../api/brand';
import { useState } from 'react';
import { XIcon } from 'lucide-react';

type Props = {
  refreshBrands: () => void;
};

export function CreateDialog({ refreshBrands }: Props) {
  const { register, handleSubmit, reset } = useForm<BrandDto>();
  const [open, setOpen] = useState(false);
  const onSubmit: SubmitHandler<BrandDto> = async (data) => {
    await createBrand(data);
    await refreshBrands();
    setOpen(false);
    reset();
  };
  function handleCancel() {
    setOpen(false);
    reset();
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline">เพิ่ม</Button>} />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="pb-3">
            <DialogTitle>เพิ่มแบรนด์ยี่ห้อรถยนต์</DialogTitle>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              size="icon-sm"
              onClick={handleCancel}
            >
              <XIcon />
            </Button>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label>ชื่อแบรนด์ยี่ห้อรถยนต์</Label>
              <Input
                placeholder="กรุณากรอกชื่อแบรนด์ยี่ห้อรถยนต์"
                {...register('name')}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
              }
            />
            <Button className="bg-green-500 hover:bg-green-600" type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
