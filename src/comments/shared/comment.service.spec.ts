import { CommentsController } from './../comments.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { Comment } from './comment';
import { CommentService } from './comment.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CommentGetDto } from './PaginationParams';

const comment: Comment[] = [
  {
    _id: '1',
    name: 'Lucas',
    email: 'lucas@gmail.com',
    movie_id: '573a1390f29313caabcd41b1',
    text: 'Nunca havia assistido,filme muito bom',
    date: new Date('1988-10-16T19:08:23.000Z'),
    isReply: false,
    comments: [],
  },
  {
    _id: '2',
    name: 'Wesley',
    email: 'Wesley@gmail.com',
    movie_id: '573a1390f29313caabcd4218',
    text: 'Filme deixou a desejar',
    date: new Date('1988-10-16T19:08:23.000Z'),
    isReply: false,
    comments: [],
  },
  {
    _id: '3',
    name: 'Juliana',
    email: 'Juliana@gmail.com',
    movie_id: '573a1390f29313caabcd432a',
    text: 'filme muito bom',
    date: new Date('1988-10-16T19:08:23.000Z'),
    isReply: false,
    comments: [],
  },
];

const newComment: Comment = {
  _id: '1',
  name: 'eu',
  email: 'eu@eu.com',
  movie_id: 'abcde1234#',
  text: 'asijdaisjdiajsdi',
  date: new Date('1988-10-16T19:08:23.000Z'),
  isReply: false,
  comments: [],
};

const updatedComment = {
  _id: '1',
  name: 'Pedro',
  email: 'pedrinDoGrau@gmail.com',
  movie_id: '573a1390f29313caabcd41b1',
  text: 'Filme muito ruim filho',
  date: new Date('1988-10-16T19:08:23.000Z'),
  isReply: false,
  comments: [],
};

const commentMovie: Comment[] = [
  {
    _id: '1',
    name: 'Lucas',
    email: 'lucas@gmail.com',
    movie_id: '573a1390f29313caabcd41b1',
    text: 'Nunca havia assistido,filme muito bom',
    date: new Date('1988-10-16T19:08:23.000Z'),
    isReply: false,
    comments: [],
  },
  {
    _id: '2',
    name: 'Pedro',
    email: 'pedrinDoGrau@gmail.com',
    movie_id: '573a1390f29313caabcd41b1',
    text: 'Filme muito ruim filho',
    date: new Date('1988-10-16T19:08:23.000Z'),
    isReply: false,
    comments: [],
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
    isReply: false,
    comments: [],
  },
  {
    _id: '2',
    name: 'Lucas',
    email: 'lucas@gmail.com',
    movie_id: '573a1390f29313caabcd432a',
    text: 'Filme muito ruim filho',
    date: new Date('1988-10-16T19:08:23.000Z'),
    isReply: false,
    comments: [],
  },
];

