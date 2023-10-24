import {CanActivate,ExecutionContext,UnauthorizedException,HttpStatus,Injectable} from "@nestjs/common";
import { verifyToken } from "src/utils/commonFunctions";
import { errors } from "src/utils/errors";

@Injectable()
export class AuthGuard implements CanActivate{
    async canActivate(context:ExecutionContext){

        try{
        const request= context.switchToHttp().getRequest();
        if(request.headers && request.headers.authorization)
        {

            let authArray=request.headers.authorization.split(" ");

            if(authArray[0]=="Bearer") {
                    const tokenPayload=verifyToken(authArray[1]);
                    return true;
            }

        }

        throw new Error().name=errors.unAuthorized;
    }
    catch(err)
    {
       
        throw new UnauthorizedException({
            error:errors.unAuthorized,
            statusCode:HttpStatus.UNAUTHORIZED,
            message:["Invalid Token"]
        })

    }

    }
}