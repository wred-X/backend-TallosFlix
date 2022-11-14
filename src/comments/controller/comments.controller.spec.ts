import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { Comment } from '../shared/comment';
import { CommentService } from '../service/comment.service';
import { CommentGetDto } from '../shared/PaginationParams';

const comment: Comment[] = [
  {
    _id: '1',
    name: 'eu',
    email: 'eu@eu.com',
    movie_id: 'abcde1234#',
    text: 'asijdaisjdiajsdi',
    date: new Date('1988-10-16T19:08:23.000Z'),
    isReply: false,
    commentReply: '1',
  },
  {
    _id: '2',
    name: 'eu2',
    email: 'eu3@eu.com',
    movie_id: 'abcde1234#',
    text: 'asijdaisjdiajsdi',
    date: new Date('1988-10-16T19:08:23.000Z'),
    isReply: false,
    commentReply: '2',
  },
  {
    _id: '3',
    name: 'eu3',
    email: 'eu2@eu.com',
    movie_id: 'abcde1234#',
    text: 'asijdaisjdiajsdi',
    date: new Date('1988-10-16T19:08:23.000Z'),
    isReply: false,
    commentReply: '3',
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
  commentReply: '1',
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
    isReply: false,
    commentReply: '1',
  },
  {
    _id: '2',
    name: 'Pedro',
    email: 'pedrinDoGrau@gmail.com',
    movie_id: '573a1390f29313caabcd41b1',
    text: 'Filme muito ruim filho',
    date: new Date('1988-10-16T19:08:23.000Z'),
    isReply: false,
    commentReply: '2',
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
    commentReply: '1',
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
            getByEmail: jest.fn().mockRejectedValue(commentMail[0]),
            getByMovieId: jest.fn().mockResolvedValue(commentMovie),
            updateReply: jest.fn().mockRejectedValue(newComment),
            updateLike: jest.fn().mockRejectedValue(newComment),
            getByReply: jest.fn().mockResolvedValue(comment[0]),
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
    it('Deve retornar lista de comentarios', async () => {
      // Act
      const pagination = 1;
      const result = await commentController.getAll(
        new CommentGetDto(),
        pagination
      );

      // Assert
      expect(result).toEqual(comment);
      expect(typeof result).toEqual('object');
      expect(commentService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(commentService, 'getAll').mockRejectedValueOnce(new Error());

      // Assert
      const pagination = 1;
      expect(
        commentController.getAll(new CommentGetDto(), pagination)
      ).rejects.toThrowError();
    });
  });
  describe('Retorna as resposta do comentário através do ID do comentário principal', () => {
    it('Deve retornar lista de comentarios', async () => {
      // Act
      const pagination = {
        limit: 1,
        skip: 1,
      };
      const result = await commentController.getByReply(
        pagination,
        commentMovie[0].commentReply
      );
      // Assert
      expect(result).toEqual(comment[0]);
      expect(typeof result).toEqual('object');
      expect(commentService.getByReply).toHaveBeenCalled();
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(commentService, 'getByReply')
        .mockRejectedValueOnce(new Error());

      // Assert

      expect(
        commentController.getByReply(new CommentGetDto(), '1')
      ).rejects.toThrowError();
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

  describe('getByReply', () => {
    it('Deve retornar as respostas de um comentario com sucesso pelo ID', async () => {
      // Act
      const result = await commentController.getByReply(
        { page: 1, limit: 1 },
        '5a9427648b0beebeb69579cf'
      );

      // Assert
      expect(result).toEqual(comment[0]);
      expect(commentService.getByReply).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(commentService, 'getByReply')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        commentController.getByReply(
          { page: 1, limit: 1 },
          '5a9427648b0beebeb69579cf'
        )
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar uma novo comentario com sucesso', async () => {
      // Arrange
      const body: Comment = {
        _id: '',
        name: 'eu',
        email: 'eu@eu.com',
        movie_id: 'abcde1234#',
        text: 'asijdaisjdiajsdi',
        date: new Date('1988-10-16T19:08:23.000Z'),
        isReply: false,
        commentReply: '1',
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
        isReply: false,
        commentReply: '1',
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

  // describe('Criar respota a um comentário', () => {
  //   it('Deve criar  respota a um comentário', () => {
  //     // Arrange
  //     const body = {
  //       _id: '1',
  //       name: 'eu',
  //       email: 'eu@eu.com',
  //       movie_id: 'abcde1234#',
  //       text: 'asijdaisjdiajsdi',
  //       date: new Date('1988-10-16T19:08:23.000Z'),
  //       isReply: false,
  //     };

  //     const resposta = {
  //       _id: '10',
  //       movie_id: 'abcde1234#',
  //       name: 'Lucas',
  //       email: 'lucas@gmail.com',
  //       text: 'Essa é minha resposta',
  //       date: new Date('1988-10-16T19:08:23.000Z'),
  //       isReply: false,
  //       commentReply: '1',
  //     };

  //     // Assert
  //     const response = commentController.replyComment(body._id, resposta);
  //     console.log('REPLY', response);
  //     expect(response).toEqual(response);
  //     expect(body._id).toEqual(resposta.commentReply);
  //     // Assert
  //   });
  // });

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
        commentReply: '1',
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
        isReply: false,
        commentReply: '1',
      };

      jest.spyOn(commentService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(commentController.update(body._id, body)).rejects.toThrowError();
    });
  });

  describe('getByEmail', () => {
    it('Retorna lista de comentarios de usuario pelo email', async () => {
      try {
        const body = 'lucas@gmail.com';

        console.log(
          await commentController.getByEmail(
            { limit: 1, page: 1 },
            { mail: body }
          )
        );

        const result = await commentController.getByEmail(
          { limit: 1, page: 1 },
          { mail: body }
        );

        expect(result).toEqual(commentMail);
        expect(commentService.getByEmail).toHaveBeenCalledTimes(1);
        expect(commentService.getByEmail).toHaveBeenCalledWith(
          { limit: 1, page: 1 },
          { mail: body }
        );
      } catch (error) {
        console.log('Error OADJOAISJDOIAJ >>>>>>>', error);
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
      expect(
        commentController.getByEmail({ limit: 1, page: 1 }, body)
      ).rejects.toThrowError();
    });
  });

  describe('getByMovieId', () => {
    it('Pesquisar comentarios de um filme', async () => {
      const body = {
        movie: '573a1390f29313caabcd41b1',
      };

      const result = await commentController.getByMovieId(
        { limit: 1, page: 1 },
        new CommentGetDto(),
        body
      );

      expect(result).toEqual(commentMovie);
      expect(commentService.getByMovieId).toHaveBeenCalledTimes(1);
      expect(commentService.getByMovieId).toHaveBeenCalledWith(
        { limit: 1, page: 1 },
        body.movie,
        new CommentGetDto()
      );
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
      expect(
        commentController.getByMovieId(
          { limit: 1, page: 1 },
          new CommentGetDto(),
          body
        )
      ).rejects.toThrowError();
    });
  });
});
