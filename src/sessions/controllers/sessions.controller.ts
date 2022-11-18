import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Session } from '../models/session';
import { SessionService } from '../services/session.service';

@ApiTags('sessions')
@ApiBearerAuth('JWT-auth')
@Controller('sessions')
export class SessionsController {
  constructor(private sessionService: SessionService) {}

  @Get()
  async getAll(): Promise<Session[]> {
    return await this.sessionService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Session> {
    return await this.sessionService.getById(id);
  }

  @Post()
  async create(@Body() session: Session): Promise<Session> {
    return await this.sessionService.create(session);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() session: Session
  ): Promise<Session> {
    return this.sessionService.update(id, session);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.sessionService.delete(id);
  }
}
