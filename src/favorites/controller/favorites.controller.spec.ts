import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorites.controller';
import { FavoriteService } from '../service/favorite.service';
import { Favorite } from '../shared/favorite';
import { UpdateFavorite } from '../model/update';

const favorite: Favorite[] = [
  {
    _id: '1',
    user_Id: '1',
    movie_Id: [
      '573a13a1f29313caabd08539',
      '573a13bff29313caabd5e99e',
      '573a139ef29313caabcfd114',
    ],
  },
  {
    _id: '2',
    user_Id: '2',
    movie_Id: [
      '573a13a1f29313caabd08539',
      '573a13bff29313caabd5e99e',
      '573a139ef29313caabcfd114',
    ],
  },
  {
    _id: '3',
    user_Id: '3',
    movie_Id: [
      '573a13a1f29313caabd08539',
      '573a13bff29313caabd5e99e',
      '573a139ef29313caabcfd114',
    ],
  },
];

const newFavorite: Favorite = {
  _id: '1',
  user_Id: '1',
  movie_Id: ['573a13a1f29313caabd08539'],
};

const updatedFavorite = {
  _id: '1',
  user_Id: '1',
  movie_Id: ['573a13a1f29313caabd08539', '573a13bff29313caabd5e99e'],
};

describe('FavoritesController', () => {
  let favoriteController: FavoritesController;
  let favoriteService: FavoriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        {
          provide: FavoriteService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(favorite),
            getById: jest.fn().mockResolvedValue(favorite[0]),
            create: jest.fn().mockResolvedValue(newFavorite),
            update: jest.fn().mockResolvedValue(updatedFavorite),
            delete: jest.fn().mockResolvedValue(updatedFavorite),
          },
        },
      ],
    }).compile();

    favoriteController = module.get<FavoritesController>(FavoritesController);
    favoriteService = module.get<FavoriteService>(FavoriteService);
  });

  it('should be defined', () => {
    expect(favoriteController).toBeDefined();
    expect(favoriteService).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar lista de favoritos gerais', async () => {
      // Act
      const result = await favoriteController.getAll();

      // Assert
      expect(result).toEqual(favorite);
      expect(typeof result).toEqual('object');
      expect(favoriteService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(favoriteService, 'getAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(favoriteController.getAll()).rejects.toThrowError();
    });
  });

  describe('getById', () => {
    it('Deve retornar lista de favoritos do user com sucesso pelo seu ID', async () => {
      // Act
      const result = await favoriteController.getById('1');

      // Assert
      expect(result).toEqual(favorite[0]);
      expect(favoriteService.getById).toHaveBeenCalledTimes(1);
      expect(favoriteService.getById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(favoriteService, 'getById').mockRejectedValueOnce(new Error());

      // Assert
      expect(favoriteController.getById('1')).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar o primeiro favorito do user com sucesso', async () => {
      // Arrange
      const body: Favorite = {
        _id: '',
        user_Id: '1',
        movie_Id: ['573a13a1f29313caabd08539'],
      };
      // Act
      const result = await favoriteController.create(body);

      // Assert
      expect(result).toEqual(newFavorite);
      expect(favoriteService.create).toHaveBeenCalledTimes(1);
      expect(favoriteService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Favorite = {
        _id: '',
        user_Id: '1',
        movie_Id: ['573a13a1f29313caabd08539'],
      };
      jest.spyOn(favoriteService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(favoriteController.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('Deve adicionar filme ao favorito do user com sucesso', async () => {
      // Arrange
      const body: UpdateFavorite = {
        movie_Id: '573a13bff29313caabd5e99e',
      };

      // Act
      const result = await favoriteController.update('1', body);

      // Assert
      expect(result).toEqual(updatedFavorite);
      expect(favoriteService.update).toHaveBeenCalledTimes(1);
      expect(favoriteService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: UpdateFavorite = {
        movie_Id: '573a13bff29313caabd5e99e',
      };

      jest.spyOn(favoriteService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(favoriteController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover filme do favorito do user com sucesso', async () => {
      // Arrange
      const body: UpdateFavorite = {
        movie_Id: '573a139ef29313caabcfd114',
      };

      // Act
      const result = await favoriteController.delete('1', body);

      // Assert
      expect(result).toEqual(updatedFavorite);
      expect(favoriteService.delete).toHaveBeenCalledTimes(1);
      expect(favoriteService.delete).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: UpdateFavorite = {
        movie_Id: '573a139ef29313caabcfd114',
      };

      jest.spyOn(favoriteService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(favoriteController.delete('1', body)).rejects.toThrowError();
    });
  });
});
