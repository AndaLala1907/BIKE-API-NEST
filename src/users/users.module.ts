/**
 * Responsible for managing all user-related operations.
 * Registers the user schema, controller, service, and CASL access control providers.
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { CaslAbilityFactory } from 'src/common/ability/casl-ability.factory';
import { PoliciesGuard } from 'src/common/ability/policies.guard';

@Module({
  // Register User schema for MongoDB
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  // REST controller dor users
  controllers: [UsersController],
  // Service logic and CASL policy guards
  providers: [UsersService, CaslAbilityFactory, PoliciesGuard],
  // Export for reuse in other modules
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
