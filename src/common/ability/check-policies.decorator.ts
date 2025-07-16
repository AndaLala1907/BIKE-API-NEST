/**
 * Custom decorator used to define one or more policy handlers on a route.
 * Stores these handlers in route metadata so they can be evaluated by a guard.
 */
import { SetMetadata } from '@nestjs/common';
import { AppAbility } from './casl-ability.factory';

// Function that receives an ability and return whether access is allowed
export type PolicyHandler = (ability: AppAbility) => boolean;

// Metadata key to retrieve policies in guard
export const CHECK_POLICIES_KEY = 'check_policy';

/**
 * Decorator used to attach one or more policy handlers to a route.
 * These will be evaluated by the PoliciesGuard.
 */
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
