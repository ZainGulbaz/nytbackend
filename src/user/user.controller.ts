import { Controller,Post,Body, Session} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller()
export class UserController {
  
    constructor(private userAuth:AuthService){}

    @Post("/signup")
    createUser(@Body() body:CreateUserDto){
        
        return this.userAuth.signup(body);
     
    }

    @Post("/login")
    login(@Body() body:LoginDto, @Session() session:Record<string,any>){
        return this.userAuth.login(body,session);
    }

}
