/**
 * Defines the standard actions used in CASL ability rules.
 * These map to CRUD operations and permissions.
 */
export enum Action {
  manage = 'manage', // Full access (used by admins)
  create = 'create', // Create a resource
  read = 'read', // Read/view a resource
  update = 'update', // Modify a resource
  delete = 'delete', // Soft-delete or remove a resource
}
