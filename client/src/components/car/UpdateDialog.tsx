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
import type { Car, CarDto } from '../../types/car';
import { getCar, updateCar } from '../../api/car';
import { useEffect, useState } from 'react';
import { Pencil, XIcon } from 'lucide-react';
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

type Props = {
  data: Car;
  refreshCars: () => void;
};

export function UpdateDialog({ data, refreshCars }: Props) {
  const { register, handleSubmit, reset, control } = useForm<CarDto>();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);

  const onSubmit: SubmitHandler<CarDto> = async (data) => {
    console.log(data);
    await updateCar(data, id);
    await refreshCars();
    handleCancel();
  };
  function handleCancel() {
    setOpen(false);
    reset();
  }
  useEffect(() => {
    async function fetchBrand() {
      const response = await getCar(data);
      setId(response.data.id);
      reset(response.data);
    }
    fetchBrand();
  }, [reset]);

  useEffect(() => {
    getBrands(1, 10000).then((res) => {
      setBrands(res.data.data);
    });
  }, []);
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
            <DialogTitle>แก้ไขรุ่นรถ</DialogTitle>{' '}
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
              <Label>แบรนด์ยี่ห้อรถยนต์</Label>
              <Controller
                name="brand.id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <span>
                        {brands.find(
                          (brand) => brand.id === Number(field.value),
                        )?.name ?? 'เลือกแบรนด์ยี่ห้อรถยนต์'}
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
              <Input
                placeholder="กรุณากรอกรุ่นรถ"
                {...register('licensePlate')}
              />
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
