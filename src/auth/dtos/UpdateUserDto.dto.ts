import { IsNumber } from "class-validator";


export class UpdateUserDto{

    @IsNumber()
    id: number
    
    @IsNumber()
    level: number
    
}