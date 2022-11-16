import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Movie } from '../model/movie';
import { MovieService } from './movie.service';

const movie: Movie = {
  _id: '1',
  plot: 'era uma vez uma vez...',
  genres: ['Ação', 'Aventura'],
  runtime: 120,
  cast: ['Brad Pitt', 'Tom Cruise', 'Jennifer Lawrence'],
  num_mflix_comments: 5,
  poster: 'poster.png',
  title: 'Tome Bala',
  fullplot: 'Max que matou o Nilo.',
  metacritic: 5,
  languages: ['Portuguese', 'English'],
  countries: ['Brazil'],
  realeased: new Date('2020-07-11T00:00:00.000+00:00'),
  directors: ['Tarantino', 'Christhofer Nolan'],
  rated: 'Good',
  awards: { wins: 1, nominations: 4, text: '1 win and 4 nominations' },
  lastupdadted: '2021-07-11T00:00:00.000+00:00',
  year: 2020,
  imdb: { rating: 6, votes: 200, id: 1111 },
  type: 'Movie',
  tomatoes: {
    viewer: { rating: 6, numReviews: 150, meter: 83 },
    dvd: new Date('2021-10-11T00:00:00.000+00:00'),
    lastUpdated: new Date('2022-07-11T00:00:00.000+00:00'),
    rotten: 1,
    fresh: 12,
    critic: { rating: 7.2, numReviews: 13, meter: 92 },
  },
  dvd: new Date('2021-10-11T00:00:00.000+00:00'),
  fresh: 12,
  production: 'Warner Brothers',
  rotten: 1,
  lastUpdated: new Date('2022-8-11T00:00:00.000+00:00'),
  website: 'www.filme.com',
  writers: ['Tarantino'],
};

const movies: Movie[] = [
  {
    _id: '1',
    plot: 'era uma vez uma vez...',
    genres: ['Ação', 'Aventura'],
    runtime: 120,
    cast: ['Brad Pitt', 'Tom Cruise', 'Jennifer Lawrence'],
    num_mflix_comments: 5,
    poster: 'poster.png',
    title: 'Tome Bala',
    fullplot: 'Max que matou o Nilo.',
    metacritic: 5,
    languages: ['Portuguese', 'English'],
    countries: ['Brazil'],
    realeased: new Date('2020-07-11T00:00:00.000+00:00'),
    directors: ['Tarantino', 'Christhofer Nolan'],
    rated: 'Good',
    awards: { wins: 1, nominations: 4, text: '1 win and 4 nominations' },
    lastupdadted: '2021-07-11T00:00:00.000+00:00',
    year: 2020,
    imdb: { rating: 6, votes: 200, id: 1111 },
    type: 'Movie',
    tomatoes: {
      viewer: { rating: 6, numReviews: 150, meter: 83 },
      dvd: new Date('2021-10-11T00:00:00.000+00:00'),
      lastUpdated: new Date('2022-07-11T00:00:00.000+00:00'),
      rotten: 1,
      fresh: 12,
      critic: { rating: 7.2, numReviews: 13, meter: 92 },
    },
    dvd: new Date('2021-10-11T00:00:00.000+00:00'),
    fresh: 12,
    production: 'Warner Brothers',
    rotten: 1,
    lastUpdated: new Date('2022-8-11T00:00:00.000+00:00'),
    website: 'www.filme.com',
    writers: ['Tarantino'],
  },
  {
    _id: '2',
    plot: 'era uma vez duas vezes...',
    genres: ['Comedy', 'Aventura'],
    runtime: 120,
    cast: ['Brad Pitt', 'Leonardo DiCaprio', 'Jennifer Lawrence'],
    num_mflix_comments: 15,
    poster: 'poster.png',
    title: 'Tome Peia',
    fullplot: 'Max que matou o Nilo.',
    metacritic: 5,
    languages: ['Portuguese', 'English'],
    countries: ['Brazil'],
    realeased: new Date('2020-07-11T00:00:00.000+00:00'),
    directors: ['Tarantino', 'Christhofer Nolan'],
    rated: 'Good',
    awards: { wins: 1, nominations: 4, text: '1 win and 4 nominations' },
    lastupdadted: '2021-07-11T00:00:00.000+00:00',
    year: 2020,
    imdb: { rating: 6, votes: 200, id: 1111 },
    type: 'Movie',
    tomatoes: {
      viewer: { rating: 6, numReviews: 150, meter: 83 },
      dvd: new Date('2021-10-11T00:00:00.000+00:00'),
      lastUpdated: new Date('2022-07-11T00:00:00.000+00:00'),
      rotten: 1,
      fresh: 12,
      critic: { rating: 7.2, numReviews: 13, meter: 92 },
    },
    dvd: new Date('2021-10-11T00:00:00.000+00:00'),
    fresh: 12,
    production: 'Warner Brothers',
    rotten: 1,
    lastUpdated: new Date('2022-8-11T00:00:00.000+00:00'),
    website: 'www.filme.com',
    writers: ['Tarantino'],
  },
];

