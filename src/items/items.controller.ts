import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { User } from '../entities/user.entity'
import { Item } from '../entities/item.entity'
import { ItemsService } from './items.service'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { GetUser } from 'src/decorator/get-user.decorator'

@Controller('items')
// ClassSerializerInterceptor: ハンドラーがレスポンスを返す前にpasswordをExcludeするロジックを追加
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll()
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.create(createItemDto, user)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.updateStatus(id, user)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return await this.itemsService.delete(id, user)
  }
}
