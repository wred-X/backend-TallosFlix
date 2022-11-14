import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../../autentications/models/role.enum';
import { Pages } from '../model/pages';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import { UsersController } from './users.controller';

const user: User[] = [
  {
    _id: '1',
    name: 'Vina',
    email: 'testeJest@gmail.com',
    password: 'Abc@12345',
    avatar: '',
  },
  {
    _id: '2',
    name: 'Neymar Jr.',
    email: 'testeJest2@gmail.com',
    password: 'Abc@12345',
    avatar: '',
  },
  {
    _id: '3',
    name: 'Romário',
    email: 'testeJest3@gmail.com',
    password: 'Abc@12345',
    avatar: '',
  },
];

const newUser: User = {
  _id: '1',
  name: 'Neymar Jr.',
  email: 'testeJest@gmail.com',
  password: 'Abc@12345',
  avatar: '',
};

const updatedUser = {
  _id: '1',
  name: 'Vina',
  email: 'testeJest@gmail.com',
  password: 'Abc@12345',
  avatar: '',
};

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(user),
            findAndPaginate: jest.fn().mockResolvedValue(user),
            findByEmail: jest.fn().mockResolvedValue(user[0]),
            getById: jest.fn().mockResolvedValue(user[0]),
            getMe: jest.fn().mockResolvedValue(user[0]),
            create: jest.fn().mockResolvedValue(newUser),
            createPub: jest.fn().mockRejectedValue(newUser),
            update: jest.fn().mockResolvedValue(updatedUser),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar lista de usuarios', async () => {
      // Act
      const result = await userController.getAll();

      // Assert
      expect(result).toEqual(user);
      expect(typeof result).toEqual('object');
      expect(userService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(userService, 'getAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(userController.getAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar um novo user com sucesso', async () => {
      // Arrange
      const body: User = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Neymar Jr.',
        _id: '62e9116f63a31dc1d1c90707',
      };

      // Act
      const result = await userController.create(body);

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
      expect(userController.create(body)).rejects.toThrowError();
    });
  });
  describe('createpub', () => {
    it('Deve criar um novo user com sucesso', async () => {
      // Arrange
      const body: User = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Neymar Jr.',
        _id: '62e9116f63a31dc1d1c90707',
        role: Role.USER,
      };

      // Act
      const result = await userController.create(body);

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
      expect(userController.create(body)).rejects.toThrowError();
    });
  });
  describe('getById', () => {
    it('Deve retornar um user com sucesso pelo ID', async () => {
      // Act
      const result = await userController.getById('1');

      // Assert
      expect(result).toEqual(user[0]);
      expect(userService.getById).toHaveBeenCalledTimes(1);
      expect(userService.getById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(userService, 'getById').mockRejectedValueOnce(new Error());

      // Assert
      expect(userController.getById('1')).rejects.toThrowError();
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
      const result = await userController.update('1', body);

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
      expect(userController.update(body._id, body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover um usuario com sucesso', async () => {
      // Arrange
      const id = {
        _id: '1',
      };

      // Act
      const result = await userController.delete(id._id);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const id = {
        _id: '1',
      };

      jest.spyOn(userService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(userController.delete(id._id)).rejects.toThrowError();
    });
  });

  describe('getMe', () => {
    it('Deve retornar um usuario pelo seu token', async () => {
      const body: User = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Vina',
        _id: '1',
      };

      // Act
      const result = await userController.getMe(body);

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
      expect(userController.getMe(body)).rejects.toThrowError();
    });
  });

  describe('findAndPaginate', () => {
    it('Retorna lista de usuarios paginada', async () => {
      // Arrange
      const body = {
        limit: 3,
        skip: 1,
      };

      // Act
      const result = await userController.findAndPaginate(body);

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
        limit: 15,
        skip: 1,
      };

      // Arrange
      jest
        .spyOn(userService, 'findAndPaginate')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(userController.findAndPaginate(body)).rejects.toThrowError();
    });
  });
});