const newMovie: Movie = {
  _id: '1',
  plot: 'era uma vez uma vez...',
  genres: ['Ação', 'Aventura'],
  runtime: 120,
  cast: ['Brad Pitt', 'Tom Cruise', 'Jennifer Lawrence'],
  num_mflix_comments: 5,
  poster: 'poster.png',
  title: 'Tome Bala',
  fullplot: 'Max que matou o Nilo.',
  metacritic: 5,
  languages: ['Portuguese', 'English'],
  countries: ['Brazil'],
  realeased: new Date('2020-07-11T00:00:00.000+00:00'),
  directors: ['Tarantino', 'Christhofer Nolan'],
  rated: 'Good',
  awards: { wins: 1, nominations: 4, text: '1 win and 4 nominations' },
  lastupdadted: '2021-07-11T00:00:00.000+00:00',
  year: 2020,
  imdb: { rating: 6, votes: 200, id: 1111 },
  type: 'Movie',
  tomatoes: {
    viewer: { rating: 6, numReviews: 150, meter: 83 },
    dvd: new Date('2021-10-11T00:00:00.000+00:00'),
    lastUpdated: new Date('2022-07-11T00:00:00.000+00:00'),
    rotten: 1,
    fresh: 12,
    critic: { rating: 7.2, numReviews: 13, meter: 92 },
  },
  dvd: new Date('2021-10-11T00:00:00.000+00:00'),
  fresh: 12,
  production: 'Warner Brothers',
  rotten: 1,
  lastUpdated: new Date('2022-8-11T00:00:00.000+00:00'),
  website: 'www.filme.com',
  writers: ['Tarantino'],
};

const updatedMovie = {
  _id: '1',
  plot: 'era uma vez uma vez...',
  genres: ['Ação', 'Aventura'],
  runtime: 120,
  cast: ['Brad Pitt', 'Tom Cruise', 'Jennifer Lawrence'],
  num_mflix_comments: 5,
  poster: 'poster.png',
  title: 'Tome Bala',
  fullplot: 'Max que matou o Nilo.',
  metacritic: 5,
  languages: ['Portuguese', 'English'],
  countries: ['Brazil'],
  realeased: new Date('2020-07-11T00:00:00.000+00:00'),
  directors: ['Tarantino', 'Christhofer Nolan'],
  rated: 'Good',
  awards: { wins: 1, nominations: 4, text: '1 win and 4 nominations' },
  lastupdadted: '2021-07-11T00:00:00.000+00:00',
  year: 2020,
  imdb: { rating: 6, votes: 200, id: 1111 },
  type: 'Movie',
  tomatoes: {
    viewer: { rating: 6, numReviews: 150, meter: 83 },
    dvd: new Date('2021-10-11T00:00:00.000+00:00'),
    lastUpdated: new Date('2022-07-11T00:00:00.000+00:00'),
    rotten: 1,
    fresh: 12,
    critic: { rating: 7.2, numReviews: 13, meter: 92 },
  },
  dvd: new Date('2021-10-11T00:00:00.000+00:00'),
  fresh: 12,
  production: 'Warner Brothers',
  rotten: 1,
  lastUpdated: new Date('2022-8-11T00:00:00.000+00:00'),
  website: 'www.filme.com',
  writers: ['Tarantino'],
};

