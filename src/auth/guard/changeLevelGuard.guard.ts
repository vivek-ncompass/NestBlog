import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entity/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChangeLevelGuard implements CanActivate{

  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    if(request.payload.level <3){
      return false
    }
    
    const newLevel = request.body.level

    const userData = await this.usersRepository.findOneOrFail({where:{username:request.body.username}})

    if(userData.level !== newLevel && request.payload.level !== newLevel){
      return true
    }

    return false

  }
}