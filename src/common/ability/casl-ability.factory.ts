// src/common/ability/casl-ability.factory.ts
/**
 * Factory class that defines authorization rules using CASL.
 * It determines what actions a given user can perform on which resources.
 */
import {
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from './actions.enum';

import { User } from 'src/users/schemas/user.schema';
import { Bike } from 'src/bikes/schemas/bike.schema';
import { Journey } from 'src/journeys/schemas/journey.schema';
import { Device } from 'src/devices/schemas/device.schema';
import { Statistic } from 'src/statistics/schema/statistics.schema';
import { Log } from 'src/logs/schemas/log.schema';
import { RoadType } from 'src/roadtypes/schemas/roadtype.schema';
import { SpeedType } from 'src/speedtypes/schemas/speedtype.schema';

// Subjects the user can act upon
type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Bike
      | typeof Journey
      | typeof Device
      | typeof Statistic
      | typeof Log
      | typeof RoadType
      | typeof SpeedType
    >
  | 'User'
  | 'home'
  | 'all';

// Use the Action enum for ability actions
export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  /**
   * Build the CASL ability object based on the user's role.
   */
  createForUser(user: User | null | undefined): AppAbility {
    const builder = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );
    const { can } = builder;

    // Anonymous users: allow only reading "home" pseudo-subject
    if (!user || !user.role) {
      can(Action.read, 'home');
      return builder.build({
        // Keep detectSubjectType to support class-based subjects
        detectSubjectType: (item) => {
          if (typeof item === 'function') return item;
          // fallbacks for plain objects
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return ((item as any)?.__caslSubjectType__ ||
            item?.constructor?.name ||
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item as any).constructor) as any;
        },
      });
    }

    if (user.role === 'admin') {
      // Admins can do anything
      can(Action.manage, 'all');
      can(Action.read, 'home');
    } else {
      // Regular users
      can(Action.read, 'home');

      // Public-like reads (lists used by dashboard)
      can(Action.read, RoadType);
      can(Action.read, SpeedType);

      // Read own data
      can(Action.read, User, { _id: (user as any)._id });
      can(
        Action.read,
        Statistic /* optionally: { userId: (user as any)._id } */,
      );
      can(Action.read, Log /* optionally: { userId: (user as any)._id } */);
      can(Action.read, Journey /* optionally: { userId: (user as any)._id } */);

      // Optional: create own entries
      // can(Action.create, Journey);
      // can(Action.create, Log);
    }

    return builder.build({
      detectSubjectType: (item) => {
        if (typeof item === 'function') return item;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return ((item as any)?.__caslSubjectType__ ||
          item?.constructor?.name ||
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item as any).constructor) as any;
      },
    });
  }
}
