import { Theater } from './../shared/theater';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { TheaterService } from './theater.service';

describe('TheaterService', () => {
  let theaterService: TheaterService;
  let theaterRepository: Model<Theater>;

  const TheaterCreated: Theater = new Theater({
    _id: '2d5asd5as',
    theaterId: 103,
    location: {
      address: {
        street1: 'Teste Street 666',
        city: 'CA',
        state: 'EUA',
        zipcode: '789645',
      },
      geo: {
        type: 'Point',
        coordinates: [657, 898],
      },
    },
  });

  const theaterList: Theater[] = [
    new Theater({
      _id: 'teste1',
      theaterId: 100,
      location: {
        address: {
          street1: 'Teste Street 402',
          city: 'UT',
          state: 'EUA',
          zipcode: '60500123',
        },
        geo: {
          type: 'Point',
          coordinates: [123, 321],
        },
      },
    }),

    new Theater({
      _id: 'teste2',
      theaterId: 102,
      location: {
        address: {
          street1: 'Teste Street 500',
          city: 'CA',
          state: 'EUA',
          zipcode: '123456',
        },
        geo: {
          type: 'Point',
          coordinates: [456, 654],
        },
      },
    }),
  ];

  beforeEach(async () => {
    const Mocks = {
      find: jest.fn().mockResolvedValue(theaterList),
      findById: jest.fn().mockReturnValue(theaterList[0]),
      getAddress: jest.fn().mockResolvedValue(theaterList[0]),
      aggregate: jest.fn().mockReturnValue(theaterList[0]),
      create: jest.fn().mockReturnValue(TheaterCreated),
      save: jest.fn().mockResolvedValue(TheaterCreated),
      findByIdAndUpdate: jest.fn().mockReturnValue(TheaterCreated),
      findByIdAndDelete: jest.fn().mockReturnValue(undefined),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TheaterService,

        {
          provide: getModelToken('Theater'),
          useValue: Mocks,
        },
      ],
    }).compile();

    theaterService = module.get<TheaterService>(TheaterService);
    theaterRepository = module.get<Model<Theater>>(getModelToken('Theater'));
  });

  it('Provider should be defined', () => {
    expect(theaterService).toBeDefined();
  });
  it('Theataer List be defined', () => {
    expect(theaterList).toBeDefined();
  });

  describe('Test Get All', () => {
    it('Get All - Return Array of Theaters', async () => {
      const result = await theaterService.getAll();
      expect(result).toBe(theaterList);
    });
    it('Should be return Error', () => {
      jest.spyOn(theaterService, 'getAll');
      expect(theaterService.getAll).rejects.toThrowError();
    });
  });

  describe('Test getById', () => {
    it('getById- Return Theater by id', async () => {
      const result = await theaterService.getById('teste1');
      expect(result._id).toEqual(theaterList[0]._id);
      expect(result).toEqual(theaterList[0]);
    });
    it('Should be return Error', () => {
      jest.spyOn(theaterService, 'getById');
      expect(theaterService.getById).rejects.toThrowError();
    });
  });

  describe('getAddress', () => {
    it('Retorna um teatro pelo nome da cidade', async () => {
      const result = await theaterService.getAddress('UT');
      console.log(result);
      expect(result[0].location.address.city).toEqual(
        theaterList[0].location.address.city
      );
    });
    it('Should be return Error', () => {
      jest.spyOn(theaterService, 'getAddress');
      expect(theaterService.getAddress).rejects.toThrowError();
    });
  });

  describe('findDistance ', () => {
    it('findDistance- Return nearbys', async () => {
      const result = await theaterService.getByLocation(123, 321);
      expect(result).toEqual(theaterList[0]);
    });
    it('Should be return Error', () => {
      jest.spyOn(theaterService, 'getByLocation');
      expect(theaterService.getByLocation).rejects.toThrowError();
    });
  });
  describe('Create a new Theater ', () => {
    it('Create', async () => {
      const body: Theater = {
        _id: '2d5asd5as',
        theaterId: 103,
        location: {
          address: {
            street1: 'Teste Street 666',
            city: 'CA',
            state: 'EUA',
            zipcode: '789645',
          },
          geo: {
            type: 'Point',
            coordinates: [657, 898],
          },
        },
      };
      const result = await theaterService.create(body);
      expect(result).toEqual(TheaterCreated);
    });
    it('Should be return Error', () => {
      jest.spyOn(theaterService, 'create');
      expect(theaterService.create).rejects.toThrowError();
    });
  });

  describe('Update a Theater ', () => {
    it('Update', async () => {
      const bodyUpdate = {
        _id: '2d5asd5as',
        theaterId: 103,
        location: {
          address: {
            street1: 'Teste Street 666',
            city: 'CA',
            state: 'EUA',
            zipcode: '789645',
          },
          geo: {
            type: 'Point',
            coordinates: [657, 898],
          },
        },
      };
      const result = await theaterService.update('2d5asd5as', bodyUpdate);
      expect(result).toEqual(TheaterCreated);
    });
    it('Should be return Error', () => {
      jest.spyOn(theaterService, 'update');
      expect(theaterService.update).rejects.toThrowError();
    });
  });

  describe('Delete a Theater ', () => {
    const data: Theater = {
      _id: '2d5asd5as',
      theaterId: 103,
      location: {
        address: {
          street1: 'Teste Street 666',
          city: 'CA',
          state: 'EUA',
          zipcode: '789645',
        },
        geo: {
          type: 'Point',
          coordinates: [657, 898],
        },
      },
    };

    it('Delete', async () => {
      const result = await theaterService.delete(data._id);
      expect(result).toBeUndefined();
    });
    it('Should be return Error', () => {
      jest.spyOn(theaterService, 'delete');
      expect(theaterService.create).rejects.toThrowError();
    });
  });
});
