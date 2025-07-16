/**
 * Guard that enforces policy-based authorization using CASL.
 * It reads policy handlers set via @CheckPolicies and evaluates them against the current user's ability.
 */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory, AppAbility } from './casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './check-policies.decorator';
import { Request } from 'express';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  /**
   * Called before route handler is executed.
   * Returns true if all attached policies return true.
   * Prevents 500 errors by wrapping logic in try/catch when user is missing or invalid.
   */
  canActivate(context: ExecutionContext): boolean {
    const handlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: any }>();

    const user = request.user;
    console.log('[PoliciesGuard] ACTIVATED');
    console.log('[PoliciesGuard] USER:', user);

    try {
      const ability = this.caslAbilityFactory.createForUser(user);
      console.log('[PoliciesGuard] RULES:', ability.rules);

      const result = handlers.every((handler) => handler(ability));
      console.log('[PoliciesGuard] RESULT:', result);

      return result;
    } catch (error) {
      console.error('[PoliciesGuard] ERROR:', error.message);
      return false; // Deny access instead of throwing error
    }
  }
}