describe('CommentService', () => {
  let commentsController: CommentsController;
  let commentService: CommentService;
  let commentsModel: Model<Comment>;

  const mockComment = {
    getAll: jest.fn().mockResolvedValue(comment),
    getById: jest.fn().mockResolvedValue(comment[0]),
    create: jest.fn().mockResolvedValue(newComment),
    update: jest.fn().mockResolvedValue(updatedComment),
    delete: jest.fn().mockResolvedValue(undefined),
    getByEmail: jest.fn().mockRejectedValue(commentMail),
    getByMovieId: jest.fn().mockResolvedValue(commentMovie),
    updateReply: jest.fn().mockRejectedValue(newComment),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentService,
          useValue: mockComment,
        },
        {
          provide: getModelToken('Comment'),
          useValue: mockComment,
        },
      ],
    }).compile();
    commentsController = module.get<CommentsController>(CommentsController);
    commentService = module.get<CommentService>(CommentService);
    commentsModel = module.get<Model<Comment>>(getModelToken('Comment'));
  });

  it('should be defined', () => {
    expect(commentService).toBeDefined();
    expect(commentsModel).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar lista de comentarios', async () => {
      // Act
      const pagination = 1;
      const result = await commentService.getAll(
        pagination,
        new CommentGetDto()
      );

      // Assert
      expect(result).toEqual(comment);
      expect(typeof result).toEqual('object');
      expect(commentService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(commentService, 'getAll').mockRejectedValueOnce(new Error());
      const pagination = 1;
      // Assert
      expect(
        commentService.getAll(pagination, new CommentGetDto())
      ).rejects.toThrowError();
    });
  });

  describe('getById', () => {
    it('Deve retornar um comentario com sucesso pelo ID', async () => {
      // Act
      const result = await commentService.getById('1');

      // Assert
      expect(result).toEqual(comment[0]);
      expect(commentService.getById).toHaveBeenCalledTimes(1);
      expect(commentService.getById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(commentService, 'getById').mockRejectedValueOnce(new Error());

      // Assert
      expect(commentService.getById('1')).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar um novo comentario com sucesso', async () => {
      // Arrange
      const body: Comment = {
        _id: '',
        name: 'eu',
        email: 'eu@eu.com',
        movie_id: 'abcde1234#',
        text: 'asijdaisjdiajsdi',
        date: new Date('1988-10-16T19:08:23.000Z'),
        isReply: false,
        comments: [],
      };
      // Act
      const result = await commentService.create(body);

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
        isReply: false,
        comments: [],
      };
      jest.spyOn(commentService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(commentService.create(body)).rejects.toThrowError();
    });
  });
  describe('Criar respota a um comentário', () => {
    it('Deve criar  respota a um comentário', () => {
      // Arrange
      const body = {
        _id: '1',
        name: 'eu',
        email: 'eu@eu.com',
        movie_id: 'abcde1234#',
        text: 'asijdaisjdiajsdi',
        date: new Date('1988-10-16T19:08:23.000Z'),
        isReply: false,
        comments: ['10'],
      };

      const resposta = {
        _id: '10',
        movie_id: 'abcde1234#',
        name: 'Lucas',
        email: 'lucas@gmail.com',
        text: 'Essa é minha resposta',
        date: new Date('1988-10-16T19:08:23.000Z'),
        isReply: false,
        comments: [],
      };

      // Assert
      const response = commentService.updateReply(body._id, resposta);
      expect(response).toEqual(response);
      expect(body.comments).toEqual([resposta._id]);
      // Assert
    });
  });

  describe('delete', () => {
    it('Deve remover um comentário com sucesso', async () => {
      // Arrange
      const id = {
        _id: '1',
      };

      // Act
      const result = await commentService.delete(id._id);

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
      expect(commentService.delete(id._id)).rejects.toThrowError();
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
        isReply: false,
        comments: [],
      };

      // Act
      const result = await commentService.update(body._id, body);

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
        isReply: false,
        comments: [],
      };

      jest.spyOn(commentService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(commentService.update(body._id, body)).rejects.toThrowError();
    });
  });

  describe('getByEmail', () => {
    it('Retorna lista de comentarios de usuario pelo email', async () => {
      try {
        // Arrange
        const body = { mail: 'lucas@gmail.com' };

        // Act
        const result = await commentService.getByEmail(body.mail);

        // Assert
        expect(result).toEqual(commentMail);
        expect(commentService.getByEmail).toHaveBeenCalledTimes(1);
        expect(commentService.getByEmail).toHaveBeenCalledWith(body.mail);
      } catch (error) {
        console.log('Error >>>>>>>', error);
      }
    });

    it('should throw an exception', () => {
      // Arrange
      const body = { mail: 'lucas@gmail.com' };

      // Arrange
      jest
        .spyOn(commentService, 'getByEmail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(commentService.getByEmail(body.mail)).rejects.toThrowError();
    });
  });

  describe('getByMovieId', () => {
    it('Pesquisar comentarios de um filme', async () => {
      const body = {
        movie: '573a1390f29313caabcd41b1',
      };

      const result = await commentService.getByMovieId(body.movie);

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
      expect(commentService.getByMovieId(body.movie)).rejects.toThrowError();
    });
  });
});
