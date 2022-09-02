import { Test, TestingModule } from '@nestjs/testing';
import { AutenticationService } from './autentication.service';

describe('AutenticationService', () => {
  let provider: AutenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutenticationService],
    }).compile();

    provider = module.get<AutenticationService>(AutenticationService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
