import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
// Unit test for AuthController
describe('AuthController', () => {
  let controller: AuthController;
  // Setup controller
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  // Basic existence test
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
