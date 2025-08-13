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

import { User, UserDocument } from 'src/users/schemas/user.schema';
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
  createForUser(user: UserDocument | null | undefined): AppAbility {
    const builder = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );
    const { can } = builder;

    // Anonymous users: allow only reading "home" pseudo-subject
    if (!user || !user.role) {
      can(Action.read, 'home');
      return builder.build({
        detectSubjectType: (item) => {
          if (typeof item === 'function') return item;
          // fallback for plain objects
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

      // Public lists used by dashboard
      can(Action.read, RoadType);
      can(Action.read, SpeedType);

      // Read own data (note: user._id vjen nga dokumenti i Mongoose)
      const uid = (user as any)._id;

      can(Action.read, User, { _id: uid });
      can(Action.read, Statistic /* , { user_id: uid } */);
      can(Action.read, Log /* , { user_id: uid } */);
      can(Action.read, Journey /* , { user_id: uid } */);

      // Shembuj nëse do të lejosh krijim për user-in:
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
