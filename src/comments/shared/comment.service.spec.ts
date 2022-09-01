import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let provider: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentService],
    }).compile();

    provider = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
