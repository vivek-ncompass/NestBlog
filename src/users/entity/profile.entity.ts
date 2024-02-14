import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Gender {
    FEMALE = 'female',
    MALE = 'male',
  }

@Entity( { name: 'profiles'})
export class Profiles{

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { nullable : false} )
    name: string;

    @Column( { nullable : false} )
    address: string;

    @Column( { nullable : false} )
    email: string;

    @Column()
    phoneNo: bigint;

    @Column( { type: 'enum', enum: Gender })
    gender: Gender
}