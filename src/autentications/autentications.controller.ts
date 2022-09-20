import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { IsPublic } from './decorators/is-public-decorator';
import { LocalAutenticationGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { LoginRequestBody } from './models/loginRequestBody';
import { AutenticationService } from './shared/autentication.service';

@ApiTags('login')
@ApiBearerAuth('JWT-auth')
@Controller()
export class AutenticationsController {
  constructor(private autenticationService: AutenticationService) {}

  @IsPublic()
  @ApiBody({ type: LoginRequestBody })
  @UseGuards(LocalAutenticationGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.autenticationService.login(req.user);
  }
}
