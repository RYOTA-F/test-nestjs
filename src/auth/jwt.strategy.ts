import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { User } from 'src/entities/user.entity'
import { UserRepositoty } from './user.repositoty'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepositoty) {
    super({
      // リクエストのどの部分にJWTが含まれているかを指定: authHeader > bearerToken
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // トークンの有効期限切れチェック: falseチェックする
      ignoreExpiration: false,
      secretOrKey: 'secretKey123',
    })
  }

  async validate(payload: { id: string; username: string }): Promise<User> {
    const { id, username } = payload
    const user = await this.userRepository.findOne({ id, username })

    if (user) {
      return user
    }

    throw new UnauthorizedException()
  }
}
