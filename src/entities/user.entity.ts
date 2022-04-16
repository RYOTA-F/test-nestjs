import { UserStatus } from 'src/auth/user-status.enum'
import { Item } from 'src/entities/item.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column()
  status: UserStatus

  @OneToMany(() => Item, (item) => item.user)
  items: Item[]
}
