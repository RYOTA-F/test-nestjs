import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserRepositoty } from './user.repositoty'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepositoty])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
