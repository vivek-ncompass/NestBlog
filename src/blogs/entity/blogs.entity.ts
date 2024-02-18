import { Topics } from "src/topic/entity/topic.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:'blogs'})
export class Blogs {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  topic:string

  @Column({ nullable: false, length:255, unique: true})
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

  @ManyToOne(()=>Topics, topic=> topic.blogs)
  topic_rel: Topics

}
