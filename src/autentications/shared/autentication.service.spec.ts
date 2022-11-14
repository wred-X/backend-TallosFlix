import { AutenticationService } from './autentication.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../users/services/user.service';

const newLog = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmJkZGYxZmYzY2UwODZhNzIxNjdlY2EiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsIm5hbWUiOiJOZXltYXIgSnIuIiwiaWF0IjoxNjU5NTQ2MTY3LCJleHAiOjE2NjIxMzgxNjd9.m_VTm2n5F-qhY_SbekV8sXWlHLwjCLU2G9MEQ6vA7iU',
};

const userByToken = {
  _id: '62bddf1ff3ce086a72167eca',
  email: 'testeJest@gmail.com',
  name: 'Neymar Jr.',
  age: 33,
  description: 'Caixa',
  owner: false,
};

describe('AutenticationController', () => {
  let autenticationService: AutenticationService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AutenticationService,
          useValue: {
            login: jest.fn().mockResolvedValue(newLog),
            validateUser: jest.fn().mockResolvedValue(newLog),
            getUserFromAuthToken: jest.fn().mockResolvedValue(userByToken),
          },
        },
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    autenticationService =
      module.get<AutenticationService>(AutenticationService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(autenticationService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('login', () => {
    it('Deve logar um user, autenticando e retornando um token com sucesso', async () => {
      // Arrange
      const body = {
        _id: '62bddf1ff3ce086a72167eca',
        email: 'testeJest@gmail.com',
        name: 'Neymar Jr.',
        age: 33,
        description: 'Caixa',
        owner: false,
        password: 'Abc@1234',
      };
      // };

      // Act
      const result = await autenticationService.login(body);

      // Assert
      expect(result).toEqual(newLog);
      expect(autenticationService.login).toHaveBeenCalledTimes(1);
      expect(autenticationService.login).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        _id: '62bddf1ff3ce086a72167eca',
        email: 'testeJest@gmail.com',
        name: 'Neymar Jr.',
        age: 33,
        description: 'Caixa',
        owner: false,
        password: 'Abc@1234',
      };

      jest
        .spyOn(autenticationService, 'login')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(autenticationService.login(body)).rejects.toThrowError();
    });
  });

  describe('validateUser', () => {
    it('Deve validar um user pelo email e senha com sucesso', async () => {
      // Arrange
      const body = {
        email: 'testeJest@gmail.com',
        password: 'Abc@1234',
      };
      // };

      // Act
      const result = await autenticationService.validateUser(
        body.email,
        body.password
      );

      // Assert
      expect(result).toEqual(newLog);
      expect(autenticationService.validateUser).toHaveBeenCalledTimes(1);
      expect(autenticationService.validateUser).toHaveBeenCalledWith(
        body.email,
        body.password
      );
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        email: 'testeJest@gmail.com',
        password: 'Abc@1234',
      };

      jest
        .spyOn(autenticationService, 'validateUser')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        autenticationService.validateUser(body.email, body.password)
      ).rejects.toThrowError();
    });
  });

  describe('getUserFromAuthToken', () => {
    it('Deve retornar um user utilizando apenas o token', async () => {
      // Arrange
      const body =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzFmNzg0YmE2NWQ3ZDBkNWViYzhmMTkiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsIm5hbWUiOiJXZXNsZXkgUm9tw6NvIiwiaWF0IjoxNjY1NzY5NjMwLCJleHAiOjE2NjU5NDI0MzB9.5pO4ajTuEstw_tv6JllhB3Ij1K0AMrzDLkOvI3U4-Ac';

      // };

      // Act
      const result = await autenticationService.getUserFromAuthToken(body);

      // Assert
      expect(result).toEqual(userByToken);
      expect(autenticationService.getUserFromAuthToken).toHaveBeenCalledTimes(
        1
      );
      expect(autenticationService.getUserFromAuthToken).toHaveBeenCalledWith(
        body
      );
    });

    it('should throw an exception', () => {
      // Arrange
      const body =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzFmNzg0YmE2NWQ3ZDBkNWViYzhmMTkiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsIm5hbWUiOiJXZXNsZXkgUm9tw6NvIiwiaWF0IjoxNjY1NzY5NjMwLCJleHAiOjE2NjU5NDI0MzB9.5pO4ajTuEstw_tv6JllhB3Ij1K0AMrzDLkOvI3U4-Ac';

      jest
        .spyOn(autenticationService, 'getUserFromAuthToken')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        autenticationService.getUserFromAuthToken(body)
      ).rejects.toThrowError();
    });
  });
});
