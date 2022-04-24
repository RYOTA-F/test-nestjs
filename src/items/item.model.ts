import { ItemStatus } from './item-status.enum'
import { ApiProperty } from '@nestjs/swagger'

export class Item {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  price: number
  @ApiProperty()
  description: string
  @ApiProperty()
  status: ItemStatus
}
