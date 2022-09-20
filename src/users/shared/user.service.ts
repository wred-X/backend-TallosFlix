import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';
import * as bcrypt from 'bcrypt';
import { Update } from '../model/update';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find().exec();
  }

  async getMe(user: User) {
    return user;
  }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    const usuarioEncontrado = this.userModel.findOne({ email });
    return usuarioEncontrado;
  }

  async create(user: User) {
    console.log(user);
    const data = {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    };
    console.log(data);
    const createdUser = new this.userModel(data);
    return await createdUser.save();
  }

  async update(id: string, user: Update) {
    const data = user;
    console.log(data);
    if (user.password) {
      const data = {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      };
      return await this.userModel.findByIdAndUpdate(id, data, {
        new: true,
      });
    } else {
      return await this.userModel.findByIdAndUpdate(id, data, {
        new: true,
      });
    }
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete({ _id: id }).exec();
  }
}