const series: Movie[] = [
  {
    _id: '1',
    plot: 'era uma vez uma vez...',
    genres: ['Ação', 'Aventura'],
    runtime: 120,
    cast: ['Brad Pitt', 'Tom Cruise', 'Jennifer Lawrence'],
    num_mflix_comments: 5,
    poster: 'poster.png',
    title: 'Tome Bala',
    fullplot: 'Max que matou o Nilo.',
    metacritic: 5,
    languages: ['Portuguese', 'English'],
    countries: ['Brazil'],
    realeased: new Date('2020-07-11T00:00:00.000+00:00'),
    directors: ['Tarantino', 'Christhofer Nolan'],
    rated: 'Good',
    awards: { wins: 1, nominations: 4, text: '1 win and 4 nominations' },
    lastupdadted: '2021-07-11T00:00:00.000+00:00',
    year: 2020,
    imdb: { rating: 6, votes: 200, id: 1111 },
    type: 'Series',
    tomatoes: {
      viewer: { rating: 6, numReviews: 150, meter: 83 },
      dvd: new Date('2021-10-11T00:00:00.000+00:00'),
      lastUpdated: new Date('2022-07-11T00:00:00.000+00:00'),
      rotten: 1,
      fresh: 12,
      critic: { rating: 7.2, numReviews: 13, meter: 92 },
    },
    dvd: new Date('2021-10-11T00:00:00.000+00:00'),
    fresh: 12,
    production: 'Warner Brothers',
    rotten: 1,
    lastUpdated: new Date('2022-8-11T00:00:00.000+00:00'),
    website: 'www.filme.com',
    writers: ['Tarantino'],
  },
];

const count: number = 1;

