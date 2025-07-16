import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Test suite for AppController
describe('AppController', () => {
  let appController: AppController;

  // Set up testing module
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // Test to confirm that controller exsists
  describe('root', () => {
    it('should return "BikeAPI is live!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
