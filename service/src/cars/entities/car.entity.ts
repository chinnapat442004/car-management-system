import { Brand } from 'brand/entities/brand.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  licensePlate: string;

  @Column()
  province: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column({
    type: 'integer',
  })
  year: number;

  @Column()
  remarks: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.cars)
  brand: Brand;
}
