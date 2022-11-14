import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../shared/user';
import * as bcrypt from 'bcrypt';
import { Update } from '../model/update';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAll() {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getMe(user: User) {
    try {
      return user;
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: string) {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async getPhoto(mail: string) {
    try {
      const avatar = await this.userModel.find({ email: mail });
      return avatar[0].avatar;
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAndPaginate(limit: number, skip: number) {
    try {
      const skipValue = limit * (skip - 1);
      return this.userModel.find().limit(limit).skip(skipValue);
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const usuarioEncontrado = this.userModel.findOne({ email });
      return usuarioEncontrado;
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(user: User) {
    try {
      const data = {
        ...user,
        password: await bcrypt.hash(user.password, 10),
      };
      const createdUser = new this.userModel(data);
      return await createdUser.save();
    } catch (error) {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async update(id: string, user: Update) {
    try {
      const data = user;
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
    } catch (error) {
      throw new HttpException('Check all datas', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: string) {
    try {
      return await this.userModel.findByIdAndDelete({ _id: id }).exec();
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
