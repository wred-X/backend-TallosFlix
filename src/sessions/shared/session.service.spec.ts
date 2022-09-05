import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let provider: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionService],
    }).compile();

    provider = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
