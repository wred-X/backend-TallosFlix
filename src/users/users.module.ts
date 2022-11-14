import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { AutenticationsModule } from '../autentications/autentications.module';
@Module({
  imports: [
    forwardRef(() => AutenticationsModule),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService,UsersModule],
})
export class UsersModule {}
