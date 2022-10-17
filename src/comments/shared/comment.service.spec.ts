import { CommentsController } from './../comments.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { Comment } from './comment';
import { CommentService } from './comment.service';

const comment: Comment[] = [
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
    name: 'Wesley',
    email: 'Wesley@gmail.com',
    movie_id: '573a1390f29313caabcd4218',
    text: 'Filme deixou a desejar',
    date: new Date('1988-10-16T19:08:23.000Z'),
  },
  {
    _id: '3',
    name: 'Juliana',
    email: 'Juliana@gmail.com',
    movie_id: '573a1390f29313caabcd432a',
    text: 'filme muito bom',
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

describe('CommentService', () => {
  let commentsController: CommentsController;
  let commentsService: CommentService;

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
    commentsController = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar uma lista com nomes dos usuários e seus comentários relacionados ao filme', async () => {
      const result = await commentsService.getAll();
      expect(result).toEqual(comment);
      expect(typeof result).toEqual('object');
      expect(commentsService.getAll).toHaveBeenCalledTimes(1);
    });
    it('deve lançar uma exeção', () => {
      jest.spyOn(commentsService, 'getAll').mockRejectedValueOnce(new Error());
      expect(commentsService.getAll()).rejects.toThrowError();
    });
  });
  describe('create', () => {
    it('Deve retornar que o comentário do usuáiro foi criado', async () => {
      const body: Comment = {
        _id: '',
        name: 'Pedro',
        email: 'pedrinDoGrau@gmail.com',
        movie_id: '573a1390f29313caabcd41b1',
        text: 'Filme muito ruim filho',
        date: new Date('1988-10-16T19:08:23.000Z'),
      };
      try {
        const result = await commentsController.create(body);
        expect(result).toEqual(Comment);
      } catch (error) {
        console.log('Error >>>>>', error);
      }
    });
    it('deve lançar uma exeção', () => {
      const body: Comment = {
        _id: '',
        name: 'Pedro',
        email: 'pedrinDoGrau@gmail.com',
        movie_id: '573a1390f29313caabcd41b1',
        text: 'Filme muito ruim filho',
        date: new Date('1988-10-16T19:08:23.000Z'),
      };
      jest.spyOn(commentsService, 'create').mockRejectedValueOnce(new Error());
      expect(commentsService.create(body)).rejects.toThrowError();
    });
  });
  describe('getByEmail', () => {
    it('Pesquisar', async () => {
      try {
        const result = await commentsService.getByEmail('lucas@gmail.com');
        expect(result).toEqual(comment[0].email);
        expect(result).toEqual(comment[0]);
      } catch (error) {
        console.log('Error >>>>>>>', error);
      }
    });
  });
  describe('delete', () => {
    it('Deve deletar o comentário', async () => {
      try {
        const _id = '1AA33578B';
        const result = await commentsService.delete(_id);
        expect(result).toEqual(true);
        expect(commentsService.delete).toHaveBeenCalledTimes(1);
      } catch (error) {
        console.log('Error >>>>>', error);
      }
    });
  });
  describe('update', () => {
    it('Deve atualizar comentário', async () => {
      const body = {
        _id: '',
        name: 'Pedro',
        email: 'pedrinDoGrau@gmail.com',
        movie_id: '573a1390f29313caabcd41b1',
        text: 'Filme muito ruim filho',
        date: new Date('1988-10-16T19:08:23.000Z'),
      };
      try {
        const id = '1AA33578B';
        const result = await commentsService.update(id, body);
        expect(result).toEqual(comment);
        expect(commentsService.update).toHaveBeenCalledTimes(1);
      } catch (error) {
        console.log('Error >>>> ', error);
      }
    });
  });
});
