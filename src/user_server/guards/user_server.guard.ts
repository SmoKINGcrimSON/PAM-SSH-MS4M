import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class UserServerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    
    //Route Parameters
    const userId = request.params.userId as string;
    const serverId = request.params.serverId as string;

    //use regular expression to validate the userId and serverId parameters
    return /^\d+$/.test(userId) && /^\d+$/.test(serverId);
  }
}