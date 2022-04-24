import { IsString, IsNotEmpty, MaxLength, IsInt, Min } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @ApiProperty({ type: [String] })
  name: string

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ type: [Number] })
  price: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: [String] })
  description: string
}
