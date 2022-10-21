import { AutenticationsController } from './autentications.controller';
import { AutenticationService } from './shared/autentication.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthRequest } from './models/authRequest';

const newLog = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmJkZGYxZmYzY2UwODZhNzIxNjdlY2EiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsIm5hbWUiOiJOZXltYXIgSnIuIiwiaWF0IjoxNjU5NTQ2MTY3LCJleHAiOjE2NjIxMzgxNjd9.m_VTm2n5F-qhY_SbekV8sXWlHLwjCLU2G9MEQ6vA7iU',
};

describe('AutenticationsController', () => {
  let autenticationController: AutenticationsController;
  let autenticationService: AutenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutenticationsController],
      providers: [
        {
          provide: AutenticationService,
          useValue: {
            login: jest.fn().mockResolvedValue(newLog),
            validateUser: jest.fn(),
            getUserFromAutenticationToken: jest.fn(),
          },
        },
      ],
    }).compile();

    autenticationController = module.get<AutenticationsController>(
      AutenticationsController
    );
    autenticationService =
      module.get<AutenticationService>(AutenticationService);
  });

  it('should be defined', () => {
    expect(autenticationController).toBeDefined();
    expect(autenticationService).toBeDefined();
  });

  describe('login', () => {
    it('Deve criar um novo user com sucesso', async () => {
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
      let body: AuthRequest;

      jest
        .spyOn(autenticationService, 'login')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(autenticationController.login(body)).rejects.toThrowError();
    });
  });
});
