import { Test, TestingModule } from '@nestjs/testing';
import { Theater } from '../shared/theater';
import { TheaterService } from '../services/theater.service';
import { TheatersController } from './theaters.controller';

describe('TheatersController', () => {
  let controller: TheatersController;
  let service: TheaterService;

  const TheaterCreated = {
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
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TheatersController],
      providers: [
        TheaterService,

        {
          provide: TheaterService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(theaterList),
            getById: jest.fn().mockResolvedValue(theaterList[1]),
            getAddress: jest.fn().mockResolvedValue(theaterList[0]),
            getByLocation: jest.fn().mockReturnValue(TheaterCreated),
            create: jest.fn().mockReturnValue(TheaterCreated),
            update: jest.fn().mockReturnValue(TheaterCreated),
            delete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<TheatersController>(TheatersController);
    service = module.get<TheaterService>(TheaterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Get Theaters', () => {
    it('Retorna lista de teatros', async () => {
      const result = await controller.getAll();
      console.log(result);
      expect(result).toEqual(theaterList);
    });
    it('Should be return Error', () => {
      jest.spyOn(controller, 'getAll');
      expect(controller.getAll).rejects.toThrowError();
    });
  });

  describe('Get Theater by id', () => {
    it('Retorna um teatro pelo ID', async () => {
      const result = await controller.getById('teste2');
      console.log(result);
      expect(result).toEqual(theaterList[1]);
    });
    it('Should be return Error', () => {
      jest.spyOn(controller, 'getById');
      expect(controller.getById).rejects.toThrowError();
    });
  });

  describe('getAddress', () => {
    it('Retorna um teatro pelo nome da cidade', async () => {
      const result = await controller.getAddress('UT');
      console.log(result);
      expect(result).toEqual(theaterList[0]);
    });
    it('Should be return Error', () => {
      jest.spyOn(controller, 'getAddress');
      expect(controller.getAddress).rejects.toThrowError();
    });
  });

  describe('findDistance', () => {
    it('Retorna teatros proximos em um raio de 20km', async () => {
      const body = {
        lat: 657,
        long: 898,
      };
      const result = await controller.getByLocation(body);

      console.log(result);
      expect(result).toBe(TheaterCreated);
    });
    it('Should be return Error', () => {
      jest.spyOn(controller, 'getByLocation');
      expect(controller.getByLocation).rejects.toThrowError();
    });
  });

  describe('Create a new Theater ', () => {
    it('Adiciona um novo teatro ao nosso sistema', async () => {
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
      const result = await controller.create(body);
      expect(result).toEqual(TheaterCreated);
    });
    it('Should be return Error', () => {
      jest.spyOn(controller, 'create');
      expect(controller.create).rejects.toThrowError();
    });
  });

  describe('Update a Theater ', () => {
    it('Atualiza as informações de teatro', async () => {
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
      const result = await controller.update('2d5asd5as', bodyUpdate);
      expect(result).toEqual(TheaterCreated);
    });
    it('Should be return Error', () => {
      jest.spyOn(controller, 'update');
      expect(controller.update).rejects.toThrowError();
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

    it('Deleta um teatro do nosso sistema', async () => {
      const result = await controller.delete(data._id);
      expect(result).toBeUndefined();
    });
    it('Should be return Error', () => {
      jest.spyOn(controller, 'delete');
      expect(controller.delete).rejects.toThrowError();
    });
  });
});
