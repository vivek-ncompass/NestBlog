import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Gender {
  FEMALE = 'female',
  MALE = 'male',
}

@Entity( { name: 'profiles'})
export class Profiles{

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { nullable : false, unique:true} )
    username: string;

    @Column( { nullable : false} )
    address: string;

    @Column( { nullable : false} )
    email: string

    @Column({type:'varchar', length: 10})
    phoneNo: string

    @Column( { type: 'enum', enum: Gender, nullable: false})
    gender: Gender

    @Column( { type: 'timestamp', precision: 0, nullable: false, default:  () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column( { nullable:true, default: null })
    updatedAt: Date

}