import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:'otp'})
export class OTP {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique:true, nullable: false})
  username: string

  @Column({ nullable: false})
  otp:number

  @Column({nullable:false})
  expire_time:Date
}
