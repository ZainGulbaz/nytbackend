import { IsString,MinLength } from "class-validator";

export class CreateUserDto{
    
    @IsString()
    name:string;

    @MinLength(8)
    @IsString({message:"The password should be valid and of 8 lengths minimum"})
    password:string;

    @IsString()
    email:string;
}