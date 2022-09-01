import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let provider: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
    }).compile();

    provider = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
