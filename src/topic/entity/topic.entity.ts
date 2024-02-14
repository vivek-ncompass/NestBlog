import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:'topic'})
export class TOPIC {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, length:255})
  topic_name: string

  @Column({nullable:false})
  desc:string

  @Column({nullable:false})
  owner: string

  @CreateDateColumn({type:"timestamp", nullable:false })
  created_at : Date

  @Column({nullable:true})
  updated_at:Date

  @ManyToMany(()=>Users)
  editors:Users[]

  @ManyToMany(()=>Users)
  viewers:Users[]

  @ManyToMany(()=>Blogs)
  blogs:Blogs[]

}
