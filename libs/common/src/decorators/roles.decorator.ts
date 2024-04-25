import { Reflector } from '@nestjs/core';
import { UserRole } from '@app/common/types';

export const Roles = Reflector.createDecorator<UserRole[]>();
