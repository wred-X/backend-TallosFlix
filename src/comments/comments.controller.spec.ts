import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentService } from './shared/comment.service';
import { Comment } from './shared/comment';
import { eComment } from './model/emailComment';

const comment: Comment[] = [
  {
    _id: '1',
    name: 'eu',
    email: 'eu@eu.com',
    movie_id: 'abcde1234#',
    text: 'asijdaisjdiajsdi',
    date: new Date('1988-10-16T19:08:23.000Z'),
  },
  {
    _id: '2',
    name: 'eu2',
    email: 'eu3@eu.com',
    movie_id: 'abcde1234#',
    text: 'asijdaisjdiajsdi',
    date: new Date('1988-10-16T19:08:23.000Z'),
  },
  {
    _id: '3',
    name: 'eu3',
    email: 'eu2@eu.com',
    movie_id: 'abcde1234#',
    text: 'asijdaisjdiajsdi',
    date: new Date('1988-10-16T19:08:23.000Z'),
  },
];

const newComment: Comment = {
  _id: '1',
  name: 'eu',
  email: 'eu@eu.com',
  movie_id: 'abcde1234#',
  text: 'asijdaisjdiajsdi',
  date: new Date('1988-10-16T19:08:23.000Z'),
};

const updatedComment = {
  _id: '1',
  name: 'Pedro',
  email: 'pedrinDoGrau@gmail.com',
  movie_id: '573a1390f29313caabcd41b1',
  text: 'Filme muito ruim filho',
  date: new Date('1988-10-16T19:08:23.000Z'),
};

const commentMovie: Comment[] = [
  {
    _id: '1',
    name: 'Lucas',
    email: 'lucas@gmail.com',
    movie_id: '573a1390f29313caabcd41b1',
    text: 'Nunca havia assistido,filme muito bom',
    date: new Date('1988-10-16T19:08:23.000Z'),
  },
  {
    _id: '2',
    name: 'Pedro',
    email: 'pedrinDoGrau@gmail.com',
    movie_id: '573a1390f29313caabcd41b1',
    text: 'Filme muito ruim filho',
    date: new Date('1988-10-16T19:08:23.000Z'),
  },
];

const commentMail: Comment[] = [
  {
    _id: '1',
    name: 'Lucas',
    email: 'lucas@gmail.com',
    movie_id: '573a1390f29313caabcd41b1',
    text: 'Nunca havia assistido,filme muito bom',
    date: new Date('1988-10-16T19:08:23.000Z'),
  },
  {
    _id: '2',
    name: 'Lucas',
    email: 'lucas@gmail.com',
    movie_id: '573a1390f29313caabcd432a',
    text: 'Filme muito ruim filho',
    date: new Date('1988-10-16T19:08:23.000Z'),
  },
];

describe('CommentsController', () => {
  let commentController: CommentsController;
  let commentService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(comment),
            getById: jest.fn().mockResolvedValue(comment[0]),
            create: jest.fn().mockResolvedValue(newComment),
            update: jest.fn().mockResolvedValue(updatedComment),
            delete: jest.fn().mockResolvedValue(undefined),
            getByEmail: jest.fn().mockRejectedValue(commentMail),
            getByMovieId: jest.fn().mockResolvedValue(commentMovie),
          },
        },
      ],
    }).compile();

    commentController = module.get<CommentsController>(CommentsController);
    commentService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(commentController).toBeDefined();
    expect(commentService).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar lista de usuarios logados', async () => {
      // Act
      const result = await commentController.getAll();

      // Assert
      expect(result).toEqual(comment);
      expect(typeof result).toEqual('object');
      expect(commentService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(commentService, 'getAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(commentController.getAll()).rejects.toThrowError();
    });
  });

  describe('getById', () => {
    it('Deve retornar um comentario com sucesso pelo ID', async () => {
      // Act
      const result = await commentController.getById('1');

      // Assert
      expect(result).toEqual(comment[0]);
      expect(commentService.getById).toHaveBeenCalledTimes(1);
      expect(commentService.getById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(commentService, 'getById').mockRejectedValueOnce(new Error());

      // Assert
      expect(commentController.getById('1')).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar uma nova sessão com sucesso', async () => {
      // Arrange
      const body: Comment = {
        _id: '',
        name: 'eu',
        email: 'eu@eu.com',
        movie_id: 'abcde1234#',
        text: 'asijdaisjdiajsdi',
        date: new Date('1988-10-16T19:08:23.000Z'),
      };
      // Act
      const result = await commentController.create(body);

      // Assert
      expect(result).toEqual(newComment);
      expect(commentService.create).toHaveBeenCalledTimes(1);
      expect(commentService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Comment = {
        _id: '',
        name: 'eu',
        email: 'eu@eu.com',
        movie_id: 'abcde1234#',
        text: 'asijdaisjdiajsdi',
        date: new Date('1988-10-16T19:08:23.000Z'),
      };
      jest.spyOn(commentService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(commentController.create(body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover um comentário com sucesso', async () => {
      // Arrange
      const id = {
        _id: '1',
      };

      // Act
      const result = await commentController.delete(id._id);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const id = {
        _id: '1',
      };

      jest.spyOn(commentService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(commentController.delete(id._id)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('Deve atualizar comentário', async () => {
      // Arrange
      const body = {
        _id: '1',
        name: 'Pedro',
        email: 'pedrinDoGrau@gmail.com',
        movie_id: '573a1390f29313caabcd41b1',
        text: 'Filme muito ruim filho',
        date: new Date('1988-10-16T19:08:23.000Z'),
      };

      // Act
      const result = await commentController.update(body._id, body);

      // Assert
      expect(result).toEqual(updatedComment);
      expect(commentService.update).toHaveBeenCalledTimes(1);
      expect(commentService.update).toHaveBeenCalledWith(body._id, body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        _id: '1',
        name: 'Pedro',
        email: 'pedrinDoGrau@gmail.com',
        movie_id: '573a1390f29313caabcd41b1',
        text: 'Filme muito ruim filho',
        date: new Date('1988-10-16T19:08:23.000Z'),
      };

      jest.spyOn(commentService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(commentController.update(body._id, body)).rejects.toThrowError();
    });
  });

  describe('getByEmail', () => {
    it('Pesquisar', async () => {
      const body = {
        mail: 'lucas@gmail.com',
      };

      const result = await commentController.getByEmail(body);

      expect(result).toEqual(commentMail);
      expect(commentService.getByEmail).toHaveBeenCalledTimes(1);
      expect(commentService.getByEmail).toHaveBeenCalledWith(body.mail);
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        mail: 'lucas@gmail.com',
      };

      // Arrange
      jest
        .spyOn(commentService, 'getByEmail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(commentController.getByEmail(body)).rejects.toThrowError();
    });
  });

  describe('getByMovieId', () => {
    it('Pesquisar a que filme esta atribuido o comentario', async () => {
      const body = {
        movie: '573a1390f29313caabcd41b1',
      };

      const result = await commentController.getByMovieId(body);

      expect(result).toEqual(commentMovie);
      expect(commentService.getByMovieId).toHaveBeenCalledTimes(1);
      expect(commentService.getByMovieId).toHaveBeenCalledWith(body.movie);
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        movie: '573a1390f29313caabcd41b1',
      };

      // Arrange
      jest
        .spyOn(commentService, 'getByMovieId')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(commentController.getByMovieId(body)).rejects.toThrowError();
    });
  });
});
