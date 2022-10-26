import { Test, TestingModule } from '@nestjs/testing';
import { RatingService } from './rating.service';
import { Rating } from './rating';
import { Rate } from '../models/rate';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const rating: Rating[] = [
  {
    _id: '1',
    movie_id: '1',
    allRate: [{ user_id: '1', rate: 5 }],
  },
  {
    _id: '2',
    movie_id: '2',
    allRate: [
      { user_id: '2', rate: 3 },
      { user_id: '22', rate: 5 },
    ],
  },
  {
    _id: '3',
    movie_id: '3',
    allRate: [{ user_id: '3', rate: 4 }],
  },
];

const newRating: Rating = {
  _id: '1',
  movie_id: '1',
  allRate: [{ user_id: '1', rate: 5 }],
};

const updatedRating: Rating = {
  _id: '1',
  movie_id: '1',
  allRate: [{ user_id: '1', rate: 2 }],
};

const rate: number = 4;

describe('RatingsSeratingService', () => {
  let ratingService: RatingService;
  let ratingModel: Model<Rating>;

  const mockFavorite = {
    getAll: jest.fn().mockResolvedValue(rating),
    getById: jest.fn().mockResolvedValue(rating[0]),
    getRates: jest.fn().mockResolvedValue(rating[0]),
    getRating: jest.fn().mockResolvedValue(rate),
    create: jest.fn().mockResolvedValue(newRating),
    addRate: jest.fn().mockResolvedValue(updatedRating),
    delete: jest.fn().mockResolvedValue(updatedRating),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RatingService,
          useValue: mockFavorite,
        },
        {
          provide: getModelToken('Rating'),
          useValue: mockFavorite,
        },
      ],
    }).compile();

    ratingModel = module.get<Model<Rating>>(getModelToken('Rating'));
    ratingService = module.get<RatingService>(RatingService);
  });

  it('should be defined', () => {
    expect(ratingService).toBeDefined();
    expect(ratingModel).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar lista de notas', async () => {
      // Act
      const result = await ratingService.getAll();

      // Assert
      expect(result).toEqual(rating);
      expect(typeof result).toEqual('object');
      expect(ratingService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(ratingService, 'getAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(ratingService.getAll()).rejects.toThrowError();
    });
  });

  describe('getById', () => {
    it('Deve retornar as notas feitas com sucesso pelo ID do user', async () => {
      // Act
      const result = await ratingService.getById(rating[0].allRate[0].user_id);

      // Assert
      expect(result).toEqual(rating[0]);
      expect(ratingService.getById).toHaveBeenCalledTimes(1);
      expect(ratingService.getById).toHaveBeenCalledWith(
        rating[0].allRate[0].user_id
      );
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(ratingService, 'getById').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        ratingService.getById(rating[0].allRate[0].user_id)
      ).rejects.toThrowError();
    });
  });

  describe('getRates', () => {
    it('Deve retornar as card de notas feitas com sucesso pelo ID do filme', async () => {
      // Act
      const result = await ratingService.getById(rating[0].movie_id);

      // Assert
      expect(result).toEqual(rating[0]);
      expect(ratingService.getRates).toHaveBeenCalledTimes(1);
      expect(ratingService.getRates).toHaveBeenCalledWith(rating[0].movie_id);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(ratingService, 'getRates').mockRejectedValueOnce(new Error());

      // Assert
      expect(ratingService.getRates(rating[0].movie_id)).rejects.toThrowError();
    });
  });

  describe('getRating', () => {
    it('Deve retornar uma media da nota com sucesso pelo ID do filme', async () => {
      // Act
      const result = await ratingService.getRating(rating[1].movie_id);

      // Assert
      expect(result).toEqual(rate);
      expect(ratingService.getRating).toHaveBeenCalledTimes(1);
      expect(ratingService.getRating).toHaveBeenCalledWith(rating[1].movie_id);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(ratingService, 'getRating').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        ratingService.getRating(rating[1].movie_id)
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar a primeira nota do filme com sucesso', async () => {
      // Arrange
      const body: Rating = {
        _id: '1',
        movie_id: '1',
        allRate: [{ user_id: '1', rate: 5 }],
      };
      // Act
      const result = await ratingService.create(body);

      // Assert
      expect(result).toEqual(newRating);
      expect(ratingService.create).toHaveBeenCalledTimes(1);
      expect(ratingService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Rating = {
        _id: '1',
        movie_id: '1',
        allRate: [{ user_id: '1', rate: 5 }],
      };
      jest.spyOn(ratingService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(ratingService.create(body)).rejects.toThrowError();
    });
  });

  describe('addRate', () => {
    it('Deve adicionar uma nova nota a um filme com sucesso', async () => {
      // Arrange
      const body: Rate = { user_id: '1', rate: 5 };

      // Act
      const result = await ratingService.addRate(rating[0]._id, body);

      // Assert
      expect(result).toEqual(updatedRating);
      expect(ratingService.addRate).toHaveBeenCalledTimes(1);
      expect(ratingService.addRate).toHaveBeenCalledWith(rating[0]._id, body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Rate = { user_id: '1', rate: 5 };

      jest.spyOn(ratingService, 'addRate').mockRejectedValueOnce(new Error());

      // Assert
      expect(ratingService.addRate(rating[0]._id, body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover uma nota com sucesso', async () => {
      // Arrange
      const body: Rate = { user_id: '1', rate: 2 };

      // Act
      const result = await ratingService.delete(rating[0]._id, body);

      // Assert
      expect(result).toEqual(updatedRating);
      expect(ratingService.delete).toHaveBeenCalledTimes(1);
      expect(ratingService.delete).toHaveBeenCalledWith(rating[0]._id, body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Rate = { user_id: '1', rate: 5 };

      jest.spyOn(ratingService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(ratingService.delete(rating[0]._id, body)).rejects.toThrowError();
    });
  });
});
