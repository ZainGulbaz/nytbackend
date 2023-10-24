import { BadRequestException, HttpCode, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import Axios from "axios";
import { errors } from 'src/utils/errors';
import { Strings } from 'src/utils/Strings';

@Injectable()
export class PostsService {

async getPosts(session:Record<string,any>){
    try{

        console.log(session);
    
    if(session.api_key!==process.env.API_KEY) throw new Error().name=errors.unAuthorized;   

    let stories= await Axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key="+process.env.API_KEY);
    return{
        message:[Strings.stories.get_success],
        statusCode:200,
        data:{stories:stories?.data?.results}
    }
}
catch(error)
{
    if(error===errors.unAuthorized)
    {
        throw new UnauthorizedException({
            statusCode:HttpStatus.UNAUTHORIZED,
            error:errors.unAuthorized,
            message:[Strings.error.un_athorized]
        })
    }
    throw new BadRequestException({
        statusCode:HttpStatus.BAD_REQUEST,
        error:errors.badRequest,
        message:Strings.stories.get_error
    })
}
}


}
