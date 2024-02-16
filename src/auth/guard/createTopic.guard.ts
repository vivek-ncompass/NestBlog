import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class CreateTopicGuard implements CanActivate{

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(request.payload.level >2){
      return true
    }

    return false
  }
}