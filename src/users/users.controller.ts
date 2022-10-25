import { Role } from './../autentications/models/role.enum';
import { RolesGuard } from './../autentications/guards/role.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger/dist';
import { User } from './shared/user';
import { UserService } from './shared/user.service';
import { CurrentUser } from '../autentications/decorators/current-user.decorator';
import { Update } from './model/update';
import { Pages } from './model/pages';
import { Roles } from 'src/autentications/decorators/role-decorator';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return this.userService.getMe(user);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return await this.userService.getById(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async create(@Body() user: User): Promise<User> {
    user.avatar = '';
    return await this.userService.create(user);
  }

  @ApiBody({ type: Pages })
  @Post('/paginate')
  async findAndPaginate(@Body() pages: { limit: number; skip: number }) {
    return this.userService.findAndPaginate(pages.limit, pages.skip);
  }

  @Put(':id')
  @Roles(Role.ADMIN,Role.USER)
  @UseGuards(RolesGuard)
  async update(@Param('id') id: string, @Body() user: Update): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
