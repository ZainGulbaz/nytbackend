import Axios from "axios";
import { API_PREFIX } from "../../Constants";

export const loginUser=async(userObj)=>{
try{

    let response= await Axios.post(API_PREFIX+"/login",userObj);
    console.log(response);
    return response.data;

}
catch(err)
{
 if(err.response.data) return err.response.data;
 else throw new Error(err);

}
}