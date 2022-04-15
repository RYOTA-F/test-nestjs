import { Injectable } from '@nestjs/common'
import { User } from 'src/entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UserRepositoty } from './user.repositoty'

@Injectable()
export class AuthService {
  constructor(private userRepositoty: UserRepositoty) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepositoty.createUser(createUserDto)
  }
}
