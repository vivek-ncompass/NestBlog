import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenVerificationGuard implements CanActivate {
 constructor(private readonly jwtService: JwtService) {}

 canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    
    if(!token){
        return false;
    }
    
    try{
        const decodedToken = this.jwtService.verify(token)
        request.payload = decodedToken;
        
        return true;
    }
    catch(error){
        return false;
    }
 }

 private extractTokenFromRequest(request) {
    const authHeader = request.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.slice(7);
    }
    return null; 
 }
}