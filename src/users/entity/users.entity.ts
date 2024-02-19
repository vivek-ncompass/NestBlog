import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profiles } from "./profile.entity";
import { OTP } from "src/auth/entity/otp.entity";

export enum UserRole {
    SUPERADMIN = 4,
    ADMIN = 3,
    EDITOR = 2,
    VIEWER = 1,
}

@Entity( { name: 'users'})
export class Users{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column( { nullable : false, unique : true } ) 
    username: string; 

    @Column(  { nullable : false}  )
    password: string;
    
    @Column( {type: 'enum', enum: UserRole, default: UserRole.VIEWER, nullable : false})
    level: UserRole;

    @Column( { default: true, nullable : false })
    isActive: boolean;

    @Column( { type: 'timestamp', precision: 0, nullable : false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', nullable:true, default: null})
    updatedAt: Date;

    @OneToOne(() => Profiles) 
    @JoinColumn() 
    profile: Profiles;

    @OneToOne(() => OTP, {nullable: true, onDelete:"SET NULL"})
    @JoinColumn()
    otp: OTP

}