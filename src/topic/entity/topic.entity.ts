import { Blogs } from "src/blogs/entity/blogs.entity"
import { Users } from "src/users/entity/users.entity"
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:'topics'})
export class Topics {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, length:255, unique:true})
  topic_name: string

  @Column({nullable:false})
  desc:string

  @Column({nullable:false})
  topic_owner: string

  @CreateDateColumn({type:"timestamp", nullable:false })
  created_at : Date

  @Column({nullable:true, default: null})
  updated_at:Date

  @ManyToMany(()=>Users)
  @JoinTable()
  editors:Users[]

  @ManyToMany(()=>Users)
  @JoinTable()
  viewers:Users[]

  @OneToMany(()=>Blogs, blog => blog.topic_rel)
  blogs:Blogs[]

}
