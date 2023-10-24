import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schemas";

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel:Model<User>){}

    
    async create(userData:CreateUserDto){

        try{

            const createdUser= new this.userModel(userData);
            return await createdUser.save();


        }
        catch(err)
        {
            throw new Error(err);
        }
          
    }

    async findByEmail(email:string){
        try{
            const user= await this.userModel.findOne({email}).exec();
            return user;
        }
        catch(err){
            throw new Error(err);
        }
    }


}
