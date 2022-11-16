import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from '../../comments/service/comment.service';
import { LikesController } from './likes.controller';
import { Likes } from '../model/likes';
import { userLiked } from '../model/userLiked';
import { LikesService } from '../services/likes.service';

const like: Likes[] = [
  {
    commentId: '1',
    userLike: [
      {
        userId: 'teste',
        like: true,
        unlike: false,
      },
    ],
  },
  {
    commentId: '2',
    userLike: [
      {
        userId: 'teste1',
        like: true,
        unlike: false,
      },
    ],
  },
  {
    commentId: '3',
    userLike: [
      {
        userId: 'teste2',
        like: false,
        unlike: true,
      },
    ],
  },
];

const newLike: Likes = {
  commentId: '1',
  userLike: [
    {
      userId: 'teste',
      like: true,
      unlike: false,
    },
  ],
};

const updatedLike: userLiked = {
  userId: 'teste',
  like: true,
  unlike: false,
};

const updatedComment = {
  _id: '1',
  name: 'Pedro',
  email: 'pedrinDoGrau@gmail.com',
  movie_id: '573a1390f29313caabcd41b1',
  text: 'Filme muito ruim filho',
  date: new Date('1988-10-16T19:08:23.000Z'),
  likes: 1,
  deslikes: 0,
};

const likeNumbers = { resComment: '1', resUserId: 'teste', resLike: 'LIKE' };

describe('LikesController', () => {
  let likeController: LikesController;
  let likeService: LikesService;
  let commentService: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesController],
      providers: [
        {
          provide: LikesService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(like),
            likeComment: jest.fn().mockResolvedValue(updatedComment),
            create: jest.fn().mockResolvedValue(newLike),
            allLikes: jest.fn().mockResolvedValue(likeNumbers),
            pushFuction: jest.fn().mockResolvedValue(newLike),
          },
        },
        {
          provide: CommentService,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            update: jest.fn().mockResolvedValue(updatedComment),
            delete: jest.fn(),
            getByEmail: jest.fn(),
            getByMovieId: jest.fn(),
            updateReply: jest.fn(),
            updateLike: jest.fn().mockResolvedValue(updatedComment),
            getByReply: jest.fn(),
          },
        },
      ],
    }).compile();

    likeController = module.get<LikesController>(LikesController);
    likeService = module.get<LikesService>(LikesService);
    commentService = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(likeController).toBeDefined();
    expect(likeService).toBeDefined();
    expect(commentService).toBeDefined();
  });

  describe('getLikes', () => {
    it('Deve retornar lista de favoritos gerais', async () => {
      // Act
      const result = await likeController.getLikes();

      // Assert
      expect(result).toEqual(like);
      expect(typeof result).toEqual('object');
      expect(likeService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(likeService, 'getAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(likeController.getLikes()).rejects.toThrowError();
    });
  });

  describe('likeComment', () => {
    it('Deve retornar lista de favoritos do user com sucesso pelo seu ID', async () => {
      // Act
      const result = await likeController.likeComment('1', updatedLike);

      // Assert
      expect(result).toEqual(updatedComment);
      expect(likeService.likeComment).toHaveBeenCalledTimes(1);
      expect(likeService.likeComment).toHaveBeenCalledWith(
        like[0].commentId,
        updatedLike
      );
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(likeService, 'likeComment').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        likeController.likeComment(like[0].commentId, updatedLike)
      ).rejects.toThrowError();
    });
  });

  describe('allLikes', () => {
    it('Deve retornar uma media da nota com sucesso pelo ID do filme', async () => {
      const body = {
        userId: 'teste',
      };

      // Act
      const result = await likeController.allLikes('1', body);

      // Assert
      expect(typeof result).toEqual('object');
      expect(likeService.allLikes).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const body = {
        userId: like[0].userLike[0].userId,
      };

      // Arrange
      jest.spyOn(likeService, 'allLikes').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        likeController.allLikes(like[0].commentId, body)
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar o primeiro favorito do user com sucesso', async () => {
      // Arrange
      const body: Likes = {
        commentId: '1',
        userLike: [
          {
            userId: 'teste',
            like: true,
            unlike: false,
          },
        ],
      };
      // Act
      const result = await likeController.create(body);

      // Assert
      expect(result).toEqual(updatedComment);
      expect(likeService.create).toHaveBeenCalledTimes(1);
      expect(likeService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Likes = {
        commentId: '1',
        userLike: [
          {
            userId: 'teste',
            like: true,
            unlike: false,
          },
        ],
      };
      jest.spyOn(likeService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(likeController.create(body)).rejects.toThrowError();
    });
  });
});
