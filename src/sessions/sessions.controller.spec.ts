import { Test, TestingModule } from '@nestjs/testing';
import { SessionsController } from './sessions.controller';
import { Session } from './shared/session';
import { SessionService } from './shared/session.service';

const session: Session[] = [
  { _id: '1', user_id: '1', jwt: 'abcde1234#' },
  { _id: '2', user_id: '2', jwt: 'abcde1234#' },
  { _id: '3', user_id: '3', jwt: 'abcde1234#' },
];

const newSession: Session = { _id: '1', user_id: '1', jwt: 'abcde1234#' };

const updatedSession = { _id: '1', user_id: '1', jwt: 'abcde1234#' };

describe('SessionsController', () => {
  let sessionController: SessionsController;
  let sessionService: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsController],
      providers: [
        {
          provide: SessionService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(session),
            getById: jest.fn().mockResolvedValue(session[0]),
            create: jest.fn().mockResolvedValue(newSession),
            update: jest.fn().mockResolvedValue(updatedSession),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    sessionController = module.get<SessionsController>(SessionsController);
    sessionService = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(sessionController).toBeDefined();
    expect(sessionService).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar lista de usuarios logados', async () => {
      // Act
      const result = await sessionController.getAll();

      // Assert
      expect(result).toEqual(session);
      expect(typeof result).toEqual('object');
      expect(sessionService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(sessionService, 'getAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(sessionController.getAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar uma nova sessão com sucesso', async () => {
      // Arrange
      const body: Session = { _id: '1', user_id: '1', jwt: 'abcde1234#' };
      // Act
      const result = await sessionController.create(body);

      // Assert
      expect(result).toEqual(newSession);
      expect(sessionService.create).toHaveBeenCalledTimes(1);
      expect(sessionService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Session = { _id: '1', user_id: '1', jwt: 'abcde1234#' };
      jest.spyOn(sessionService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(sessionController.create(body)).rejects.toThrowError();
    });
  });
  describe('getById', () => {
    it('Deve retornar uma sessão com sucesso pelo ID', async () => {
      // Act
      const result = await sessionController.getById('1');

      // Assert
      expect(result).toEqual(session[0]);
      expect(sessionService.getById).toHaveBeenCalledTimes(1);
      expect(sessionService.getById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(sessionService, 'getById').mockRejectedValueOnce(new Error());

      // Assert
      expect(sessionController.getById('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('Deve alterar dados de uma sessão pelo ID', async () => {
      // Arrange
      const body: Session = { _id: '1', user_id: '1', jwt: 'abcde1234#' };

      // Act
      const result = await sessionController.update('1', body);

      // Assert
      expect(result).toEqual(updatedSession);
      expect(sessionService.update).toHaveBeenCalledTimes(1);
      expect(sessionService.update).toHaveBeenCalledWith(body._id, body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Session = { _id: '1', user_id: '1', jwt: 'abcde1234#' };

      jest.spyOn(sessionService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(sessionController.update(body._id, body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover uma sessão com sucesso', async () => {
      // Arrange
      const id = {
        _id: '1',
      };

      // Act
      const result = await sessionController.delete(id._id);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const id = {
        _id: '1',
      };

      jest.spyOn(sessionService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(sessionController.delete(id._id)).rejects.toThrowError();
    });
  });
});
