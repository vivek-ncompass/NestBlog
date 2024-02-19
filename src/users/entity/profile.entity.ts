import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Gender {
  FEMALE = 'female',
  MALE = 'male',
}

@Entity( { name: 'profiles'})
export class Profiles{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column( { nullable : false, unique:true} )
    username: string;

    @Column( { nullable : false} )
    address: string;

    @Column( { nullable : false, unique:true} )
    email: string

    @Column({type:'bigint', unique:true})
    phoneNo: number

    @Column( { type: 'enum', enum: Gender, nullable: false})
    gender: Gender

    @Column( { type: 'timestamp', precision: 0, nullable: false, default:  () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column( { type :'timestamp', nullable:true, default: null })
    updatedAt: Date

}