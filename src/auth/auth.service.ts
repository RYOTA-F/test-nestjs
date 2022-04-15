import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { CredentialsDto } from './dto/credentials.dto'
import { UserRepositoty } from './user.repositoty'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userRepositoty: UserRepositoty,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepositoty.createUser(createUserDto)
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = credentialsDto
    const user = await this.userRepositoty.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, username: user.username }
      const accessToken = await this.jwtService.sign(payload)
      return { accessToken }
    }

    throw new UnauthorizedException(
      'ユーザー名またはパスワードを確認してください',
    )
  }
}
