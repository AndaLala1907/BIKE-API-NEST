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

// Define supported actions
type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';

// Define subjects the user can act upon
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
  | 'all'; // Allow global permissions like 'manage all'

export type AppAbility = PureAbility<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  /**
   * Build the CASL ability object based on the user's role.
   */
  createForUser(user: any): AppAbility {
    const builder = new AbilityBuilder<PureAbility<[Actions, Subjects]>>(
      PureAbility as AbilityClass<AppAbility>,
    );
    const { can, cannot } = builder;

    // Default: anonymous users can only read home
    if (!user || !user.role) {
      return builder.build({
        detectSubjectType: (item) => {
          if (typeof item === 'function') return item;
          return (
            (item as any)?.__caslSubjectType__ ||
            item?.constructor?.name ||
            item.constructor
          );
        },
        conditionsMatcher: (conditions: any) => {
          return (object: any) => true;
        },
      });
    }

    if (user.role === 'admin') {
      // Admins can do anything
      can('manage', 'all');
      can('read', 'home');
      can(Action.update, Statistic);
    } else {
      // Regular users can only read the home route
      can('read', 'home');
    }

    return builder.build({
      detectSubjectType: (item) => {
        if (typeof item === 'function') return item;
        return (
          (item as any)?.__caslSubjectType__ ||
          item?.constructor?.name ||
          item.constructor
        );
      },
      conditionsMatcher: (conditions: any) => {
        return (object: any) => true;
      },
    });
  }
}
