import { Test, TestingModule } from '@nestjs/testing';
import { AutenticationsController } from './autentications.controller';

describe('AutenticationsController', () => {
  let controller: AutenticationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutenticationsController],
    }).compile();

    controller = module.get<AutenticationsController>(AutenticationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
