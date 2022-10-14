import { Test, TestingModule } from '@nestjs/testing';
import { Comment } from './comment';
import { CommentService } from './comment.service';

const CommentsList: Comment[] = [
  new Comment({ name: 'Lucas', email: 'lucas@gmail.com', movie_id: '573a1390f29313caabcd41b1', text: 'Nunca havia assistido,filme muito bom', date: new Date('1988-10-16T19:08:23.000Z') }),
  new Comment({ name: 'Wesley', email: 'Wesley@gmail.com', movie_id: '573a1390f29313caabcd4218', text: 'Filme deixou a desejar', date: new Date('1988-10-16T19:08:23.000Z') }),
  new Comment({ name: 'Juliana', email: 'Juliana@gmail.com', movie_id: '573a1390f29313caabcd432a', text: 'filme muito bom', date: new Date('1988-10-16T19:08:23.000Z') })
]

describe('CommentService', () => {
  let commentsService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: CommentService,
        useValue: {
          getAll: jest.fn().mockResolvedValue(CommentsList)
        }
      }],
    }).compile();

    commentsService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });
  describe('getAll',()=>{
    it('Deve retornar uma lista com nomes dos usuários e seus comentários relacionados ao filme', async()=>{
      const result = await commentsService.getAll();
      expect(result).toEqual(CommentsList);
      expect(typeof result).toEqual('object');
      expect(commentsService.getAll).toHaveBeenCalledTimes(1);
    });
    it('deve lançar uma exeção',()=>{
      jest.spyOn(commentsService,'getAll').mockRejectedValueOnce(new Error());
      expect(commentsService.getAll()).rejects.toThrowError();
    })
  });
});
