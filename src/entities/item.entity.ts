import { ItemStatus } from 'src/items/item-status.enum'
import { User } from 'src/entities/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  description: string

  @Column()
  status: ItemStatus

  @Column()
  createdAt: string

  @Column()
  updatedAd: string

  @ManyToOne(() => User, (user) => user.items)
  user: User

  @Column()
  userId: string
}
