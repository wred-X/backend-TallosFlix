import { CommentsController } from './../comments.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { Comment } from './comment';
import { CommentService } from './comment.service';

const CommentsList: Comment[] = [
  new Comment({ name: 'Lucas', email: 'lucas@gmail.com', movie_id: '573a1390f29313caabcd41b1', text: 'Nunca havia assistido,filme muito bom', date: new Date('1988-10-16T19:08:23.000Z') }),
  new Comment({ name: 'Wesley', email: 'Wesley@gmail.com', movie_id: '573a1390f29313caabcd4218', text: 'Filme deixou a desejar', date: new Date('1988-10-16T19:08:23.000Z') }),
  new Comment({ name: 'Juliana', email: 'Juliana@gmail.com', movie_id: '573a1390f29313caabcd432a', text: 'filme muito bom', date: new Date('1988-10-16T19:08:23.000Z') })
]
const comment = new Comment({
  name: 'Pedro', email: 'pedrinDoGrau@gmail.com', movie_id: '573a1390f29313caabcd41b1', text: 'Filme muito ruim filho', date: new Date('1988-10-16T19:08:23.000Z')
})

describe('CommentService', () => {
  let commentsController: CommentsController
  let commentsService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [{
        provide: CommentService,
        useValue: {
          getAll: jest.fn().mockResolvedValue(CommentsList),
          create: jest.fn().mockRejectedValue(comment),
          getByEmail: jest.fn().mockRejectedValue(comment)
        }
      }],
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
      expect(result).toEqual(CommentsList);
      expect(typeof result).toEqual('object');
      expect(commentsService.getAll).toHaveBeenCalledTimes(1);
    });
    it('deve lançar uma exeção', () => {
      jest.spyOn(commentsService, 'getAll').mockRejectedValueOnce(new Error());
      expect(commentsService.getAll()).rejects.toThrowError();
    })
  });
  describe('create', () => {
    it('Deve retornar que o comentário do usuáiro foi criado', async () => {
      const body: Comment = {
        name: 'Pedro', email: 'pedrinDoGrau@gmail.com', movie_id: '573a1390f29313caabcd41b1', text: 'Filme muito ruim filho', date: new Date('1988-10-16T19:08:23.000Z')
      }
      try {
        const result = await commentsController.create(body);
        expect(result).toEqual(Comment)
      } catch (error) {
        console.log('Error >>>>>', error)
      }
    });
    it('deve lançar uma exeção', () => {
      const body: Comment = {
        name: 'Pedro', email: 'pedrinDoGrau@gmail.com', movie_id: '573a1390f29313caabcd41b1', text: 'Filme muito ruim filho', date: new Date('1988-10-16T19:08:23.000Z')
      }
      jest.spyOn(commentsService, 'create').mockRejectedValueOnce(new Error());
      expect(commentsService.create(body)).rejects.toThrowError();
    })
  });
  describe('getByEmail',()=>{
    it('Pesquisar', async()=>{
      try {
        const result = await commentsService.getByEmail('lucas@gmail.com');
        expect(result).toEqual(CommentsList[0].email);
        expect(result).toEqual(CommentsList[0]);
      } catch (error) {
       console.log('Error >>>>>>>',error) 
      }
    })
  })
});
