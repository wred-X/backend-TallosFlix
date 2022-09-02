import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { IsPublic } from './decorators/is-public-decorator';
import { LocalAutenticationGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { AutenticationService } from './shared/autentication.service';

@Controller()
export class AutenticationsController {
  constructor(private autenticationService: AutenticationService) {}

  @IsPublic()
  @UseGuards(LocalAutenticationGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.autenticationService.login(req.user);
  }
}