describe('MovieService', () => {
  let movieService: MovieService;
  let movieModel: Model<Movie>;

  let pagination = {
    limit: 10,
    page: 2,
  };
  let skip = pagination.limit * (pagination.page - 1);

  const mockMovie = {
    getMovies: jest.fn().mockResolvedValue(movies),
    findOne: jest.fn().mockResolvedValue(movies),
    create: jest.fn().mockResolvedValue(newMovie),
    update: jest.fn().mockResolvedValue(updatedMovie),
    delete: jest.fn().mockResolvedValue(undefined),
    countDocuments: jest.fn().mockResolvedValue(movies.length),
    skip: jest.fn().mockResolvedValue(skip),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MovieService,
          useValue: mockMovie,
        },
        {
          provide: getModelToken('Movie'),
          useValue: mockMovie,
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    movieModel = module.get<Model<Movie>>(getModelToken('Movie'));
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
    expect(movieModel).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar catalogo completo da tallosflix', async () => {
      // Act
      const result = await movieService.getMovies(movie, pagination);
      const countDocuments = await movieModel.countDocuments(movies);
      const valueCount = movies.length;

      // Assert
      expect(skip).toEqual(pagination.limit);
      expect(countDocuments).toBe(valueCount);
      expect(result).toEqual(movies);
      expect(typeof result).toEqual('object');
      expect(movieService.getMovies).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(movieService, 'getMovies')
        .mockRejectedValueOnce(new Error('Bad Request'));

      // Assert
      expect(movieService.getMovies).rejects.toThrowError('Bad Request');
    });
  });

  // describe('getAllSeries', () => {
  //   it('Deve retornar lista de series', async () => {
  //     // Act
  //     const result = await movieService.getAllSeries();

  //     // Assert
  //     expect(result).toEqual(series);
  //     expect(typeof result).toEqual('object');
  //     expect(movieService.getAllSeries).toHaveBeenCalledTimes(1);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     jest
  //       .spyOn(movieService, 'getAllSeries')
  //       .mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(movieService.getAllSeries()).rejects.toThrowError();
  //   });
  // });

  describe('create', () => {
    it('Deve criar um novo movie com sucesso', async () => {
      // Arrange
      const body: Movie = {
        _id: '1',
        plot: 'era uma vez uma vez...',
        genres: ['Ação', 'Aventura'],
        runtime: 120,
        cast: ['Brad Pitt', 'Tom Cruise', 'Jennifer Lawrence'],
        num_mflix_comments: 5,
        poster: 'poster.png',
        title: 'Tome Bala',
        fullplot: 'Max que matou o Nilo.',
        metacritic: 5,
        languages: ['Portuguese', 'English'],
        countries: ['Brazil'],
        realeased: new Date('2020-07-11T00:00:00.000+00:00'),
        directors: ['Tarantino', 'Christhofer Nolan'],
        rated: 'Good',
        awards: { wins: 1, nominations: 4, text: '1 win and 4 nominations' },
        lastupdadted: '2021-07-11T00:00:00.000+00:00',
        year: 2020,
        imdb: { rating: 6, votes: 200, id: 1111 },
        type: 'Movie',
        tomatoes: {
          viewer: { rating: 6, numReviews: 150, meter: 83 },
          dvd: new Date('2021-10-11T00:00:00.000+00:00'),
          lastUpdated: new Date('2022-07-11T00:00:00.000+00:00'),
          rotten: 1,
          fresh: 12,
          critic: { rating: 7.2, numReviews: 13, meter: 92 },
        },
        dvd: new Date('2021-10-11T00:00:00.000+00:00'),
        fresh: 12,
        production: 'Warner Brothers',
        rotten: 1,
        lastUpdated: new Date('2022-8-11T00:00:00.000+00:00'),
        website: 'www.filme.com',
        writers: ['Tarantino'],
      };

      // Act
      const result = await movieService.create(body);

      // Assert
      expect(result).toEqual(newMovie);
      expect(movieService.create).toHaveBeenCalledTimes(1);
      expect(movieService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Movie = {
        _id: '1',
        plot: 'era uma vez uma vez...',
        genres: ['Ação', 'Aventura'],
        runtime: 120,
        cast: ['Brad Pitt', 'Tom Cruise', 'Jennifer Lawrence'],
        num_mflix_comments: 5,
        poster: 'poster.png',
        title: 'Tome Bala',
        fullplot: 'Max que matou o Nilo.',
        metacritic: 5,
        languages: ['Portuguese', 'English'],
        countries: ['Brazil'],
        realeased: new Date('2020-07-11T00:00:00.000+00:00'),
        directors: ['Tarantino', 'Christhofer Nolan'],
        rated: 'Good',
        awards: { wins: 1, nominations: 4, text: '1 win and 4 nominations' },
        lastupdadted: '2021-07-11T00:00:00.000+00:00',
        year: 2020,
        imdb: { rating: 6, votes: 200, id: 1111 },
        type: 'Movie',
        tomatoes: {
          viewer: { rating: 6, numReviews: 150, meter: 83 },
          dvd: new Date('2021-10-11T00:00:00.000+00:00'),
          lastUpdated: new Date('2022-07-11T00:00:00.000+00:00'),
          rotten: 1,
          fresh: 12,
          critic: { rating: 7.2, numReviews: 13, meter: 92 },
        },
        dvd: new Date('2021-10-11T00:00:00.000+00:00'),
        fresh: 12,
        production: 'Warner Brothers',
        rotten: 1,
        lastUpdated: new Date('2022-8-11T00:00:00.000+00:00'),
        website: 'www.filme.com',
        writers: ['Tarantino'],
      };

      jest.spyOn(movieService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(movieService.create(body)).rejects.toThrowError();
    });
  });

  // describe('getById', () => {
  //   it('Deve retornar um movie com sucesso pelo ID', async () => {
  //     // Act
  //     const result = await movieService.getById('1');

  //     // Assert
  //     expect(result).toEqual(movie[0]);
  //     expect(movieService.getById).toHaveBeenCalledTimes(1);
  //     expect(movieService.getById).toHaveBeenCalledWith('1');
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     jest.spyOn(movieService, 'getById').mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(movieService.getById('1')).rejects.toThrowError();
  //   });
  // });

  describe('update', () => {
    it('Deve alterar dados de um movie pelo ID', async () => {
      // Arrange
      const body: Movie = {
        _id: '1',
        plot: 'era uma vez uma vez...',
        genres: ['Ação', 'Aventura'],
        runtime: 120,
        cast: ['Brad Pitt', 'Tom Cruise', 'Jennifer Lawrence'],
        num_mflix_comments: 5,
        poster: 'poster.png',
        title: 'Tome Bala',
        fullplot: 'Max que matou o Nilo.',
        metacritic: 5,
        languages: ['Portuguese', 'English'],
        countries: ['Brazil'],
        realeased: new Date('2020-07-11T00:00:00.000+00:00'),
        directors: ['Tarantino', 'Christhofer Nolan'],
        rated: 'Good',
        awards: { wins: 1, nominations: 4, text: '1 win and 4 nominations' },
        lastupdadted: '2021-07-11T00:00:00.000+00:00',
        year: 2020,
        imdb: { rating: 6, votes: 200, id: 1111 },
        type: 'Movie',
        tomatoes: {
          viewer: { rating: 6, numReviews: 150, meter: 83 },
          dvd: new Date('2021-10-11T00:00:00.000+00:00'),
          lastUpdated: new Date('2022-07-11T00:00:00.000+00:00'),
          rotten: 1,
          fresh: 12,
          critic: { rating: 7.2, numReviews: 13, meter: 92 },
        },
        dvd: new Date('2021-10-11T00:00:00.000+00:00'),
        fresh: 12,
        production: 'Warner Brothers',
        rotten: 1,
        lastUpdated: new Date('2022-8-11T00:00:00.000+00:00'),
        website: 'www.filme.com',
        writers: ['Tarantino'],
      };

      // Act
      const result = await movieService.update('1', body);

      // Assert
      expect(result).toEqual(updatedMovie);
      expect(movieService.update).toHaveBeenCalledTimes(1);
      expect(movieService.update).toHaveBeenCalledWith(body._id, body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Movie = {
        _id: '1',
        plot: 'era uma vez uma vez...',
        genres: ['Ação', 'Aventura'],
        runtime: 120,
        cast: ['Brad Pitt', 'Tom Cruise', 'Jennifer Lawrence'],
        num_mflix_comments: 5,
        poster: 'poster.png',
        title: 'Tome Bala',
        fullplot: 'Max que matou o Nilo.',
        metacritic: 5,
        languages: ['Portuguese', 'English'],
        countries: ['Brazil'],
        realeased: new Date('2020-07-11T00:00:00.000+00:00'),
        directors: ['Tarantino', 'Christhofer Nolan'],
        rated: 'Good',
        awards: { wins: 1, nominations: 4, text: '1 win and 4 nominations' },
        lastupdadted: '2021-07-11T00:00:00.000+00:00',
        year: 2020,
        imdb: { rating: 6, votes: 200, id: 1111 },
        type: 'Movie',
        tomatoes: {
          viewer: { rating: 6, numReviews: 150, meter: 83 },
          dvd: new Date('2021-10-11T00:00:00.000+00:00'),
          lastUpdated: new Date('2022-07-11T00:00:00.000+00:00'),
          rotten: 1,
          fresh: 12,
          critic: { rating: 7.2, numReviews: 13, meter: 92 },
        },
        dvd: new Date('2021-10-11T00:00:00.000+00:00'),
        fresh: 12,
        production: 'Warner Brothers',
        rotten: 1,
        lastUpdated: new Date('2022-8-11T00:00:00.000+00:00'),
        website: 'www.filme.com',
        writers: ['Tarantino'],
      };

      jest.spyOn(movieService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(movieService.update(body._id, body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover um filme com sucesso', async () => {
      //Arrange
      const id = {
        _id: '1',
      };

      //Act
      const result = await movieService.delete(id._id);

      //Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      //Arrange
      const id = {
        _id: '1',
      };

      jest.spyOn(movieService, 'delete').mockRejectedValueOnce(new Error());

      //Assert
      expect(movieService.delete(id._id)).rejects.toThrowError();
    });
  });

  // describe('findAndPaginate', () => {
  //   it('Retorna lista de filmes paginada', async () => {
  //     // Arrange
  //     const body = {
  //       limit: 3,
  //       skip: 1,
  //     };

  //     // Act
  //     const result = await movieService.findAndPaginate(body.limit, body.skip);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.findAndPaginate).toHaveBeenCalledTimes(1);
  //     expect(movieService.findAndPaginate).toHaveBeenCalledWith(
  //       body.limit,
  //       body.skip
  //     );
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = {
  //       limit: 15,
  //       skip: 1,
  //     };

  //     // Arrange
  //     jest
  //       .spyOn(movieService, 'findAndPaginate')
  //       .mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(
  //       movieService.findAndPaginate(body.limit, body.skip)
  //     ).rejects.toThrowError();
  //   });
  // });

  // describe('findAndCount', () => {
  //   it('Retorna numero de filmes cadastrados no nosso sistema', async () => {
  //     // Arrange

  //     // Act
  //     const result = await movieService.findAndCount();

  //     // Assert
  //     expect(typeof result).toEqual('number');
  //     expect(movieService.findAndCount).toHaveBeenCalledTimes(1);
  //     expect(movieService.findAndCount).toHaveBeenCalledWith();
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     jest
  //       .spyOn(movieService, 'findAndCount')
  //       .mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(movieService.findAndCount()).rejects.toThrowError();
  //   });
  // });

  // describe('getCategory', () => {
  //   it('Retorna lista de filmes por categoria', async () => {
  //     // Arrange
  //     const body = 'Aventura';

  //     // Act
  //     const result = await movieService.getCategory(body);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.getCategory).toHaveBeenCalledTimes(1);
  //     expect(movieService.getCategory).toHaveBeenCalledWith(body);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = 'Aventura';

  //     // Arrange
  //     jest
  //       .spyOn(movieService, 'getCategory')
  //       .mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(movieService.getCategory(body)).rejects.toThrowError();
  //   });
  // });

  // describe('getDirectors', () => {
  //   it('Retorna lista de filmes de um diretor', async () => {
  //     // Arrange
  //     const body = 'Tarantino';

  //     // Act
  //     const result = await movieService.getDirectors(body);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.getDirectors).toHaveBeenCalledTimes(1);
  //     expect(movieService.getDirectors).toHaveBeenCalledWith(body);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = 'Tarantino';

  //     // Arrange
  //     jest
  //       .spyOn(movieService, 'getDirectors')
  //       .mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(movieService.getDirectors(body)).rejects.toThrowError();
  //   });
  // });

  // describe('getCast', () => {
  //   it('Retorna lista de filmes de um ator', async () => {
  //     // Arrange
  //     const body = 'Brad Pitt';

  //     // Act
  //     const result = await movieService.getCast(body);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.getCast).toHaveBeenCalledTimes(1);
  //     expect(movieService.getCast).toHaveBeenCalledWith(body);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = 'Brad Pitt';

  //     // Arrange
  //     jest.spyOn(movieService, 'getCast').mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(movieService.getCast(body)).rejects.toThrowError();
  //   });
  // });

  // describe('getLetter', () => {
  //   it('Retorna lista de filmes pela letra de busca', async () => {
  //     // Arrange
  //     const body = 'E';

  //     // Act
  //     const result = await movieService.getLetter(body);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.getLetter).toHaveBeenCalledTimes(1);
  //     expect(movieService.getLetter).toHaveBeenCalledWith(body);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = 'E';

  //     // Arrange
  //     jest.spyOn(movieService, 'getLetter').mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(movieService.getLetter(body)).rejects.toThrowError();
  //   });
  // });

  // describe('getByYear', () => {
  //   it('Retorna lista de filmes pelo ano de lançamento', async () => {
  //     // Arrange
  //     const body = 2020;

  //     // Act
  //     const result = await movieService.getByYear(body);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.getByYear).toHaveBeenCalledTimes(1);
  //     expect(movieService.getByYear).toHaveBeenCalledWith(body);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = 2020;

  //     // Arrange
  //     jest.spyOn(movieService, 'getByYear').mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(movieService.getByYear(body)).rejects.toThrowError();
  //   });
  // });
});
