import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Gender {
    FEMALE = 'female',
    MALE = 'male',
  }

@Entity()
export class Profile{

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { nullable : false} )
    name: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    phoneNo: bigint;

    @Column( { type: 'enum', enum: Gender })
    gender: Gender
}