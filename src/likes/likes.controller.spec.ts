import { Test, TestingModule } from '@nestjs/testing';
import { LikesController } from './likes.controller';
import { LikesService } from './shared/likes.service';
import { Likes } from './model/likes';
import { userLiked } from './model/userLiked';

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

const likeNumbers = { likes: 1, deslikes: 0 };

describe('LikesController', () => {
  let likeController: LikesController;
  let likeService: LikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesController],
      providers: [
        {
          provide: LikesService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(like),
            likeComment: jest.fn().mockResolvedValue(like[0]),
            create: jest.fn().mockResolvedValue(newLike),
            allLikes: jest.fn().mockResolvedValue(likeNumbers),
            pushFuction: jest.fn().mockResolvedValue(newLike),
          },
        },
      ],
    }).compile();

    likeController = module.get<LikesController>(LikesController);
    likeService = module.get<LikesService>(LikesService);
  });

  it('should be defined', () => {
    expect(likeController).toBeDefined();
    expect(likeService).toBeDefined();
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
      const result = await likeController.likeComment(
        like[0].commentId,
        updatedLike
      );

      // Assert
      expect(result).toEqual(like[0]);
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
      // Act
      const result = await likeController.allLikes(like[0].commentId);

      // Assert
      expect(result).toEqual(likeNumbers);
      expect(likeService.allLikes).toHaveBeenCalledTimes(1);
      expect(likeService.allLikes).toHaveBeenCalledWith(like[0].commentId);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(likeService, 'allLikes').mockRejectedValueOnce(new Error());

      // Assert
      expect(likeController.allLikes(like[0].commentId)).rejects.toThrowError();
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
      expect(result).toEqual(newLike);
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
