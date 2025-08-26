/**
 * CASL Ability Factory
 * Defines what actions each type of user can perform on resources.
 */

import {
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from './actions.enum';

// Import all schemas
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Bike } from 'src/bikes/schemas/bike.schema';
import { Journey } from 'src/journeys/schemas/journey.schema';
import { Device } from 'src/devices/schemas/device.schema';
import { Statistic } from 'src/statistics/schema/statistics.schema';
import { Log } from 'src/logs/schemas/log.schema';
import { RoadType } from 'src/roadtypes/schemas/roadtype.schema';
import { SpeedType } from 'src/speedtypes/schemas/speedtype.schema';

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
  | 'home'
  | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserDocument | null | undefined): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );

    // Used to detect the type of resource
    const detectSubjectType = (item: any) => {
      if (typeof item === 'string') return item;
      return (
        (item as any).__caslSubjectType__ ||
        item.constructor?.name ||
        item.constructor
      );
    };

    /**
     * Guests (no user logged in)
     * - Can only read the home page
     * - Public bikes are handled in service (not here)
     */
    if (!user || !user.role) {
      can(Action.read, 'home');
      return build({ detectSubjectType });
    }

    /**
     * Admin users
     * - Can manage everything
     */
    if (user.role === 'admin') {
      can(Action.manage, 'all');
      can(Action.read, 'home');
      return build({ detectSubjectType });
    }

    /**
     * Normal users
     * - Can only manage their own resources
     */
    const uid = user._id.toString();

    // Home
    can(Action.read, 'home');

    // Users → can read and update themselves
    can([Action.read, Action.update], User, { _id: uid });

    // Bikes → can only manage their own bikes
    can([Action.create, Action.read, Action.update, Action.delete], Bike, {
      owner: uid,
    });

    // Devices → can only manage their own devices
    can([Action.create, Action.read, Action.update, Action.delete], Device, {
      owner: uid,
    });

    // Journeys → can only manage their own journeys
    can([Action.create, Action.read, Action.update, Action.delete], Journey, {
      owner: uid,
    });

    // Logs → can only manage their own logs
    can([Action.create, Action.read, Action.update, Action.delete], Log, {
      owner: uid,
    });

    // Statistics → can only read their own statistics
    can(Action.read, Statistic, { owner: uid });

    // RoadTypes and SpeedTypes → global read access for all users
    can(Action.read, RoadType);
    can(Action.read, SpeedType);

    /**
     * Build the ability with a custom conditionsMatcher
     * - Ensures that ObjectId comparisons work correctly (convert to string)
     */
    return build({
      detectSubjectType,
      conditionsMatcher: (conditions: Record<string, any>) => {
        return (item: any) => {
          if (conditions.owner) {
            return item.owner?.toString() === conditions.owner;
          }
          if (conditions._id) {
            return item._id?.toString() === conditions._id;
          }
          return true;
        };
      },
    });
  }
}
