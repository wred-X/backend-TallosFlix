import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentService } from './shared/comment.service';
import { Comment } from './shared/comment';

const CommentsList: Comment[] = [
  new Comment({ name: 'Lucas', email: 'lucas@gmail.com', movie_id: '573a1390f29313caabcd41b1', text: 'Nunca havia assistido,filme muito bom', date: new Date('1988-10-16T19:08:23.000Z') }),
  new Comment({ name: 'Wesley', email: 'Wesley@gmail.com', movie_id: '573a1390f29313caabcd4218', text: 'Filme deixou a desejar', date: new Date('1988-10-16T19:08:23.000Z') }),
  new Comment({ name: 'Juliana', email: 'Juliana@gmail.com', movie_id: '573a1390f29313caabcd432a', text: 'filme muito bom', date: new Date('1988-10-16T19:08:23.000Z') })
]
const comment = new Comment({
  name: 'Pedro', email: 'pedrinDoGrau@gmail.com', movie_id: '573a1390f29313caabcd41b1', text: 'Filme muito ruim filho', date: new Date('1988-10-16T19:08:23.000Z')
})
describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers:[{
        provide: CommentService,
        useValue:{
          getAll: jest.fn().mockRejectedValue(CommentsList),
          create: jest.fn().mockRejectedValue(comment),
          delete: jest.fn().mockRejectedValue(comment),
          update: jest.fn().mockRejectedValue(comment)
        }
      }]
    }).compile();

    commentsController = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(commentsController).toBeDefined();
  });
  describe('GetAll', ()=>{
    it('Deve retornar uma lista', async ()=>{
      try {
        const result = await commentsController.getAll();
        expect(result).toEqual(CommentsList);
        expect(typeof result).toEqual('object');    
      } catch (error) {
        console.log('Error >>>>', error)
      }
      })
  })
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
  });
  describe('delete',()=>{
    it('Deve deletar comentário', async ()=>{
      try {
        const _id = '1AA33578B'
        const result = await commentsController.delete(_id)
        expect(result).toEqual(true)
        expect(commentsController.delete).toHaveBeenCalledTimes(1)
      } catch (error) {
        console.log('Error >>>>>', error)
      }
    })
  })
  describe('update',()=>{
    it('Deve atualizar comentário', async () => {
      const body = {
        name: 'Pedro', email: 'pedrinDoGrau@gmail.com', movie_id: '573a1390f29313caabcd41b1', text: 'Filme muito ruim filho', date: new Date('1988-10-16T19:08:23.000Z')
      }
      try {
        const id = '1AA33578B'
        const result = await commentsController.update(id, body)
        expect(result).toEqual(comment)
        expect(commentsController.update).toHaveBeenCalledTimes(1)
      } catch (error) {
        console.log('Error >>>> ', error)
      }
    })
  })
});
