import { SetMetadata } from '@nestjs/common';

export const AVAILABLE_ROLES = ['superuser', 'admin', 'user',] as const;

export const Roles = (...roles: (typeof AVAILABLE_ROLES)[number][]) => SetMetadata('roles', roles);