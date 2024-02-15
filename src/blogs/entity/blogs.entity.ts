import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:'blogs'})
export class Blogs {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  topic:string

  @Column({ nullable: false, length:255})
  blog_name: string

  @Column({nullable:false})
  desc:string

  @Column({nullable:false})
  blog_owner: string

  @Column({nullable:false})
  header:string

  @Column({nullable:false})
  body:string

  @Column({nullable:false})
  footer:string

  @CreateDateColumn({type:"timestamp", nullable:false })
  created_at : Date

  @Column({nullable:true, default: null})
  updated_at:Date

}
