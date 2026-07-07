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
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import type { CarDto } from '../../types/car';
import { createCar } from '../../api/car';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { getBrands } from '../../api/brand';
import type { Brand } from '../../types/brand';
import { provinces } from '../../data/provinces';
import { XIcon } from 'lucide-react';

type Props = {
  refreshCars: () => void;
};

export function CreateDialog({ refreshCars }: Props) {
  const { register, handleSubmit, reset, control } = useForm<CarDto>({
    defaultValues: {
      licensePlate: '',
      province: '',

      model: '',
      color: '',
      year: null,
      remarks: '',
    },
  });
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const onSubmit: SubmitHandler<CarDto> = async (data) => {
    console.log(data);
    await createCar(data);
    await refreshCars();
    handleCancel();
  };
  function handleCancel() {
    setOpen(false);
    reset();
  }

  useEffect(() => {
    getBrands(1, 10000).then((res) => {
      setBrands(res.data.data);
    });
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline">เพิ่ม</Button>} />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="pb-3">
            <DialogTitle>เพิ่มรถ</DialogTitle>
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
              <Label>ทะเบียนรถ</Label>
              <Input
                placeholder="กรุณากรอกทะเบียนรถ"
                {...register('licensePlate')}
              />
            </Field>
            <Field>
              <Label>จังหวัด</Label>
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกยี่ห้อรถ" />
                    </SelectTrigger>

                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.id} value={province.name}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field>
              <Label>ยี่ห้อรถ</Label>
              <Controller
                name="brand.id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <span>
                        {brands.find(
                          (brand) => brand.id === Number(field.value),
                        )?.name ?? 'เลือกยี่ห้อรถ'}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <Label>รุ่นรถ</Label>
              <Input placeholder="กรุณากรอกรุ่นรถ" {...register('model')} />
            </Field>
            <Field>
              <Label>สีรถ</Label>
              <Input placeholder="กรุณากรอกสีรถ" {...register('color')} />
            </Field>
            <Field>
              <Label>ปี</Label>
              <Input
                placeholder="กรุณากรอกปี"
                {...register('year', {
                  valueAsNumber: true,
                })}
              />
            </Field>
            <Field>
              <Label>หมายเหตุ</Label>
              <Input placeholder="กรุณากรอกหมายเหตุ" {...register('remarks')} />
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
