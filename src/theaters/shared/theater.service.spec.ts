import { Test, TestingModule } from '@nestjs/testing';
import { TheaterService } from './theater.service';

describe('TheaterService', () => {
  let provider: TheaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TheaterService],
    }).compile();

    provider = module.get<TheaterService>(TheaterService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
