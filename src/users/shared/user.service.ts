import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find().exec();
  }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async getMe(user: User) {
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const usuarioEncontrado = this.userModel.findOne({ email });
    return usuarioEncontrado;
  }

  async create(user: User) {
    const data = {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    };
    const createdUser = new this.userModel(data);
    return await createdUser.save();
  }

  async update(id: string, user: User) {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete({ _id: id }).exec();
  }
}
