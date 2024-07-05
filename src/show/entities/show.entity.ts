import { Column, Entity, OneToMany,JoinColumn,ManyToOne, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from "../../user/entities/user.entity"

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  showTitle: string;

  @Column({ type: 'varchar', nullable: false })
  showContent: string;

  @Column({ type: 'varchar', nullable: false })
  showCategory: string;

  @Column({ type: 'varchar', nullable: false })
  showAddress: string;

  @Column({ type: 'varchar', nullable: false })
  showDate: string;

  // @ManyToOne(()=>User,(user)=> user.show)
  // @JoinColumn({ name: 'user_id'})
  // user:User;

  // @Column({type: 'bigint', name: 'user_id'})
  // user_id: number
}