import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

enum UserRole {
    SUPERADMIN = 4,
    ADMIN = 3,
    EDITOR = 2,
    VIEWER = 1,
}

@Entity()
export class User{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { nullable : false} ) 
    username: string;

    @Column(  { nullable : false}  )
    password: string;

    @Column( {type: 'enum', enum: UserRole, default: UserRole.VIEWER, nullable : false})
    level: UserRole;

    @Column( { default: true, nullable : false })
    isActive: boolean;

    @CreateDateColumn( { type: 'timestamp', nullable : false })
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @OneToOne(() => Profile) 
    @JoinColumn() 
  profile: Profile;

}