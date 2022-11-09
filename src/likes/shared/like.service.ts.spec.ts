import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './likes.service';
import { Likes } from '../model/likes';
import { userLiked } from '../model/userLiked';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

describe('LikesService', () => {
  let likeService: LikesService;
  let likeModel: Model<Likes>;

  const mockLikes = {
    getAll: jest.fn().mockResolvedValue(like),
    likeComment: jest.fn().mockResolvedValue(like[0]),
    create: jest.fn().mockResolvedValue(newLike),
    allLikes: jest.fn().mockResolvedValue(likeNumbers),
    pushFuction: jest.fn().mockResolvedValue(newLike),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LikesService,
          useValue: mockLikes,
        },
        {
          provide: getModelToken('Likes'),
          useValue: mockLikes,
        },
      ],
    }).compile();

    likeService = module.get<LikesService>(LikesService);
    likeModel = module.get<Model<Likes>>(getModelToken('Likes'));
  });

  it('should be defined', () => {
    expect(likeService).toBeDefined();
    expect(likeModel).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar lista de favoritos gerais', async () => {
      // Act
      const result = await likeService.getAll();

      // Assert
      expect(result).toEqual(like);
      expect(typeof result).toEqual('object');
      expect(likeService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(likeService, 'getAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(likeService.getAll()).rejects.toThrowError();
    });
  });

  describe('likeComment', () => {
    it('Deve retornar lista de favoritos do user com sucesso pelo seu ID', async () => {
      // Act
      const result = await likeService.likeComment(
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
        likeService.likeComment(like[0].commentId, updatedLike)
      ).rejects.toThrowError();
    });
  });

  describe('allLikes', () => {
    it('Deve retornar uma media da nota com sucesso pelo ID do filme', async () => {
      const body = like[0].userLike[0].userId;
      // Act
      const result = await likeService.allLikes(like[0].commentId, body);

      // Assert
      expect(result.likes).toEqual(likeNumbers.likes);
      expect(result.deslikes).toEqual(likeNumbers.deslikes);
      expect(likeService.allLikes).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      const body = like[0].userLike[0].userId;

      // Arrange
      jest.spyOn(likeService, 'allLikes').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        likeService.allLikes(like[0].commentId, body)
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
      const result = await likeService.create(body);

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
      expect(likeService.create(body)).rejects.toThrowError();
    });
  });
});
