import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User } from '../shared/user';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Pages } from '../model/pages';

const user: User[] = [
  {
    _id: '1',
    email: 'testeJest@gmail.com',
    name: 'Vina',
    password: 'Abc@12345',
    avatar: '',
  },
  {
    _id: '2',
    email: 'testeJest@gmail.com',
    name: 'Vina',
    password: 'Abc@12345',
    avatar: '',
  },
  {
    _id: '3',
    email: 'testeJest@gmail.com',
    name: 'Vina',
    password: 'Abc@12345',
    avatar: '',
  },
];

const newUser: User = {
  email: 'testeJest@gmail.com',
  name: 'Vina',
  password: 'Abc@12345',
  avatar: '',
  _id: '1',
};

const updatedUser = {
  email: 'testeJest@gmail.com',
  name: 'Vina',
  password: 'Abc@12345',
  avatar: '',
  _id: '1',
};

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<User>;

  const mockUser = {
    getAll: jest.fn().mockResolvedValue(user),
    getById: jest.fn().mockResolvedValue(user[0]),
    getMe: jest.fn().mockResolvedValue(user[0]),
    create: jest.fn().mockResolvedValue(newUser),
    update: jest.fn().mockResolvedValue(updatedUser),
    delete: jest.fn().mockResolvedValue(undefined),
    findByEmail: jest.fn().mockResolvedValue(user[0]),
    findAndPaginate: jest.fn().mockResolvedValue(user),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: mockUser,
        },
        {
          provide: getModelToken('User'),
          useValue: mockUser,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userModel).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar toda a lista completa de usuarios', async () => {
      // Act
      const result = await userService.getAll();

      // Assert
      expect(result).toEqual(user);
      expect(typeof result).toEqual('object');
      expect(userService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(userService, 'getAll').mockRejectedValueOnce(new Error());

      //Assert
      expect(userService.getAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar um usuario com sucesso!', async () => {
      // Arrange
      const body: User = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Vina',
        _id: '',
      };

      // Act
      const result = await userService.create(body);
      // Assert
      expect(result).toEqual(newUser);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(userService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: User = {
        email: 'teste2@gmail.com',
        password: '*Lumia710',
        name: 'Neymar3333 Jr.',
        _id: '',
      };

      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());
      // Assert
      expect(userService.create(body)).rejects.toThrowError();
    });
  });

  describe('getById', () => {
    it('Deve retornar um usuario pelo ID', async () => {
      // Act
      const result = await userService.getById('1');

      // Assert
      expect(result).toEqual(user[0]);
      expect(userService.getById).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest.spyOn(userService, 'getById').mockRejectedValueOnce(new Error());

      // Assert
      expect(userService.getById('1')).rejects.toThrowError();
    });
  });

  describe('findByEmail', () => {
    it('Deve retornar um usuario a partir do email', async () => {
      // Act
      const result = await userService.findByEmail('testeJest@gmail.com');

      // Assert
      expect(result).toEqual(user[0]);
      expect(userService.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest.spyOn(userService, 'findByEmail').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        userService.findByEmail('testeJest@gmail.com')
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('Deve alterar dados de um user pelo ID', async () => {
      // Arrange
      const body: User = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Vina',
        _id: '1',
      };

      // Act
      const result = await userService.update(body._id, body);

      // Assert
      expect(result).toEqual(updatedUser);
      expect(userService.update).toHaveBeenCalledTimes(1);
      expect(userService.update).toHaveBeenCalledWith(body._id, body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: User = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Vina',
        _id: '1',
      };

      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(userService.update(body._id, body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover um usuario com sucesso', async () => {
      // Act
      const result = await userService.delete('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(userService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(userService.delete('1')).rejects.toThrowError();
    });
  });

  describe('getMe', () => {
    it('Deve buscar um usuario pelo seu token com sucesso', async () => {
      const body: User = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Vina',
        _id: '1',
      };

      // Act
      const result = await userService.getMe(body);

      // Assert
      expect(result).toEqual(user[0]);
      expect(userService.getMe).toHaveBeenCalledTimes(1);
      //expect(typeof result).toEqual('object');
    });

    it('should throw an exception', async () => {
      const body: User = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Vina',
        _id: '1',
      };
      // Arrange
      jest.spyOn(userService, 'getMe').mockRejectedValueOnce(new Error());

      // Assert
      expect(userService.getMe(body)).rejects.toThrowError();
    });
  });

  describe('findAndPaginate', () => {
    it('Retorna lista de usuarios paginada', async () => {
      // Arrange
      const body: Pages = {
        limit: 3,
        skip: 1,
      };

      // Act
      const result = await userService.findAndPaginate(body.limit, body.skip);

      // Assert
      expect(result).toEqual(user);
      expect(userService.findAndPaginate).toHaveBeenCalledTimes(1);
      expect(userService.findAndPaginate).toHaveBeenCalledWith(
        body.limit,
        body.skip
      );
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Pages = {
        limit: 3,
        skip: 1,
      };

      // Arrange
      jest
        .spyOn(userService, 'findAndPaginate')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        userService.findAndPaginate(body.limit, body.skip)
      ).rejects.toThrowError();
    });
  });
});
