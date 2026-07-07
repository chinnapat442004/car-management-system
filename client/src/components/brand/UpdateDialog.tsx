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
import type { Brand, BrandDto } from '../../types/brand';
import { getBrand, updateBrand } from '../../api/brand';
import { useEffect, useState } from 'react';
import { Pencil, XIcon } from 'lucide-react';

type Props = {
  data: Brand;
  refreshBrands: () => void;
};

export function UpdateDialog({ data, refreshBrands }: Props) {
  const { register, handleSubmit, reset } = useForm<BrandDto>();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  const onSubmit: SubmitHandler<BrandDto> = async (data) => {
    await updateBrand(data, id);
    await refreshBrands();
    handleCancel;
  };
  function handleCancel() {
    setOpen(false);
    reset();
  }

  useEffect(() => {
    async function fetchBrand() {
      const response = await getBrand(data);
      setId(response.data.id);
      reset(response.data);
    }
    fetchBrand();
  }, [reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="pb-3">
            <DialogTitle>แก้ไขแบรนด์ยี่ห้อรถยนต์</DialogTitle>{' '}
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
