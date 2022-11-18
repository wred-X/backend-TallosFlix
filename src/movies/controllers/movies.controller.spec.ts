import { Test, TestingModule } from '@nestjs/testing';
import { Pages } from '../model/pages';
import { Movie } from '../model/movie';
import { MovieService } from '../services/movie.service';
import { MoviesController } from './movies.controller';

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
  {
    _id: '3',
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

describe('MoviesController', () => {
  let moviesController: MoviesController;
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(movies),
            findOne: jest.fn().mockResolvedValue(movies),
            findSeries: jest.fn().mockResolvedValue(series),
            getMovies: jest.fn().mockResolvedValue(movies),
            findByMovieId: jest.fn().mockResolvedValue(movie),
            create: jest.fn().mockResolvedValue(newMovie),
            update: jest.fn().mockResolvedValue(updatedMovie),
            delete: jest.fn().mockResolvedValue(undefined),
            // getCategory: jest.fn().mockResolvedValue(movie),
            // getDirectors: jest.fn().mockResolvedValue(movie),
            // getCast: jest.fn().mockResolvedValue(movie),
            // getLetter: jest.fn().mockResolvedValue(movie),
            // getByYear: jest.fn().mockResolvedValue(movie),
          },
        },
      ],
    }).compile();

    moviesController = module.get<MoviesController>(MoviesController);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(moviesController).toBeDefined();
    expect(movieService).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar catalogo completo da tallosflix', async () => {
      // Act
      const result = await moviesController.getAll(movie);
      // Assert
      expect(result).toBe(movies);
      expect(typeof result).toEqual('object');
      expect(movieService.getMovies).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar catalogo de filmes de acordo com o type de busca ano', async () => {
      // Act
      const result = await moviesController.findOne({ year: 2020 });
      // Assert
      expect(result).toBe(movie);
      // expect(typeof result).toEqual('object');
      expect(movieService.findByMovieId).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar catalogo de filmes de acordo com o type de busca diretores', async () => {
      // Act
      const result = await moviesController.findOne({
        directors: ['Tarantino'],
      });
      // Assert
      expect(result).toBe(movie);
      // expect(typeof result).toEqual('object');
      expect(movieService.findByMovieId).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar catalogo de filmes de acordo com o type de busca genero', async () => {
      // Act
      const result = await moviesController.findOne({ genres: ['Aventura'] });
      // Assert
      expect(result).toBe(movie);
      // expect(typeof result).toEqual('object');
      expect(movieService.findByMovieId).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar catalogo de filmes de acordo com o type de busca escritores', async () => {
      // Act
      const result = await moviesController.findOne({ writers: ['Tarantino'] });
      // Assert
      expect(result).toBe(movie);
      // expect(typeof result).toEqual('object');
      expect(movieService.findByMovieId).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar catalogo de filmes de acordo com o type de busca elenco', async () => {
      // Act
      const result = await moviesController.findOne({ cast: ['Tom Cruise'] });
      // Assert
      expect(result).toBe(movie);
      // expect(typeof result).toEqual('object');
      expect(movieService.findByMovieId).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar catalogo de filmes de acordo com o type de busca movie', async () => {
      // Act
      const result = await moviesController.findOne({ type: 'movie' });
      // Assert
      expect(result).toEqual(movie);

      expect(movieService.findByMovieId).toHaveBeenCalledTimes(1);
    });
  });

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
      const result = await moviesController.update('1', body);

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
      expect(moviesController.update(body._id, body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover um filme com sucesso', async () => {
      //Arrange
      const id = {
        _id: '1',
      };

      //Act
      const result = await moviesController.delete(id._id);

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
      expect(moviesController.delete(id._id)).rejects.toThrowError();
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
  //     const result = await moviesController.findAndPaginate(body);

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
  //     const body: Pages = {
  //       limit: 15,
  //       skip: 1,
  //     };

  //     // Arrange
  //     jest
  //       .spyOn(movieService, 'findAndPaginate')
  //       .mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(moviesController.findAndPaginate(body)).rejects.toThrowError();
  //   });
  // });

  // describe('findAndCount', () => {
  //   it('Retorna numero de filmes cadastrados no nosso sistema', async () => {
  //     // Arrange

  //     // Act
  //     const result = await moviesController.findAndCount();

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
  //     expect(moviesController.findAndCount()).rejects.toThrowError();
  //   });
  // });

  // describe('getCategory', () => {
  //   it('Retorna lista de filmes por categoria', async () => {
  //     // Arrange
  //     const body = { category: 'Aventura' };

  //     // Act
  //     const result = await moviesController.getCategory(body);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.getCategory).toHaveBeenCalledTimes(1);
  //     expect(movieService.getCategory).toHaveBeenCalledWith(body.category);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = { category: 'Aventura' };

  //     // Arrange
  //     jest
  //       .spyOn(movieService, 'getCategory')
  //       .mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(moviesController.getCategory(body)).rejects.toThrowError();
  //   });
  // });

  // describe('getDirectors', () => {
  //   it('Retorna lista de filmes de um diretor', async () => {
  //     // Arrange
  //     const body = { director: 'Tarantino' };

  //     // Act
  //     const result = await moviesController.getDirectors(body);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.getDirectors).toHaveBeenCalledTimes(1);
  //     expect(movieService.getDirectors).toHaveBeenCalledWith(body.director);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = { director: 'Tarantino' };

  //     // Arrange
  //     jest
  //       .spyOn(movieService, 'getDirectors')
  //       .mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(moviesController.getDirectors(body)).rejects.toThrowError();
  //   });
  // });

  // describe('getCast', () => {
  //   it('Retorna lista de filmes de um ator', async () => {
  //     // Arrange
  //     const body = { actor: 'Brad Pitt' };

  //     // Act
  //     const result = await moviesController.getCast(body);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.getCast).toHaveBeenCalledTimes(1);
  //     expect(movieService.getCast).toHaveBeenCalledWith(body.actor);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = { actor: 'Brad Pitt' };

  //     // Arrange
  //     jest.spyOn(movieService, 'getCast').mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(moviesController.getCast(body)).rejects.toThrowError();
  //   });
  // });

  // describe('getLetter', () => {
  //   it('Retorna lista de filmes pela letra de busca', async () => {
  //     // Arrange
  //     const body = { letter: 'E' };

  //     // Act
  //     const result = await moviesController.getLetter(body);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.getLetter).toHaveBeenCalledTimes(1);
  //     expect(movieService.getLetter).toHaveBeenCalledWith(body.letter);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = { letter: 'E' };

  //     // Arrange
  //     jest.spyOn(movieService, 'getLetter').mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(moviesController.getLetter(body)).rejects.toThrowError();
  //   });
  // });

  // describe('getByYear', () => {
  //   it('Retorna lista de filmes pelo ano de lançamento', async () => {
  //     // Arrange
  //     const body = { year: 2020 };

  //     // Act
  //     const result = await moviesController.getByYear(body);

  //     // Assert
  //     expect(result).toEqual(movie);
  //     expect(movieService.getByYear).toHaveBeenCalledTimes(1);
  //     expect(movieService.getByYear).toHaveBeenCalledWith(body.year);
  //   });

  //   it('should throw an exception', () => {
  //     // Arrange
  //     const body = { year: 2020 };

  //     // Arrange
  //     jest.spyOn(movieService, 'getByYear').mockRejectedValueOnce(new Error());

  //     // Assert
  //     expect(moviesController.getByYear(body)).rejects.toThrowError();
  //   });
  // });
});
