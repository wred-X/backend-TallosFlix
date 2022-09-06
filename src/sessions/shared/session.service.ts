import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './session';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel('Session') private readonly sessionModel: Model<Session>
  ) {}

  async getAll() {
    return await this.sessionModel.find().exec();
  }

  async getById(id: string) {
    return await this.sessionModel.findById(id).exec();
  }

  async create(session: Session) {
    const createdSession = new this.sessionModel(session);
    try {
      const newSession = await createdSession.save();
      return newSession;
    } catch (e) {
      return await this.update(createdSession.user_id, session);
    }
  }

  async update(id: string, session: Session) {
    return await this.sessionModel.findByIdAndUpdate(id, session, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.sessionModel.findByIdAndDelete({ _id: id }).exec();
  }
}
