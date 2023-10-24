import { BadRequestException, HttpStatus, Injectable,UnauthorizedException} from "@nestjs/common";
import  * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dtos/user.dto";
import { UserService } from "./user.service";
import { Strings } from "src/utils/strings";
import { errors } from "src/utils/errors";
import { LoginDto } from "./dtos/login.dto";

@Injectable()

export class AuthService{

  constructor(private userService: UserService){}

    encryptPassword(plainPassword:string):string{
       try{
        const hash = bcrypt.hashSync(plainPassword, parseInt(process.env.SALT_ROUNDS));
        return hash;
       }
       catch(error)
       {
        throw new Error(error);
       }
    }

    validatePassword(encryptedPassword:string,userPassword:string):boolean{
        try{
            

            return bcrypt.compareSync(userPassword, encryptedPassword);

        }
        catch(error)
        {
                 throw new Error(error);
        }
    }

    async signup(body:CreateUserDto){
        try{

          let userByEmail=await this.userService.findByEmail(body.email);
          if(userByEmail.email) throw new Error().name=errors.unAuthorized;
          let encryptPassword= this.encryptPassword(body.password);
          body.password=encryptPassword;
          const user= await this.userService.create(body);
          delete user.password;
          return {
            message:[Strings.user.created_success],
            statusCode:HttpStatus.CREATED,
            data:{
                user
            }
          }       

        }
        catch(error)
        {
            console.log(error);
            if(error===errors.unAuthorized){
                throw new UnauthorizedException({
                    statusCode:HttpStatus.UNAUTHORIZED,
                    error:errors.unAuthorized,
                    message:[Strings.user.email_already_exists]
                })
            } 

             throw new BadRequestException({
                statusCode:HttpStatus.BAD_REQUEST,
                error:errors.badRequest,
                message:[Strings.user.created_error]
             })
        }
    }

    async login(body:LoginDto,session:Record<string,any>){
        try{

            let userByEmail=await this.userService.findByEmail(body.email);

            if(!body.email) throw new Error().name=errors.unAuthorized;
            else if(!this.validatePassword(userByEmail.password,body.password))throw new Error().name=errors.unAuthorized;
            else{
                delete userByEmail.password;
                session.api_key=process.env.API_KEY;
                return{
                    data:{
                     user:userByEmail
                    },
                    message:[Strings.user.login_success],
                    statusCode:HttpStatus.OK
                }
            }


        }
        catch(err)
        {
            throw new UnauthorizedException({
                statusCode:HttpStatus.UNAUTHORIZED,
                error:errors.unAuthorized,
                message:[Strings.user.login_error]
            })

        }

    }


}